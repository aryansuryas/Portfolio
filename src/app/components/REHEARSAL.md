# Rehearsal: Featured Work

## Reference measurements

Observed live at `https://www.wildyriftian.com/` in Chrome at 1365 × 850:

- The three work panels are part of a viewport-height sticky stage (`position: sticky`, `top: 0`, height: 850px).
- Panel content begins about 96px below the viewport top; successive panel starts are about 890px apart.
- The panels pin in sequence as the sticky stage advances; they are not ordinary independent grid cards.
- Computed opacity stayed at `1` and transform at `none` on the sampled card content while scrolling. No entrance distance, duration, easing, stagger, or parallax was observable.
- The requested entrance reveal is therefore an intentional addition, not a measured behavior copied from the reference.

## Implementation motion targets

- Keep the panel sequence sticky and reveal one panel as it enters the lower viewport.
- Fade and translate the panel content upward 24px over 800ms with `cubic-bezier(0.25, 0.8, 0.25, 1)`.
- Stagger title, metadata, image triptych, and description by 80ms.
- Trigger once when a panel is 15% intersecting, with a 12% bottom viewport inset.
- No scroll-scrubbed parallax. Reduced motion shows all content without transforms.

## Verification

Recorded the live scroll sequence with the installed Stageshow browser helper and checked panel bounds and reveal state in Chrome:

- Desktop (1365 × 850): all three work panels and all four profile panels revealed once and stayed fully inside the viewport from y=96 to y=834.
- Mobile (390 × 844): all four profile panels revealed once and stayed fully inside the viewport from y=88 to y=828; no horizontal overflow.
- Reduced motion: profile panels are not sticky, and content remains fully opaque with no transform.
- A non-empty temporary recording was produced and removed after the checks; no film artifact is kept in the repository.
