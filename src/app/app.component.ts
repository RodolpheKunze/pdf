import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfButtonComponent } from './pdf-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PdfButtonComponent],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">PDF Export Demo</h1>
      <app-pdf-button></app-pdf-button>
    </div>
  `
})
export class AppComponent {
  title = 'pdf-export-demo';
}

// pdf-export.service.ts
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {
  constructor() { }

  async generatePDF(data: any[], fileName: string) {
    // ... previous service code remains the same ...
  }
}
