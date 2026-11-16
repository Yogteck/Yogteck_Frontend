export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  billingType: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
}

export interface PricingPageData {
  title: string;
  intro: string;
  plans: PricingPlan[];
  termsNote: string;
  termsDetail: string;
}

export const PRICING_DATA: PricingPageData = {
  title: 'Pricing & Plans',
  intro: 'Choose the plan that fits your business. Every plan includes a free domain and free web hosting.',
  plans: [
    {
      id: 'starter-website',
      name: 'Starter Website',
      price: 'Rs. 9,999*',
      billingType: '(one-time price)',
      description: 'A ready 5-page website for your business',
      features: [
        '5-page website',
        'Website designing',
        'Free domain',
        'Free web hosting'
      ],
      buttonText: 'Get this plan',
      buttonLink: 'https://wa.me/918299209905?text=Hello%20Yogteck,%20I%20am%20interested%20in%20the%20Starter%20Website%20plan%20(Rs.%209,999).'
    },
    {
      id: 'custom-website',
      name: 'Custom Website',
      price: 'Rs. 29,999*',
      billingType: '(one-time price)',
      description: 'A fully customized website built around your needs',
      features: [
        'Fully customized website',
        'All the features you need built in',
        'Free domain',
        'Free web hosting',
        'Unlimited bandwidth'
      ],
      buttonText: 'Get this plan',
      buttonLink: 'https://wa.me/918299209905?text=Hello%20Yogteck,%20I%20am%20interested%20in%20the%20Custom%20Website%20plan%20(Rs.%2029,999).'
    },
    {
      id: 'business-suite',
      name: 'Business Suite',
      price: 'Rs. 60,000*',
      billingType: '(one-time price)',
      description: 'Website, software, app and marketing from one team',
      features: [
        'All services free for 1 year',
        'Custom modules and ERP software',
        'Mobile app',
        'SEO',
        'Digital marketing handled by us'
      ],
      buttonText: 'Get this plan',
      buttonLink: 'https://wa.me/918299209905?text=Hello%20Yogteck,%20I%20am%20interested%20in%20the%20Business%20Suite%20plan%20(Rs.%2060,000).'
    }
  ],
  termsNote: '*Terms and conditions apply.',
  termsDetail: 'Anything outside what is listed in your plan, including special modifications and extra work beyond our terms and conditions, is charged separately and must be paid by the customer.'
};
