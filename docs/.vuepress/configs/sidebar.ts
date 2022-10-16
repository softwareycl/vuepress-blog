/*
 * @Author: CL
 * @Date: 2022-09-18 22:14:11
 * @LastEditors: CL
 * @LastEditTime: 2022-10-16 15:57:24
 * @Description: 
 */
import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
  '/vue/': [
    {
      text: '国际化',
      collapsible: true,
      children: [
        '/vue/Vue-I18n.md',
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
    }
  ],
}