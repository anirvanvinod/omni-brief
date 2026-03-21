# Design System Strategy: Structural High-Contrast Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Industrial Precisionist."** This aesthetic represents a collision between the polished, ergonomic world of premium consumer electronics and the raw, unapologetic functionalism of architectural brutalism. 

We are moving away from the industry-standard "soft UI" of gradients and blurs. Instead, we embrace **intentional friction**. The experience should feel like a high-end technical manual or an elite architectural blueprint: authoritative, high-contrast, and surgically precise. We break the "template" look by using extreme scale—pairing massive, aggressive display typography with hyper-utilitarian data density—housed within containers that feel physically heavy and structurally sound.

---

## 2. Colors: The Absolute Contrast Rule
This system operates on a binary logic of light and dark. There is no room for ambiguity. Mid-tone grays are strictly prohibited to maintain the "stark" visual identity.

- **Primary (`#000000`) & Surface (`#FFFFFF` / `#f9f9f9`):** These are your structural pillars. Use `surface_container_lowest` (#ffffff) for primary content areas and `surface` (#f9f9f9) for the base canvas to provide a microscopic hint of depth.
- **The Accent (`#FF3B30`):** Use the `primary_fixed` token (Apple Product Red) exclusively for high-priority actions, critical errors, or "System Alert" moments. It is a "loud" color; use it sparingly to ensure its impact remains absolute.
- **The "No-Line" Rule (Reinterpreted):** While the original brief requests thick borders, we apply the "No-Line" rule to **internal layouting**. Do not use 1px hairlines to separate list items. Instead, use the `surface_container` tiers or a full `2px` or `4px` `primary` (#000000) border. If a line exists, it must be structural and assertive.
- **Surface Nesting:** Create depth by nesting `surface_container_high` (#e8e8e8) cards within a `surface` (#f9f9f9) background. Because we lack soft shadows, this tonal shift—combined with a `4px` hard border—is the only way to communicate hierarchy.
- **Signature Textures:** Avoid gradients. Visual "soul" is achieved through **density**. Use monospace data clusters and tight typography blocks to create texture rather than color shifts.

---

## 3. Typography: Authority Through Scale
Typography is not just for reading; it is a structural element. We use a high-contrast scale to dictate the user's focus.

- **Display & Headline (SF Pro / Inter):** Must be set to `display-lg` or `headline-lg`. These should be massive, **Bold**, and use tight letter-spacing (`-0.02em` to `-0.05em`). These headers should feel like they are "stamping" the page.
- **Body (Inter):** Use `body-md` for standard utility. It should be clean, legible, and unadorned.
- **Data & Labels (Space Grotesk / Monospace):** All technical data, timestamps, and numbers must use `label-md`. This reinforces the "utilitarian" aspect of the system, making the interface feel like a precision instrument.
- **Hierarchy:** A `display-lg` header should sit immediately adjacent to a `body-sm` label. This "Extreme-Small/Extreme-Large" pairing is a signature of high-end editorial design.

---

## 4. Elevation & Depth: The Hard Offset
In this system, "Elevation" is a physical displacement, not a light-source simulation.

- **The Hard Offset Shadow:** We prohibit soft, ambient shadows. To elevate an element (like a primary card or button), use a hard-edged shadow: `4px 4px 0px 0px #000000`. This creates a "sticker" effect that feels tactile and modern.
- **The Layering Principle:** Use the `xl` (3rem) and `lg` (2rem) roundedness scale on containers, but wrap them in a `4px` `primary` (#000000) border. This juxtaposition—the friendly Apple curve vs. the aggressive industrial border—is the core tension of the system.
- **The "Ghost Border" Fallback:** For secondary elements where a `4px` black border is too heavy, use the `outline` token (#777777) but strictly at `2px` width. Never drop to `1px`.

---

## 5. Components: Industrial Primitives

- **Buttons**:
  - **Primary**: `surface_container_lowest` background, `4px` black border, `4px` hard black shadow, `headline-sm` centered text. On press, the shadow should disappear (`0px 0px`) and the button should shift `4px` down and right to simulate a physical click.
  - **Secondary**: Identical to primary but with no shadow.
- **Cards**: Forbid the use of divider lines. Separate content using `spacing-6` (2rem) of vertical white space or by placing content in a `surface_container_highest` nested box.
- **Input Fields**: Must use a `2px` border (`outline`). When focused, the border increases to `4px` `primary` (#000000) with a `label-md` floating label in `primary_fixed` (Red).
- **Chips**: Use `full` roundedness (capsule) but with a `2px` black border. This creates a "technical tag" look.
- **Progress Bars**: High-contrast. Use `primary_fixed` (Red) for the fill and `surface_container_highest` (#e2e2e2) for the track. No rounded ends on the fill—keep it sharp and utilitarian.

---

## 6. Do’s and Don’ts

### Do:
- **Embrace White Space:** Use `spacing-12` and `spacing-16` to separate major sections. The high-contrast elements need room to breathe.
- **Use Monospace for Numbers:** Any dynamic value (prices, counts, IDs) should be in monospace to feel like "live data."
- **Align to a Hard Grid:** Even if the layout is asymmetrical, ensure all elements align to a strict 8px or 4px baseline.

### Don't:
- **No Glassmorphism:** Never use backdrop-blur or transparency. Every surface must be 100% opaque.
- **No 1px Lines:** If a border is worth having, it is worth seeing. Minimum border width is `2px`.
- **No Centered Body Text:** Keep all utilitarian text left-aligned to maintain the "technical document" feel. Only headers may occasionally be centered for editorial impact.
- **No Soft Grays:** If you need to de-emphasize something, use a smaller font size or the monospace font, not a lighter gray color. High contrast must be maintained for accessibility and brand integrity.