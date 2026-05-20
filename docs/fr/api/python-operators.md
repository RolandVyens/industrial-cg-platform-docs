# Opérateurs Python

Cette page documente les opérateurs Python et l'API d'exécution Qt partagée qu'Industrial CG Platform ajoute à Blender.

## Opérateurs Blender

### `wm.blender_vfx_viewlayer_manager_show`

| Propriété | Valeur |
| --- | --- |
| **ID de l'opérateur** | `wm.blender_vfx_viewlayer_manager_show` |
| **Label** | `ViewLayer Manager` |
| **Description** | Ouvrir ou mettre au premier plan la fenêtre ViewLayer Manager |

Cet opérateur :
1. Active l'extension système `blender_vfx_qt_runtime` pour la session en cours.
2. Active l'extension système `blender_vfx_viewlayer_manager` pour la session en cours.
3. Ouvre la fenêtre Qt ViewLayer Manager.

## API d'exécution Qt partagée

Le module d'emballage d'exécution Qt partagé à `scripts/modules/blender_vfx_qt` fournit l'API publique suivante :

### `blender_vfx_qt.ensure_runtime()`

S'assure que le runtime BQt Qt est disponible pour la session en cours.

### `blender_vfx_qt.present_window(widget)`

Présente un widget Qt en l'affichant, en le plaçant au premier plan et en activant la focalisation de sa fenêtre.

```python
from blender_vfx_qt import present_window

# widget est une instance de QWidget déjà créée
present_window(my_window_instance)
```

**Paramètres :**
- `widget` — Une instance de `QWidget` à afficher.

**Comportement :**
- Appelle `.show()` sur le widget.
- Appelle `.raise_()` sur le widget pour le ramener au premier plan.
- Appelle `.activateWindow()` pour capturer la focalisation du clavier et de la souris.
- Renvoie l'instance de widget.

### `blender_vfx_qt.show_unique_window(cache_ref, factory)`

Crée ou affiche une fenêtre Qt singleton, en utilisant un dictionnaire de cache et une fonction d'usine (factory) pour garantir qu'une seule instance de la fenêtre soit active à la fois.

```python
from blender_vfx_qt import show_unique_window
from blender_vfx_viewlayer_manager.window import ViewLayerManagerWindow

# Définition d'une référence persistante de cache de fenêtre
_window_cache = {"value": None}

def factory():
    window = ViewLayerManagerWindow()
    return window

show_unique_window(_window_cache, factory)
```

**Paramètres :**
- `cache_ref` — Un dictionnaire (ex. `{"value": None}`) utilisé pour stocker la référence de la fenêtre active.
- `factory` — Un appelable (fonction ou lambda) qui ne prend aucun argument et renvoie une instance d'une sous-classe de `QWidget`.

**Comportement :**
- Vérifie si la fenêtre mise en cache existe et est active (en utilisant `qt_window_is_alive(widget)`).
- Si elle est active, appelle `present_window()` sur l'instance mise en cache pour la ramener au premier plan.
- Si elle n'est pas active (ou si elle a été fermée/détruite), appelle la fonction `factory` pour instancier une nouvelle fenêtre, enregistre la référence dans `cache_ref["value"]` et appelle `present_window()` sur la nouvelle instance.
- Renvoie l'instance de fenêtre affichée.

### `blender_vfx_qt.qt_window_is_alive(widget)`

Vérifie si une instance de widget Qt est actuellement instanciée et n'a pas été supprimée par le ramasse-miettes (garbage collector) ou détruite au niveau C++.

```python
from blender_vfx_qt import qt_window_is_alive

if qt_window_is_alive(my_window):
    print("La fenêtre est active et en cours d'affichage !")
```

**Paramètres :**
- `widget` — Une instance de `QWidget` (ou `None`).

**Comportement :**
- Renvoie `False` si `widget` est `None`.
- Tente d'accéder à la propriété `objectName()` du widget.
- Intercepte toute exception `RuntimeError` levée par PySide/PyQt lors de l'interaction avec un objet C++ supprimé, renvoyant `False` si elle est interceptée.
- Renvoie `True` si le widget est actif et sain.
