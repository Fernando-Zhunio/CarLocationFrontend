import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ICar } from 'src/app/core/types/car';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HttpService } from 'src/app/shared/services/http.service';
import { GenerateGuid } from 'src/app/shared/tools/common-tools';
import { IResponseCreateOrEditDialog } from 'src/app/core/types/response';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'create-or-edit-car-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSlideToggleModule,
  ],
  templateUrl: './create-or-edit-car-dialog.component.html',
  styleUrl: './create-or-edit-car-dialog.component.scss'
})
export class CreateOrEditCarDialogComponent implements OnInit {

  form = new FormGroup({
    id: new FormControl(GenerateGuid(), [Validators.required]),
    plate: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
    isActive: new FormControl(true)
  });
  isEdit = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ICar | null,
    private httpService: HttpService,
    private dialogRef: MatDialogRef<CreateOrEditCarDialogComponent>
  ) {}
  ngOnInit(): void {
    if (this.data) {
      this.isEdit = true;
      console.log(this.data);
      this.form.patchValue(this.data);
    }
  }

  saveInServer() {
    if (!this.form.valid) { 
      this.form.markAllAsTouched();
      return;   
    }
    const request = this.form.value as ICar;
    let observableHttp = this.isEdit ? this.httpService.put(`api/app/cars/${request.id}`, request) 
    : this.httpService.post('api/app/cars', request);

    observableHttp.subscribe({
      next: (response) => {
        const res: IResponseCreateOrEditDialog<ICar> = {
          item: request,
          isEdit: this.isEdit
        }
        this.dialogRef.close(res);
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

}
