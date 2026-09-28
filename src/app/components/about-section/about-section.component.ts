import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css'
})
export class AboutSectionComponent {
  trustPoints = [
    {
      title: 'Rapid Time-to-Market',
      desc: 'Agile sprints delivering functional MVPs and enterprise sites in record timelines without cutting corners.'
    },
    {
      title: 'Enterprise-Grade Security',
      desc: 'SSL encryption, hardened database architectures, and strict compliance with modern web standards.'
    },
    {
      title: 'Custom Architecture & Scalability',
      desc: 'Zero generic templates—we build custom architectures designed to handle exponential traffic surges.'
    },
    {
      title: 'Conversion-Driven UX/UI',
      desc: 'Human-centric UI/UX crafted to convert casual visitors into paying customers and repeat clients.'
    },
    {
      title: 'Transparent Pricing',
      desc: 'Zero hidden fees. Clear milestone contracts with full intellectual property (IP) source code handover.'
    },
    {
      title: 'Dedicated Post-Launch SLA',
      desc: '24/7 server monitoring, proactive maintenance patches, and regular automated database backups.'
    }
  ];
}
