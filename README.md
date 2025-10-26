# TicketApp Vue Pro

Vue 3 + Vite + Tailwind + Pinia + Vue Router ticket management app with:
- Auth via localStorage (`ticketapp_session`)
- Protected routes and session-expiry redirect
- Tickets CRUD with validation and accessible delete confirmation modal
- Dashboard stats
- Wave hero with overlapping circle
- Cypress v12 E2E tests

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview

# End-to-end tests
npm run test:e2e
```

## Test Credentials

- Email: `test@ticketapp.test`
- Password: `password123`

## Simulate Network Failures

Set failure rate for ticket API in a `.env` file (optional):

```
VITE_FAILURE_RATE=0.2
```

## Notes

- Status colors: `open` (green), `in_progress` (amber), `closed` (gray)
- Max width: 1440px via `.page-shell`
- Accessible toasts via aria-live regions in `index.html`
