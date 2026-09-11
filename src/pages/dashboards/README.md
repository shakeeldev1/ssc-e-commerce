# Dashboard Architecture

Dashboard route modules live under `src/pages/dashboards/<dashboard-name>`.

Each dashboard owns its route pages and dashboard-specific components. Shared business behavior belongs in `src/features`; reusable visual primitives belong in `src/components/ui`; authenticated shell chrome belongs in `src/components/shell`.

Planned dashboard boundaries:

- `admin`: platform administration and user management
- `customer`: account, orders, returns, and saved items
- `wholesale-buyer`: bulk catalogue, RFQs, quotations, and wholesale orders
- `vendor`: vendor profile, owned catalogue, and incoming RFQs for vendor roles
- `admin`: platform operations, orders, finance, inventory, returns, and vendor oversight
- `vendor`: catalog, inventory, orders, and vendor analytics
- `school`: institutions, students, cards, and school reporting
- `wholesale`: buyers, quotations, bulk orders, and account pricing
- `finance`: settlements, commissions, refunds, and financial reporting
- `operations`: fulfillment, inventory operations, and delivery workflows
- `support`: customer cases, contact requests, and service tooling
- `marketing`: promotions, coupons, campaigns, and merchandising

Add a dashboard only when its routes and authorization boundary exist. Do not place dashboard-specific components in global `components`.
