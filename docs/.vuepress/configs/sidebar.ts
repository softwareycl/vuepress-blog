import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
  '/vue/': [
    {
      text: '国际化',
      collapsible: true,
      children: [
        '/vue/Vue-I18n.md',
        '/vue/1.md',
        '/vue/2.md',
      ],
    },
    {
      text: '路由',
      collapsible: true,
      children: [
        '/vue/3.md',
      ],
    },
  ],
  '/technology/': [
    {
      text: '博客搭建',
      collapsible: true,
      children: [
        '/technology/github-pages.md',
        '/technology/vuePress.md',
      ],
    },
  ],
}