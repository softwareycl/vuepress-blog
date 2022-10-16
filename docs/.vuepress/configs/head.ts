import type { HeadConfig } from '@vuepress/core'

export const head: HeadConfig[] = [
  [
    'link',
    {
      rel: 'icon',
      href: `/vuepress-blog/images/favicon.ico`,
    },
  ],
  [
    'link',
    { rel: 'apple-touch-icon', href: `/vuepress-blog/images/logo.png` },
  ],
  ['meta', { name: 'msapplication-TileColor', content: '#3eaf7c' }],
  ['meta', { name: 'theme-color', content: '#3eaf7c' }],
]