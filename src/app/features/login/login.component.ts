import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CardComponent,
  CardContentComponent,
  CardDescriptionComponent,
  CardHeaderComponent,
  CardTitleComponent
} from '../../shared/components/ui/card.component';
import { InputComponent } from '../../shared/components/ui/input.component';
import { LabelComponent } from '../../shared/components/ui/label.component';
import { ButtonDirective } from '../../shared/directives/button.directive';

@Component({
  selector: 'app-login-page',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    InputComponent,
    LabelComponent,
    ButtonDirective,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  login() {
    console.log('Login attempt:', this.email, this.password);
  }
}
