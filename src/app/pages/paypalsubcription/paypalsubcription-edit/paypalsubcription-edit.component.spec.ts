import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalsubcriptionEditComponent } from './paypalsubcription-edit.component';

describe('EditComponent', () => {
  let component: PaypalsubcriptionEditComponent;
  let fixture: ComponentFixture<PaypalsubcriptionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaypalsubcriptionEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaypalsubcriptionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
