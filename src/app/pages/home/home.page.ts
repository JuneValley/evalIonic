import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { Product } from 'src/app/models/product';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonItem, IonList, IonContent],
})
export class HomePage {
  private localStorage = inject(LocalStorageService);
  private router = inject(Router);

  products: Product[] = [];

  constructor() {
    this.products = this.localStorage.getAllProducts();
  }

  protected edit(productId: string) {
    this.router.navigate(['/edit', productId]);
  }

  public refresh() {
    this.products = this.localStorage.getAllProducts();
  }
}
