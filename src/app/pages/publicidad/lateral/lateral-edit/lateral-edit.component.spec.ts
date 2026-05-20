import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateralEditComponent } from './lateral-edit.component';

describe('LateralEditComponent', () => {
  let component: LateralEditComponent;
  let fixture: ComponentFixture<LateralEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LateralEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LateralEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
