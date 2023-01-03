import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'article',
    loadChildren: () =>
      import('./pages/article-management/article-management.module').then((m) => m.ArticleManagementModule)
  },
  {
    path: 'campaign',
    loadChildren: () =>
      import('./pages/campaign-management/campaign-management.module').then((m) => m.CampaignManagementModule)
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./pages/categories-management/categories-management.module').then((m) => m.CategoriesManagementModule)
  },
  {
    path: 'comment',
    loadChildren: () =>
      import('./pages/comment-management/comment-management.module').then((m) => m.CommentManagementModule)
  },
  {
    path: 'faq',
    loadChildren: () =>
      import('./pages/faq-management/faq-management.module').then((m) => m.FAQManagementModule)
  },
  {
    path: 'payment-channel',
    loadChildren: () =>
      import('./pages/payment-channel-management/payment-channel-management.module').then((m) => m.PaymentChannelManagementModule)
  },
  {
    path: 'sponsor',
    loadChildren: () =>
      import('./pages/sponsor-management/sponsor-management.module').then((m) => m.SponsorManagementModule)
  },
  {
    path: 'transaction',
    loadChildren: () =>
      import('./pages/transaction-management/transaction-management.module').then((m) => m.TransactionManagementModule)
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user-management/user-management.module').then((m) => m.UserManagementModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
