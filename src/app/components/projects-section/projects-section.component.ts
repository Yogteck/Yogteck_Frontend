import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROJECTS_DATA, ProjectItem } from '../../data/projects.data';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.css'
})
export class ProjectsSectionComponent {
  projects = PROJECTS_DATA;
  selectedFilter: 'all' | 'ecommerce' | 'web' | 'erp' | 'marketing' = 'all';

  get filteredProjects(): ProjectItem[] {
    if (this.selectedFilter === 'all') {
      return this.projects;
    }
    return this.projects.filter(p => p.category === this.selectedFilter);
  }

  setFilter(filter: 'all' | 'ecommerce' | 'web' | 'erp' | 'marketing'): void {
    this.selectedFilter = filter;
  }
}
