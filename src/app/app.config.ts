import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { LucideAngularModule, Home, LayoutDashboard, Users, Code, KanbanSquare, Laptop, MonitorSmartphone, ChevronRight, Search, Bell, User, Settings, LogOut, LifeBuoy, PanelLeft } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
     importProvidersFrom(LucideAngularModule.pick({
      Home,
      LayoutDashboard,
      Users,
      Code,
      KanbanSquare,
      Laptop,
      MonitorSmartphone,
      ChevronRight,
      Search,
      Bell,
      User,
      Settings,
      LogOut,
      PanelLeft,
      LifeBuoy
    }))
  ],
};
