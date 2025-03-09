import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Item } from '../../shared/item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Image } from 'src/shared/image';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

export class CrossPriceMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const retailCtrl = form?.form.get('prices')?.get('retailPrice');
    if (!retailCtrl) return false;
    return !!(retailCtrl.dirty && (retailCtrl.hasError('required') || retailCtrl.hasError('min') || form?.form.get('prices')?.hasError('priceMismatch')));
  }
}

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  providers: [{ provide: ErrorStateMatcher, useClass: MyErrorStateMatcher }]
})
export class ItemDetailComponent implements OnInit {
  formGroup!: FormGroup;
  currentId: string = '';
  isNew = true;
  priceErrorMatcher = new CrossPriceMatcher();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    this.formGroup = this.fb.group({
      id: [{ value: '', disabled: !this.isNew }],
      description: ['', Validators.required],
      number: [0, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]],
      prices: this.fb.group({
        purchasingPrice: [0, [Validators.required, Validators.min(0)]],
        retailPrice: [0, [Validators.required, Validators.min(0)]]
      }, { validators: this.checkPriceValidity }),
      launchDate: [new Date().toISOString().slice(0, 10), Validators.required],
      images: this.fb.array([], Validators.required)
    });


    this.currentId = this.route.snapshot.paramMap.get('id') || '';

    if (this.currentId) {
      try {
        this.isNew = false;
        const item = await this.itemService.fetchItemById(this.currentId);

        // ✅ Add null checks when patching the form
        if (item) {
          this.formGroup.patchValue({
            id: item.id || '',
            description: item.description || '',
            number: item.number || 0,
            prices: {
              purchasingPrice: item.purchasingPrice || 0,
              retailPrice: item.retailPrice || 0
            },
            launchDate: item.launchDate || ''
          });

          this.images.clear();

          if (item.images?.length) {
            item.images.forEach(img => this.addImage(img.url || '', img.title || ''));
          } else {
            this.addImage();
          }
        } else {
          this.addImage();
        }
      } catch {
        this.snackBar.open('Konnte Eintrag nicht laden', 'Schließen', { duration: 3000 });
      }
    } else {
      this.addImage();
    }
  }


  checkPriceValidity(control: AbstractControl): ValidationErrors | null {
    const purchase = control.get('purchasingPrice')?.value;
    const retail = control.get('retailPrice')?.value;
    if (purchase != null && retail != null) {
      if (purchase > retail) {
        control.get('retailPrice')?.setErrors({ priceMismatch: true });
        return { priceMismatch: true };
      } else {
        control.get('retailPrice')?.setErrors(null);
      }
    }
    return null;
  }

  get images(): FormArray {
    return this.formGroup?.get('images') as FormArray || this.fb.array([]);
  }

  addImage(url: String = '', title: String = ''): void {
    this.images.push(this.fb.group({
      url: [url, Validators.required],
      title: [title, Validators.required]
    }));
  }

  removeImage(idx: number): void {
    if (this.images?.length > 1) {
      this.images.removeAt(idx);
    }
  }

  async saveItem(): Promise<void> {
    if (this.formGroup.invalid) return;

    const values = this.formGroup.value;
    const newItem: Item = {
      id: values.id || '',
      description: values.description || '',
      number: values.number || 0,
      purchasingPrice: values.prices.purchasingPrice || 0,
      retailPrice: values.prices.retailPrice || 0,
      launchDate: values.launchDate || '',
      images: values.images || []
    };

    try {
      if (this.isNew) {
        await this.itemService.addItem(newItem);
        this.snackBar.open('Eintrag erfolgreich erstellt', 'Schließen', { duration: 3000 });
      } else {
        await this.itemService.editItem(this.currentId, newItem);
        this.snackBar.open('Eintrag erfolgreich erneuert', 'Schließen', { duration: 3000 });
      }
      this.router.navigate(['/items']);
    } catch {
      this.snackBar.open('Konnte Eintrag nicht speichern', 'Schließen', { duration: 3000 });
    }
  }

  async deleteItem(): Promise<void> {
    try {
      await this.itemService.removeItem(this.currentId);
      this.snackBar.open('Eintrag gelöscht', 'Schließen', { duration: 3000 });
      this.router.navigate(['/items']);
    } catch {
      this.snackBar.open('Konnte Eintrag nicht löschen', 'Schließen', { duration: 3000 });
    }
  }
}
