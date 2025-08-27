import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, OnDestroy, PLATFORM_ID, signal, WritableSignal } from "@angular/core";

const MOBILE_BREAKPOINT = 768;

@Injectable({
  providedIn: 'root',
})
export class MobileService implements OnDestroy {
 public isMobile: WritableSignal<boolean> = signal(false);
  private mql: MediaQueryList | null = null;
  private isBrowser: boolean;

  private readonly mqlListener = (event: MediaQueryListEvent) => {
    this.isMobile.set(event.matches);
  };

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
      this.isMobile.set(this.mql.matches);
      this.mql.addEventListener('change', this.mqlListener);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.mql) {
      this.mql.removeEventListener('change', this.mqlListener);
    }
  }
}