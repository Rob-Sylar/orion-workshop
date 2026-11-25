# Mission: Financial Tracker

- **Date:** 2026-11-25
- **Status:** ✓ Complete
- **Asked:** Monthly budget with income and spending categories (£), bills and subscriptions with due dates, savings goals with progress bars (house deposit first), a debts section, and a dashboard showing money left this month and savings progress. On-device only, no account numbers or personal details.

## What was built
A four-tab tracker (Budget, Bills, Savings, Debts) with a dashboard on top and a month switcher. Budget has income entries, spending by category with limits and "over" warnings. Bills have due days, paid ticks per month and "soon / overdue?" flags. Savings goals (House deposit first) have put aside / take out and progress bars. Debts track balance, monthly payment and months to clear. Money left = income − spending − all bills − debt payments − money put aside. Saved in localStorage, with copy/restore backup.

## How to use
Add this month's income, log spending against categories, add bills and tick them off as paid, set your House deposit target, then watch "Money left" update live. Use the ‹ › arrows to look at other months. Data stays on the device, so use Copy backup to move it between phone and PC.

## Ideas for v2
Recurring income, interest on debts, CSV export, charts of spending by month, per-bill payment history.
