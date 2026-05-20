import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecEditComponent } from './espec-edit.component';

describe('EspecEditComponent', () => {
  let component: EspecEditComponent;
  let fixture: ComponentFixture<EspecEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
