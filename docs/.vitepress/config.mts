import { defineConfig } from 'vitepress'

// Shared nav/sidebar helpers
const enFeatures = [
  { text: 'Deep EXR', link: '/en/features/deep-exr' },
  { text: 'Shadow Color', link: '/en/features/shadow-color' },
  { text: 'Lightgroup Lobe Passes', link: '/en/features/lightgroup-lobe-passes' },
  { text: 'ViewLayer Manager', link: '/en/features/viewlayer-manager' },
]

const zhFeatures = [
  { text: 'Deep EXR 深度输出', link: '/zh/features/deep-exr' },
  { text: '阴影颜色', link: '/zh/features/shadow-color' },
  { text: '灯光组分量通道', link: '/zh/features/lightgroup-lobe-passes' },
  { text: 'ViewLayer 管理器', link: '/zh/features/viewlayer-manager' },
]

const frFeatures = [
  { text: 'Deep EXR', link: '/fr/features/deep-exr' },
  { text: 'Couleur d\'ombre', link: '/fr/features/shadow-color' },
  { text: 'Passes par lobe de lightgroup', link: '/fr/features/lightgroup-lobe-passes' },
  { text: 'Gestionnaire de ViewLayer', link: '/fr/features/viewlayer-manager' },
]

const enApi = [
  { text: 'Overview', link: '/en/api/' },
  { text: 'Cycles Kernel Extensions', link: '/en/api/cycles-kernel' },
  { text: 'RNA Properties', link: '/en/api/rna-properties' },
  { text: 'Python Operators', link: '/en/api/python-operators' },
  { text: 'bQt Usage Guide', link: '/en/api/bqt-usage' },
  { text: 'Pass & AOV System', link: '/en/api/pass-system' },
]

const zhApi = [
  { text: '概述', link: '/zh/api/' },
  { text: 'Cycles 内核扩展', link: '/zh/api/cycles-kernel' },
  { text: 'RNA 属性', link: '/zh/api/rna-properties' },
  { text: 'Python 操作器', link: '/zh/api/python-operators' },
  { text: 'bQt 使用指南', link: '/zh/api/bqt-usage' },
  { text: 'Pass 与 AOV 系统', link: '/zh/api/pass-system' },
]

const frApi = [
  { text: 'Aperçu', link: '/fr/api/' },
  { text: 'Extensions du noyau Cycles', link: '/fr/api/cycles-kernel' },
  { text: 'Propriétés RNA', link: '/fr/api/rna-properties' },
  { text: 'Opérateurs Python', link: '/fr/api/python-operators' },
  { text: "Guide d'utilisation bQt", link: '/fr/api/bqt-usage' },
  { text: 'Système de passes et AOV', link: '/fr/api/pass-system' },
]

export default defineConfig({
  base: '/industrial-cg-platform-docs/',
  title: 'Industrial CG Platform',
  description: 'Documentation for the Blender VFX rendering branch',

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#3c8dbc' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Industrial CG Platform Documentation' }],
    ['meta', { property: 'og:description', content: 'Trilingual documentation for the Blender VFX rendering branch' }],
  ],

  locales: {
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/getting-started' },
          { text: 'Features', items: enFeatures },
          { text: 'API Reference', items: enApi },
          { text: 'Releases', link: '/en/releases/' },
          { text: 'About', link: '/en/about/' },
        ],
        sidebar: {
          '/en/about/': [
            {
              text: 'About',
              items: [
                { text: 'About the Project', link: '/en/about/' },
              ],
            },
          ],
          '/en/guide/': [
            {
              text: 'Guide',
              items: [
                { text: 'Getting Started', link: '/en/guide/getting-started' },
                { text: 'Installation', link: '/en/guide/installation' },
                { text: 'Building from Source', link: '/en/guide/building-from-source' },
                { text: 'FAQ', link: '/en/guide/faq' },
              ],
            },
          ],
          '/en/features/': [
            {
              text: 'Features',
              items: enFeatures,
            },
          ],
          '/en/api/': [
            {
              text: 'API Reference',
              items: enApi,
            },
          ],
          '/en/releases/': [
            {
              text: 'Releases',
              items: [
                { text: 'Release Index', link: '/en/releases/' },
              ],
            },
          ],
        },
      },
    },

    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh/guide/getting-started' },
          { text: '功能', items: zhFeatures },
          { text: 'API 参考', items: zhApi },
          { text: '发布', link: '/zh/releases/' },
          { text: '关于', link: '/zh/about/' },
        ],
        sidebar: {
          '/zh/about/': [
            {
              text: '关于',
              items: [
                { text: '关于项目', link: '/zh/about/' },
              ],
            },
          ],
          '/zh/guide/': [
            {
              text: '指南',
              items: [
                { text: '快速开始', link: '/zh/guide/getting-started' },
                { text: '安装', link: '/zh/guide/installation' },
                { text: '从源码构建', link: '/zh/guide/building-from-source' },
                { text: '常见问题', link: '/zh/guide/faq' },
              ],
            },
          ],
          '/zh/features/': [
            {
              text: '功能',
              items: zhFeatures,
            },
          ],
          '/zh/api/': [
            {
              text: 'API 参考',
              items: zhApi,
            },
          ],
          '/zh/releases/': [
            {
              text: '发布',
              items: [
                { text: '发布索引', link: '/zh/releases/' },
              ],
            },
          ],
        },
        outline: { label: '本页目录' },
        docFooter: { prev: '上一页', next: '下一页' },
        lastUpdated: { text: '最后更新' },
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '深色模式',
      },
    },

    fr: {
      label: 'Français',
      lang: 'fr-FR',
      link: '/fr/',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/fr/guide/getting-started' },
          { text: 'Fonctionnalités', items: frFeatures },
          { text: 'Référence API', items: frApi },
          { text: 'Versions', link: '/fr/releases/' },
          { text: 'À propos', link: '/fr/about/' },
        ],
        sidebar: {
          '/fr/about/': [
            {
              text: 'À propos',
              items: [
                { text: 'À propos du projet', link: '/fr/about/' },
              ],
            },
          ],
          '/fr/guide/': [
            {
              text: 'Guide',
              items: [
                { text: 'Premiers pas', link: '/fr/guide/getting-started' },
                { text: 'Installation', link: '/fr/guide/installation' },
                { text: 'Compilation depuis les sources', link: '/fr/guide/building-from-source' },
                { text: 'FAQ', link: '/fr/guide/faq' },
              ],
            },
          ],
          '/fr/features/': [
            {
              text: 'Fonctionnalités',
              items: frFeatures,
            },
          ],
          '/fr/api/': [
            {
              text: 'Référence API',
              items: frApi,
            },
          ],
          '/fr/releases/': [
            {
              text: 'Versions',
              items: [
                { text: 'Index des versions', link: '/fr/releases/' },
              ],
            },
          ],
        },
        outline: { label: 'Sur cette page' },
        docFooter: { prev: 'Précédent', next: 'Suivant' },
        lastUpdated: { text: 'Dernière mise à jour' },
        returnToTopLabel: 'Retour en haut',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Mode sombre',
      },
    },
  },

  themeConfig: {
    logo: '/logo.png',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/RolandVyens/industrial-cg-platform' },
    ],
    search: {
      provider: 'local',
    },
    editLink: {
      pattern: 'https://github.com/RolandVyens/industrial-cg-platform-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: 'Released under the GPL-2.0-or-later License.',
      copyright: 'Copyright © 2026 RolandVyens',
    },
  },

  lastUpdated: true,
  cleanUrls: true,
})
