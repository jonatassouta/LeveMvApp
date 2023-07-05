import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVendaProdutosComponent } from './form-venda-produtos.component';

describe('FormVendaProdutosComponent', () => {
  let component: FormVendaProdutosComponent;
  let fixture: ComponentFixture<FormVendaProdutosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormVendaProdutosComponent]
    });
    fixture = TestBed.createComponent(FormVendaProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
