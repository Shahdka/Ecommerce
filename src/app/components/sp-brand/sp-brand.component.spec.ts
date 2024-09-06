import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpBrandComponent } from './sp-brand.component';

describe('SpBrandComponent', () => {
  let component: SpBrandComponent;
  let fixture: ComponentFixture<SpBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpBrandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
