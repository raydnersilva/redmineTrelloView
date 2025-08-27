import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Component } from "@angular/core";
import { HeaderComponent } from "../../shared/components/ui/header.component";
import { AppSidebarComponent } from "./sidebar.component";
import { SidebarComponent, SidebarContainerComponent, SidebarInsetComponent } from "../../shared/components/ui/sidebar.component";

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    AppSidebarComponent, // << Importa o componente com o conteúdo
    SidebarContainerComponent,
    SidebarComponent,
    SidebarInsetComponent
  ],
  template: `
    <app-sidebar-container>
      <!-- Sidebar para Desktop -->
      <app-sidebar>
        <!-- Usa o seletor corrigido para renderizar o conteúdo do menu -->
        <app-layout-sidebar></app-layout-sidebar>
      </app-sidebar>

      <!-- Wrapper para o conteúdo que será aberto no sheet mobile -->
      <ng-template #mobileSidebar>
        <div class="flex flex-col h-full bg-sidebar text-sidebar-foreground">
          <app-layout-sidebar></app-layout-sidebar>
        </div>
      </ng-template>

      <!-- Área de Conteúdo Principal -->
      <app-sidebar-inset>
        <app-header [mobileSidebarContent]="mobileSidebar"></app-header>
        <main class="flex-1 p-4 sm:p-6">
          <router-outlet></router-outlet>
        </main>
      </app-sidebar-inset>
    </app-sidebar-container>
  `
})
export class LayoutComponent {}

