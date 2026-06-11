import { defineConfig } from 'vitepress'

// Shared nav/sidebar helpers mapped to the new /cg-platform/ nested structure
const enFeatures = [
  { text: 'Deep EXR', link: '/en/cg-platform/features/deep-exr' },
  { text: 'Shadow Color', link: '/en/cg-platform/features/shadow-color' },
  { text: 'Lightgroup Lobe Passes', link: '/en/cg-platform/features/lightgroup-lobe-passes' },
  { text: 'ViewLayer Manager', link: '/en/cg-platform/features/viewlayer-manager' },
]

const zhFeatures = [
  { text: 'Deep EXR 深度输出', link: '/zh/cg-platform/features/deep-exr' },
  { text: '阴影颜色', link: '/zh/cg-platform/features/shadow-color' },
  { text: '灯光组分量通道', link: '/zh/cg-platform/features/lightgroup-lobe-passes' },
  { text: 'ViewLayer 管理器', link: '/zh/cg-platform/features/viewlayer-manager' },
]

const frFeatures = [
  { text: 'Deep EXR', link: '/fr/cg-platform/features/deep-exr' },
  { text: 'Couleur d\'ombre', link: '/fr/cg-platform/features/shadow-color' },
  { text: 'Passes par lobe de lightgroup', link: '/fr/cg-platform/features/lightgroup-lobe-passes' },
  { text: 'Gestionnaire de ViewLayer', link: '/fr/cg-platform/features/viewlayer-manager' },
]

const enApi = [
  { text: 'Overview', link: '/en/cg-platform/api/' },
  { text: 'Cycles Kernel Extensions', link: '/en/cg-platform/api/cycles-kernel' },
  { text: 'RNA Properties', link: '/en/cg-platform/api/rna-properties' },
  { text: 'Python Operators', link: '/en/cg-platform/api/python-operators' },
  { text: 'bQt Usage Guide', link: '/en/cg-platform/api/bqt-usage' },
  { text: 'Pass & AOV System', link: '/en/cg-platform/api/pass-system' },
]

const zhApi = [
  { text: '概述', link: '/zh/cg-platform/api/' },
  { text: 'Cycles 内核扩展', link: '/zh/cg-platform/api/cycles-kernel' },
  { text: 'RNA 属性', link: '/zh/cg-platform/api/rna-properties' },
  { text: 'Python 操作器', link: '/zh/cg-platform/api/python-operators' },
  { text: 'bQt 使用指南', link: '/zh/cg-platform/api/bqt-usage' },
  { text: 'Pass 与 AOV 系统', link: '/zh/cg-platform/api/pass-system' },
]

const frApi = [
  { text: 'Aperçu', link: '/fr/cg-platform/api/' },
  { text: 'Extensions du noyau Cycles', link: '/fr/cg-platform/api/cycles-kernel' },
  { text: 'Propriétés RNA', link: '/fr/cg-platform/api/rna-properties' },
  { text: 'Opérateurs Python', link: '/fr/cg-platform/api/python-operators' },
  { text: "Guide d'utilisation bQt", link: '/fr/cg-platform/api/bqt-usage' },
  { text: 'Système de passes et AOV', link: '/fr/cg-platform/api/pass-system' },
]

export default defineConfig({
  base: '/industrial-cg-platform-docs/',
  title: 'Industrial 3D',
  description: 'Ecosystem of production-ready CG & VFX pipeline tools',

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#3c8dbc' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Industrial 3D Ecosystem' }],
    ['meta', { property: 'og:description', content: 'Production-ready CG & VFX pipeline tools by Roland Vyens' }],
  ],

  locales: {
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          {
            text: 'CG Platform (Blender)',
            items: [
              { text: 'Guide', link: '/en/cg-platform/guide/getting-started' },
              { text: 'Features', items: enFeatures },
              { text: 'API Reference', items: enApi },
              { text: 'Releases', link: '/en/cg-platform/releases/' },
              { text: 'About', link: '/en/cg-platform/about/' },
            ]
          },
          {
            text: 'Pipeline Tools',
            items: [
              { text: 'AOV Connector', link: '/en/aov-connector/' },
              { text: 'Light AOV Splitter', link: '/en/light-splitter/' },
              { text: 'AIO-OCIO', link: '/en/aio-ocio/' }
            ]
          }
        ],
        sidebar: {
          '/en/cg-platform/about/': [
            {
              text: 'About',
              items: [
                { text: 'About the Project', link: '/en/cg-platform/about/' },
              ],
            },
          ],
          '/en/cg-platform/guide/': [
            {
              text: 'Guide',
              items: [
                { text: 'Getting Started', link: '/en/cg-platform/guide/getting-started' },
                { text: 'Installation', link: '/en/cg-platform/guide/installation' },
                { text: 'Building from Source', link: '/en/cg-platform/guide/building-from-source' },
                { text: 'FAQ', link: '/en/cg-platform/guide/faq' },
              ],
            },
          ],
          '/en/cg-platform/features/': [
            {
              text: 'Features',
              items: enFeatures,
            },
          ],
          '/en/cg-platform/api/': [
            {
              text: 'API Reference',
              items: enApi,
            },
          ],
          '/en/cg-platform/releases/': [
            {
              text: 'Releases',
              items: [
                { text: 'Release Index', link: '/en/cg-platform/releases/' },
              ],
            },
          ],
          '/en/aov-connector/': [
            {
              text: 'AOV Connector',
              items: [
                { text: 'Overview', link: '/en/aov-connector/' }
              ]
            }
          ],
          '/en/light-splitter/': [
            {
              text: 'Light AOV Splitter',
              items: [
                { text: 'Overview', link: '/en/light-splitter/' }
              ]
            }
          ],
          '/en/aio-ocio/': [
            {
              text: 'AIO-OCIO',
              items: [
                { text: 'Overview', link: '/en/aio-ocio/' }
              ]
            }
          ]
        },
      },
    },

    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          {
            text: 'CG Platform (Blender 分支)',
            items: [
              { text: '指南', link: '/zh/cg-platform/guide/getting-started' },
              { text: '功能', items: zhFeatures },
              { text: 'API 参考', items: zhApi },
              { text: '发布', link: '/zh/cg-platform/releases/' },
              { text: '关于', link: '/zh/cg-platform/about/' },
            ]
          },
          {
            text: '流程管线工具',
            items: [
              { text: 'AOV Connector', link: '/zh/aov-connector/' },
              { text: 'Light AOV Splitter', link: '/zh/light-splitter/' },
              { text: 'AIO-OCIO', link: '/zh/aio-ocio/' }
            ]
          }
        ],
        sidebar: {
          '/zh/cg-platform/about/': [
            {
              text: '关于',
              items: [
                { text: '关于项目', link: '/zh/cg-platform/about/' },
              ],
            },
          ],
          '/zh/cg-platform/guide/': [
            {
              text: '指南',
              items: [
                { text: '快速开始', link: '/zh/cg-platform/guide/getting-started' },
                { text: '安装', link: '/zh/cg-platform/guide/installation' },
                { text: '从源码构建', link: '/zh/cg-platform/guide/building-from-source' },
                { text: '常见问题', link: '/zh/cg-platform/guide/faq' },
              ],
            },
          ],
          '/zh/cg-platform/features/': [
            {
              text: '功能',
              items: zhFeatures,
            },
          ],
          '/zh/cg-platform/api/': [
            {
              text: 'API 参考',
              items: zhApi,
            },
          ],
          '/zh/cg-platform/releases/': [
            {
              text: '发布',
              items: [
                { text: '发布索引', link: '/zh/cg-platform/releases/' },
              ],
            },
          ],
          '/zh/aov-connector/': [
            {
              text: 'AOV Connector',
              items: [
                { text: '概述', link: '/zh/aov-connector/' }
              ]
            }
          ],
          '/zh/light-splitter/': [
            {
              text: 'Light AOV Splitter',
              items: [
                { text: '概述', link: '/zh/light-splitter/' }
              ]
            }
          ],
          '/zh/aio-ocio/': [
            {
              text: 'AIO-OCIO',
              items: [
                { text: '概述', link: '/zh/aio-ocio/' }
              ]
            }
          ]
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
          {
            text: 'CG Platform (Blender)',
            items: [
              { text: 'Guide', link: '/fr/cg-platform/guide/getting-started' },
              { text: 'Fonctionnalités', items: frFeatures },
              { text: 'Référence API', items: frApi },
              { text: 'Versions', link: '/fr/cg-platform/releases/' },
              { text: 'À propos', link: '/fr/cg-platform/about/' },
            ]
          },
          {
            text: 'Outils de Pipeline',
            items: [
              { text: 'AOV Connector', link: '/fr/aov-connector/' },
              { text: 'Light AOV Splitter', link: '/fr/light-splitter/' },
              { text: 'AIO-OCIO', link: '/fr/aio-ocio/' }
            ]
          }
        ],
        sidebar: {
          '/fr/cg-platform/about/': [
            {
              text: 'À propos',
              items: [
                { text: 'À propos du projet', link: '/fr/cg-platform/about/' },
              ],
            },
          ],
          '/fr/cg-platform/guide/': [
            {
              text: 'Guide',
              items: [
                { text: 'Premiers pas', link: '/fr/cg-platform/guide/getting-started' },
                { text: 'Installation', link: '/fr/cg-platform/guide/installation' },
                { text: 'Compilation depuis les sources', link: '/fr/cg-platform/guide/building-from-source' },
                { text: 'FAQ', link: '/fr/cg-platform/guide/faq' },
              ],
            },
          ],
          '/fr/cg-platform/features/': [
            {
              text: 'Fonctionnalités',
              items: frFeatures,
            },
          ],
          '/fr/cg-platform/api/': [
            {
              text: 'Référence API',
              items: frApi,
            },
          ],
          '/fr/cg-platform/releases/': [
            {
              text: 'Versions',
              items: [
                { text: 'Index des versions', link: '/fr/cg-platform/releases/' },
              ],
            },
          ],
          '/fr/aov-connector/': [
            {
              text: 'AOV Connector',
              items: [
                { text: 'Aperçu', link: '/fr/aov-connector/' }
              ]
            }
          ],
          '/fr/light-splitter/': [
            {
              text: 'Light AOV Splitter',
              items: [
                { text: 'Aperçu', link: '/fr/light-splitter/' }
              ]
            }
          ],
          '/fr/aio-ocio/': [
            {
              text: 'AIO-OCIO',
              items: [
                { text: 'Aperçu', link: '/fr/aio-ocio/' }
              ]
            }
          ]
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
