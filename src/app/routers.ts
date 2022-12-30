import { NavData } from './NavData';

export const navItems: NavData[] = [
  {
    name: 'Thống kê',
    url: '/dashboard',
    icon: { name: 'pie-chart' },
  },
  {
    name: 'Quản lý chiến dịch',
    url: '/campaign',
    icon: { name: 'fire' },
    children: [
      {
        name: 'Danh sách',
        url: '/campaign/list',
      },
      {
        name: 'Tạo chiến dịch',
        url: '/campaign/create',
      },
    ],
  },
  {
    name: 'Lịch sử giao dịch',
    url: '/transaction',
    icon: { name: 'transaction' },
    children: [
      {
        name: 'Danh sách',
        url: '/transaction/list',
      },
    ],
  },
  {
    name: 'Quản lý người dùng',
    url: '/user',
    icon: { name: 'team' },
    children: [
      {
        name: 'Danh sách',
        url: '/user/list',
      },
      {
        name: 'Tạo người dùng',
        url: '/user/create',
      },
    ],
  },
  {
    name: 'Quản lý danh mục',
    url: '/categories',
    icon: { name: 'align-left' },
    children: [
      {
        name: 'Danh sách',
        url: '/categories/list',
      },
      {
        name: 'Tạo danh mục',
        url: '/categories/create',
      },
    ],
  },
  {
    name: 'Quản lý nhà đồng hành',
    url: '/sponsor',
    icon: { name: 'home' },
    children: [
      {
        name: 'Danh sách',
        url: '/sponsor/list',
      },
      {
        name: 'Tạo nhà đồng hành',
        url: '/sponsor/create',
      },
    ],
  },
  {
    name: 'Quản lý bài viết',
    url: '/article',
    icon: { name: 'book' },
    children: [
      {
        name: 'Danh sách',
        url: '/article/list',
      },
      {
        name: 'Tạo bài viết',
        url: '/article/create',
      },
    ],
  },
  {
    name: 'Quản lý bình luận',
    url: '/comment',
    icon: { name: 'comment' },
    children: [
      {
        name: 'Danh sách',
        url: '/comment/list',
      },
    ],
  },
  {
    name: 'Quản lý FAQ',
    url: '/faq',
    icon: { name: 'question' },
    children: [
      {
        name: 'Danh sách',
        url: '/faq/list',
      },
      {
        name: 'Tạo người dùng',
        url: '/faq/create',
      },
    ],
  },
  {
    name: 'Quản lý kênh thanh toán',
    url: '/payment-channel',
    icon: { name: 'bank' },
    children: [
      {
        name: 'Danh sách',
        url: '/payment-channel/list',
      },
    ],
  },
];
