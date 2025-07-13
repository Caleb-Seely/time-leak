import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { lazyLoadGA, trackPageView, trackEvent, trackScreenTimeEvent } from '../lib/analytics';

export const useAnalytics = () => {
  const location = useLocation();

  // Initialize GA on mount
  useEffect(() => {
    lazyLoadGA();
  }, []);

  // Track page views when location changes
  useEffect(() => {
    // Only track if GA is loaded
    if (window.gtag) {
      trackPageView(location.pathname);
    }
  }, [location]);

  // Track custom events
  const trackCustomEvent = useCallback((
    action: string, 
    category: string, 
    label?: string, 
    value?: number
  ) => {
    trackEvent(action, category, label, value);
  }, []);

  // Track screen time specific events
  const trackScreenTime = useCallback((action: string, details?: any) => {
    trackScreenTimeEvent(action, details);
  }, []);

  return {
    trackEvent: trackCustomEvent,
    trackScreenTime,
  };
}; 