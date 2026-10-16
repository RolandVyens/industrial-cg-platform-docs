---
title: "Deep EXR Architecture Upgrade in Progress: From Depth Recording to Production Compositing"
description: "An engineering update on our ongoing Deep EXR architectural overhaul: preserving true depth behavior, solving continuous volume integration, and the verified candidate milestones."
date: 2026-10-17
category: engineering
tags:
  - Deep EXR
  - Compositing
  - Architecture
editLink: false
cover: "/blog/nuke-deep-compositing.webp"
---

# Deep EXR Architecture Upgrade in Progress: From Depth Recording to Production Compositing

![Deep EXR Architecture](/blog/nuke-deep-compositing.webp)

Industrial CG Platform is currently executing a fundamental architectural overhaul of its Deep EXR pipeline. This upgrade is **in active candidate development (In Progress)**.

For experienced technical directors and compositors, Deep EXR is an established tool. However, implementing Deep output inside a path-tracing engine reveals a critical architectural truth: **2D flattened visual parity is only a baseline check—preserving correct physical behavior along depth is the real engineering challenge.**

This update covers why our previous implementation needed a ground-up reset, the new mathematical and memory foundations being built, and where our candidate verification stands today.

## Beyond 2D Parity: What Must Actually Be Preserved

A naive Deep implementation can easily pass a 2D flattening test: if you composite all samples along a pixel ray back-to-front, the resulting RGB and Alpha match the beauty pass.

However, matching the 2D beauty pass does not guarantee that the depth distribution is physically meaningful. If radiance is arbitrarily assigned across depth or if extinction profiles are approximated, downstream operations—such as volumetric holdouts, deep merging, or inserting 3D elements inside participating media—will immediately exhibit edge fringing, light leaks, and false occlusion.

Deep EXR cannot merely store an arbitrary sequence of Z values. It must preserve:

* **True Energy Distribution**: Native path-traced radiance contributions passed through the actual camera and film pipelines, rather than reconstructed post-facto from beauty passes.
* **Separable Optical Properties**: The distinct spatial profiles of scattered/emitted light versus line-of-sight optical thickness (extinction/transmittance).
* **Strict Depth Topology**: The exact spatial ordering of surfaces, participating media, transparencies, and holdouts on every sub-pixel path.

## Why Continuous Volumes Required an Architectural Reset

Hard surfaces present simple, discrete depth boundaries. Participating media (smoke, fire, atmosphere), by contrast, absorb, scatter, and emit continuously across spatial intervals. 

Previous approaches that relied on uniform depth slicing or fixed-sample approximations failed under production conditions. A robust volume Deep pipeline must address three coupled problems:

1. **Decoupling Radiance and Extinction**: Radiance accumulates alongside continuous extinction. The position where scattered light enters the camera ray is not identical to the continuous transmittance profile that attenuates it.
2. **Sub-Ray Anti-Aliasing (AA) Integration**: A pixel represents the convergence of many anti-aliased sub-rays. Averaging sub-samples prematurely before resolving their individual depth topology washes out sharp depth discontinuities and muddies fine volumetric detail.
3. **Error-Bounded Interval Reduction**: Storing raw volumetric ray-marching steps causes unmanageable file sizes. Compacting these samples requires mathematical error bounds evaluated across the continuous depth interval, rather than merely checking sample endpoints.

## Core Architectural Foundations

To solve these challenges, the new pipeline centers on five architectural principles:

* **Native Light Transport Capture**: Radiance and transmittance are sampled directly from the native integrator without heuristic reconstruction.
* **Decoupled Radiance and View-Ray Extinction**: Extinction profiles are tracked independently and coupled mathematically with accumulated radiance.
* **Per-Ray Integration Before Pixel Aggregation**: Occlusion, volume boundaries, and holdouts are solved per camera ray first, and only aggregated into the pixel footprint once ray topology is verified.
* **Error-Bounded Interval Representation**: Sample compression is governed by formal error bounds across intervals. *(Note: This mathematical guarantee applies to the captured discrete representation, not as an unconstrained claim over continuous physical reality.)*
* **Budgeted Memory Lifecycle**: Memory allocation operates under strict stage budgets with deterministic cleanup for interactive cancellations, render retries, and multi-channel outputs.

> **Compute Architecture Note**: Scene evaluation, ray intersection, and raw sample capture run on the GPU. Mathematical reduction, error-bounded compression, and EXR data formatting currently execute on a multi-threaded CPU pipeline.

## The Panoramic Case: Non-Linear Depth Mapping

Supporting panoramic cameras highlights the necessity of this ground-up redesign. In perspective cameras, depth is planar distance along the optical normal (`Z`). In panoramic cameras, depth is radial Euclidean distance (`||P - O||`).

When thin-lens depth of field, camera offsets, or motion blur are introduced, physical distance along the ray maps non-linearly to output depth. Linear interpolation between sample endpoints causes geometric curvature distortion and volumetric sagging.

The new architecture freezes camera ray geometry, projects physical support intervals into non-linear depth space, and evaluates sample reduction under curvature-aware error bounds.

## Verified Candidate Progress & Objective Boundaries

Development is guided by automated verification and measurable milestones. The table below outlines our verified candidate scope and its precise engineering boundaries:

| Milestone / Evidence | Verified Scope | What It Does NOT Mean |
| :--- | :--- | :--- |
| **Candidate Compilation & Install** | New candidate build compiles and installs cleanly in test environments. | Does not indicate general release readiness. |
| **10 GPU Modules Consistency** | Build artifacts match target hardware interfaces. | Confirms deployment integrity; **does not represent a performance boost**. |
| **195 Host Tests Passed** | Validates unit-level math, data structures, and edge-case handling. | Validates software logic; **does not equate to 195 verified production shots**. |
| **Panoramic Dual Deep EXR Output** | Successfully renders dual Deep EXR files with passing depth prefix checks. | Confirms end-to-end data pipeline; regression testing for DOF and other camera models is ongoing. |

## Remaining Work

Critical engineering tasks remain before this architecture is ready for general release:

1. **Full Camera & Scene Regression**: Verifying depth of field, extreme motion blur, and heterogeneous volume overlaps across full-feature scenes.
2. **Lifecycle Stress Testing**: Validating memory pools under heavy multi-layer EXR output and arbitrary user interruptions.
3. **Downstream Comp Workflow Validation**: Ensuring deep merge, deep recolor, and deep holdout workflows seamlessly match production compositing standards.

Our current priority is **mathematical correctness and topological stability**. Once correctness is locked across all camera modes, we will measure performance against standardized production test scenes. **At this stage, we do not publish speedup multipliers, claims of negligible overhead, or speculative delivery timelines.**

<br><br><a href="../../blog/" class="VPButton VPButton--alt">← Back to Devlog</a>
