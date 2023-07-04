import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLeveMvComponent } from './form-leve-mv.component';

describe('FormLeveMvComponent', () => {
  let component: FormLeveMvComponent;
  let fixture: ComponentFixture<FormLeveMvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormLeveMvComponent]
    });
    fixture = TestBed.createComponent(FormLeveMvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
