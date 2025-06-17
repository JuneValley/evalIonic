import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonButton, IonButtons, IonToolbar, IonTitle, IonHeader, IonApp, IonRouterOutlet],
})
export class AppComponent {
  private router = inject(Router);

  constructor() {}

  protected home(){
    this.router.navigate(['/'])
  }

  protected new(){
    this.router.navigate(['/new'])
  }
}
