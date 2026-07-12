# Character Image Prompts — blubabyshow.com  ·  Nano Banana 2

Prompts for the character cutouts the homepage loads from `/public/characters/`.
Written for **Nano Banana 2** (Gemini 3.1 Flash Image) — natural-language,
art-director-brief style. Generate each, save with the **exact same filename**
into this folder, and the site picks it up (no code change).

## How to run these

1. **Upload the reference sheet** named at the top of each prompt (from the main repo:
   `blubabyshow/character/finalcharacters/…`). NB2 holds character identity from an
   uploaded reference — this is what keeps every asset on-model.
2. Paste the prompt. Each one already tells NB2 *"using the uploaded reference image,
   keep the face / proportions / outfit identical."*
3. **Background:** every prompt asks for a **transparent background**. If your export
   still has one, cut it out — the site applies its own CSS drop-shadow, so any baked-in
   background or ground shadow will look wrong on the coloured sections.
4. **Export:** square 1:1, generate at **2K** (retina-safe; the hero displays up to 540px).
   PNG-24 with alpha.

**Prompt anatomy used below** (NB2 responds best to this order, as prose):
Subject → Action/state → Environment → Composition & camera → Lighting & mood → Style → Exclusions.

**Style line reused in every prompt:** *"high-fidelity 3D Pixar / Illumination-style
character render, soft rounded forms, subsurface-scattering skin, big expressive eyes,
smooth clean surfaces."* (The UI is Bluey-flat; the characters stay Pixar-3D and pop
against it. Want fully-flat Bluey art instead? See the variant at the bottom.)

---

## `blu.png` — Blu, the star ⭐  (hero · shop · closing · family)

**Reference to upload:** `blu_blubabyshow_v3.png`

> Using the uploaded reference image, keep baby Blu's face, proportions and outfit
> exactly the same. **Subject:** Blu, a chubby, adorable 1.5-year-old baby boy with big
> round sparkling blue eyes, a small tuft of soft brown hair, rosy round cheeks, and a
> wide open-mouthed giggle, wearing his light-blue short-sleeve onesie, with bare hands
> and feet. **Action:** standing on both feet, arms open and reaching slightly up as if
> asking to be picked up, mid-laugh, full of joy. **Environment:** none — floating on a
> fully transparent background. **Composition & camera:** full body, centred, head-to-toe
> in frame with generous padding, eye-level, gentle 3/4 angle facing the camera, 50mm
> lens look. **Lighting & mood:** soft top-left key light with a warm bounce and a subtle
> rim light, cheerful and tender. **Style:** high-fidelity 3D Pixar / Illumination-style
> character render, soft rounded forms, subsurface-scattering skin, big expressive eyes,
> smooth clean surfaces. **Avoid:** background, ground, cast shadow on floor, props, text,
> watermark, extra limbs, cropped feet, harsh shadows.

---

## `mom.png` — Mum, tired & tender  (newsletter card · family)

**Reference to upload:** `mom_v1_01.png`

> Using the uploaded reference image, keep Mum's face, hair and outfit identical.
> **Subject:** Mum, a warm young mother with warm tan skin, dark-brown wavy
> shoulder-length hair and kind gentle eyes, wearing a coral-pink long-sleeve top and
> blue jeans (no bindi — keep culturally universal). **Action:** standing calmly, one hand
> resting softly over her heart, a soft tired-tender loving smile. **Environment:** none —
> transparent background. **Composition & camera:** full body, centred, eye-level,
> slight 3/4 angle, 50mm look, torso and face clearly readable (she also appears in a
> circular crop). **Lighting & mood:** soft directional key light, warm and reassuring.
> **Style:** high-fidelity 3D Pixar / Illumination-style character render, soft rounded
> forms, subsurface-scattering skin, big expressive eyes, smooth clean surfaces.
> **Avoid:** background, ground shadow, props, text, watermark, extra fingers, harsh shadows.

---

## `dad.png` — Dad, shows up  (family)

**Reference to upload:** `dad_v1_01.png`

> Using the uploaded reference image, keep Dad's face, hair and outfit identical.
> **Subject:** Dad, a warm-hearted young father with short brown hair, light stubble,
> and an easy genuine grin, wearing a plain grey crew-neck t-shirt, dark-blue jeans and
> white sneakers. **Action:** standing relaxed and confident, one thumb hooked into a
> pocket, warm "tired-but-shows-up" energy. **Environment:** none — transparent
> background. **Composition & camera:** full body, centred, head-to-toe, eye-level,
> slight 3/4 angle, 50mm look. **Lighting & mood:** soft top-left key light with gentle
> rim light, friendly and grounded. **Style:** high-fidelity 3D Pixar / Illumination-style
> character render, soft rounded forms, subsurface-scattering skin, big expressive eyes,
> smooth clean surfaces. **Avoid:** background, ground shadow, props, text, watermark,
> extra limbs, cropped feet, harsh shadows.

---

## `puppy.png` — Puppy, the sidekick  (hero peek · learn · family)

**Reference to upload:** `puppy_v1_01.png`

> Using the uploaded reference image, keep the puppy's markings and face identical.
> **Subject:** Blu's cute chubby cartoon **Dalmatian** puppy — white fur with soft black
> spots, floppy ears, a little black button nose, pink inner-ear and collar accents, and
> big friendly shining dark eyes. **Action:** sitting up alert and happy, tongue out, tail
> mid-wag, playful and huggable. **Environment:** none — transparent background.
> **Composition & camera:** full body, centred, eye-level, slight 3/4 angle, 50mm look.
> **Lighting & mood:** soft top-left key light with gentle rim light, joyful and bouncy.
> **Style:** high-fidelity 3D Pixar / Illumination-style character render, soft rounded
> forms, subsurface-scattering fur-soft surfaces, big expressive eyes, smooth clean
> surfaces. **Avoid:** background, ground shadow, leash, text, watermark, extra legs,
> harsh shadows.

---

## `sister.png` — baby sister  (family)

**Reference to upload:** `sister_v1_01.png`
> ⚠️ Heads-up: this reference is a **swaddled newborn baby girl**, but the site's family
> card currently labels Sister *"the ringleader."* Either regenerate to match the sheet
> (prompt below) **or** tell me and I'll change the site copy/tag to fit a newborn.

> Using the uploaded reference image, keep the baby's face and swaddle identical.
> **Subject:** Blu's newborn baby sister, a tiny infant with rosy round cheeks, a small
> tuft of soft brown hair and big gentle eyes, snugly wrapped in a soft pink
> heart-patterned swaddle blanket. **Action:** cradled and peaceful, a sweet content
> expression, one tiny hand peeking out. **Environment:** none — transparent background.
> **Composition & camera:** full body (swaddled bundle), centred, eye-level, soft 3/4
> angle, 50mm look. **Lighting & mood:** soft warm key light, tender and cosy.
> **Style:** high-fidelity 3D Pixar / Illumination-style character render, soft rounded
> forms, subsurface-scattering skin, big expressive eyes, smooth clean surfaces.
> **Avoid:** background, ground shadow, crib, props, text, watermark, harsh shadows.

---

## `watermark.png` — logo mark / favicon  (browser tab + social share)

A tiny emblem built from **Blu's face** that must stay legible at **32×32px** — so keep it
bold, simple, few details, strong contrast.

**Reference to upload:** `blu_blubabyshow_v3.png` (use the head only)

> Using the uploaded reference image for Blu's face, design a clean, minimal circular logo
> emblem. **Subject:** baby Blu's face only — round friendly face, big blue eyes, small
> brown hair tuft, rosy cheeks, warm closed smile — centred inside a soft sky-blue
> (#57b0f0) rounded circle badge with a thin white ring around it. **Action:** front-facing,
> looking straight at the viewer, happy. **Environment:** the coloured circle badge fills
> the frame; everything outside the circle is transparent. **Composition & camera:**
> perfectly centred, front-on, symmetrical, generous margin inside the circle, flat
> icon-style framing. **Lighting & mood:** even flat lighting, cheerful and iconic.
> **Style:** simplified, slightly flattened 3D / clean vector-friendly mascot logo — bold
> shapes, minimal detail, high contrast, reads clearly at very small sizes. **Avoid:**
> body, background outside the circle, fine detail, gradients that muddy at small size,
> text, extra characters, busy shading. Square 1:1, 512×512.

---

## Optional extras (not required by current code)

- **`blu_book.png`** — Blu holding a colouring book + chunky crayon, proud show-and-tell
  pose, for the Shop section (currently reuses `blu.png`). Same reference + Blu spec,
  swap the **Action** line for the book pose.
- **Family group shot** — all five together on grass, for a future hero banner: upload all
  five reference sheets in one session (NB2 holds up to 5 characters) and prompt the group.

---

## Flat-2D variant (only if you want a *fully* Bluey look, no 3D)

Replace the **Style** line in any prompt above with:

> **Style:** flat 2D vector cartoon, bold clean outlines, simple cel shading, minimal
> gradients, Bluey / Peppa-style children's animation, flat solid colours.

Keep everything else — reference upload, subject, action, transparent background,
exclusions, filename, export specs — the same.
