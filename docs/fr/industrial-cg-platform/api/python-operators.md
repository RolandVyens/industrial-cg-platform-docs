# Opérateurs Python

Cette page documente les opérateurs Python et l'API d'exécution Qt partagée qu'Industrial CG Platform ajoute à Blender.

## Opérateurs Blender

### `wm.blender_vfx_viewlayer_manager_show`

| Propriété | Valeur |
| --- | --- |
| **ID de l'opérateur** | `wm.blender_vfx_viewlayer_manager_show` |
| **Libellé** | `ViewLayer Manager` |
| **Description** | Ouvrir ou mettre au premier plan la fenêtre du gestionnaire ViewLayer |
| **Catégorie** | Window Manager |

```python
bpy.ops.wm.blender_vfx_viewlayer_manager_show()
```

Cet opérateur :

1. Active l'extension système `blender_vfx_qt_runtime` pour la session en cours (si ce n'est pas déjà fait).
2. Active l'extension système `blender_vfx_viewlayer_manager` pour la session en cours (si ce n'est pas déjà fait).
3. Ouvre la fenêtre Qt du ViewLayer Manager, ou la met au premier plan si elle est déjà ouverte.

#### Enregistrement

L'opérateur est enregistré dans :
```
scripts/startup/bl_operators/blender_vfx_viewlayer_manager.py
```

Le bouton de lancement de la barre supérieure est ajouté dans :
```
scripts/startup/bl_ui/space_topbar.py
```

## API d'exécution Qt partagée

Le module d'emballage d'exécution Qt partagé situé dans `scripts/modules/blender_vfx_qt` fournit l'API publique suivante :

### `blender_vfx_qt.ensure_runtime()`

Garantit que l'exécution Qt de BQt est disponible pour la session en cours.

```python
from blender_vfx_qt import ensure_runtime

ensure_runtime()  # Active l'extension d'exécution et importe PySide6
```

**Comportement :**
- Active l'extension système `blender_vfx_qt_runtime` si elle n'est pas déjà activée.
- Installe les wheels regroupés (BQt, PySide6, etc.) dans le chemin Python de la session.
- Définit les variables d'environnement en mode sans échec : `BQT_DISABLE_WRAP=1`, `BQT_AUTO_ADD=0`, etc.
- N'exécute la configuration qu'une seule fois par session ; les appels suivants sont sans effet.

### `blender_vfx_qt.present_window(widget)`

Présente un widget Qt en l'affichant, en le mettant au premier plan et en activant le focus de sa fenêtre.

```python
from blender_vfx_qt import present_window

# widget est une instance de QWidget
present_window(my_window_instance)
```

**Paramètres :**
- `widget` — Une instance de `QWidget` à afficher.

**Comportement :**
- Appelle `.show()` sur le widget.
- Appelle `.raise_()` sur le widget pour le ramener au premier plan.
- Appelle `.activateWindow()` pour capter le focus du clavier et de la souris.
- Retourne l'instance du widget.

### `blender_vfx_qt.show_unique_window(cache_ref, factory)`

Crée ou affiche une fenêtre Qt singleton, en utilisant un dictionnaire de cache et une fonction d'usine pour s'assurer qu'une seule instance de la fenêtre est active.

```python
from blender_vfx_qt import show_unique_window
from blender_vfx_viewlayer_manager.window import ViewLayerManagerWindow

_window_cache = {"value": None}

def factory():
    window = ViewLayerManagerWindow()
    return window

show_unique_window(_window_cache, factory)
```

**Paramètres :**
- `cache_ref` — Un dictionnaire (par ex. `{"value": None}`) utilisé pour stocker la référence de la fenêtre active.
- `factory` — Un objet appelable (fonction ou lambda) qui ne prend aucun argument et retourne une sous-classe `QWidget` nouvellement instanciée.

**Comportement :**
- Vérifie si la fenêtre en cache existe et est active (en utilisant `qt_window_is_alive(widget)`).
- Si elle est active, appelle `present_window()` sur l'instance en cache pour la ramener au premier plan.
- Si elle n'est pas active (ou a été fermée/détruite), appelle la fonction `factory` pour instancier une nouvelle fenêtre, met en cache l'instance dans `cache_ref["value"]`, et appelle `present_window()` sur la nouvelle instance.
- Retourne l'instance de fenêtre affichée.

### `blender_vfx_qt.qt_window_is_alive(widget)`

Vérifie si une instance de widget Qt est actuellement instanciée et n'a pas été ramassée par le ramasse-miettes ou détruite au niveau C++.

```python
from blender_vfx_qt import qt_window_is_alive

if qt_window_is_alive(my_window):
    print("La fenêtre est active et en cours de rendu !")
```

**Paramètres :**
- `widget` — Une instance de `QWidget` (ou `None`).

**Comportement :**
- Retourne `False` si `widget` est `None`.
- Tente d'accéder à l'`objectName()` du widget.
- Intercepte toute erreur `RuntimeError` soulevée par PySide/PyQt lors de l'interaction avec un objet C++ supprimé, en retournant `False` si elle est interceptée.
- Retourne `True` si la fenêtre est active et saine.

## Pile d'exécution intégrée

L'exécution Qt est fournie par ces wheels regroupés :

| Paquet | Version | Licence |
| --- | --- | --- |
| `bqt` | 2.2.0 | MIT |
| `blender-qt-stylesheet` | 0.0.3 | MIT |
| `QtPy` | 2.4.3 | MIT |
| `packaging` | 26.2 | Apache-2.0 / BSD-2 |
| `PySide6` | 6.11.0 | LGPL-3.0 |
| `PySide6_Essentials` | 6.11.0 | LGPL-3.0 |
| `PySide6_Addons` | 6.11.0 | LGPL-3.0 |
| `shiboken6` | 6.11.0 | LGPL-3.0 |

## Fichiers Sources

| Fichier | Objectif |
| --- | --- |
| `scripts/startup/bl_operators/blender_vfx_viewlayer_manager.py` | Enregistrement de l'opérateur et logique de pont |
| `scripts/startup/bl_ui/space_topbar.py` | Bouton de lancement de la barre supérieure |
| `scripts/modules/blender_vfx_qt/` | Module d'emballage d'exécution Qt partagé |
| `release/extensions/system/blender_vfx_qt_runtime/` | Extension d'exécution avec wheels regroupés |
| `release/extensions/system/blender_vfx_viewlayer_manager/` | Source de l'extension du gestionnaire |
