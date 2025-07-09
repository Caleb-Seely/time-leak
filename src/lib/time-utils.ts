import { parsePhoneNumberFromString, isValidPhoneNumber as libIsValidPhoneNumber, AsYouType } from 'libphonenumber-js';

export const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}m`;
  }
  
  if (mins === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${mins}m`;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// Phone number validation and formatting utilities using libphonenumber-js
export const cleanPhoneNumber = (phoneNumber: string): string => {
  // Remove all non-digit characters except +
  return phoneNumber.replace(/[^\d+]/g, '');
};

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const cleaned = cleanPhoneNumber(phoneNumber);
  try {
    return libIsValidPhoneNumber(cleaned, 'US'); // Default to US, or make this dynamic if needed
  } catch {
    return false;
  }
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = cleanPhoneNumber(phoneNumber);
  const phoneObj = parsePhoneNumberFromString(cleaned, 'US');
  if (phoneObj) {
    return phoneObj.formatInternational();
  }
  return cleaned;
};
