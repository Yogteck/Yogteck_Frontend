import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CLIENTS_DATA, ClientItem } from '../../data/clients.data';

@Component({
  selector: 'app-clients-strip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients-strip.component.html',
  styleUrl: './clients-strip.component.css'
})
export class ClientsStripComponent {
  clients = CLIENTS_DATA;
}
