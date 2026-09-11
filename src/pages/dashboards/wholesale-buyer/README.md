# Wholesale Buyer Dashboard

This dashboard maps to the backend `wholesale_buyer` role and its existing contracts:

- `GET /wholesale/variants`
- `GET /wholesale/cart`
- `GET /wholesale/orders`
- `GET /wholesale/quote-requests/mine`
- wholesale checkout and quotation actions

Keep buyer-specific route composition here. Keep API queries and mutations in `src/features/wholesale`.