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

> Using the uploaded reference image, keep baby Blu's face and proportions exactly the
> same, but change his outfit to a **full onesie** (a full-body footed baby onesie /
> sleepsuit with long sleeves and long legs that cover his feet). **Subject:** Blu, a
> chubby, adorable 1.5-year-old baby boy with big round sparkling blue eyes, a small tuft
> of soft brown hair, rosy round cheeks, and a wide open-mouthed giggle, wearing a soft
> light-blue **full footed onesie**. Across the chest of the onesie, print the word
> **"blubabyshow"** in clean, rounded, lowercase white letters, neatly centred, correctly
> spelled and clearly legible, gently following the curve of his tummy. Only his chubby
> hands and face are uncovered. **Action:** standing on both feet, arms open
> and reaching slightly up as if asking to be picked up, mid-laugh, full of joy.
> **Environment:** none — floating on a fully transparent background. **Composition &
> camera:** full body, centred, head-to-toe in frame with generous padding, eye-level,
> gentle 3/4 angle facing the camera, 50mm lens look, chest clearly visible so the wordmark
> reads. **Lighting & mood:** soft top-left key light with a warm bounce and a subtle rim
> light, cheerful and tender. **Style:** high-fidelity 3D Pixar / Illumination-style
> character render, soft rounded forms, subsurface-scattering skin, big expressive eyes,
> smooth clean surfaces. **Avoid:** background, ground, cast shadow on floor, props,
> misspelled or garbled chest text, any text other than "blubabyshow" on the chest,
> watermark logos, extra limbs, cropped feet, harsh shadows.
>
> *Tip: if the chest text comes out garbled, generate Blu plain first, then use an NB2
> conversational edit — "add the word 'blubabyshow' in clean lowercase white letters across
> the chest of the onesie, keep everything else the same."*

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

A premium **app-icon-quality** mark built from **Blu's face** that must stay crisp and
readable at **32×32px**. Rounded-square badge (reads better and feels more "brand" than a
thin ring at small sizes), bold shapes, few details, strong contrast — the kind of icon
that would sit proudly on a phone home screen next to Bluey and Cocomelon.

**Reference to upload:** `blu_blubabyshow_v3.png` (use the head only)

> Using the uploaded reference image for Blu's face, design a polished, premium mascot
> **app icon**. **Subject:** a big, bold, friendly close-up of baby Blu's face — large
> round sparkling blue eyes with a bright catch-light, his signature little curl of brown
> hair, rosy cheeks and a warm happy smile — filling most of a **rounded-square badge**
> with a soft sky-blue gradient (top `#8ecbfb` → bottom `#57b0f0`) and a subtle inner
> highlight for gentle glossy depth. Add two tiny soft-white clouds and a small warm-yellow
> sun peeking in a bottom corner as a subtle sky motif. **Action:** front-facing, looking
> straight at the viewer, joyful. **Environment:** the rounded-square badge fills the frame;
> everything outside the badge is fully transparent. **Composition & camera:** perfectly
> centred, front-on, symmetrical, oversized face for punchy small-size legibility, generous
> even margin inside the badge, flat icon framing. **Lighting & mood:** clean, even, softly
> glossy, iconic and premium. **Style:** modern kids-brand app-icon / sticker-logo — chunky
> rounded shapes, simplified stylised 3D, minimal fine detail, high contrast, crisp edges,
> vibrant. **Avoid:** body or shoulders, background outside the badge, tiny fussy details,
> muddy gradients, text or lettering, extra characters, harsh shadows, thin lines that
> vanish at 32px. Square 1:1, 512×512.

### More logo directions to try (A–F)

Generate a few, compare, pick a winner — then save the chosen one as `watermark.png`.
**Shared for all:** reference `blu_blubabyshow_v3.png` (head only); keep Blu's face on-model;
fully transparent outside the shape; bold + minimal so it survives **32×32px**; square 1:1,
512×512 (F is wide). Each starts with *"using the uploaded reference for Blu's face…"*.

**A · Glossy app icon** *(the current one — baseline)*
> …design a premium mascot app icon: a big friendly close-up of Blu's face filling a
> **rounded-square badge** with a soft sky-blue gradient (`#8ecbfb`→`#57b0f0`), subtle glossy
> inner highlight, and two tiny clouds + a small sun peeking in a corner. Front-facing,
> joyful, oversized face for small-size punch, even margin. Modern kids-brand app-icon style,
> chunky rounded shapes, high contrast. **Avoid:** body, text, background outside the badge,
> tiny details, muddy gradients, harsh shadows.

**B · Die-cut sticker badge**
> …design a **circular die-cut sticker** of Blu's face — glossy stylised 3D Blu head, big
> blue eyes, hair curl, rosy cheeks, warm smile, on a soft sky-blue circle with a **thick
> clean white sticker border** and a soft drop shadow, everything outside the white border
> transparent. Playful, tactile, sticker-pack feel. **Avoid:** body, text, square frame,
> fussy detail, harsh shadows.

**C · Peeking Blu** *(very kids-brand, playful)*
> …a rounded-square sky-blue badge where **Blu peeks up over the bottom edge** — only the top
> half of his face (eyes, hair curl, hands gripping the rim) visible, big curious eyes, as if
> peeking out to say hi. Cute, cheeky, memorable. Even margin, bold shapes. **Avoid:** full
> face centred, text, background outside the badge, tiny detail.

**D · Minimal flat emblem** *(best pure favicon — crispest at 16–32px)*
> …a **super-minimal flat emblem** of Blu's head, reduced to simple geometric shapes and just
> 3–4 flat colours (sky-blue face, brown hair curl, white eyes, dark pupils) — no gradients,
> no 3D, clean vector logo, thick forms, maximum legibility at tiny sizes. Centred, generous
> padding. **Avoid:** 3D shading, gradients, thin lines, text, realistic detail.

**E · Monogram mark**
> …a modern **letter-mark**: a chunky rounded lowercase **"b"** in Blu-blue where the round
> bowl of the "b" doubles as Blu's face (small blue eyes + hair-curl + smile inside the
> counter). Clever, clean, scalable brand mark. Centred, bold, high contrast. **Avoid:**
> full character body, extra letters, thin strokes, busy detail.

**F · Wordmark lockup** *(wide — for `og:image` / header, not the 32px favicon)*
> …a **horizontal logo lockup**: the Blu-face badge (variant A) on the left, and to its right
> a chunky, rounded, playful **"Blu Baby Show"** wordmark in deep navy-blue (`#2b2c41`) with a
> cheerful sky-blue accent. Balanced, clean, transparent background. **Style:** friendly
> kids-brand logo. **Avoid:** clutter, misspelling, harsh shadows. **Aspect ratio 1200×630.**

I can wire the winner in as `watermark.png` (favicon + share image) the moment you drop it in.

---

## `blu_book.png` — Blu with the colouring book  (Shop section)

Not wired up yet — the Shop section currently reuses `blu.png`. Drop this file in and I'll
point the Shop `<img>` at it (one-line change; tell me to do it).

**Reference to upload:** `blu_blubabyshow_v3.png`

> Using the uploaded reference image, keep baby Blu's face and proportions exactly the
> same, but change his outfit to a **full onesie** (full-body footed baby sleepsuit, long
> sleeves and legs). **Subject:** Blu, the chubby 1.5-year-old baby boy with big round
> sparkling blue eyes, small brown hair tuft and rosy cheeks, wearing a soft light-blue
> **full footed onesie** with the word **"blubabyshow"** printed in clean lowercase white
> letters across the chest (correctly spelled, legible). He is holding a chunky, colourful
> children's
> **colouring book** and a fat crayon. **Action:** proud, delighted show-and-tell pose —
> holding the colouring book up toward the viewer with both hands, big happy grin, as if
> saying "look what I made!". **Environment:** none — floating on a fully transparent
> background. **Composition & camera:** full body, centred, head-to-toe with generous
> padding, eye-level, gentle 3/4 angle, 50mm look, the book cover clearly facing camera.
> **Lighting & mood:** soft top-left key light with warm bounce and subtle rim light,
> cheerful and proud. **Style:** high-fidelity 3D Pixar / Illumination-style character
> render, soft rounded forms, subsurface-scattering skin, big expressive eyes, smooth clean
> surfaces. **Avoid:** background, ground shadow, misspelled or garbled text (only
> "blubabyshow" on the chest, no readable text on the book cover), watermark logos, extra
> limbs, cropped feet, harsh shadows.

---

## `family_hero.png` — the whole family together  (future hero banner)

A **wide scene**, not a transparent cutout — the five characters together in Blu's sunny
world, for a future full-bleed hero banner. Not wired up yet.

**References to upload (all in one session):** `blu_blubabyshow_v3.png`, `mom_v1_01.png`,
`dad_v1_01.png`, `puppy_v1_01.png`, `sister_v1_01.png` — NB2 holds up to 5 characters, so
keep every face on-model from its sheet.

> Using the five uploaded reference images, keep each character's face, proportions and
> outfit identical to their sheet. **Subject:** the whole Blu Baby Show family together —
> baby **Blu** (light-blue **full footed onesie** with "blubabyshow" on the chest), **Mum** (coral top,
> blue jeans, warm smile), **Dad** (grey t-shirt, blue jeans, light stubble, easy grin),
> the chubby **Dalmatian puppy**, and the **newborn baby sister** swaddled in her pink
> heart blanket cradled in Mum's arms. **Action:** a warm, playful family moment outdoors —
> Dad crouching with an arm around Blu, Blu mid-giggle reaching toward the puppy who bounds
> in tongue-out, Mum beside them cradling the swaddled baby, everyone happy and connected.
> **Environment:** a sunny grassy meadow with a few soft rolling green hills, bright
> cerulean-blue sky, two or three fluffy white clouds and a warm cheerful sun — the
> "Bluey's sunny world" look. **Composition & camera:** wide 16:9 landscape, group framed
> centre with headroom and open sky above for a headline overlay, eye-level, slight
> wide-angle, everyone full-body and clearly separated. **Lighting & mood:** warm golden
> daylight, soft shadows, joyful and heart-warming. **Style:** high-fidelity 3D Pixar /
> Illumination-style render, soft rounded forms, subsurface-scattering skin, big expressive
> eyes, vibrant and clean. **Avoid:** text, watermark, extra people, cluttered background,
> harsh shadows, distorted or duplicated faces, extra limbs. **Aspect ratio 16:9, 2K.**
>
> *Tip: if any face drifts, fix it with an NB2 edit — "keep the scene, make [character]'s
> face match the uploaded reference for that character."*

---

## Flat-2D variant (only if you want a *fully* Bluey look, no 3D)

Replace the **Style** line in any prompt above with:

> **Style:** flat 2D vector cartoon, bold clean outlines, simple cel shading, minimal
> gradients, Bluey / Peppa-style children's animation, flat solid colours.

Keep everything else — reference upload, subject, action, transparent background,
exclusions, filename, export specs — the same.
