import { TestBed } from '@angular/core/testing';

import { PdfExportService } from './pdf-export.service';

describe('PdfExportServiceService', () => {
  let service: PdfExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
