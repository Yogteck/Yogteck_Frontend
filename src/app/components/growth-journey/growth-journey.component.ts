import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GROWTH_JOURNEY_STEPS, GrowthStep } from '../../data/growth-journey.data';

@Component({
  selector: 'app-growth-journey',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './growth-journey.component.html',
  styleUrl: './growth-journey.component.css'
})
export class GrowthJourneyComponent {
  steps = GROWTH_JOURNEY_STEPS;
  activeStepIndex = 0;

  setActiveStep(index: number): void {
    this.activeStepIndex = index;
  }
}
