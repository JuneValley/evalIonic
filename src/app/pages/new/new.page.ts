import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonTitle, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/angular/standalone';
import { PhotoService } from 'src/app/services/photo.service';
import { Product } from 'src/app/models/product';
import { Type } from 'src/app/models/enums/type';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
  standalone: true,
  providers: [HomePage],
  imports: [IonButton, IonInput, IonContent, IonTitle, IonSelect, IonSelectOption, CommonModule, FormsModule, ReactiveFormsModule]
})
export class NewPage implements OnInit {
  private photoService = inject(PhotoService);
  private localStorage = inject(LocalStorageService);
  private router = inject(Router);
  private home = inject(HomePage);

  protected photo: string | undefined;
  protected form = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(),
    type: new FormControl(0)
  });

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(),
      type: new FormControl(0)
    });
    this.photo = '';
  }

  private isValid() {
    if (this.form.controls.name.value !== ''
      && this.form.controls.price.value !== 0
      && this.form.controls.type.value
      && this.photo) {
      return true;
    }
    return false;
  }

  protected async takePhoto() {
    this.photo = await this.photoService.takePhoto();
  }

  protected submit() {
    if (this.isValid()) {
      const id = Math.floor(1000 + Math.random() * 9999).toString();
      const product = new Product(id, this.form.controls.name.value!, this.form.controls.price.value!, Object.values(Type)[this.form.controls.type.value!], this.photo!);
      this.localStorage.saveProduct(product);
      this.home.refresh();
      this.router.navigate(['/']);
    } else {
      alert('Veuillez remplir tous les champs et ajouter une photo');
    }
  }
}
