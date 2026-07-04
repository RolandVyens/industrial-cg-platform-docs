# Op茅rateurs Python

Cette page documente les op茅rateurs Python et l'API d'ex茅cution Qt partag茅e qu'Industrial CG Platform ajoute 脿 Blender.

## Op茅rateurs Blender

### `wm.blender_vfx_viewlayer_manager_show`

| Propri茅t茅 | Valeur |
| --- | --- |
| **ID de l'op茅rateur** | `wm.blender_vfx_viewlayer_manager_show` |
| **Label** | `ViewLayer Manager` |
| **Description** | Ouvrir ou mettre au premier plan la fen锚tre ViewLayer Manager |

Cet op茅rateur :
1. Active l'extension syst猫me `blender_vfx_qt_runtime` pour la session en cours.
2. Active l'extension syst猫me `blender_vfx_viewlayer_manager` pour la session en cours.
3. Ouvre la fen锚tre Qt ViewLayer Manager.

## API d'ex茅cution Qt partag茅e

Le module d'emballage d'ex茅cution Qt partag茅 脿 `scripts/modules/blender_vfx_qt` fournit l'API publique suivante :

### `blender_vfx_qt.ensure_runtime()`

S'assure que le runtime BQt Qt est disponible pour la session en cours.

### `blender_vfx_qt.present_window(widget)`

Pr茅sente un widget Qt en l'affichant, en le pla莽ant au premier plan et en activant la focalisation de sa fen锚tre.

```python
from blender_vfx_qt import present_window

# widget est une instance de QWidget d茅j脿 cr茅茅e
present_window(my_window_instance)
```

**Param猫tres :**
- `widget` 鈥?Une instance de `QWidget` 脿 afficher.

**Comportement :**
- Appelle `.show()` sur le widget.
- Appelle `.raise_()` sur le widget pour le ramener au premier plan.
- Appelle `.activateWindow()` pour capturer la focalisation du clavier et de la souris.
- Renvoie l'instance de widget.

### `blender_vfx_qt.show_unique_window(cache_ref, factory)`

Cr茅e ou affiche une fen锚tre Qt singleton, en utilisant un dictionnaire de cache et une fonction d'usine (factory) pour garantir qu'une seule instance de la fen锚tre soit active 脿 la fois.

```python
from blender_vfx_qt import show_unique_window
from blender_vfx_viewlayer_manager.window import ViewLayerManagerWindow

# D茅finition d'une r茅f茅rence persistante de cache de fen锚tre
_window_cache = {"value": None}

def factory():
    window = ViewLayerManagerWindow()
    return window

show_unique_window(_window_cache, factory)
```

**Param猫tres :**
- `cache_ref` 鈥?Un dictionnaire (ex. `{"value": None}`) utilis茅 pour stocker la r茅f茅rence de la fen锚tre active.
- `factory` 鈥?Un appelable (fonction ou lambda) qui ne prend aucun argument et renvoie une instance d'une sous-classe de `QWidget`.

**Comportement :**
- V茅rifie si la fen锚tre mise en cache existe et est active (en utilisant `qt_window_is_alive(widget)`).
- Si elle est active, appelle `present_window()` sur l'instance mise en cache pour la ramener au premier plan.
- Si elle n'est pas active (ou si elle a 茅t茅 ferm茅e/d茅truite), appelle la fonction `factory` pour instancier une nouvelle fen锚tre, enregistre la r茅f茅rence dans `cache_ref["value"]` et appelle `present_window()` sur la nouvelle instance.
- Renvoie l'instance de fen锚tre affich茅e.

### `blender_vfx_qt.qt_window_is_alive(widget)`

V茅rifie si une instance de widget Qt est actuellement instanci茅e et n'a pas 茅t茅 supprim茅e par le ramasse-miettes (garbage collector) ou d茅truite au niveau C++.

```python
from blender_vfx_qt import qt_window_is_alive

if qt_window_is_alive(my_window):
    print("La fen锚tre est active et en cours d'affichage !")
```

**Param猫tres :**
- `widget` 鈥?Une instance de `QWidget` (ou `None`).

**Comportement :**
- Renvoie `False` si `widget` est `None`.
- Tente d'acc茅der 脿 la propri茅t茅 `objectName()` du widget.
- Intercepte toute exception `RuntimeError` lev茅e par PySide/PyQt lors de l'interaction avec un objet C++ supprim茅, renvoyant `False` si elle est intercept茅e.
- Renvoie `True` si le widget est actif et sain.
