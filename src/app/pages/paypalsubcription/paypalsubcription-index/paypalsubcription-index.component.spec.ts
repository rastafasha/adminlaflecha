import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalsubcriptionIndexComponent } from './paypalsubcription-index.component';

describe('IndexComponent', () => {
  let component: PaypalsubcriptionIndexComponent;
  let fixture: ComponentFixture<PaypalsubcriptionIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaypalsubcriptionIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaypalsubcriptionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
