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
import { CustomerDashboardLayout } from '@/layouts/CustomerDashboardLayout';
import { WholesaleBuyerDashboardLayout } from '@/layouts/WholesaleBuyerDashboardLayout';
import { WholesaleBuyerProtectedRoute } from '@/layouts/WholesaleBuyerProtectedRoute';
import { VendorDashboardLayout } from '@/layouts/VendorDashboardLayout';
import { VendorProtectedRoute } from '@/layouts/VendorProtectedRoute';
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
import { WholesaleBuyerOverviewPage } from '@/pages/dashboards/wholesale-buyer/overview/WholesaleBuyerOverviewPage';
import { WholesaleCataloguePage } from '@/pages/dashboards/wholesale-buyer/catalogue/WholesaleCataloguePage';
import { WholesaleOrdersPage } from '@/pages/dashboards/wholesale-buyer/orders/WholesaleOrdersPage';
import { WholesaleQuotesPage } from '@/pages/dashboards/wholesale-buyer/quotes/WholesaleQuotesPage';
import { VendorOverviewPage } from '@/pages/dashboards/vendor/overview/VendorOverviewPage';
import { VendorProductsPage } from '@/pages/dashboards/vendor/products/VendorProductsPage';
import { VendorQuotesPage } from '@/pages/dashboards/vendor/quotes/VendorQuotesPage';
import { VendorProfilePage } from '@/pages/dashboards/vendor/profile/VendorProfilePage';

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
          { path: 'checkout', element: <CheckoutPage /> },
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
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <CustomerDashboardLayout />,
        children: [
          { path: '/account', element: <AccountDashboardPage /> },
          { path: '/cart', element: <CartPage /> },
          { path: '/orders', element: <OrdersListPage /> },
          { path: '/orders/:id', element: <OrderDetailPage /> },
        ],
      },
    ],
  },
  {
    element: <WholesaleBuyerProtectedRoute />,
    children: [
      {
        element: <WholesaleBuyerDashboardLayout />,
        children: [
          { path: '/wholesale/dashboard', element: <WholesaleBuyerOverviewPage /> },
          { path: '/wholesale/catalogue', element: <WholesaleCataloguePage /> },
          { path: '/wholesale/orders', element: <WholesaleOrdersPage /> },
          { path: '/wholesale/quotes', element: <WholesaleQuotesPage /> },
        ],
      },
    ],
  },
  {
    element: <VendorProtectedRoute />,
    children: [
      {
        element: <VendorDashboardLayout />,
        children: [
          { path: '/vendor/dashboard', element: <VendorOverviewPage /> },
          { path: '/vendor/products', element: <VendorProductsPage /> },
          { path: '/vendor/quotes', element: <VendorQuotesPage /> },
          { path: '/vendor/profile', element: <VendorProfilePage /> },
        ],
      },
    ],
  },
]);
