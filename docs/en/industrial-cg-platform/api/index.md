# API Reference

This section documents the C++ and Python API surface that Industrial CG Platform adds to or modifies in Blender and Cycles.

## Scope

The API reference covers extensions in five areas:

| Area | Description | Page |
| --- | --- | --- |
| **Cycles Kernel** | New kernel film fields, pass types, integrator extensions | [Cycles Kernel Extensions](/en/industrial-cg-platform/api/cycles-kernel) |
| **RNA Properties** | New ViewLayer, Light, and World properties exposed to the UI and Python | [RNA Properties](/en/industrial-cg-platform/api/rna-properties) |
| **Python Operators** | New Blender operators and the shared Qt runtime API | [Python Operators](/en/industrial-cg-platform/api/python-operators) |
| **bQt Integration** | Integration architecture, packaging layout rules, and advanced Qt-Blender design patterns | [bQt Usage Guide](/en/industrial-cg-platform/api/bqt-usage) |
| **Pass & AOV System** | New pass type registration, naming conventions, and readback architecture | [Pass & AOV System](/en/industrial-cg-platform/api/pass-system) |

## Conventions

- C++ API references include the source file path where the change lives.
- Python API references show both the `bpy` access path and the operator ID.
- All API surface in this branch is prefixed or namespaced to avoid collision with upstream Blender changes.

## Upstream Compatibility

These API additions are designed to be forward-compatible with Blender upstream:
- New RNA properties use standard Blender property registration patterns.
- New pass types extend the existing Cycles pass enumeration without breaking existing passes.
- The `PROP_SEARCH_KEEP_ORDER` flag is a minimal Blender core extension that does not affect existing search behavior.
