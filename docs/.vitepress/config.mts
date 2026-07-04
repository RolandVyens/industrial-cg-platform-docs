import { defineConfig } from 'vitepress'

// Shared nav/sidebar helpers mapped to the new /industrial-cg-platform/ nested structure
const enFeatures = [
  { text: 'Deep EXR', link: '/en/industrial-cg-platform/features/deep-exr' },
  { text: 'EXR Overscan', link: '/en/industrial-cg-platform/features/exr-overscan' },
  { text: 'Shadow Color', link: '/en/industrial-cg-platform/features/shadow-color' },
  { text: 'Lightgroup Lobe Passes', link: '/en/industrial-cg-platform/features/lightgroup-lobe-passes' },
  { text: 'ViewLayer Manager', link: '/en/industrial-cg-platform/features/viewlayer-manager' },
]

const zhFeatures = [
  { text: 'Deep EXR 深度输出', link: '/zh/industrial-cg-platform/features/deep-exr' },
  { text: 'EXR Overscan 溢画幅', link: '/zh/industrial-cg-platform/features/exr-overscan' },
  { text: '阴影颜色', link: '/zh/industrial-cg-platform/features/shadow-color' },
  { text: '灯光组分量通道', link: '/zh/industrial-cg-platform/features/lightgroup-lobe-passes' },
  { text: 'ViewLayer 管理器', link: '/zh/industrial-cg-platform/features/viewlayer-manager' },
]

const frFeatures = [
  { text: 'Deep EXR', link: '/fr/industrial-cg-platform/features/deep-exr' },
  { text: 'Overscan EXR', link: '/fr/industrial-cg-platform/features/exr-overscan' },
  { text: 'Couleur d\'ombre', link: '/fr/industrial-cg-platform/features/shadow-color' },
  { text: 'Passes par lobe de lightgroup', link: '/fr/industrial-cg-platform/features/lightgroup-lobe-passes' },
  { text: 'Gestionnaire de ViewLayer', link: '/fr/industrial-cg-platform/features/viewlayer-manager' },
]

const enApi = [
  { text: 'Overview', link: '/en/industrial-cg-platform/api/' },
  { text: 'Cycles Kernel Extensions', link: '/en/industrial-cg-platform/api/cycles-kernel' },
  { text: 'RNA Properties', link: '/en/industrial-cg-platform/api/rna-properties' },
  { text: 'Python Operators', link: '/en/industrial-cg-platform/api/python-operators' },
  { text: 'bQt Usage Guide', link: '/en/industrial-cg-platform/api/bqt-usage' },
  { text: 'Pass & AOV System', link: '/en/industrial-cg-platform/api/pass-system' },
]

const zhApi = [
  { text: '概述', link: '/zh/industrial-cg-platform/api/' },
  { text: 'Cycles 内核扩展', link: '/zh/industrial-cg-platform/api/cycles-kernel' },
  { text: 'RNA 属性', link: '/zh/industrial-cg-platform/api/rna-properties' },
  { text: 'Python 操作器', link: '/zh/industrial-cg-platform/api/python-operators' },
  { text: 'bQt 使用指南', link: '/zh/industrial-cg-platform/api/bqt-usage' },
  { text: 'Pass 与 AOV 系统', link: '/zh/industrial-cg-platform/api/pass-system' },
]

const frApi = [
  { text: 'Aperçu', link: '/fr/industrial-cg-platform/api/' },
  { text: 'Extensions du noyau Cycles', link: '/fr/industrial-cg-platform/api/cycles-kernel' },
  { text: 'Propriétés RNA', link: '/fr/industrial-cg-platform/api/rna-properties' },
  { text: 'Opérateurs Python', link: '/fr/industrial-cg-platform/api/python-operators' },
  { text: "Guide d'utilisation bQt", link: '/fr/industrial-cg-platform/api/bqt-usage' },
  { text: 'Système de passes et AOV', link: '/fr/industrial-cg-platform/api/pass-system' },
]

export default defineConfig({
  base: '/',
  title: 'Industrial 3D',
  description: 'Ecosystem of free & open-source CG & VFX pipeline tools',
  appearance: 'force-dark',
  sitemap: {
    hostname: 'https://cgweave.com'
  },

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap' }],
    ['meta', { name: 'theme-color', content: '#7c4dff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Industrial 3D Ecosystem' }],
    ['meta', { property: 'og:description', content: 'Free and open-source CG & VFX pipeline tools by Roland Vyens' }],
    ['meta', { 'http-equiv': 'Content-Security-Policy', content: "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; connect-src 'self' https://cloudflareinsights.com;" }],
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
                  { text: 'Industrial CG Platform', link: '/en/industrial-cg-platform/' }
                ]
              },
              {
                text: 'Pipeline Plugins & Colors',
                items: [
                  { text: 'Addon Directory', link: '/en/industrial-pipeline-tools' },
                  { text: 'Industrial AOV Connector', link: '/en/industrial-aov-connector/' },
                  { text: 'Industrial Light AOV Splitter', link: '/en/industrial-light-aov-splitter/' },
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
                  { text: 'User Guide', link: '/en/industrial-cg-platform/guide/getting-started' },
                  { text: 'Features Reference', link: '/en/industrial-cg-platform/features/deep-exr' },
                  { text: 'API Reference', link: '/en/industrial-cg-platform/api/' },
                  { text: 'Release Notes', link: '/en/industrial-cg-platform/releases/' }
                ]
              },
              {
                text: 'Addon Manuals',
                items: [
                  { text: 'Industrial AOV Connector', link: '/en/industrial-aov-connector/' },
                  { text: 'Industrial Light AOV Splitter', link: '/en/industrial-light-aov-splitter/' },
                  { text: 'AIO-OCIO', link: '/en/aio-ocio/' }
                ]
              }
            ]
          },
          { text: 'Blog', link: '/blog/' },
          { text: 'Donate', link: '/en/donate' },
          { text: 'About', link: '/en/industrial-cg-platform/about/' }
        ],
        sidebar: {
          '/en/industrial-cg-platform/': [
            {
              text: 'Getting Started',
              collapsed: false,
              items: [
                { text: 'About the Project', link: '/en/industrial-cg-platform/about/' },
                { text: 'Getting Started', link: '/en/industrial-cg-platform/guide/getting-started' },
                { text: 'Installation', link: '/en/industrial-cg-platform/guide/installation' },
                { text: 'Building from Source', link: '/en/industrial-cg-platform/guide/building-from-source' },
                { text: 'FAQ & Troubleshooting', link: '/en/industrial-cg-platform/guide/faq' }
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
                { text: 'Release Index', link: '/en/industrial-cg-platform/releases/' }
              ]
            }
          ],
          '/en/industrial-aov-connector/': [
            {
              text: 'Industrial AOV Connector',
              items: [
                { text: 'Overview', link: '/en/industrial-aov-connector/' }
              ]
            },
            {
              text: 'User Manual',
              collapsed: false,
              items: [
                { text: 'Introduction & Read Order', link: '/en/industrial-aov-connector/manual/' },
                { text: 'Basic Mode', link: '/en/industrial-aov-connector/manual/basic-mode' },
                { text: 'Preferences', link: '/en/industrial-aov-connector/manual/preference' },
                { text: 'Advanced Mode', link: '/en/industrial-aov-connector/manual/advanced-mode' },
                { text: 'Fake Deep', link: '/en/industrial-aov-connector/manual/fakedeep' }
              ]
            }
          ],
          '/en/industrial-light-aov-splitter/': [
            {
              text: 'Industrial Light AOV Splitter',
              items: [
                { text: 'Overview', link: '/en/industrial-light-aov-splitter/' }
              ]
            },
            {
              text: 'User Manual',
              collapsed: false,
              items: [
                { text: 'Introduction & Read Order', link: '/en/industrial-light-aov-splitter/manual/' },
                { text: 'Usage & Guidelines', link: '/en/industrial-light-aov-splitter/manual/usage' },
                { text: 'Nuke Auto-Shuffle Setup', link: '/en/industrial-light-aov-splitter/manual/nuke-setup' }
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
                  { text: 'Industrial CG Platform', link: '/zh/industrial-cg-platform/' }
                ]
              },
              {
                text: '流程插件与色彩',
                items: [
                  { text: '插件导览', link: '/zh/industrial-pipeline-tools' },
                  { text: 'Industrial AOV Connector', link: '/zh/industrial-aov-connector/' },
                  { text: 'Industrial Light AOV Splitter', link: '/zh/industrial-light-aov-splitter/' },
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
                  { text: '用户指南', link: '/zh/industrial-cg-platform/guide/getting-started' },
                  { text: '功能介绍', link: '/zh/industrial-cg-platform/features/deep-exr' },
                  { text: 'API 参考手册', link: '/zh/industrial-cg-platform/api/' },
                  { text: '版本发布记录', link: '/zh/industrial-cg-platform/releases/' }
                ]
              },
              {
                text: '插件文档',
                items: [
                  { text: 'Industrial AOV Connector', link: '/zh/industrial-aov-connector/' },
                  { text: 'Industrial Light AOV Splitter', link: '/zh/industrial-light-aov-splitter/' },
                  { text: 'AIO-OCIO', link: '/zh/aio-ocio/' }
                ]
              }
            ]
          },
          { text: '博客', link: '/blog/' },
          { text: '赞助', link: '/zh/donate' },
          { text: '关于', link: '/zh/industrial-cg-platform/about/' }
        ],
        sidebar: {
          '/zh/industrial-cg-platform/': [
            {
              text: '快速入门',
              collapsed: false,
              items: [
                { text: '关于项目', link: '/zh/industrial-cg-platform/about/' },
                { text: '快速开始', link: '/zh/industrial-cg-platform/guide/getting-started' },
                { text: '安装指南', link: '/zh/industrial-cg-platform/guide/installation' },
                { text: '从源码构建', link: '/zh/industrial-cg-platform/guide/building-from-source' },
                { text: '常见问题与解答', link: '/zh/industrial-cg-platform/guide/faq' }
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
                { text: '发布索引', link: '/zh/industrial-cg-platform/releases/' }
              ]
            }
          ],
          '/zh/industrial-aov-connector/': [
            {
              text: 'Industrial AOV Connector',
              items: [
                { text: '概述', link: '/zh/industrial-aov-connector/' }
              ]
            },
            {
              text: '用户手册',
              collapsed: false,
              items: [
                { text: '引言与推荐阅读顺序', link: '/zh/industrial-aov-connector/manual/' },
                { text: '基础模式', link: '/zh/industrial-aov-connector/manual/basic-mode' },
                { text: '偏好设置', link: '/zh/industrial-aov-connector/manual/preference' },
                { text: '高级模式', link: '/zh/industrial-aov-connector/manual/advanced-mode' },
                { text: 'Fake Deep', link: '/zh/industrial-aov-connector/manual/fakedeep' }
              ]
            }
          ],
          '/zh/industrial-light-aov-splitter/': [
            {
              text: 'Industrial Light AOV Splitter',
              items: [
                { text: '概述', link: '/zh/industrial-light-aov-splitter/' }
              ]
            },
            {
              text: '用户手册',
              collapsed: false,
              items: [
                { text: '引言与推荐阅读顺序', link: '/zh/industrial-light-aov-splitter/manual/' },
                { text: '使用说明与规范', link: '/zh/industrial-light-aov-splitter/manual/usage' },
                { text: 'Nuke 自动通道重组配置', link: '/zh/industrial-light-aov-splitter/manual/nuke-setup' }
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
                  { text: 'Industrial CG Platform', link: '/fr/industrial-cg-platform/' }
                ]
              },
              {
                text: 'Modules & Pipelines',
                items: [
                  { text: 'Guide des plugins', link: '/fr/industrial-pipeline-tools' },
                  { text: 'Industrial AOV Connector', link: '/fr/industrial-aov-connector/' },
                  { text: 'Industrial Light AOV Splitter', link: '/fr/industrial-light-aov-splitter/' },
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
                  { text: 'Guide Utilisateur', link: '/fr/industrial-cg-platform/guide/getting-started' },
                  { text: 'Référence des Fonctions', link: '/fr/industrial-cg-platform/features/deep-exr' },
                  { text: 'Référence API', link: '/fr/industrial-cg-platform/api/' },
                  { text: 'Notes de Version', link: '/fr/industrial-cg-platform/releases/' }
                ]
              },
              {
                text: 'Docs des Modules',
                items: [
                  { text: 'Industrial AOV Connector', link: '/fr/industrial-aov-connector/' },
                  { text: 'Industrial Light AOV Splitter', link: '/fr/industrial-light-aov-splitter/' },
                  { text: 'AIO-OCIO', link: '/fr/aio-ocio/' }
                ]
              }
            ]
          },
          { text: 'Blog', link: '/blog/' },
          { text: 'Faire un don', link: '/fr/donate' },
          { text: 'À Propos', link: '/fr/industrial-cg-platform/about/' }
        ],
        sidebar: {
          '/fr/industrial-cg-platform/': [
            {
              text: 'Prise en Main',
              collapsed: false,
              items: [
                { text: 'À propos du projet', link: '/fr/industrial-cg-platform/about/' },
                { text: 'Premiers pas', link: '/fr/industrial-cg-platform/guide/getting-started' },
                { text: 'Installation', link: '/fr/industrial-cg-platform/guide/installation' },
                { text: 'Compilation depuis les sources', link: '/fr/industrial-cg-platform/guide/building-from-source' },
                { text: 'FAQ & Dépannage', link: '/fr/industrial-cg-platform/guide/faq' }
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
                { text: 'Index des versions', link: '/fr/industrial-cg-platform/releases/' }
              ]
            }
          ],
          '/fr/industrial-aov-connector/': [
            {
              text: 'Industrial AOV Connector',
              items: [
                { text: 'Aperçu', link: '/fr/industrial-aov-connector/' }
              ]
            },
            {
              text: "Manuel d'utilisation",
              collapsed: false,
              items: [
                { text: 'Introduction & Ordre de lecture', link: '/fr/industrial-aov-connector/manual/' },
                { text: 'Mode basique', link: '/fr/industrial-aov-connector/manual/basic-mode' },
                { text: 'Préférences', link: '/fr/industrial-aov-connector/manual/preference' },
                { text: 'Mode avancé', link: '/fr/industrial-aov-connector/manual/advanced-mode' },
                { text: 'Fake Deep', link: '/fr/industrial-aov-connector/manual/fakedeep' }
              ]
            }
          ],
          '/fr/industrial-light-aov-splitter/': [
            {
              text: 'Industrial Light AOV Splitter',
              items: [
                { text: 'Aperçu', link: '/fr/industrial-light-aov-splitter/' }
              ]
            },
            {
              text: "Manuel d'utilisation",
              collapsed: false,
              items: [
                { text: 'Introduction & Ordre de lecture', link: '/fr/industrial-light-aov-splitter/manual/' },
                { text: 'Utilisation & Directives', link: '/fr/industrial-light-aov-splitter/manual/usage' },
                { text: 'Configuration Auto-Shuffle', link: '/fr/industrial-light-aov-splitter/manual/nuke-setup' }
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
      message: 'Released under the Blender License (GNU GPL v3 or later).',
      copyright: 'Copyright © 2026 RolandVyens',
    },
    nav: [
      {
        text: 'Ecosystem',
        items: [
          {
            text: 'Core Platform',
            items: [
              { text: 'Industrial CG Platform', link: '/en/industrial-cg-platform/' }
            ]
          },
          {
            text: 'Pipeline Plugins & Colors',
            items: [
              { text: 'Addon Directory', link: '/en/industrial-pipeline-tools' },
              { text: 'Industrial AOV Connector', link: '/en/industrial-aov-connector/' },
              { text: 'Industrial Light AOV Splitter', link: '/en/industrial-light-aov-splitter/' },
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
              { text: 'User Guide', link: '/en/industrial-cg-platform/guide/getting-started' },
              { text: 'Features Reference', link: '/en/industrial-cg-platform/features/deep-exr' },
              { text: 'API Reference', link: '/en/industrial-cg-platform/api/' },
              { text: 'Release Notes', link: '/en/industrial-cg-platform/releases/' }
            ]
          },
          {
            text: 'Addon Manuals',
            items: [
              { text: 'Industrial AOV Connector', link: '/en/industrial-aov-connector/' },
              { text: 'Industrial Light AOV Splitter', link: '/en/industrial-light-aov-splitter/' },
              { text: 'AIO-OCIO', link: '/en/aio-ocio/' }
            ]
          }
        ]
      },
      { text: 'Blog', link: '/blog/' },
      { text: 'Donate', link: '/en/donate' },
      { text: 'About', link: '/en/industrial-cg-platform/about/' }
    ]
  },

  lastUpdated: true,
  cleanUrls: true,
})
