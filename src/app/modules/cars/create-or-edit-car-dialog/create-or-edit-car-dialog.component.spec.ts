import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditCarDialogComponent } from './create-or-edit-car-dialog.component';

describe('CreateOrEditCarDialogComponent', () => {
  let component: CreateOrEditCarDialogComponent;
  let fixture: ComponentFixture<CreateOrEditCarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrEditCarDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOrEditCarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
