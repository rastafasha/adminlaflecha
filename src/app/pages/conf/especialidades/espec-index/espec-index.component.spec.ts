import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecIndexComponent } from './espec-index.component';

describe('EspecIndexComponent', () => {
  let component: EspecIndexComponent;
  let fixture: ComponentFixture<EspecIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
