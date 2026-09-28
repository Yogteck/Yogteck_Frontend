import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTACT_CONFIG } from '../../data/contact.config';

@Component({
  selector: 'app-mobile-action-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-action-bar.component.html',
  styleUrl: './mobile-action-bar.component.css'
})
export class MobileActionBarComponent {
  contact = CONTACT_CONFIG;
}
