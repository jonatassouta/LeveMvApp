import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeveMvComponent } from './leve-mv.component';

describe('LeveMvComponent', () => {
  let component: LeveMvComponent;
  let fixture: ComponentFixture<LeveMvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeveMvComponent]
    });
    fixture = TestBed.createComponent(LeveMvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
