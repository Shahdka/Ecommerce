import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Detils1Component } from './detils1.component';

describe('Detils1Component', () => {
  let component: Detils1Component;
  let fixture: ComponentFixture<Detils1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Detils1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Detils1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
