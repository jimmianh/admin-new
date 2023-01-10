import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {LoginModule} from "./pages/login/login.module";
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AdminLayoutComponent} from "./layout/admin-layout/admin-layout.component";
import {LoginLayoutComponent} from "../login-layout/login-layout.component";
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {path: '',
  component: AdminLayoutComponent,
  canActivate: [],
  children: [
    {
      path: 'campaign',
      canActivate: [AuthGuard],
      loadChildren: () =>
        import('./pages/campaign-management/campaign-management.module').then((m) => m.CampaignManagementModule)
    },
    {
      path: 'dashboard',
      canActivate: [AuthGuard],
      component: DashboardComponent
    },
    {
      path: 'article',
      canActivate: [AuthGuard],
      loadChildren: () =>
        import('./pages/article-management/article-management.module').then((m) => m.ArticleManagementModule)
    },
    {
      path: 'categories',
      canActivate: [AuthGuard],
      loadChildren: () =>
        import('./pages/categories-management/categories-management.module').then((m) => m.CategoriesManagementModule)
    },
    {
      path: 'comment',
      canActivate: [AuthGuard],
      loadChildren: () =>
        import('./pages/comment-management/comment-management.module').then((m) => m.CommentManagementModule)
    },
    {
      path: 'faq',
      canActivate: [AuthGuard],
      loadChildren: () =>
        import('./pages/faq-management/faq-management.module').then((m) => m.FAQManagementModule)
    },
    {
      path: 'payment-channel',
      canActivate: [AuthGuard],
      loadChildren: () =>
        import('./pages/payment-channel-management/payment-channel-management.module').then((m) => m.PaymentChannelManagementModule)
    },
    {
      path: 'sponsor',
      canActivate: [AuthGuard],
      loadChildren: () =>
        import('./pages/sponsor-management/sponsor-management.module').then((m) => m.SponsorManagementModule)
    },
    {
      path: 'transaction',
      canActivate: [AuthGuard],
      loadChildren: () =>
        import('./pages/transaction-management/transaction-management.module').then((m) => m.TransactionManagementModule)
    },
    {
      path: 'user',
      canActivate: [AuthGuard],
      loadChildren: () =>
        import('./pages/user-management/user-management.module').then((m) => m.UserManagementModule)
    },
  ]},

  {
    path: 'login',
    component: LoginLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
