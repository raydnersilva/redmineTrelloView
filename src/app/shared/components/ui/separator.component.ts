import { Component, HostBinding, Input } from '@angular/core';
import { cn } from '../../../lib/utils';

@Component({
  selector: 'app-separator',
  template: ``,
})
export class SeparatorComponent {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() customClass = '';

  @HostBinding('class')
  get computedClass(): string {
    return cn(
      'shrink-0 bg-border',
      this.orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      this.customClass
    );
  }
}
