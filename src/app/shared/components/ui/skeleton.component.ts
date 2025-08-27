import { Component, HostBinding, Input } from '@angular/core';
import { cn } from '../../../lib/utils';

@Component({
  selector: 'app-skeleton',
  template: ``,
  styles: [':host { display: block; }'],
})
export class SkeletonComponent {
  @Input() customClass = '';

  @HostBinding('class')
  get computedClass(): string {
    return cn('animate-pulse rounded-md bg-muted', this.customClass);
  }
}
