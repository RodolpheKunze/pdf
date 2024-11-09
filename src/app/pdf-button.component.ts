
// pdf-button.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfExportService } from './pdf-export.service';

@Component({
  selector: 'app-pdf-button',  // This selector must match what's used in the template
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4">
      <button 
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        (click)="exportToPDF()">
        Export to PDF
      </button>
    </div>
  `
})
export class PdfButtonComponent {
  constructor(private pdfService: PdfExportService) {}

  async exportToPDF() {
    const data = [
      { name: 'John Doe', amount: 1234.56, date: new Date('2024-01-15') },
      { name: 'Jane Smith', amount: 7890.12, date: new Date('2024-02-20') }
    ];

    await this.pdfService.generatePDF(data, 'data-report');
  }
}