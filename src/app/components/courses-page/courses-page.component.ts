import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta, DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { QuoteModalComponent } from '../quote-modal/quote-modal.component';

import {
  TECH_STACK_ITEMS,
  TechStackItem,
  INTERNSHIP_PROGRAMS,
  InternshipProgram,
  TRAINING_CATEGORIES,
  TrainingCourseCategory,
  TRAINING_DURATION_PLANS,
  TrainingDurationPlan,
  PROJECT_WORKFLOW_STEPS,
  ProjectWorkflowStep,
  WHY_CHOOSE_ITEMS,
  WhyChooseItem
} from '../../data/courses.data';
import { CONTACT_CONFIG } from '../../data/contact.config';

export interface SanitizedTechItem extends TechStackItem {
  safeSvg: SafeHtml;
}

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
    QuoteModalComponent
  ],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.css'
})
export class CoursesPageComponent implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private sanitizer = inject(DomSanitizer);

  contact = CONTACT_CONFIG;

  // Tech stack with sanitized SVGs
  techItems: SanitizedTechItem[] = [];

  // Page data
  internshipPrograms: InternshipProgram[] = INTERNSHIP_PROGRAMS;
  trainingCategories: TrainingCourseCategory[] = TRAINING_CATEGORIES;
  trainingPlans: TrainingDurationPlan[] = TRAINING_DURATION_PLANS;
  workflowSteps: ProjectWorkflowStep[] = PROJECT_WORKFLOW_STEPS;
  whyChooseItems: WhyChooseItem[] = WHY_CHOOSE_ITEMS;

  // Active Category Filter for Training
  activeCategoryId: string = 'all';

  // Modal State
  isQuoteModalOpen = false;
  selectedProgram = 'Internship & Training Program';

  ngOnInit(): void {
    this.titleService.setTitle('Professional Internship & Technical Training Programs - Yogteck');
    this.metaService.updateTag({
      name: 'description',
      content: 'Turn your coding skills into real-world experience with YogTech. Practical 6-month & 12-month software internships and paid technical training programs in ASP.NET Core, Angular, Python, Cloud, and Databases.'
    });

    this.techItems = TECH_STACK_ITEMS.map(item => ({
      ...item,
      safeSvg: this.sanitizer.bypassSecurityTrustHtml(item.svg)
    }));
  }

  setCategory(catId: string): void {
    this.activeCategoryId = catId;
  }

  get filteredCategories(): TrainingCourseCategory[] {
    if (this.activeCategoryId === 'all') {
      return this.trainingCategories;
    }
    return this.trainingCategories.filter(cat => cat.id === this.activeCategoryId);
  }

  openQuoteModal(programTitle?: string): void {
    if (programTitle) {
      this.selectedProgram = programTitle;
    } else {
      this.selectedProgram = 'Internship & Training Program';
    }
    this.isQuoteModalOpen = true;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeQuoteModal(): void {
    this.isQuoteModalOpen = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  getWhatsAppLink(subject: string): string {
    const text = encodeURIComponent(`Hello YogTech, I am interested in ${subject}. Please share complete details, syllabus, and enrollment process.`);
    return `https://wa.me/${this.contact.whatsappNumber}?text=${text}`;
  }

  scrollToSection(sectionId: string): void {
    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
