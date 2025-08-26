import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { cn } from '../../../lib/utils';


const cardClasses = 'rounded-lg border bg-card text-card-foreground shadow-sm';

@Component({
    selector: 'app-card',
    imports: [CommonModule],
    template: `
    <div [ngClass]="cn(cardBaseClass, customClass)">
      <ng-content></ng-content>
    </div>
  `,
    encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
    @Input() customClass = '';
    cardBaseClass = cardClasses;
    cn = cn;
}

@Component({
    selector: 'app-card-header',
    template: `
    <div class="flex flex-col space-y-1.5 p-6">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardHeaderComponent { }

@Component({
    selector: 'app-card-title',
    template: `
    <h3 class="text-2xl font-semibold leading-none tracking-tight">
      <ng-content></ng-content>
    </h3>
  `,
})
export class CardTitleComponent { }

@Component({
    selector: 'app-card-description',
    template: `
    <p class="text-sm text-muted-foreground">
      <ng-content></ng-content>
    </p>
  `,
})
export class CardDescriptionComponent { }

@Component({
    selector: 'app-card-content',
    template: `
    <div class="p-6 pt-0">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardContentComponent { }

@Component({
    selector: 'app-card-footer',
    template: `
    <div class="flex items-center p-6 pt-0">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardFooterComponent { }