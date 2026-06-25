# Good Dog OS

A data-driven dog-training plan generator. Answer a few questions about your dog and it composes a personalized, week-by-week, force-free training plan from a structured content library, then (Phase 2) lets you track progress.

It runs entirely in the browser. No backend, no accounts, no tracking. Built as a static site for GitHub Pages.

## Why it is built this way

The interesting part is the architecture, not the screens:

- **Content as data.** Every command, drill, problem, game, and program template lives in a typed content library (`src/content/`), decoupled from the UI. Growing the content never touches logic.
- **A pure generation engine.** `generatePlan(profile, library) => { plan, rationale }` is a pure function with no I/O. Same input, same output. It is deterministic and explainable (it returns the reasons for its choices), which is why it is unit-tested heavily and why there is no LLM in the loop.
- **Conservative and force-free.** The generated advice mirrors modern reward-based training and carries safety notes (for example, growth-plate cautions for a young large breed). It is not a substitute for a professional trainer or veterinarian.

## Stack

React + TypeScript + Vite + Tailwind CSS, Zustand for state, Framer Motion for motion, Vitest + Testing Library for tests.

## Develop

```bash
npm install
npm run dev      # local dev server
npm test         # run the test suite
npm run build    # type-check and build to dist/
npm run preview  # preview the production build
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages. The Vite `base` is set to `/good-dog-os/` for the project subpath, and the app uses `HashRouter` so deep links and refreshes work on a static host.

## Project shape

```
src/
  content/    typed content library (commands, drills, problems, games, breeds)
  engine/     pure generatePlan() and its steps
  store/      app state + versioned localStorage persistence
  features/   onboarding wizard, plan view, tracker (Phase 2)
  design/     tokens and UI primitives
  routes/     pages
```

See `docs/plans/` in the parent workspace for the full implementation plan.
