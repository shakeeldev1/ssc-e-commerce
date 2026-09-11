# Vendor Dashboard

The vendor dashboard is shared by the backend `vendor` and `wholesale_vendor` roles.

Current screens map to:

- `GET /vendors/me`
- `GET /catalog/products/mine`
- `GET /wholesale/quote-requests/incoming`

Inventory controls are intentionally excluded because the backend currently restricts `/inventory` to `super_admin`.