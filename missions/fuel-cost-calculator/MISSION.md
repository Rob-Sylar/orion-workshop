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
- Track actual fill-ups to work out your real MPG
- Split by different journeys (work, gym, weekend)

## Update — 2026-11-22
- **Asked:** Add a yearly total and a toggle between my car and a hypothetical electric car.
- Yearly total moved up into the headline next to the monthly figure, so it's big and obvious.
- New ⛽ My car / ⚡ Electric toggle. Electric mode has its own inputs (miles per kWh, pence per kWh, defaulting to 3.5 and 25p) with tips on typical values, and switches the whole page to green.
- New "Your car vs electric" panel with yearly cost bars and a verdict line showing how much a year electric would save, or cost.
- The what-if slider now follows whichever mode you're in (fuel or electricity price).
- Running costs only: doesn't include buying the car, insurance, tax or servicing.
