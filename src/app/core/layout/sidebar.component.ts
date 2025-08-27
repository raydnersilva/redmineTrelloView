import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { LucideAngularModule } from "lucide-angular";
import { SidebarContentComponent, SidebarFooterComponent, SidebarGroupComponent, SidebarGroupContentComponent, SidebarGroupLabelComponent, SidebarHeaderComponent, SidebarMenuButtonDirective, SidebarMenuComponent, SidebarMenuItemComponent, SidebarMenuSubButtonDirective, SidebarMenuSubComponent } from "../../shared/components/ui/sidebar.component";
import { SeparatorComponent } from "../../shared/components/ui/separator.component";

@Component({
  selector: 'app-layout-sidebar',
  imports: [
    CommonModule, RouterModule, LucideAngularModule,
    SidebarHeaderComponent, SidebarContentComponent, SidebarFooterComponent,
    SidebarMenuComponent, SidebarMenuItemComponent, SidebarMenuButtonDirective,
    SidebarGroupComponent, SidebarGroupLabelComponent, SidebarGroupContentComponent,
    SidebarMenuSubComponent, SidebarMenuSubButtonDirective, SeparatorComponent
  ],
  template: `

    <app-sidebar-header class="p-4">
      <a routerLink="/dashboard" class="flex items-center gap-2">
        <div class="p-2 rounded-lg bg-primary">
          <svg class="h-6 w-6 text-primary-foreground" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M50 0L8.68 25v50L50 100l41.32-25V25L50 0zm0 8.82L83.3 29.41v41.18L50 91.18 16.7 70.59V29.41L50 8.82zM33.8 70.39c-2.73-1.58-4.9-3.79-6.5-6.64-1.6-2.85-2.4-6.1-2.4-9.75 0-3.66.8-6.9 2.4-9.75 1.6-2.85 3.78-5.06-6.5 6.64L50 29.8l16.2 9.35c2.73 1.58 4.9 3.79 6.5 6.64 1.6 2.85 2.4 6.1 2.4 9.75 0 3.66-.8 6.9-2.4 9.75-1.6 2.85-3.78-5.06-6.5 6.64L50 80.2 33.8 70.39z"/>
          </svg>
        </div>
        <h1 class="text-xl font-semibold text-sidebar-foreground">Flextotal</h1>
      </a>
    </app-sidebar-header>

    <app-sidebar-content class="p-4">
      <app-sidebar-menu>
        <app-sidebar-menu-item>
          <a appSidebarMenuButton [isActive]="isActive('/dashboard')" tooltip="Painel Principal" routerLink="/dashboard">
            <lucide-icon name="layout-dashboard"></lucide-icon> <span>Painel</span>
          </a>
        </app-sidebar-menu-item>
      </app-sidebar-menu>
      <app-separator class="my-4"></app-separator>
      <app-sidebar-group>
        <app-sidebar-group-label class="flex items-center gap-2">
          <lucide-icon name="users" class="h-4 w-4"></lucide-icon> <span>Equipes</span>
        </app-sidebar-group-label>
        <app-sidebar-group-content>
          <app-sidebar-menu>
            <app-sidebar-menu-item>
              <button appSidebarMenuButton (click)="devMenuOpen.set(!devMenuOpen())" [isActive]="isActive('/dev')">
                <lucide-icon name="code"></lucide-icon> <span>Desenvolvedores</span>
              </button>
              @if (devMenuOpen()) {
                <app-sidebar-menu-sub>
                  <app-sidebar-menu-item>
                    <a appSidebarMenuSubButton [isActive]="isActive('/dev/delphi')" routerLink="#">
                      <lucide-icon name="laptop"></lucide-icon> Delphi
                    </a>
                  </app-sidebar-menu-item>
                </app-sidebar-menu-sub>
              }
            </app-sidebar-menu-item>
          </app-sidebar-menu>
        </app-sidebar-group-content>
      </app-sidebar-group>
    </app-sidebar-content>
    <app-sidebar-footer class="p-4 mt-auto">
      <app-separator class="my-4" />
    </app-sidebar-footer>
  `
})
export class AppSidebarComponent {
  private router = inject(Router);
  devMenuOpen = signal(true);
  isActive(path: string): boolean { return this.router.url.startsWith(path); }
}