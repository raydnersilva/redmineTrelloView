import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  template: `
    <div class="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
      {{ text }}
    </div>
  `,
})
export class TooltipComponent {
  @Input() text = '';
}