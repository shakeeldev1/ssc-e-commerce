import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '@/pages/main/auth/LoginPage';
import { RegisterPage } from '@/pages/main/auth/RegisterPage';
import { VerifyEmailPage } from '@/pages/main/auth/VerifyEmailPage';
import { CartPage } from '@/pages/main/cart/CartPage';
import { ProductDetailPage } from '@/pages/main/shop/ProductDetailPage';
import { ProductListPage } from '@/pages/main/shop/ProductListPage';
import { CheckoutPage } from '@/pages/main/checkout/CheckoutPage';
import { OrderDetailPage } from '@/pages/main/orders/OrderDetailPage';
import { OrdersListPage } from '@/pages/main/orders/OrdersListPage';
import { VendorsSellWithUsPage } from '@/pages/main/vendors/VendorsSellWithUsPage';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminProtectedRoute } from '@/layouts/AdminProtectedRoute';
import { MainLayout } from '@/layouts/MainLayout';
import { ProtectedRoute } from '@/layouts/ProtectedRoute';
import { AdminOverviewPage } from '@/pages/admin/overview/AdminOverviewPage';
import { AdminUsersPage } from '@/pages/admin/users/AdminUsersPage';
import { AboutPage } from '@/pages/main/about/AboutPage';
import { AccountDashboardPage } from '@/pages/main/account/AccountDashboardPage';
import { ContactPage } from '@/pages/main/contact/ContactPage';
import { FaqPage } from '@/pages/main/faq/FaqPage';
import { HomePage } from '@/pages/main/home/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { OffersPage } from '@/pages/main/offers/OffersPage';
import { SchoolsPage } from '@/pages/main/schools/SchoolsPage';
import { SmartCardPage } from '@/pages/main/smart-card/SmartCardPage';
import { StudentBenefitsPage } from '@/pages/main/student-benefits/StudentBenefitsPage';
import { TrackOrderPage } from '@/pages/main/track-order/TrackOrderPage';
import { WholesalePage } from '@/pages/main/wholesale/WholesalePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductListPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'verify-email', element: <VerifyEmailPage /> },

      { path: 'about', element: <AboutPage /> },
      { path: 'smart-card', element: <SmartCardPage /> },
      { path: 'student-benefits', element: <StudentBenefitsPage /> },
      { path: 'wholesale', element: <WholesalePage /> },
      { path: 'vendors/sell-with-us', element: <VendorsSellWithUsPage /> },
      { path: 'schools', element: <SchoolsPage /> },
      { path: 'offers', element: <OffersPage /> },
      { path: 'track-order', element: <TrackOrderPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'faq', element: <FaqPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: 'account', element: <AccountDashboardPage /> },
          { path: 'cart', element: <CartPage /> },
          { path: 'checkout', element: <CheckoutPage /> },
          { path: 'orders', element: <OrdersListPage /> },
          { path: 'orders/:id', element: <OrderDetailPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminOverviewPage /> },
          { path: 'users', element: <AdminUsersPage /> },
        ],
      },
    ],
  },
]);
