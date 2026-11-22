# Mission: Fuel Cost Calculator

- **Date:** 2026-11-22
- **Status:** ✓ Complete
- **Asked:** Fuel cost calculator for my commute: MPG, price per litre, miles each way, cost per week and month.

## What was built
A single-page, dark HUD-style calculator. You enter MPG, the fuel price in pence per litre and miles each way, then tap the days you drive.
It shows the cost per return trip, per week, per month (big headline), per year and per mile, plus litres per week and miles per year.
A "what if" slider shows how a fuel price change from −20p to +30p would hit the monthly cost.
Your numbers are saved on each device with localStorage.

## How to use
Open it from the hub, put your real MPG and the pump price in, and tick your work days. That's it.

## Maths
- Uses UK gallons (4.54609 litres)
- Cost per mile = (pence per litre ÷ 100) × 4.54609 ÷ MPG
- Monthly = weekly × 52 ÷ 12

## Ideas for v2
- Compare against an electric car (pence per kWh, miles per kWh)
- Track actual fill-ups to work out your real MPG
- Split by different journeys (work, gym, weekend)
