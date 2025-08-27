import { Directive, Input, ElementRef, HostListener, OnDestroy, ComponentRef } from '@angular/core';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipComponent } from '../components/ui/tooltip.component';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  @Input('appTooltip') text = '';

  private overlayRef: OverlayRef;
  private tooltipPortal: ComponentPortal<TooltipComponent>;
  private tooltipInstance?: ComponentRef<TooltipComponent>;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef
  ) {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -8,
      }]);

    this.overlayRef = this.overlay.create({ positionStrategy });

    this.tooltipPortal = new ComponentPortal(TooltipComponent);
  }

  @HostListener('mouseenter')
  show() {
    this.tooltipInstance = this.overlayRef.attach(this.tooltipPortal);
    if (this.tooltipInstance) {
      this.tooltipInstance.instance.text = this.text;
    }
  }

  @HostListener('mouseleave')
  hide() {
    this.overlayRef.detach();
    this.tooltipInstance = undefined;
  }

  ngOnDestroy(): void {
    this.overlayRef.dispose();
  }
}