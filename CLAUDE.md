# Orion Workshop — House Rules (Cloud)

This repo is Rob's cloud workshop. You're running in Claude Code on the web, started from
Rob's phone or PC, or by a scheduled task. Rob usually isn't watching, so work it out yourself
and don't stop to ask unless something is genuinely impossible.

The repo is PUBLIC and served by GitHub Pages at https://rob-sylar.github.io/orion-workshop/
Never put personal info, passwords, keys, addresses or work-confidential stuff in it.

## Where you work
- Every mission gets its own folder: `missions/<kebab-case-name>/`
- The main file is always `missions/<name>/index.html`
- Only edit files for the current mission, plus the hub page (`index.html` in the root) and `queue.md`.

## What Rob wants by default
- ONE self-contained `index.html` per mission, with all CSS and JS inline. Only use CDN libraries if they're essential.
- It must work on a Samsung Android phone, a Samsung Galaxy Tab and Windows. No Apple-specific features or suggestions.
- Mobile-first: big tap targets, no sideways scrolling.
- Dark sci-fi HUD style: near-black background, cyan accents, glow.
- Interactive beats static.
- If it has ticks, progress or saved state, use localStorage wrapped in try/catch.
- UK units and spelling: £, miles, litres.
- No API keys, no paid services, no backend. GitHub Pages is static hosting only.

## Every mission must also
1. Write `missions/<name>/MISSION.md` covering what was asked, what was built, how to use it and ideas for v2.
2. Add a card for it to the root `index.html` hub, inside the `<!-- MISSIONS:START -->` / `<!-- MISSIONS:END -->` block,
   newest first, using the same card markup as the existing ones (title, one-line description, date, link).
3. Commit with a message like `mission: <name>` and push to `main` so it goes live on Pages.
   If you're on a branch, merge it into main yourself. Rob wants it live, not sat in a pull request.

## How to finish
End with a short plain-English summary (max 3 sentences): what you built, and the live link
https://rob-sylar.github.io/orion-workshop/missions/<name>/
plus one thing to try first.
