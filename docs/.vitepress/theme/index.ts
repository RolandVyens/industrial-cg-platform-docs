import DefaultTheme from 'vitepress/theme'
import { useRoute, useRouter } from 'vitepress'
import { computed, defineComponent, h, onBeforeUnmount, onMounted, Transition } from 'vue'
import './custom.css'

const DynamicBrandLayout = defineComponent({
  name: 'DynamicBrandLayout',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const isPlatformSection = computed(() => {
      const p = route.path
      return p.includes('/industrial-cg-platform') || p.includes('/feature-tracking')
    })

    const brandTitle = computed(() =>
      isPlatformSection.value ? 'Industrial CG Platform' : 'Industrial 3D'
    )

    const getLocalePrefix = (path: string) => {
      if (path.startsWith('/zh/') || path === '/zh') return '/zh'
      if (path.startsWith('/fr/') || path === '/fr') return '/fr'
      return '/en'
    }

    const handleTopNavGroupClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const button = target.closest('.VPNavBarMenu .VPNavBarMenuGroup > .button') as HTMLElement | null
      if (!button) return

      // Touch/pen devices have no hover, so the first tap must open the dropdown
      // instead of navigating away; otherwise the submenu becomes unreachable.
      const pointerType = (e as PointerEvent).pointerType
      if (pointerType === 'touch' || pointerType === 'pen') return

      // Identify the group by the links it contains rather than its visible label,
      // so renaming/translating nav text in config.mts does not break this behavior.
      const group = button.closest('.VPNavBarMenuGroup')
      if (!group) return

      const localePrefix = getLocalePrefix(window.location.pathname)

      let dest: string | null = null
      if (group.querySelector('a[href*="/industrial-pipeline-tools"]')) {
        dest = `${localePrefix}/industrial-pipeline-tools`
      } else if (group.querySelector('a[href*="/industrial-cg-platform/"]')) {
        dest = `${localePrefix}/industrial-cg-platform/`
      }

      if (dest) {
        e.preventDefault()
        e.stopPropagation()
        button.blur()
        router.go(dest)
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleTopNavGroupClick, true)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleTopNavGroupClick, true)
    })

    return () =>
      h(DefaultTheme.Layout, null, {
        'nav-bar-title-after': () =>
          h(
            Transition,
            { name: 'vp-brand-switch', mode: 'out-in' },
            () => h('span', { key: brandTitle.value, class: 'vp-dynamic-brand-title' }, brandTitle.value)
          )
      })
  }
})

export default {
  extends: DefaultTheme,
  Layout: DynamicBrandLayout
}
