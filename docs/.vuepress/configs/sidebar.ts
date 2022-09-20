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
  '/collection/': [
    {
      text: '网站',
      collapsible: true,
      children: [
        '/collection/CL网站.md',
      ],
    },
    {
      text: 'evan的收藏',
      collapsible: true,
      children: [
        '/collection/网站.md',
        '/collection/常用的前端轮子.md',
      ],
    }
  ],
}