# Python Operators

This page documents the Python operators and the shared Qt runtime API that Industrial CG Platform adds to Blender.

## Blender Operators

### `wm.blender_vfx_viewlayer_manager_show`

| Property | Value |
| --- | --- |
| **Operator ID** | `wm.blender_vfx_viewlayer_manager_show` |
| **Label** | `ViewLayer Manager` |
| **Description** | Open or bring to front the ViewLayer Manager window |
| **Category** | Window Manager |

```python
bpy.ops.wm.blender_vfx_viewlayer_manager_show()
```

This operator:

1. Enables the `blender_vfx_qt_runtime` system extension for the current session (if not already enabled).
2. Enables the `blender_vfx_viewlayer_manager` system extension for the current session (if not already enabled).
3. Opens the ViewLayer Manager Qt window, or brings it to front if already open.

#### Registration

The operator is registered in:
```
scripts/startup/bl_operators/blender_vfx_viewlayer_manager.py
```

The topbar launcher button is added in:
```
scripts/startup/bl_ui/space_topbar.py
```

## Shared Qt Runtime API

The shared Qt runtime wrapper module at `scripts/modules/blender_vfx_qt` provides the following public API:

### `blender_vfx_qt.ensure_runtime()`

Ensures the BQt Qt runtime is available for the current session.

```python
from blender_vfx_qt import ensure_runtime

ensure_runtime()  # Enables the runtime extension and imports PySide6
```

**Behavior:**
- Enables the `blender_vfx_qt_runtime` system extension if not already enabled.
- Installs bundled wheels (BQt, PySide6, etc.) into the session's Python path.
- Sets safe-mode environment variables: `BQT_DISABLE_WRAP=1`, `BQT_AUTO_ADD=0`, etc.
- Only runs the setup once per session; subsequent calls are no-ops.

### `blender_vfx_qt.present_window(widget)`

Presents a Qt widget by showing it, raising it to the front, and activating its window focus.

```python
from blender_vfx_qt import present_window

# widget is an instantiated QWidget
present_window(my_window_instance)
```

**Parameters:**
- `widget` 鈥?A `QWidget` instance to display.

**Behavior:**
- Calls `.show()` on the widget.
- Calls `.raise_()` on the widget to bring it to the foreground.
- Calls `.activateWindow()` to grab keyboard and mouse focus.
- Returns the widget instance.

### `blender_vfx_qt.show_unique_window(cache_ref, factory)`

Creates or shows a singleton Qt window, using a caching dictionary and a factory function to ensure only a single instance of the window is active.

```python
from blender_vfx_qt import show_unique_window
from blender_vfx_viewlayer_manager.window import ViewLayerManagerWindow

_window_cache = {"value": None}

def factory():
    window = ViewLayerManagerWindow()
    return window

show_unique_window(_window_cache, factory)
```

**Parameters:**
- `cache_ref` 鈥?A dictionary (e.g. `{"value": None}`) used to store the active window reference.
- `factory` 鈥?A callable (function or lambda) that takes no arguments and returns a newly instantiated `QWidget` subclass.

**Behavior:**
- Checks if the cached window exists and is alive (using `qt_window_is_alive(widget)`).
- If it is alive, calls `present_window()` on the cached instance to bring it to the foreground.
- If it is not alive (or has been closed/destroyed), invokes the `factory` function to instantiate a new window, caches the instance in `cache_ref["value"]`, and calls `present_window()` on the new instance.
- Returns the displayed window instance.

### `blender_vfx_qt.qt_window_is_alive(widget)`

Checks if a Qt widget instance is currently instantiated and has not been garbage-collected or destroyed at the C++ level.

```python
from blender_vfx_qt import qt_window_is_alive

if qt_window_is_alive(my_window):
    print("Window is active and rendering!")
```

**Parameters:**
- `widget` 鈥?A `QWidget` instance (or `None`).

**Behavior:**
- Returns `False` if `widget` is `None`.
- Attempts to access the widget's `objectName()`.
- Catches any `RuntimeError` raised by PySide/PyQt when interacting with a deleted C++ object, returning `False` if caught.
- Returns `True` if the widget is alive and healthy.

## Bundled Runtime Stack

The Qt runtime is provided by these bundled wheels:

| Package | Version | License |
| --- | --- | --- |
| `bqt` | 2.2.0 | MIT |
| `blender-qt-stylesheet` | 0.0.3 | MIT |
| `QtPy` | 2.4.3 | MIT |
| `packaging` | 26.2 | Apache-2.0 / BSD-2 |
| `PySide6` | 6.11.0 | LGPL-3.0 |
| `PySide6_Essentials` | 6.11.0 | LGPL-3.0 |
| `PySide6_Addons` | 6.11.0 | LGPL-3.0 |
| `shiboken6` | 6.11.0 | LGPL-3.0 |

## Source Files

| File | Purpose |
| --- | --- |
| `scripts/startup/bl_operators/blender_vfx_viewlayer_manager.py` | Operator registration and bridge logic |
| `scripts/startup/bl_ui/space_topbar.py` | Topbar launcher button |
| `scripts/modules/blender_vfx_qt/` | Shared Qt runtime wrapper module |
| `release/extensions/system/blender_vfx_qt_runtime/` | Runtime extension with bundled wheels |
| `release/extensions/system/blender_vfx_viewlayer_manager/` | Manager extension source |
