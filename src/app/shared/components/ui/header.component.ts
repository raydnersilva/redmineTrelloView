import { Component, OnInit, inject, signal, TemplateRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LucideAngularModule } from 'lucide-angular';
import { SidebarTriggerComponent } from './sidebar.component';
import { InputComponent } from './input.component';
import { ButtonDirective } from '../../directives/button.directive';
import { DropdownMenuContentDirective, DropdownMenuItemDirective, DropdownMenuTriggerDirective } from '../../directives/dropdown-menu.directive';
import { AvatarComponent, AvatarFallbackComponent, AvatarImageComponent } from './avatar.component';
import { SeparatorComponent } from './separator.component';


// Mock de dados do usuário
const mockUsers: { [key: string]: any } = {
  'user-1': {
    name: 'Usuário Teste',
    avatarUrl: 'https://placehold.co/40x40/E4A11B/FFFFFF?text=UT'
  }
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,
    SidebarTriggerComponent,
    InputComponent,
    ButtonDirective,
    DropdownMenuContentDirective,
    DropdownMenuItemDirective,
    DropdownMenuTriggerDirective,
    AvatarComponent,
    AvatarImageComponent,
    AvatarFallbackComponent,
    SeparatorComponent
  ],
  template: `
    <header class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <app-sidebar-trigger class="sm:hidden" [mobileContent]="mobileSidebarContent"></app-sidebar-trigger>

      <!-- Breadcrumbs -->
      <div class="hidden sm:flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
        <a routerLink="/dashboard" class="hover:text-foreground">
          <lucide-icon name="home" class="h-4 w-4"></lucide-icon>
        </a>
        @for (crumb of breadcrumbs(); track crumb.path) {
          <div class="flex items-center gap-2">
            <lucide-icon name="chevron-right" class="h-4 w-4"></lucide-icon>
            <a [routerLink]="crumb.path" class="hover:text-foreground">
              {{ crumb.label }}
            </a>
          </div>
        }
      </div>

      <!-- Busca e Perfil do Usuário -->
      <div class="relative ml-auto flex-1 md:grow-0">
        <lucide-icon name="search" class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"></lucide-icon>
        <app-input type="search" placeholder="Buscar tarefas..." customClass="w-full rounded-lg bg-secondary pl-8 md:w-[200px] lg:w-[320px]"></app-input>
      </div>
      <button appButton variant="ghost" size="icon" customClass="rounded-full">
        <lucide-icon name="bell" class="h-5 w-5"></lucide-icon>
      </button>

      <!-- Dropdown do Usuário -->
      <button [appDropdownMenuTrigger]="userMenu" appButton variant="ghost" size="icon" customClass="rounded-full">
        <app-avatar customClass="h-8 w-8">
          <app-avatar-image [src]="currentUser.avatarUrl" [alt]="currentUser.name"></app-avatar-image>
          <app-avatar-fallback>{{ currentUser.name.charAt(0) }}</app-avatar-fallback>
        </app-avatar>
      </button>
      <ng-template #userMenu>
        <div appDropdownMenuContent class="w-56">
          <div class="px-2 py-1.5 text-sm font-semibold">Minha Conta</div>
          <app-separator class="-mx-1 my-1"></app-separator>
          <button appDropdownMenuItem><lucide-icon name="user" class="mr-2"></lucide-icon> Perfil</button>
          <button appDropdownMenuItem><lucide-icon name="settings" class="mr-2"></lucide-icon> Configurações</button>
          <app-separator class="-mx-1 my-1"></app-separator>
          <a appDropdownMenuItem routerLink="/login"><lucide-icon name="log-out" class="mr-2"></lucide-icon> Sair</a>
        </div>
      </ng-template>
    </header>
  `
})
export class HeaderComponent implements OnInit {
  @Input() mobileSidebarContent!: TemplateRef<any>;

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  currentUser = mockUsers['user-1'];
  breadcrumbs = signal<{ label: string; path: string }[]>([]);

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs.set(this.createBreadcrumbs(this.route.root));
    });
    this.breadcrumbs.set(this.createBreadcrumbs(this.route.root));
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', crumbs: { label: string; path: string }[] = []): { label: string; path: string }[] {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) return crumbs;

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        const newUrl = `${url}/${routeURL}`;
        const label = this.getBreadcrumbLabel(child.snapshot.data['breadcrumb'] || routeURL);
        crumbs.push({ label, path: newUrl });
      }
      return this.createBreadcrumbs(child, url + `/${routeURL}`, crumbs);
    }
    return crumbs;
  }

  private getBreadcrumbLabel(part: string): string {
    if (/^TASK-\d+$/.test(part) || /^proj-\d+$/.test(part)) return part;
    const translations: { [key: string]: string } = {
      'dashboard': 'Painel', 'board': 'Quadro', 'tasks': 'Tarefas',
      'projects': 'Projetos', 'wiki': 'Wiki Interna'
    };
    return translations[part] || part.charAt(0).toUpperCase() + part.slice(1);
  }
}