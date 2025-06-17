import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public saveProduct(product: Product) {
    let fullList: Product[] = [];
    
    if (this.getAllProducts()) {
      fullList = this.getAllProducts();
    }

    fullList.push(product)
    localStorage.setItem('products', JSON.stringify(fullList));
  }

  public getAllProducts() {
    return JSON.parse(localStorage.getItem('products')!);
  }

  public removeProduct(product: Product) {
    let fullList: Product[] = [];
    
    if (this.getAllProducts()) {
      fullList = this.getAllProducts();
    }

    const index = fullList.indexOf(product);
    fullList.splice(index);
    localStorage.setItem('products', JSON.stringify(fullList));
  }
}
