# OmniBrief - Component Refactor Instructions
## Target: Apply "Cupertino Brutalism" Design System

Please refactor the following components based on the `design-system.md` rules.

### 1. `Header.tsx`
- **UI:** Remove any soft borders or blurs. Give the header a thick, solid bottom border (`border-b-4 border-black dark:border-white`). 
- **Typography:** The "OmniBrief" logo should be massive (`text-3xl` or `text-4xl`), `font-black`, and `tracking-tighter`.
- **Toggle:** The Dark/Light mode toggle should be a chunky, solid button with a hard border, completely inverting its background on hover.

### 2. `PreferenceModal.tsx` (Onboarding)
- **Backdrop:** Remove `backdrop-blur`. Make the background a solid, semi-transparent black overlay (`bg-black/80`).
- **Modal Card:** - Thick border (`border-4 border-black dark:border-white`).
  - Hard brutalist shadow (`shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]` in light mode).
  - Apple curves (`rounded-3xl`).
  - Solid background (Pure White in light mode, Pure Black in dark mode).
- **Toggles:** Category and Tone buttons should be sharp rectangles or thick pills (`border-2 border-black dark:border-white`). When selected, they fill completely with pure color (black/white or the vivid accent) and invert the text color.

### 3. `MarketTicker.tsx`
- **UI:** Wrap it in thick horizontal borders (`border-y-4 border-black dark:border-white`). Background is pure white/black.
- **Typography:** Force `font-mono` for all stock symbols and prices. Keep the vibrant green/red for positive/negative changes, but make the colors pure and high-contrast (e.g., `#00FF00` and `#FF0000`).

### 4. `NewsCard.tsx`
- **Container:** Remove all glassmorphism. Background is solid. Add a thick border (`border-2 border-black dark:border-white`).
- **Hover State:** On hover, translate the card slightly up (`-translate-y-1`) and increase the hard offset shadow to exaggerate the brutalist feel.
- **Typography:** Headline must be `font-bold` and `tracking-tight`. The category badge should be a solid block of color with a hard black border.
- **ELI5 Button:** Make this a massive, full-width, chunky button at the bottom of the card. Text should be uppercase and bold (`font-black`, `uppercase`). 

### Execution Command:
Please read both `docs/design-system.md` and this file. Then, systematically rewrite `Header.tsx`, `PreferenceModal.tsx`, `MarketTicker.tsx`, and `NewsCard.tsx` to match this exact aesthetic. Ensure Dark Mode logic is strictly maintained (black borders/shadows in light mode become white borders/shadows in dark mode).