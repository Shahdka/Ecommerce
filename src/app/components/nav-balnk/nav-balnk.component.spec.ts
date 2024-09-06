import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBalnkComponent } from './nav-balnk.component';

describe('NavBalnkComponent', () => {
  let component: NavBalnkComponent;
  let fixture: ComponentFixture<NavBalnkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBalnkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavBalnkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
