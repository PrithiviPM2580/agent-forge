This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Good Pattern

mutationFn: async (payload: CreateWorkflowPayload) => {
const response = await api.post<CreateWorkflowResponse>(
"/workflow",
payload,
);

return response.data;
}

INSERT INTO "Workflow" (id, "userId", "name", "description", "updatedAt")
VALUES
(gen_random_uuid()::text, 'user-001', 'Email Automation', 'Automatically send emails based on workflow triggers.', CURRENT_TIMESTAMP),
(gen_random_uuid()::text, 'user-001', 'Lead Management', 'Manage and organize incoming leads.', CURRENT_TIMESTAMP),
(gen_random_uuid()::text, 'user-002', 'Customer Onboarding', 'Automate the customer onboarding process.', CURRENT_TIMESTAMP),
(gen_random_uuid()::text, 'user-002', 'Invoice Processing', 'Process and organize invoices automatically.', CURRENT_TIMESTAMP),
(gen_random_uuid()::text, 'user-003', 'Slack Notifications', 'Send notifications to Slack when events occur.', CURRENT_TIMESTAMP),
(gen_random_uuid()::text, 'user-003', 'Data Backup', 'Automatically back up important application data.', CURRENT_TIMESTAMP),
(gen_random_uuid()::text, 'user-004', 'Order Processing', 'Handle order processing and status updates.', CURRENT_TIMESTAMP),
(gen_random_uuid()::text, 'user-004', 'Support Ticket', 'Automate support ticket creation and assignment.', CURRENT_TIMESTAMP),
(gen_random_uuid()::text, 'user-005', 'Weekly Report', 'Generate and distribute weekly reports.', CURRENT_TIMESTAMP),
(gen_random_uuid()::text, 'user-005', 'New User Welcome', 'Send a welcome message when a new user registers.', CURRENT_TIMESTAMP);
