import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonTitle, IonSelect, IonSelectOption, IonButton, IonInput } from '@ionic/angular/standalone';
import { PhotoService } from 'src/app/services/photo.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Type } from 'src/app/models/enums/type';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: true,
  providers: [HomePage],
  imports: [IonInput, IonContent, IonTitle, IonSelect, IonSelectOption, IonButton, CommonModule, FormsModule, ReactiveFormsModule]
})
export class EditPage implements OnInit {
  private photoService = inject(PhotoService);
  private localStorage = inject(LocalStorageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private home = inject(HomePage);

  private productId: string = '';
  private product: Product | undefined;

  protected photo: string | undefined;
  protected form = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(),
    type: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.product = this.localStorage.getAllProducts().find((product: Product) => product.id === params['productId']);

      if (this.product) {
        this.form.controls.name.setValue(this.product?.name);
        this.form.controls.price.setValue(this.product?.price);
        this.form.controls.type.setValue(this.valueToIndex(this.product?.type!));
        this.photo = this.product.photo;
      }
    });
  }

  private isValid() {
    if (this.form.controls.name.value !== ''
      && this.form.controls.price.value !== 0
      && this.form.controls.type.value !== ''
      && this.photo) {
      return true;
    }
    return false;
  }

  private valueToIndex(value: string): string {
    switch (value) {
      case 'Livre':
        return '0';
      case 'Jouet':
        return '1';
      case 'Jeu':
        return '2';
      case 'Instrument':
        return '3';
      case 'Électroménager':
        return '4';
      case 'Autre':
        return '5';
      default:
        return '0';
    }
  }

  protected async takePhoto() {
    this.photo = await this.photoService.takePhoto();
  }

  protected submit() {
    if (this.isValid()) {
      const product = new Product(this.productId, this.form.controls.name.value!, this.form.controls.price.value!, Object.values(Type)[Number(this.form.controls.type.value)], this.photo!);
      this.localStorage.removeProduct(product);
      this.localStorage.saveProduct(product);
      this.home.refresh();
      this.router.navigate(['/']);
    } else {
      alert('Veuillez remplir tous les champs et ajouter une photo');
    }
  }

  protected delete() {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.localStorage.removeProduct(this.product!);
      this.home.refresh();
      this.router.navigate(['/']);
    }
  }
}
