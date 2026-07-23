---
title: "About the Project"
description: "Blender is already a strong creative tool, but VFX production often needs more than beautiful viewport results."
---
# About the Project

## Why This Exists

Blender is already a strong creative tool, but VFX production often needs more than beautiful viewport results.

A real shot pipeline needs render data that can travel cleanly into compositing, lighting adjustments that remain controllable per shot, and output behavior that makes sense for artists, TDs, and render farms.

Industrial CG Platform exists to push Blender further in that direction while staying close enough to upstream Blender that future maintenance remains practical.

## Roadmap

Planned VFX and production-focused directions include:

- indirect-light-only objects for more targeted lighting control
- collection and object-level material override workflows
- world environment fog behavior similar to `aiFog`, focused on direct-light use cases
- deeper documentation for shot-based rendering and compositing workflows

## Support / Sponsor

Industrial CG Platform is developed as production-focused open-source R&D.

If this project helps your studio, course, pipeline, or personal production work, sponsorship helps keep development moving faster. Sponsorship is especially helpful for funding features that are difficult to justify as small add-ons: render output behavior, deep data, Qt runtime packaging, light pass design, and pipeline-facing documentation.

- Support the creator on [Patreon](https://www.patreon.com/cw/RolandVyens)
- Support the creator on [Afdian (爱发电)](https://www.ifdian.net/a/mogubobi2)
- Star the repository and share it with Blender and VFX artists who need stronger production workflows

## Upstream Relationship

Industrial CG Platform is derived from Blender.
Blender remains the upstream foundation for the application, documentation ecosystem, and much of the development workflow.

- [blender.org](https://www.blender.org)
- [Blender Manual](https://docs.blender.org/manual/en/latest/index.html)
- [Blender Developer Portal](https://developer.blender.org/docs/)

## Credits

Industrial CG Platform is authored and directed by Roland Vyens, with development, documentation, packaging, and research work accelerated through an AI-assisted workflow using Codex and Claude.

These tools are part of the working process behind the project, but the platform direction, feature choices, release decisions, and fork maintenance remain project-owned.

The project also gratefully acknowledges the MoonRay project, whose public implementation ideas helped inform some of the rendering-side approaches explored in this branch.

## License

Industrial CG Platform follows Blender's GPL licensing model for the core application, and it also ships a bundled bQt runtime extension with additional third-party components.

- The Blender-derived application code remains under the Blender License (GNU GPL v3 or later), with individual files sometimes using a different but compatible license.
- The bundled Qt runtime extension includes third-party packages such as `bqt`, `QtPy`, `PySide6`, `PySide6_Essentials`, `PySide6_Addons`, `shiboken6`, `packaging`, and `blender-qt-stylesheet`.
- Those bundled components carry their own upstream licenses, including MPL-2.0, MIT, Apache-2.0, BSD-2-Clause, LGPL-3.0-only, GPL-2.0-only, and GPL-3.0-only.

For Blender's core license details, see [blender.org/about/license](https://www.blender.org/about/license).
