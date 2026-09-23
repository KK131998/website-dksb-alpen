# DKSB Alpen Frontend

Next.js-Frontend für den Kinderschutzbund Alpen. WordPress (Local) liefert die Inhalte über GraphQL. Seiten werden statisch erzeugt und bei CMS-Änderungen per Webhook neu validiert (ISR / on-demand revalidation).

## Voraussetzungen

- Node.js
- laufende Local-Site unter `http://cms-website-dksb-alpen.local`

## Start

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000).

## WordPress-Webhook

`wordpress/mu-plugins/revalidate-webhook.php` liegt in der Local-Site unter `wp-content/mu-plugins/`. Secret und URL müssen mit `frontend/.env.local` übereinstimmen.
