import { Injectable, Type } from '@angular/core';
import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';

type SheetSide = 'top' | 'bottom' | 'left' | 'right';

const basePanelClasses = [
  'fixed',
  'z-50',
  'gap-4',
  'bg-background',
  'p-6',
  'shadow-lg',
  'transition',
  'ease-in-out',
];

@Injectable({
  providedIn: 'root',
})
export class SheetService {
  constructor(private dialog: Dialog) {}

  open<T, R = any>(
    component: Type<T>,
    side: SheetSide = 'right',
    config?: DialogConfig<any, DialogRef<R, T>>
  ): DialogRef<R, T> {
    const sideClasses = {
      top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
      bottom:
        'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
      left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
      right:
        'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
    };

     const sideSpecificClasses = sideClasses[side].split(' ');

    return this.dialog.open(component, {
     ...config,
      panelClass: [...basePanelClasses, ...sideSpecificClasses],
      backdropClass: ['fixed', 'inset-0', 'z-50', 'bg-black/80'],
    });
  }
}
