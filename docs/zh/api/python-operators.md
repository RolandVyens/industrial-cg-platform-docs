# Python 操作器

本页记录了 Industrial CG Platform 添加到 Blender 的 Python 操作器和共享 Qt 运行时 API。

## Blender 操作器

### `wm.blender_vfx_viewlayer_manager_show`

| 属性 | 值 |
| --- | --- |
| **操作器 ID** | `wm.blender_vfx_viewlayer_manager_show` |
| **标签** | `ViewLayer Manager` |
| **描述** | 打开或将 ViewLayer 管理器窗口置于最前 |

此操作器：
1. 为当前会话启用 `blender_vfx_qt_runtime` 系统扩展。
2. 为当前会话启用 `blender_vfx_viewlayer_manager` 系统扩展。
3. 打开 ViewLayer 管理器 Qt 窗口，如果已打开则将其置于最前。

## 共享 Qt 运行时 API

位于 `scripts/modules/blender_vfx_qt` 的共享 Qt 运行时包装器模块提供以下公共 API：

### `blender_vfx_qt.ensure_runtime()`

确保当前会话可使用 BQt Qt 运行时。

### `blender_vfx_qt.present_window(widget)`

显示并唤起 Qt 窗口，使其置于最前并获取键盘/鼠标焦点。

```python
from blender_vfx_qt import present_window

# widget 是一个已实例化的 QWidget 对象
present_window(my_window_instance)
```

**参数：**
- `widget` — 要显示的 `QWidget` 实例。

**行为：**
- 调用该控件的 `.show()`。
- 调用该控件的 `.raise_()` 以确保窗口移至最前端。
- 调用 `.activateWindow()` 以强制捕获操作系统的键盘与鼠标焦点。
- 返回窗口实例对象。

### `blender_vfx_qt.show_unique_window(cache_ref, factory)`

使用字典缓存与工厂函数创建或显示单例 Qt 窗口，以确保在 Blender 运行会话中只有一个窗口实例处于活动状态。

```python
from blender_vfx_qt import show_unique_window
from blender_vfx_viewlayer_manager.window import ViewLayerManagerWindow

# 定义一个持久化的字典缓存引用
_window_cache = {"value": None}

def factory():
    window = ViewLayerManagerWindow()
    return window

show_unique_window(_window_cache, factory)
```

**参数：**
- `cache_ref` — 用于缓存活动窗口引用的字典（形如 `{"value": None}`）。
- `factory` — 一个不接受参数的可调用对象（如函数或 lambda），执行时返回一个新实例化的 `QWidget` 子类对象。

**行为：**
- 检查缓存中的窗口是否存在并且仍处于活动状态（通过 `qt_window_is_alive(widget)`）。
- 若窗口仍处于活动状态，直接对该缓存实例调用 `present_window()` 将其置于最前。
- 若窗口不存在或已被销毁，执行传入的 `factory` 工厂函数创建新窗口，将其引用存入 `cache_ref["value"]` 中，并调用 `present_window()` 进行渲染展示。
- 返回显示的窗口实例对象。

### `blender_vfx_qt.qt_window_is_alive(widget)`

检查一个 Qt 窗口实例当前是否已实例化，且在 C++ 层面没有被销毁或垃圾回收。

```python
from blender_vfx_qt import qt_window_is_alive

if qt_window_is_alive(my_window):
    print("窗口处于活动状态且正常渲染！")
```

**参数：**
- `widget` — `QWidget` 实例（或 `None`）。

**行为：**
- 若 `widget` 为 `None` 则返回 `False`。
- 尝试访问该控件的 `objectName()`。
- 捕获 PySide/PyQt 在交互已被销毁的底层 C++ 对象时抛出的 `RuntimeError`，若捕获到则返回 `False`。
- 若窗口处于存活状态则返回 `True`。
