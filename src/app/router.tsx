import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '@/pages/storefront/auth/LoginPage';
import { RegisterPage } from '@/pages/storefront/auth/RegisterPage';
import { VerifyEmailPage } from '@/pages/storefront/auth/VerifyEmailPage';
import { ProductDetailPage } from '@/pages/storefront/shop/ProductDetailPage';
import { ProductListPage } from '@/pages/storefront/shop/ProductListPage';
import { CartPage } from '@/pages/dashboards/customer/cart/CartPage';
import { CheckoutPage } from '@/pages/dashboards/customer/checkout/CheckoutPage';
import { OrderDetailPage } from '@/pages/dashboards/customer/orders/OrderDetailPage';
import { OrdersListPage } from '@/pages/dashboards/customer/orders/OrdersListPage';
import { VendorsSellWithUsPage } from '@/pages/storefront/vendors/VendorsSellWithUsPage';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminProtectedRoute } from '@/layouts/AdminProtectedRoute';
import { MainLayout } from '@/layouts/MainLayout';
import { ProtectedRoute } from '@/layouts/ProtectedRoute';
import { AdminOverviewPage } from '@/pages/dashboards/admin/overview/AdminOverviewPage';
import { AdminUsersPage } from '@/pages/dashboards/admin/users/AdminUsersPage';
import { AboutPage } from '@/pages/storefront/about/AboutPage';
import { AccountDashboardPage } from '@/pages/dashboards/customer/account/AccountDashboardPage';
import { ContactPage } from '@/pages/storefront/contact/ContactPage';
import { FaqPage } from '@/pages/storefront/faq/FaqPage';
import { HomePage } from '@/pages/storefront/home/HomePage';
import { NotFoundPage } from '@/pages/shared-views/NotFoundPage';
import { OffersPage } from '@/pages/storefront/offers/OffersPage';
import { SchoolsPage } from '@/pages/storefront/schools/SchoolsPage';
import { SmartCardPage } from '@/pages/storefront/smart-card/SmartCardPage';
import { StudentBenefitsPage } from '@/pages/storefront/student-benefits/StudentBenefitsPage';
import { TrackOrderPage } from '@/pages/storefront/track-order/TrackOrderPage';
import { WholesalePage } from '@/pages/storefront/wholesale/WholesalePage';

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
