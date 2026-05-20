import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateralIndexComponent } from './lateral-index.component';

describe('LateralIndexComponent', () => {
  let component: LateralIndexComponent;
  let fixture: ComponentFixture<LateralIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LateralIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LateralIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
