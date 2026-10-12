export interface ContactConfig {
  phone: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsappNumber: string;
  whatsappLink: string;
  emailPrimary: string;
  emailSecondary: string;
  address: string;
  addressLine1: string;
  addressCity: string;
  pincode: string;
  tagline: string;
  backendContactApi: string;
  // Controlled flag: append "[Lang: xx-XX | Country: XX | Page: URL]" to message field (default false)
  enableLocaleAnnotationInMessage: boolean;
}

export interface DialCodeOption {
  countryCode: string;
  countryName: string;
  dialCode: string;
  flag: string;
}

export const DIAL_CODE_OPTIONS: DialCodeOption[] = [
  { countryCode: 'IN', countryName: 'India', dialCode: '+91', flag: '🇮🇳' },
  { countryCode: 'US', countryName: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { countryCode: 'CA', countryName: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { countryCode: 'AU', countryName: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { countryCode: 'JP', countryName: 'Japan', dialCode: '+81', flag: '🇯🇵' },
  { countryCode: 'SA', countryName: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
  { countryCode: 'KW', countryName: 'Kuwait', dialCode: '+965', flag: '🇰🇼' },
  { countryCode: 'BH', countryName: 'Bahrain', dialCode: '+973', flag: '🇧🇭' },
  { countryCode: 'AE', countryName: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
  { countryCode: 'GB', countryName: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' }
];

export const CONTACT_CONFIG: ContactConfig = {
  phone: '+91 8299209905',
  phoneDisplay: '8299209905',
  phoneTel: 'tel:8299209905',
  whatsappNumber: '918299209905',
  whatsappLink: 'https://wa.me/918299209905?text=Hello%20Yogteck,%20I%20am%20interested%20in%20taking%20my%20business%20online.',
  emailPrimary: 'yogteck@gmail.com',
  emailSecondary: 'official@yogteck.com',
  address: '302/2, Mangla Vihar 2, New PAC Line, Kanpur Nagar, 208015',
  addressLine1: '302/2, Mangla Vihar 2, New PAC Line',
  addressCity: 'Kanpur Nagar, Uttar Pradesh',
  pincode: '208015',
  tagline: 'Build • Grow • Succeed',
  backendContactApi: 'https://yogteck-backend.vercel.app/api/enquiries/contact',
  enableLocaleAnnotationInMessage: false
};
