import { Injectable, effect, inject, signal } from '@angular/core';
import { MobileService } from '../../core/services/mobile.service';

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

@Injectable()
export class SidebarService {
  private mobileService = inject(MobileService);
  isMobile = this.mobileService.isMobile;

  public state = signal<'expanded' | 'collapsed'>('expanded');
  public openMobile = signal(false);

  constructor() {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith(`${SIDEBAR_COOKIE_NAME}=`))?.split('=')[1];
    if (cookieValue) {
      this.state.set(cookieValue === 'true' ? 'expanded' : 'collapsed');
    }

    effect(() => {
      const value = this.state() === 'expanded';
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    });
  }

  toggle() {
    if (this.isMobile()) {
      this.openMobile.update(open => !open);
    } else {
      this.state.update(s => s === 'expanded' ? 'collapsed' : 'expanded');
    }
  }
}