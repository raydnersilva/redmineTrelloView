import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-sheet-header',
  template: `<div class="flex flex-col space-y-2 text-center sm:text-left"><ng-content></ng-content></div>`,
})
export class SheetHeaderComponent {}

@Component({
  selector: 'app-sheet-title',
  template: `<h2 class="text-lg font-semibold text-foreground"><ng-content></ng-content></h2>`,
})
export class SheetTitleComponent {}

@Component({
  selector: 'app-sheet-description',
  template: `<p class="text-sm text-muted-foreground"><ng-content></ng-content></p>`,
})
export class SheetDescriptionComponent {}

@Component({
  selector: 'app-sheet-content',
  template: `<div class="flex-1"><ng-content></ng-content></div>`,
})
export class SheetContentComponent {}

@Component({
  selector: 'app-sheet-footer',
  template: `<div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"><ng-content></ng-content></div>`,
})
export class SheetFooterComponent {}

@Component({
  selector: 'app-sheet-close',
  template: `
    <button (click)="close()" class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
      <span class="sr-only">Close</span>
    </button>
  `,
})
export class SheetCloseComponent {
  constructor(private dialogRef: DialogRef) {}
  close() { this.dialogRef.close(); }
}