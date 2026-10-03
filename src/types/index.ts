/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProjectType =
  | 'Business Website'
  | 'Landing Page'
  | 'Web Application'
  | 'Website Redesign'
  | 'E-commerce Website'
  | 'UI/UX Design'
  | 'Website Maintenance'
  | 'SaaS & Digital Product Development'
  | 'Other';

export type ProjectStage =
  | 'I have an idea and need help planning it.'
  | 'I know what I need and want to begin.'
  | 'I have an existing website that needs improvement.'
  | 'I am comparing developers before deciding.';

export type BudgetRange =
  | 'Basic ($299)'
  | 'Standard ($599)'
  | 'Premium ($999)'
  | 'Enterprise ($1,500+)';

export type Timeline =
  | 'As soon as possible.'
  | 'Within 2–4 weeks.'
  | 'Within 1–3 months.'
  | 'Flexible.';

export type ContactMethod = 'Email' | 'WhatsApp';

export interface ProjectInquiry {
  id?: string;
  name: string;
  email: string;
  company?: string;
  projectType: ProjectType;
  projectStage: ProjectStage;
  description: string;
  budgetRange?: BudgetRange;
  timeline?: Timeline;
  preferredContact?: ContactMethod;
  existingWebsite?: string;
  referenceUrl?: string;
  status: 'new' | 'reviewed' | 'contacted';
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  projectType: ProjectType;
}

export interface ProjectSummary {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  technologies: string[];
  role: string;
  status: string;
}
