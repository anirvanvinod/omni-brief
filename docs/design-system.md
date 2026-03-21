# OmniBrief - UI/UX Design System Revamp
## Theme: "Cupertino Brutalism"

### 1. Core Philosophy
Ditch all glassmorphism, soft drop-shadows, and subtle gradients. We are moving to a stark, high-contrast, utilitarian aesthetic that still respects Apple's exact typography and spacing.
- **Colors:** Pure Black (#000000) and Pure White (#FFFFFF). No mid-tone grays for backgrounds.
- **Accents:** Use a single, pure, vivid accent color for active states (e.g., Apple's Product Red `#FF3B30` or an electric Blue `#0000FF`).
- **Borders:** Thick, structural borders (`border-2` or `border-4` using `border-black` in light mode, `border-white` in dark mode).
- **Shadows:** Hard, offset brutalist shadows instead of soft blurs (e.g., `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]` in light mode).
- **Shapes:** Maintain Apple's signature curves (`rounded-2xl` or `rounded-3xl`), but frame them with harsh, thick borders.

### 2. Tailwind Configuration Overhaul
Update `tailwind.config.ts` (or your CSS variables) to include:
- A custom shadow utility: `shadow-brutal: '4px 4px 0px 0px rgba(0,0,0,1)'` (and a dark mode equivalent using white).
- Typography: Ensure the `sans` font family strictly defaults to Apple's system fonts: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. (Remove `Inter` if necessary to get the exact macOS/iOS feel).

### 3. Typography Rules
- **Headings:** Massive, bold, and tightly tracked (`tracking-tighter`, `font-black`, `text-5xl` or larger for layout headers).
- **Body Text:** Utilitarian, highly readable, standard weight (`text-base`, `leading-relaxed`).
- **Data/Numbers:** Use tabular numbers or monospace (`font-mono`) for stock tickers, dates, and times to emphasize a raw, data-driven feel.