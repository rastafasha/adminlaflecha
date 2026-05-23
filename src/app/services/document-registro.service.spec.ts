import { TestBed } from '@angular/core/testing';

import { DocumentRegistroService } from './document-registro.service';

describe('DocumentRegistroService', () => {
  let service: DocumentRegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentRegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
