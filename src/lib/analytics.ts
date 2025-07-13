// Google Analytics configuration
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || 'G-XXXXXXXXXX';

// Declare gtag function globally
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const initGA = () => {
  // Check if GA is already loaded
  if (window.gtag) {
    return;
  }

  // Create dataLayer
  window.dataLayer = window.dataLayer || [];

  // Define gtag function
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  // Load Google Analytics script first
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  
  // Configure GA after script loads
  script.onload = () => {
    // Set timestamp
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  };

  script.onerror = () => {
    console.error('Failed to load Google Analytics script');
  };

  document.head.appendChild(script);
};

// Track page views
export const trackPageView = (url: string) => {
  if (window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: document.title,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track screen time related events
export const trackScreenTimeEvent = (action: string, details?: any) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: 'screen_time',
      ...details,
    });
  }
};

// Lazy load Google Analytics after initial page load
export const lazyLoadGA = () => {
  // Wait for the page to be fully loaded
  if (document.readyState === 'complete') {
    // Small delay to ensure main content is rendered
    setTimeout(initGA, 1000);
  } else {
    window.addEventListener('load', () => {
      // Additional delay to prioritize user experience
      setTimeout(initGA, 1000);
    });
  }
}; 