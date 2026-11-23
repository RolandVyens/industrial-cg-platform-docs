import fs from 'node:fs'
import path from 'node:path'

const DATA_PATH = path.resolve('docs', 'feature-tracking.data.json')
const DONUT_RADIUS = 44
const DONUT_CIRCUMFERENCE = +(2 * Math.PI * DONUT_RADIUS).toFixed(2) // 276.46

const LOCALES = ['en', 'zh', 'fr']

function resolveLinkHref(href, locale) {
  return String(href || '').replace(/\{locale\}/g, locale)
}

function buildLocaleItems(features, locale) {
  return features.map((item) => {
    const loc = item.i18n?.[locale] || item.i18n?.en || {}
    const links = (item.links || []).map((link) => ({
      href: resolveLinkHref(link.href, locale),
      external: !!link.external,
      primary: link.primary !== false,
      label: link.label?.[locale] || link.label?.en || '',
    }))

    return {
      id: item.id,
      status: item.status,
      progress: typeof item.progress === 'number' ? item.progress : 0,
      module: item.module || '',
      thumb: item.thumb || null,
      thumbPosition: item.thumbPosition || null,
      thumbAlt: loc.thumbAlt || '',
      titleHtml: loc.titleHtml || '',
      badge: loc.badge || '',
      descHtml: loc.descHtml || '',
      progressLabel: loc.progressLabel || '',
      milestones: Array.isArray(loc.milestones) ? loc.milestones : [],
      links,
    }
  })
}

export default {
  watch: ['./feature-tracking.data.json'],
  load() {
    const raw = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'))
    const features = Array.isArray(raw?.features) ? raw.features : []

    const releasedCount = features.filter((f) => f.status === 'released').length
    const inProgressCount = features.filter((f) => f.status === 'in_progress').length
    const plannedCount = features.filter((f) => f.status === 'planned').length
    const total = features.length

    let releasedPct = 0
    let inProgressPct = 0
    let plannedPct = 0
    let releasedArcNum = 0
    let inProgressArcNum = 0

    if (total > 0) {
      releasedPct = Number(((releasedCount / total) * 100).toFixed(1))
      inProgressPct = Number(((inProgressCount / total) * 100).toFixed(1))
      plannedPct = Number(Math.max(0, 100 - releasedPct - inProgressPct).toFixed(1))

      releasedArcNum = Number(((releasedCount / total) * DONUT_CIRCUMFERENCE).toFixed(2))
      inProgressArcNum = Number(((inProgressCount / total) * DONUT_CIRCUMFERENCE).toFixed(2))
    }

    const locales = {}
    for (const locale of LOCALES) {
      const items = buildLocaleItems(features, locale)
      locales[locale] = {
        inProgress: items.filter((f) => f.status === 'in_progress'),
        released: items.filter((f) => f.status === 'released'),
        planned: items.filter((f) => f.status === 'planned'),
      }
    }

    return {
      counts: {
        released: releasedCount,
        inProgress: inProgressCount,
        planned: plannedCount,
        total,
      },
      percentages: {
        released: releasedPct.toFixed(1),
        inProgress: inProgressPct.toFixed(1),
        planned: plannedPct.toFixed(1),
      },
      donut: {
        circumference: DONUT_CIRCUMFERENCE.toFixed(2),
        releasedDashArray: `${releasedArcNum.toFixed(2)} ${DONUT_CIRCUMFERENCE.toFixed(2)}`,
        inProgressDashArray: `${inProgressArcNum.toFixed(2)} ${DONUT_CIRCUMFERENCE.toFixed(2)}`,
        inProgressDashOffset: (-releasedArcNum).toFixed(2),
      },
      locales,
    }
  },
}
