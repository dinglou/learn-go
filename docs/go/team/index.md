---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection,
} from 'vitepress/theme'

const coreMembers = [
  {
    avatar: './assets/favicon.png',
    name: '三毛笔记',
    title: '创建者',
    links: [
      { icon: 'github', link: 'https://github.com/dinglou/learn-go' },
      // { icon: 'discord', link: 'https://twitter.com/youyuxi' },
      // { icon: 'discord', link: 'https://twitter.com/youyuxi' },
    ],
  },
  // {
  //   avatar: 'https://www.github.com/kiaking.png',
  //   name: 'Kia King Ishii',
  //   title: 'Developer',
  //   links: [
  //     { icon: 'github', link: 'https://github.com/kiaking' },
  //     { icon: 'twitter', link: 'https://twitter.com/KiaKing85' },
  //   ],
  // },
]

const partners = [
  {
    avatar: './assets/favicon.png',
    name: '三毛笔记',
    title: '创建者',
    links: [
      { icon: 'github', link: 'https://github.com/dinglou/learn-go' },
      // { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ],
  },
  // {
  //   avatar: 'https://www.github.com/kiaking.png',
  //   name: 'Kia King Ishii',
  //   title: 'Developer',
  //   links: [
  //     { icon: 'github', link: 'https://github.com/kiaking' },
  //     { icon: 'twitter', link: 'https://twitter.com/KiaKing85' },
  //   ],
  // },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>我们的团队</template>
    <template #lead>
    哈哈哈，没有团队，就我一个人...
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="coreMembers" />
  <VPTeamPageSection>
    <template #title>合作伙伴</template>
    <template #lead>
    这是我们的合作伙伴。
    </template>
    <template #members>
      <VPTeamMembers size="small" :members="partners" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
