# Character Image Prompts — blubabyshow.com

Image-generation prompts for the character cutouts the homepage loads from
`/public/characters/`. Generate each, drop it in with the **exact same filename**,
and the site picks it up — no code changes needed.

- **Style:** 3D Pixar / Illumination-quality render (the brand's moat). The UI is
  Bluey-flat; the characters stay Pixar-3D and pop against the flat sections. If you
  ever want a fully-Bluey flat look instead, see *"Flat 2D variant"* at the bottom.
- **Background:** **transparent** (PNG alpha). If your tool can't do true alpha,
  render on flat pure-white `#FFFFFF` (or chroma green) and cut it out afterward.
- **Consistency:** feed the canonical sheet from the main repo as a character /
  image reference so faces stay identical across every asset:
  - Blu → `character/finalcharacters/blu_blubabyshow_v3.png`
  - Mom → `character/finalcharacters/mom_v1_01.png`
  - Dad → `character/finalcharacters/dad_v1_01.png`
  - Puppy / Sister → their sheets in `character/finalcharacters/`
- **Framing:** full body, centered, generous padding, feet not cropped. Character
  faces slightly toward camera, friendly. Soft top-left key light.
- **Export:** square 1:1, **1024×1024 minimum** (1536 preferred for retina), PNG-24
  with alpha. Keep the character within ~85% of the frame so the CSS drop-shadow has room.

Shared style suffix (append to every prompt below):

> 3D Pixar-quality character render, soft rounded forms, subsurface-scatter skin,
> big expressive eyes, gentle studio lighting, subtle rim light, no harsh shadows,
> full body, centered, isolated on a transparent background, no ground plane, no text,
> no watermark, ultra-clean edges. Square 1:1, high resolution.

---

## `blu.png` — Blu, the star  ⭐ (hero + shop + closing + family)

Used biggest (hero, 540px) and reused everywhere, so make this the money shot:
a joyful, arms-slightly-open, mid-giggle full-body pose.

> **Blu**, a chubby, adorable 1.5-year-old baby boy with soft brown curly hair, big
> soulful brown eyes, rosy round cheeks and a wide open-mouth giggle. Wearing a
> cheerful sky-blue romper / onesie. Standing full-body, arms open and slightly
> raised as if about to be picked up, tiny bare feet, joyful and warm. Face turned
> toward camera. *(+ shared style suffix)*

---

## `mom.png` — Mum, tired & tender (newsletter art + family)

Shown in a circular crop on the orange newsletter card, so keep the head-and-torso
centered and the pose calm/warm.

> **Mum**, a warm young mother with dark brown wavy shoulder-length hair and kind,
> gentle eyes, soft tired-tender smile. Wearing a simple cream cotton kurta / relaxed
> nightgown. **No bindi** (keep culturally universal). Standing full-body, one hand
> resting softly over her heart, relaxed and loving. *(+ shared style suffix)*

---

## `dad.png` — Dad, shows up (family)

> **Dad**, a warm-hearted young father with warm brown skin, a neat close-cropped
> beard and an easy, genuine grin. Wearing a plain black t-shirt and worn blue jeans.
> Standing full-body, relaxed confident posture, one thumb hooked in a pocket,
> "tired-but-shows-up" warmth. *(+ shared style suffix)*

---

## `puppy.png` — Puppy, the sidekick (hero peek + learn + family)

Reused large in the Learn section, so give it a cute, alert, playful stance.

> **Puppy**, Blu's cute cartoon sidekick — a small chubby round puppy with soft
> golden-cream fur, floppy ears, a little black button nose and big friendly shining
> eyes. Sitting up alert and happy, tongue out, tail mid-wag, playful and huggable.
> *(+ shared style suffix)*

---

## `sister.png` — Sister, the ringleader (family)

> **Sister**, Blu's spirited older sibling, a ~4-year-old girl with the same family
> look: brown curly hair in two little puffs, warm brown skin, big bright eyes and a
> cheeky confident grin. Wearing a bright sunny-yellow play dress. Standing full-body,
> hands on hips, playful ringleader energy. *(+ shared style suffix)*

---

## `watermark.png` — logo mark / favicon (browser tab + social share)

Not a full character — a tiny emblem that must read at **32×32px**. Keep it simple,
bold, high-contrast, few details.

> A simple, flat circular logo emblem of baby **Blu's face** — round friendly face,
> brown curly hair tuft, big brown eyes, rosy cheeks, warm smile — inside a soft
> **sky-blue** (#57b0f0) rounded circle badge with a thin white ring. Minimal, bold,
> centered, clean vector-style flat illustration. Must stay legible at very small
> sizes. Transparent background outside the circle. Square 1:1, 512×512.

---

## Optional — nice-to-haves (not required by current code)

- **`blu_book.png`** — Blu holding/leaning on a colouring book, for the Shop section
  (currently reuses `blu.png`). Same Blu spec, add: *holding a chunky crayon and a
  colouring book, proud show-and-tell pose.*
- **Family group shot** — all five together on the grass, for a future hero banner.

---

## Flat 2D variant (only if you want a *fully* Bluey look)

Swap the shared suffix for:

> Flat 2D vector cartoon, bold clean outlines, simple cel shading, minimal gradients,
> Bluey / Peppa-style children's animation, flat solid colours, isolated on a
> transparent background, no text. Square 1:1, high resolution.

Everything else (per-character descriptions, filenames, export specs) stays the same.
