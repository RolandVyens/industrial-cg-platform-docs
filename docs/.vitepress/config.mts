import { defineConfig } from 'vitepress'

// Shared nav/sidebar helpers mapped to the new /cg-platform/ nested structure
const enFeatures = [
  { text: 'Deep EXR', link: '/en/cg-platform/features/deep-exr' },
  { text: 'EXR Overscan', link: '/en/cg-platform/features/exr-overscan' },
  { text: 'Shadow Color', link: '/en/cg-platform/features/shadow-color' },
  { text: 'Lightgroup Lobe Passes', link: '/en/cg-platform/features/lightgroup-lobe-passes' },
  { text: 'ViewLayer Manager', link: '/en/cg-platform/features/viewlayer-manager' },
]

const zhFeatures = [
  { text: 'Deep EXR 深度输出', link: '/zh/cg-platform/features/deep-exr' },
  { text: 'EXR Overscan 溢画幅', link: '/zh/cg-platform/features/exr-overscan' },
  { text: '阴影颜色', link: '/zh/cg-platform/features/shadow-color' },
  { text: '灯光组分量通道', link: '/zh/cg-platform/features/lightgroup-lobe-passes' },
  { text: 'ViewLayer 管理器', link: '/zh/cg-platform/features/viewlayer-manager' },
]

const frFeatures = [
  { text: 'Deep EXR', link: '/fr/cg-platform/features/deep-exr' },
  { text: 'Overscan EXR', link: '/fr/cg-platform/features/exr-overscan' },
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
  description: 'Ecosystem of free & open-source CG & VFX pipeline tools',
  appearance: 'dark',

  head: [
    ['link', { rel: 'icon', href: '/industrial-cg-platform-docs/logo.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap' }],
    ['meta', { name: 'theme-color', content: '#7c4dff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Industrial 3D Ecosystem' }],
    ['meta', { property: 'og:description', content: 'Free and open-source CG & VFX pipeline tools by Roland Vyens' }],
    ['meta', { 'http-equiv': 'Content-Security-Policy', content: "default-src 'self'; img-src 'self' data: https://github.com https://*.githubusercontent.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'; connect-src 'self';" }],
    ['script', {}, "if (self !== top) { top.location = self.location; }"],
  ],

  locales: {
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          {
            text: 'Ecosystem',
            items: [
              {
                text: 'Core Platform',
                items: [
                  { text: 'Industrial CG Platform', link: '/en/cg-platform/' }
                ]
              },
              {
                text: 'Pipeline Plugins & Colors',
                items: [
                  { text: 'Addon Directory', link: '/en/pipeline-tools' },
                  { text: 'Industrial AOV Connector', link: '/en/aov-connector/' },
                  { text: 'Industrial Light AOV Splitter', link: '/en/light-splitter/' },
                  { text: 'AIO-OCIO', link: '/en/aio-ocio/' }
                ]
              }
            ]
          },
          {
            text: 'Documentation',
            items: [
              {
                text: 'Platform Manual',
                items: [
                  { text: 'User Guide', link: '/en/cg-platform/guide/getting-started' },
                  { text: 'Features Reference', link: '/en/cg-platform/features/deep-exr' },
                  { text: 'API Reference', link: '/en/cg-platform/api/' },
                  { text: 'Release Notes', link: '/en/cg-platform/releases/' }
                ]
              },
              {
                text: 'Addon Manuals',
                items: [
                  { text: 'Industrial AOV Connector', link: '/en/aov-connector/' },
                  { text: 'Industrial Light AOV Splitter', link: '/en/light-splitter/' },
                  { text: 'AIO-OCIO', link: '/en/aio-ocio/' }
                ]
              }
            ]
          },
          { text: 'Donate', link: '/en/donate' },
          { text: 'About', link: '/en/cg-platform/about/' }
        ],
        sidebar: {
          '/en/cg-platform/': [
            {
              text: 'Getting Started',
              collapsed: false,
              items: [
                { text: 'About the Project', link: '/en/cg-platform/about/' },
                { text: 'Getting Started', link: '/en/cg-platform/guide/getting-started' },
                { text: 'Installation', link: '/en/cg-platform/guide/installation' },
                { text: 'Building from Source', link: '/en/cg-platform/guide/building-from-source' },
                { text: 'FAQ & Troubleshooting', link: '/en/cg-platform/guide/faq' }
              ]
            },
            {
              text: 'Features Reference',
              collapsed: false,
              items: enFeatures
            },
            {
              text: 'API Reference',
              collapsed: true,
              items: enApi
            },
            {
              text: 'Releases',
              collapsed: true,
              items: [
                { text: 'Release Index', link: '/en/cg-platform/releases/' }
              ]
            }
          ],
          '/en/aov-connector/': [
            {
              text: 'Industrial AOV Connector',
              items: [
                { text: 'Overview', link: '/en/aov-connector/' }
              ]
            },
            {
              text: 'User Manual',
              collapsed: false,
              items: [
                { text: 'Introduction & Read Order', link: '/en/aov-connector/manual/' },
                { text: 'Basic Mode', link: '/en/aov-connector/manual/basic-mode' },
                { text: 'Preferences', link: '/en/aov-connector/manual/preference' },
                { text: 'Advanced Mode', link: '/en/aov-connector/manual/advanced-mode' },
                { text: 'Fake Deep', link: '/en/aov-connector/manual/fakedeep' }
              ]
            }
          ],
          '/en/light-splitter/': [
            {
              text: 'Industrial Light AOV Splitter',
              items: [
                { text: 'Overview', link: '/en/light-splitter/' }
              ]
            },
            {
              text: 'User Manual',
              collapsed: false,
              items: [
                { text: 'Introduction & Read Order', link: '/en/light-splitter/manual/' },
                { text: 'Usage & Guidelines', link: '/en/light-splitter/manual/usage' },
                { text: 'Nuke Auto-Shuffle Setup', link: '/en/light-splitter/manual/nuke-setup' }
              ]
            }
          ],
          '/en/aio-ocio/': [
            {
              text: 'AIO-OCIO',
              items: [
                { text: 'Overview', link: '/en/aio-ocio/' }
              ]
            },
            {
              text: 'User Manual',
              collapsed: false,
              items: [
                { text: 'Introduction & Compatibility', link: '/en/aio-ocio/manual/' },
                { text: 'General Software Setup', link: '/en/aio-ocio/manual/general-softwares' },
                { text: 'Blender Color Management', link: '/en/aio-ocio/manual/blender-setup' }
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
            text: '开源生态',
            items: [
              {
                text: '核心平台',
                items: [
                  { text: 'Industrial CG Platform', link: '/zh/cg-platform/' }
                ]
              },
              {
                text: '流程插件与色彩',
                items: [
                  { text: '插件导览', link: '/zh/pipeline-tools' },
                  { text: 'Industrial AOV Connector', link: '/zh/aov-connector/' },
                  { text: 'Industrial Light AOV Splitter', link: '/zh/light-splitter/' },
                  { text: 'AIO-OCIO', link: '/zh/aio-ocio/' }
                ]
              }
            ]
          },
          {
            text: '技术文档',
            items: [
              {
                text: '平台文档',
                items: [
                  { text: '用户指南', link: '/zh/cg-platform/guide/getting-started' },
                  { text: '功能介绍', link: '/zh/cg-platform/features/deep-exr' },
                  { text: 'API 参考手册', link: '/zh/cg-platform/api/' },
                  { text: '版本发布记录', link: '/zh/cg-platform/releases/' }
                ]
              },
              {
                text: '插件文档',
                items: [
                  { text: 'Industrial AOV Connector', link: '/zh/aov-connector/' },
                  { text: 'Industrial Light AOV Splitter', link: '/zh/light-splitter/' },
                  { text: 'AIO-OCIO', link: '/zh/aio-ocio/' }
                ]
              }
            ]
          },
          { text: '赞助', link: '/zh/donate' },
          { text: '关于', link: '/zh/cg-platform/about/' }
        ],
        sidebar: {
          '/zh/cg-platform/': [
            {
              text: '快速入门',
              collapsed: false,
              items: [
                { text: '关于项目', link: '/zh/cg-platform/about/' },
                { text: '快速开始', link: '/zh/cg-platform/guide/getting-started' },
                { text: '安装指南', link: '/zh/cg-platform/guide/installation' },
                { text: '从源码构建', link: '/zh/cg-platform/guide/building-from-source' },
                { text: '常见问题与解答', link: '/zh/cg-platform/guide/faq' }
              ]
            },
            {
              text: '核心功能参考',
              collapsed: false,
              items: zhFeatures
            },
            {
              text: 'API 参考手册',
              collapsed: true,
              items: zhApi
            },
            {
              text: '版本发布记录',
              collapsed: true,
              items: [
                { text: '发布索引', link: '/zh/cg-platform/releases/' }
              ]
            }
          ],
          '/zh/aov-connector/': [
            {
              text: 'Industrial AOV Connector',
              items: [
                { text: '概述', link: '/zh/aov-connector/' }
              ]
            },
            {
              text: '用户手册',
              collapsed: false,
              items: [
                { text: '引言与推荐阅读顺序', link: '/zh/aov-connector/manual/' },
                { text: '基础模式', link: '/zh/aov-connector/manual/basic-mode' },
                { text: '偏好设置', link: '/zh/aov-connector/manual/preference' },
                { text: '高级模式', link: '/zh/aov-connector/manual/advanced-mode' },
                { text: 'Fake Deep', link: '/zh/aov-connector/manual/fakedeep' }
              ]
            }
          ],
          '/zh/light-splitter/': [
            {
              text: 'Industrial Light AOV Splitter',
              items: [
                { text: '概述', link: '/zh/light-splitter/' }
              ]
            },
            {
              text: '用户手册',
              collapsed: false,
              items: [
                { text: '引言与推荐阅读顺序', link: '/zh/light-splitter/manual/' },
                { text: '使用说明与规范', link: '/zh/light-splitter/manual/usage' },
                { text: 'Nuke 自动通道重组配置', link: '/zh/light-splitter/manual/nuke-setup' }
              ]
            }
          ],
          '/zh/aio-ocio/': [
            {
              text: 'AIO-OCIO',
              items: [
                { text: '概述', link: '/zh/aio-ocio/' }
              ]
            },
            {
              text: '用户手册',
              collapsed: false,
              items: [
                { text: '引言与兼容性标准', link: '/zh/aio-ocio/manual/' },
                { text: '通用软件色彩管理配置', link: '/zh/aio-ocio/manual/general-softwares' },
                { text: 'Blender 色彩管理配置手册', link: '/zh/aio-ocio/manual/blender-setup' }
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
            text: 'Écosystème',
            items: [
              {
                text: 'Plateforme Principale',
                items: [
                  { text: 'Industrial CG Platform', link: '/fr/cg-platform/' }
                ]
              },
              {
                text: 'Modules & Pipelines',
                items: [
                  { text: 'Guide des plugins', link: '/fr/pipeline-tools' },
                  { text: 'Industrial AOV Connector', link: '/fr/aov-connector/' },
                  { text: 'Industrial Light AOV Splitter', link: '/fr/light-splitter/' },
                  { text: 'AIO-OCIO', link: '/fr/aio-ocio/' }
                ]
              }
            ]
          },
          {
            text: 'Documentation',
            items: [
              {
                text: 'Manuel de Plateforme',
                items: [
                  { text: 'Guide Utilisateur', link: '/fr/cg-platform/guide/getting-started' },
                  { text: 'Référence des Fonctions', link: '/fr/cg-platform/features/deep-exr' },
                  { text: 'Référence API', link: '/fr/cg-platform/api/' },
                  { text: 'Notes de Version', link: '/fr/cg-platform/releases/' }
                ]
              },
              {
                text: 'Docs des Modules',
                items: [
                  { text: 'Industrial AOV Connector', link: '/fr/aov-connector/' },
                  { text: 'Industrial Light AOV Splitter', link: '/fr/light-splitter/' },
                  { text: 'AIO-OCIO', link: '/fr/aio-ocio/' }
                ]
              }
            ]
          },
          { text: 'Faire un don', link: '/fr/donate' },
          { text: 'À Propos', link: '/fr/cg-platform/about/' }
        ],
        sidebar: {
          '/fr/cg-platform/': [
            {
              text: 'Prise en Main',
              collapsed: false,
              items: [
                { text: 'À propos du projet', link: '/fr/cg-platform/about/' },
                { text: 'Premiers pas', link: '/fr/cg-platform/guide/getting-started' },
                { text: 'Installation', link: '/fr/cg-platform/guide/installation' },
                { text: 'Compilation depuis les sources', link: '/fr/cg-platform/guide/building-from-source' },
                { text: 'FAQ & Dépannage', link: '/fr/cg-platform/guide/faq' }
              ]
            },
            {
              text: 'Référence des Fonctions',
              collapsed: false,
              items: frFeatures
            },
            {
              text: 'Référence API',
              collapsed: true,
              items: frApi
            },
            {
              text: 'Notes de Version',
              collapsed: true,
              items: [
                { text: 'Index des versions', link: '/fr/cg-platform/releases/' }
              ]
            }
          ],
          '/fr/aov-connector/': [
            {
              text: 'Industrial AOV Connector',
              items: [
                { text: 'Aperçu', link: '/fr/aov-connector/' }
              ]
            },
            {
              text: "Manuel d'utilisation",
              collapsed: false,
              items: [
                { text: 'Introduction & Ordre de lecture', link: '/fr/aov-connector/manual/' },
                { text: 'Mode basique', link: '/fr/aov-connector/manual/basic-mode' },
                { text: 'Préférences', link: '/fr/aov-connector/manual/preference' },
                { text: 'Mode avancé', link: '/fr/aov-connector/manual/advanced-mode' },
                { text: 'Fake Deep', link: '/fr/aov-connector/manual/fakedeep' }
              ]
            }
          ],
          '/fr/light-splitter/': [
            {
              text: 'Industrial Light AOV Splitter',
              items: [
                { text: 'Aperçu', link: '/fr/light-splitter/' }
              ]
            },
            {
              text: "Manuel d'utilisation",
              collapsed: false,
              items: [
                { text: 'Introduction & Ordre de lecture', link: '/fr/light-splitter/manual/' },
                { text: 'Utilisation & Directives', link: '/fr/light-splitter/manual/usage' },
                { text: 'Configuration Auto-Shuffle', link: '/fr/light-splitter/manual/nuke-setup' }
              ]
            }
          ],
          '/fr/aio-ocio/': [
            {
              text: 'AIO-OCIO',
              items: [
                { text: 'Aperçu', link: '/fr/aio-ocio/' }
              ]
            },
            {
              text: "Manuel d'utilisation",
              collapsed: false,
              items: [
                { text: 'Introduction & Compatibilité', link: '/fr/aio-ocio/manual/' },
                { text: 'Configuration Générale', link: '/fr/aio-ocio/manual/general-softwares' },
                { text: 'Gestion des Couleurs Blender', link: '/fr/aio-ocio/manual/blender-setup' }
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
