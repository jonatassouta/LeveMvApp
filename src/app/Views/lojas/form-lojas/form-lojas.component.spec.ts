import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLojasComponent } from './form-lojas.component';

describe('FormLojasComponent', () => {
  let component: FormLojasComponent;
  let fixture: ComponentFixture<FormLojasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormLojasComponent]
    });
    fixture = TestBed.createComponent(FormLojasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
