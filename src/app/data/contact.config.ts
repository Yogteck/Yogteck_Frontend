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
}

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
  backendContactApi: 'https://yogteck-backend.vercel.app/api/enquiries/contact'
};
