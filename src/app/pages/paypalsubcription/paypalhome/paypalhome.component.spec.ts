import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalhomeComponent } from './paypalhome.component';

describe('PaypalhomeComponent', () => {
  let component: PaypalhomeComponent;
  let fixture: ComponentFixture<PaypalhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaypalhomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaypalhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
