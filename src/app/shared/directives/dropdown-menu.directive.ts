import { Directive, HostBinding, Input } from '@angular/core';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { cn } from '../../lib/utils';

@Directive({
  selector: '[appDropdownMenuContent]',
  hostDirectives: [CdkMenu],
})
export class DropdownMenuContentDirective {
  @HostBinding('class')
  get classes() {
    return 'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md';
  }
}


@Directive({
  selector: '[appDropdownMenuItem]',
  hostDirectives: [CdkMenuItem],
})
export class DropdownMenuItemDirective {
  @Input() inset = false;
  @HostBinding('class')
  get classes() {
    return cn(
      'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      this.inset && 'pl-8'
    );
  }
}

@Directive({
  selector: '[appDropdownMenuTrigger]',
  hostDirectives: [{
    directive: CdkMenuTrigger,
    inputs: ['cdkMenuTriggerFor: appDropdownMenuTrigger'] 
  }],
})
export class DropdownMenuTriggerDirective {}