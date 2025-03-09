import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn, FormArray } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { CrossPriceMatcher } from '../item-detail/item-detail.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/shared/item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss']
})
export class ItemCreateComponent implements OnInit {
  formGroup!: FormGroup;
  isNew = true;
  priceErrorMatcher = new CrossPriceMatcher();

  constructor(private fb: FormBuilder, private itemService: ItemService, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: ['', {
        validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9_-]+$')],
        asyncValidators: [this.idExistsValidator()],
        updateOn: 'blur'
      }],
      description: ['', Validators.required],
      number: [0, [Validators.required, Validators.min(0), Validators.pattern('^\\d+$')]],
      launchDate: ['', [Validators.required, Validators.pattern('^\\d{4}-\\d{2}-\\d{2}$')]],
      prices: this.fb.group({
        purchasingPrice: [0, [Validators.required, Validators.min(0)]],
        retailPrice: [0, [Validators.required, Validators.min(0)]]
      }),
      images: this.fb.array([
        this.fb.group({
          url: ['', Validators.required],
          title: ['', Validators.required]
        })
      ])
    }, { validators: this.priceMismatchValidator });
  }

  priceMismatchValidator(group: AbstractControl): ValidationErrors | null {
    const purchasingPrice = group.get('prices')?.get('purchasingPrice')?.value;
    const retailPrice = group.get('prices')?.get('retailPrice')?.value;
    return (retailPrice <= purchasingPrice) ? { priceMismatch: true } : null;
  }

  idExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      if (!this.isNew) {
        return Promise.resolve(null);
      }
      return this.itemService.doesIdExist(control.value)
        .then(exists => exists ? { idTaken: true } : null)
        .catch(() => null);
    };
  }

  saveItem() {
    if (!this.formGroup.valid) {
      console.error('Form is invalid. Please check the entered data.');
      this.snackBar.open('Please complete the form correctly.', 'Close', { duration: 3000 });
      return;
    }
    const newItem: Item = this.formGroup.value;
    console.log('Creating item with data:', newItem);
    this.itemService.addItem(newItem)
      .then(response => {
        console.log('Item saved successfully', response);
        this.snackBar.open('Item saved successfully!', 'Close', { duration: 3000 });
        this.formGroup.reset();
      })
      .catch(error => {
        console.error('Error while saving item:', error);
        this.snackBar.open('Error saving item. Please try again.', 'Close', { duration: 3000 });
      });
      this.router.navigate(["/itemList"])
  }
  

  get images(): FormArray {
    return this.formGroup.get('images') as FormArray;
  }

  addImage() {
    this.images.push(this.fb.group({
      url: ['', Validators.required],
      title: ['', Validators.required]
    }));
  }

  removeImage(index: number) {
    if (this.images.length > 1) {
      this.images.removeAt(index);
    }
  }
}
