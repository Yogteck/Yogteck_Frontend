export interface GrowthStep {
  stepNumber: string;
  title: string;
  stage: string;
  description: string;
  icon: string;
  tag: string;
}

export const GROWTH_JOURNEY_STEPS: GrowthStep[] = [
  {
    stepNumber: '01',
    title: 'Offline Business',
    stage: 'The Foundation',
    description: 'You run a local store or offline business with high quality products/services, looking to expand beyond geographical limits.',
    icon: 'store',
    tag: 'Starting Point'
  },
  {
    stepNumber: '02',
    title: 'Modern Website',
    stage: 'Digital Presence',
    description: 'We build a high-speed, mobile-responsive custom website establishing your 24/7 digital brand authority and customer trust.',
    icon: 'globe',
    tag: 'Brand Building'
  },
  {
    stepNumber: '03',
    title: 'E-Commerce Store',
    stage: 'Direct Selling',
    description: 'Transform your website into a direct revenue channel with payment gateways, cart checkouts, and automated delivery tracking.',
    icon: 'cart',
    tag: 'Direct Sales'
  },
  {
    stepNumber: '04',
    title: 'Marketplace Reach',
    stage: 'Local to Global',
    description: 'We onboard and scale your catalog on Amazon, Flipkart, Meesho & Walmart to tap millions of ready buyers across India & abroad.',
    icon: 'platforms',
    tag: 'Scale Channels'
  },
  {
    stepNumber: '05',
    title: 'Digital Marketing & SEO',
    stage: 'High-Intent Traffic',
    description: 'Targeted Google Ads, social media funnels, and organic search ranking that consistently funnel qualified buyer leads into your pipeline.',
    icon: 'target',
    tag: 'Lead Inflow'
  },
  {
    stepNumber: '06',
    title: 'More Customers & Growth',
    stage: 'Continuous Scale',
    description: 'Automated CRM, ERP synchronization, and recurring customer retention delivering predictable business expansion.',
    icon: 'trending-up',
    tag: 'Compounding Revenue'
  }
];
