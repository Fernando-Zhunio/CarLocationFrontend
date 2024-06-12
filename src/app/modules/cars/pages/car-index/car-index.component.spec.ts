import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarIndexComponent } from './car-index.component';

describe('CarIndexComponent', () => {
  let component: CarIndexComponent;
  let fixture: ComponentFixture<CarIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
