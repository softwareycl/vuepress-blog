/*
 * @Author: CL
 * @Date: 2022-09-18 22:14:11
 * @LastEditors: CL
 * @LastEditTime: 2023-09-16 22:19:43
 * @Description: 
 */
import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
  '/framework/vue3': [
    {
      text: 'Vue3',
      collapsible: true,
      children: [
        '/framework/vue3/README.md',
      ],
    },
  ],
  '/framework/react': [
    {
      text: 'React',
      collapsible: true,
      children: [
        '/framework/react/react学习分享.md',
      ],
    },
  ],
  '/framework/other': [
    {
      text: '国际化',
      collapsible: true,
      children: [
        '/framework/other/Vue-I18n.md',
      ],
    },
  ],
  '/note/': [
    {
      text: '工作',
      collapsible: true,
      children: [
        '/note/work/首脑.md',
        {
          text: '广交会数字化平台项目',
          children: [
            '/note/work/广交会-知识产权投诉系统.md',
          ]
        }
      ],
    },
  ],
  '/technology/': [
    {
      text: '技术',
      collapsible: true,
      children: [
        '/technology/github-pages.md',
        '/technology/vuePress.md',
        '/technology/chrome调试技巧.md',
      ],
    },
  ],
  '/more/interview/': [
    {
      text: '面试',
      collapsible: true,
      children: [
        '/more/interview/js.md',
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
    }
  ],
}