/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AnalyticsEventName =
  | 'page_view'
  | 'service_view'
  | 'project_view'
  | 'contact_form_start'
  | 'contact_form_submit'
  | 'project_cta_click'
  | 'portfolio_project_view'
  | 'service_cta_click'
  | 'inquiry_form_start'
  | 'inquiry_step_complete'
  | 'inquiry_submit_success'
  | 'inquiry_submit_error'
  | 'contact_email_click'
  | 'contact_whatsapp_click'
  | 'testimonial_submit_success'
  | 'testimonial_submit_fallback'
  | 'testimonial_modal_open'
  | 'cv_download_click';

/**
 * Tracks an analytics event without collecting any Personally Identifiable Information (PII).
 * Safely forwards to GA4 `gtag` if present in the window or dispatches a custom event.
 */
export function trackEvent(name: AnalyticsEventName, params?: Record<string, string | number | boolean>) {
  try {
    // If Google Analytics 4 (window.gtag) is present
    if (typeof window !== 'undefined' && 'gtag' in window && typeof (window as unknown as { gtag: Function }).gtag === 'function') {
      (window as unknown as { gtag: Function }).gtag('event', name, params);
    }
    
    // Dispatch custom DOM event for local observer or dev monitoring
    if (typeof window !== 'undefined') {
      const customEvent = new CustomEvent('portfolio_analytics', {
        detail: { event: name, params, timestamp: new Date().toISOString() }
      });
      window.dispatchEvent(customEvent);
    }
  } catch (err) {
    // Analytics failures must never interrupt user interactions
    console.debug('Analytics event tracked:', name, params);
  }
}
