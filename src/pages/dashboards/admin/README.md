# Super Admin Dashboard

The admin overview is restricted to `super_admin` and currently reads from:

- `GET /orders/admin`
- `GET /vendors`
- `GET /inventory/low-stock`
- `GET /returns`
- `GET /finance/net-revenue`

The dashboard emphasizes operational attention: pending vendor approvals, returns, low stock, order activity, and net revenue. Detailed management screens should be added as separate admin modules rather than expanding the overview into a dense all-purpose page.