import { Injectable, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {
  constructor() { }

  async generatePDF(data: any[], fileName: string) {
    // Create a temporary div to hold our template
    const element = document.createElement('div');
    element.innerHTML = this.generateTemplate(data);
    //need to hide this, this is not clean to see the export before cleaning it
    document.body.appendChild(element);

    try {
      // Convert the HTML template to canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        logging: false,
        useCORS: true
      });

      // Initialize PDF document
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add image to PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Handle multiple pages if content is too long
      let heightLeft = imgHeight;
      let position = 0;

      while (heightLeft >= pageHeight) {
        position = heightLeft - pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save(`${fileName}.pdf`);
    } finally {
      // Clean up temporary element: need to find a way to not have the temporary element
      document.body.removeChild(element);
    }
  }

  private generateTemplate(data: any[]): string {
    // Get current date for the header
    const currentDate = new Date().toLocaleDateString();
    
    // Calculate totals for summary
    const totalAmount = data
      .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0)
      .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 10px;">
          <div>
            <h1 style="color: #2c3e50; margin: 0;">Data Report</h1>
            <p style="color: #7f8c8d; margin: 5px 0;">Generated on ${currentDate}</p>
          </div>
          <div style="text-align: right;">
          <!-- Need to inject the logo here-->
            <img src="assets/img/vecteur-degrade-logo-colore-oiseau_343694-1365.jpg.avif" alt="Company Logo" style="max-width: 150px;"/>
            <p style="margin: 5px 0;">Company Name</p>
          </div>
        </div>

        <!-- Summary Section -->
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <h2 style="color: #2c3e50; margin: 0 0 10px 0;">Summary</h2>
          <p>Total Records: ${data.length}</p>
          <p>Total Amount: $${totalAmount}</p>
        </div>

        <!-- Data Table -->
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background: #2c3e50; color: white;">
              ${Object.keys(data[0] || {}).map(key => 
                `<th style="padding: 12px; text-align: left; border: 1px solid #ddd;">${
                  key.charAt(0).toUpperCase() + key.slice(1)
                }</th>`
              ).join('')}
            </tr>
          </thead>
          <tbody>
            ${data.map(item => `
              <tr style="border-bottom: 1px solid #ddd;">
                ${Object.values(item).map(value => `
                  <td style="padding: 12px; border: 1px solid #ddd;">
                    ${this.formatValue(value)}
                  </td>
                `).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- Footer -->
        <div style="margin-top: 30px; padding-top: 10px; border-top: 1px solid #ddd; text-align: center; color: #7f8c8d;">
          <p>Generated using Company PDF Export System</p>
          <p>Page 1 of 1</p>
        </div>
      </div>
    `;
  }

  private formatValue(value: any): string {
    if (value instanceof Date) {
      return value.toLocaleDateString();
    }
    if (typeof value === 'number') {
      return value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    return value?.toString() || '';
  }
}