# Blu — green-screen prompt (for clean cut-out)  ·  Nano Banana 2

Why this file: NB2's "transparent background" export bakes a grey **checkerboard** into
JPGs, which makes edges messy to remove. Generating Blu on a **solid flat green screen**
instead gives a clean, uniform background that keys out perfectly — sharp edges, no halo.

## How to use
1. **Upload the reference:** `blu_blubabyshow_v3.png` (from `blubabyshow/character/finalcharacters/`).
2. Paste the prompt below. Export as **PNG at 2K**, 1:1 square.
3. Remove the green afterwards — either:
   - the local Python step (`rembg`, U²-Net) — works even better on a clean green field, **or**
   - a simple chroma-key on green `#00B140`.
   Then drop the result in here as `blu.png`.

## Key rules that make the cut-out clean
- Background is one **flat, uniform chroma-green** (`#00B140`), edge to edge — no gradient,
  no vignette, no props.
- **No green anywhere on Blu** (his onesie is light-blue, so we're safe — never put green on him).
- **No cast shadow on the ground** and the character must **not touch any edge** (leave a margin
  all around), so the whole silhouette keys out cleanly.
- Even, soft lighting so there's no dark rim that traps green spill.

---

## `blu.png` — Blu, the star (green screen)

**Reference to upload:** `blu_blubabyshow_v3.png`

> Using the uploaded reference image, keep baby Blu's face and proportions exactly the
> same, but change his outfit to a **full onesie** (a full-body footed baby sleepsuit with
> long sleeves and long legs covering his feet). **Subject:** Blu, a chubby, adorable
> 1.5-year-old baby boy with big round sparkling blue eyes, a small tuft of soft brown hair,
> rosy round cheeks and a wide open-mouthed giggle, wearing a soft light-blue **full footed
> onesie**. Across the chest, print the word **"blubabyshow"** in clean, rounded, lowercase
> white letters, neatly centred, correctly spelled and clearly legible, following the curve
> of his tummy. Only his chubby hands and face are uncovered. **Action:** standing on both
> feet, arms open and reaching slightly up as if asking to be picked up, mid-laugh, full of
> joy. **Environment:** a completely flat, uniform **chroma-green screen background**
> (solid green `#00B140`), filling the entire frame edge to edge — a clean studio green
> screen, no gradient, no shadow on the floor, no props. **Composition & camera:** full body,
> centred, head-to-toe with generous even margin so Blu never touches the edges, eye-level,
> gentle 3/4 angle facing camera, 50mm lens look, chest clearly visible so the wordmark reads.
> **Lighting & mood:** soft, even, flat studio lighting with a gentle key from the top-left,
> no harsh shadows and no dark edge rim, cheerful and tender. **Style:** high-fidelity 3D
> Pixar / Illumination-style character render, soft rounded forms, subsurface-scattering skin,
> big expressive eyes, smooth clean surfaces. **Avoid:** any green on the character, cast
> shadow on the floor, gradient or textured background, character touching the frame edge,
> misspelled or garbled chest text, any text other than "blubabyshow", extra limbs, cropped
> feet, harsh shadows, dark outline/rim.

---

## Reuse for the other characters
Same recipe works for **mom / dad / puppy / sister / blu_book** — swap the Subject/Action to
that character (see `IMAGE_PROMPTS.md`) but keep the identical green-screen **Environment**,
**Composition** (margin, no edge contact), **Lighting** (flat, no rim) and the green-spill
**Avoid** list. Just make sure the character's outfit/fur has **no green** (all our cast is
green-safe). Tell me and I'll spin these into their own green-screen file too.
