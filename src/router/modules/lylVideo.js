import Layout from '@/layout'

const lylVideoRouter = {
  path: '/lylvideo',
  component: Layout,
  redirect: '/lylvideo/remotecontrolMain',
  name: 'lylvideo2',
  meta: {
    title: '流媒体产品',
    icon: 'nested',
  },
  children: [
    {
      path: 'remotecontrolMain',
      component: () => import('@/views/lylVideo/machineRemote/remotecontrolMain.vue'),
      name: 'remotecontrolMain',
      meta: { title: '远程控制', keepAlive: true, affix: true },
    },
    {
      path: 'machineRemote',
      hidden: true,
      component: () => import('@/views/lylVideo/machineRemote/machineRemote.vue'),
      name: 'machineRemote',
      meta: { title: '远程控制窗口', keepAlive: true, affix: true },
    },
    {
      path: 'liveplay',
      component: () => import('@/views/lylVideo/videoPlay/videoPlay.vue'),
      name: 'liveplay',
      meta: { title: '视频直播', keepAlive: true },
    },
  ],
}

export default lylVideoRouter
