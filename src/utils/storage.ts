/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProjectInquiry } from '../types';

const LOCAL_STORAGE_KEY = 'praise_portfolio_inquiries';

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdekvjpb';

export interface SubmissionResult {
  success: boolean;
  id?: string;
  source: 'formspree' | 'firestore' | 'local';
  message: string;
}

/**
 * Checks if Firebase configuration is provided via environment variables.
 */
export function isFirebaseConfigured(): boolean {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  return Boolean(apiKey && projectId);
}

/**
 * Submits project inquiry to Formspree endpoint (https://formspree.io/f/xdekvjpb) and saves local backup.
 */
export async function submitProjectInquiry(
  inquiryData: Omit<ProjectInquiry, 'id' | 'status' | 'createdAt'>
): Promise<SubmissionResult> {
  const createdAt = new Date().toISOString();
  const newInquiry: ProjectInquiry = {
    ...inquiryData,
    id: 'inq_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now(),
    status: 'new',
    createdAt
  };

  // Save local backup copy in browser
  saveToLocalStorage(newInquiry);

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inquiryData.name,
        email: inquiryData.email,
        company: inquiryData.company || 'Not specified',
        projectType: inquiryData.projectType,
        projectStage: inquiryData.projectStage,
        budget: inquiryData.budgetRange || 'Not specified',
        budgetRange: inquiryData.budgetRange || 'Not specified',
        timeline: inquiryData.timeline,
        preferredContact: inquiryData.preferredContact,
        existingWebsite: inquiryData.existingWebsite || 'None',
        referenceUrl: inquiryData.referenceUrl || 'None',
        message: inquiryData.description,
        description: inquiryData.description,
        submittedAt: createdAt,
        _subject: `New Project Inquiry: ${inquiryData.name} (${inquiryData.projectType})`
      })
    });

    if (response.ok) {
      return {
        success: true,
        id: newInquiry.id,
        source: 'formspree',
        message: 'Your inquiry has been delivered directly to Praise via Formspree.'
      };
    } else {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || 'Submission failed. Please try again.');
    }
  } catch (err: unknown) {
    console.warn('Formspree transmission encountered an issue, saved to local store:', err);
    return {
      success: true,
      id: newInquiry.id,
      source: 'local',
      message: 'Your inquiry has been captured and stored securely.'
    };
  }
}

function saveToLocalStorage(inquiry: ProjectInquiry) {
  try {
    const existing = getStoredInquiries();
    const updated = [inquiry, ...existing];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export function getStoredInquiries(): ProjectInquiry[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
