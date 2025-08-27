import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  PLATFORM_ID,
  inject,
  signal,
  effect,
  ViewEncapsulation,
  Directive,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { cn } from '../../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { LucideAngularModule } from 'lucide-angular';
import { SheetService } from '../../services/sheet.service';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { SkeletonComponent } from './skeleton.component';

// --- CONSTANTES E ESTADO ---
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const MOBILE_BREAKPOINT = 768;



@Component({ selector: 'app-mobile-sidebar-content', standalone: true, template: `<ng-content></ng-content>`, encapsulation: ViewEncapsulation.None })
export class MobileSidebarContentComponent {}

@Component({ selector: 'app-sidebar-container', standalone: true, template: `<div class="group/sidebar-wrapper flex min-h-svh w-full"><ng-content></ng-content></div>` })
export class SidebarContainerComponent implements OnDestroy {
  private sheetService = inject(SheetService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private mql: MediaQueryList | null = null;

  isMobile = signal(this.isBrowser ? window.innerWidth < MOBILE_BREAKPOINT : false);
  state = signal<'expanded' | 'collapsed'>('expanded');

  private readonly mqlListener = (event: MediaQueryListEvent) => this.isMobile.set(event.matches);

  constructor() {
    if (this.isBrowser) {
      this.mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
      this.isMobile.set(this.mql.matches);
      this.mql.addEventListener('change', this.mqlListener);

      // --- LÓGICA CORRIGIDA ---
      const cookieValue = document.cookie.split('; ').find(row => row.startsWith(`${SIDEBAR_COOKIE_NAME}=`))?.split('=')[1];
      if (cookieValue) {
        this.state.set(cookieValue === 'true' ? 'expanded' : 'collapsed');
      }
      // Se o cookie não existir, o estado padrão signal('expanded') será mantido.

      effect(() => {
        const value = this.state() === 'expanded';
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      });
    }
  }

  public toggleSidebar(mobileContent?: any) {
    if (this.isMobile()) {
      if (mobileContent) this.sheetService.open(mobileContent, 'left');
    } else {
      this.state.update(s => (s === 'expanded' ? 'collapsed' : 'expanded'));
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'b' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      this.toggleSidebar();
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.mql) this.mql.removeEventListener('change', this.mqlListener);
  }
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (!sidebarContainer.isMobile()) {
      <div class="group peer hidden md:block text-sidebar-foreground"
           [attr.data-state]="sidebarContainer.state()"
           [attr.data-collapsible]="sidebarContainer.state() === 'collapsed' ? collapsible : ''"
           [attr.data-variant]="variant" [attr.data-side]="side">
        <div [ngClass]="cn('duration-200 relative h-svh w-[16rem] bg-transparent transition-[width] ease-linear', 'group-data-[collapsible=icon]:w-[3rem]', (variant === 'floating' || variant === 'inset') && 'group-data-[collapsible=icon]:w-[calc(3rem_+_1rem)]')"></div>
        <div [ngClass]="cn('duration-200 fixed inset-y-0 z-10 hidden h-svh w-[16rem] transition-[left,right,width] ease-linear md:flex', side === 'left' ? 'left-0 group-data-[collapsible=offcanvas]:-left-[16rem]' : 'right-0 group-data-[collapsible=offcanvas]:-right-[16rem]', 'group-data-[collapsible=icon]:w-[3rem]', (variant === 'floating' || variant === 'inset') && 'p-2 group-data-[collapsible=icon]:w-[calc(3rem_+_1rem_+_2px)]')">
          <div class="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    }
  `,
})
export class SidebarComponent {
  @Input() side: 'left' | 'right' = 'left';
  @Input() variant: 'sidebar' | 'floating' | 'inset' = 'sidebar';
  @Input() collapsible: 'offcanvas' | 'icon' | 'none' = 'icon';
  sidebarContainer = inject(SidebarContainerComponent);
  cn = cn;
}

@Component({
  selector: 'app-sidebar-trigger',
  standalone: true,
  imports: [LucideAngularModule],
  template: `<button (click)="sidebarContainer.toggleSidebar(mobileContent)" class="h-7 w-7 p-1"><lucide-icon name="panel-left"></lucide-icon><span class="sr-only">Toggle Sidebar</span></button>`,
})
export class SidebarTriggerComponent {
  @Input() mobileContent: any;
  sidebarContainer = inject(SidebarContainerComponent);
}

@Component({
  selector: 'app-sidebar-rail',
  standalone: true,
  template: `
    <button
      aria-label="Toggle Sidebar"
      title="Toggle Sidebar"
      (click)="sidebarContainer.toggleSidebar()"
      class="absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex
             [[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize
             [[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize
             group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar
             [[data-side=left][data-collapsible=offcanvas]_&]:-right-2
             [[data-side=right][data-collapsible=offcanvas]_&]:-left-2"
    ></button>
  `
})
export class SidebarRailComponent {
  sidebarContainer = inject(SidebarContainerComponent);
}

@Component({ selector: 'app-sidebar-inset', standalone: true, template: `
   <main class="relative flex min-h-svh w-full flex-col bg-background peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow">
      <ng-content></ng-content>
    </main>
` })
export class SidebarInsetComponent {
   @HostBinding('class') classes = 'flex-1';
}

@Component({ selector: 'app-sidebar-header', standalone: true, template: `<div class="flex flex-col gap-2 p-2"><ng-content></ng-content></div>` })
export class SidebarHeaderComponent {}

@Component({ selector: 'app-sidebar-footer', standalone: true, template: `<div class="flex flex-col gap-2 p-2 mt-auto"><ng-content></ng-content></div>` })
export class SidebarFooterComponent {}

@Component({ selector: 'app-sidebar-separator', standalone: true, template: `<hr class="mx-2 w-auto bg-sidebar-border" />`})
export class SidebarSeparatorComponent {}

@Component({ selector: 'app-sidebar-content', standalone: true, template: `<div class="flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden"><ng-content></ng-content></div>` })
export class SidebarContentComponent {}

@Component({ selector: 'app-sidebar-group', standalone: true, template: `<div class="relative flex w-full min-w-0 flex-col p-2"><ng-content></ng-content></div>` })
export class SidebarGroupComponent {}

@Component({ selector: 'app-sidebar-group-label', standalone: true, template: `<div class="duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0"><ng-content></ng-content></div>` })
export class SidebarGroupLabelComponent {}

@Component({ selector: 'app-sidebar-group-content', standalone: true, template: `<div class="w-full text-sm"><ng-content></ng-content></div>` })
export class SidebarGroupContentComponent {}

@Component({ selector: 'app-sidebar-menu-sub', standalone: true, template: `<ul class="mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden"><ng-content></ng-content></ul>` })
export class SidebarMenuSubComponent {}

@Directive({ selector: 'a[appSidebarMenuSubButton]', standalone: true })
export class SidebarMenuSubButtonDirective {
  @Input() isActive = false;
  @HostBinding('class') classes = 'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground text-sm group-data-[collapsible=icon]:hidden';
  @HostBinding('attr.data-active') get activeState() { return this.isActive ? 'true' : null; }
}

@Component({ selector: 'app-sidebar-menu', standalone: true, template: `<ul class="flex w-full min-w-0 flex-col gap-1"><ng-content></ng-content></ul>` })
export class SidebarMenuComponent {}

@Component({ selector: 'app-sidebar-menu-item', standalone: true, template: `<li class="group/menu-item relative"><ng-content></ng-content></li>` })
export class SidebarMenuItemComponent {}

@Component({
  selector: 'app-sidebar-menu-action',
  standalone: true,
  template: `
    <button class="absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0
                 after:absolute after:-inset-2 after:md:hidden
                 peer-data-[size=sm]/menu-button:top-1
                 peer-data-[size=default]/menu-button:top-1.5
                 peer-data-[size=lg]/menu-button:top-2.5
                 group-data-[collapsible=icon]:hidden">
      <ng-content></ng-content>
    </button>
  `
})
export class SidebarMenuActionComponent {}

@Component({
  selector: 'app-sidebar-menu-badge',
  standalone: true,
  template: `
    <div class="absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none
                peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground
                peer-data-[size=sm]/menu-button:top-1
                peer-data-[size=default]/menu-button:top-1.5
                peer-data-[size=lg]/menu-button:top-2.5
                group-data-[collapsible=icon]:hidden">
      <ng-content></ng-content>
    </div>
  `
})
export class SidebarMenuBadgeComponent {}

@Component({
  selector: 'app-sidebar-menu-skeleton',
  standalone: true,
  imports: [SkeletonComponent],
  template: `
    <div class="rounded-md h-8 flex gap-2 px-2 items-center">
      @if (showIcon) {
        <app-skeleton customClass="size-4 rounded-md"></app-skeleton>
      }
      <app-skeleton customClass="h-4 flex-1" [style.max-width]="width()"></app-skeleton>
    </div>
  `
})
export class SidebarMenuSkeletonComponent {
  @Input() showIcon = false;
  width = signal(`${Math.floor(Math.random() * 40) + 50}%`);
}

const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        outline: 'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:!p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
type ButtonVariantProps = VariantProps<typeof sidebarMenuButtonVariants>;

@Directive({
  selector: 'button[appSidebarMenuButton], a[appSidebarMenuButton]',
  standalone: true,
  hostDirectives: [{ directive: TooltipDirective, inputs: ['appTooltip: tooltip'] }],
})
export class SidebarMenuButtonDirective {
  sidebarContainer = inject(SidebarContainerComponent);
  @Input() variant: ButtonVariantProps['variant'] = 'default';
  @Input() size: ButtonVariantProps['size'] = 'default';
  @Input() isActive = false;
  @Input() customClass = '';
  @Input() tooltip = '';
  @HostBinding('class') get computedClass() { return cn(sidebarMenuButtonVariants({ variant: this.variant, size: this.size }), this.customClass); }
  @HostBinding('attr.data-active') get activeState() { return this.isActive ? 'true' : null; }
}