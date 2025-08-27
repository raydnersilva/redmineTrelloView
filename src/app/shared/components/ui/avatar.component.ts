import { CommonModule } from "@angular/common";
import { Component, Input, signal } from "@angular/core";

export class AvatarState {
  imageStatus = signal<'loading' | 'loaded' | 'error'>('loading');
}

@Component({
  selector: 'app-avatar',
  template: `
    <div class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
      <ng-content></ng-content>
    </div>
  `,
  providers: [AvatarState], 
})
export class AvatarComponent {}

@Component({
  selector: 'app-avatar-image',
  template: `
    <img
      [src]="src"
      [alt]="alt"
      class="aspect-square h-full w-full"
      (load)="state.imageStatus.set('loaded')"
      (error)="state.imageStatus.set('error')"
    />
  `,
})
export class AvatarImageComponent {
  @Input() src = '';
  @Input() alt = '';
  constructor(public state: AvatarState) {}
}

@Component({
  selector: 'app-avatar-fallback',
  imports: [CommonModule],
  template: `
    @if (state.imageStatus() !== 'loaded') {
      <div class="flex h-full w-full items-center justify-center rounded-full bg-muted">
        <ng-content></ng-content>
      </div>
    }
  `,
})
export class AvatarFallbackComponent {
  constructor(public state: AvatarState) {}
}