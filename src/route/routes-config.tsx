import loadable from '@loadable/component';
import Icon from '@ant-design/icons';
import type { RoutesConfig } from './create-routes';
import { ShowIcon } from './icon';

// 基础路由配置

const routesConfig: RoutesConfig[] = [
  {
    path: '/',
    uuid: '56BF0C8FA4E4482242BD2D7CC2213AFCD7',
    // component: loadable(() => import('src/pages/home')),
    routes: [
      {
        index: true,
        name: '首页',
        uuid: '49C508E6067A47AC9615503DD32FAA7D',
        icon: <Icon component={ShowIcon} />,
        activeIcon: <Icon component={ShowIcon} />,
        component: loadable(() => import('src/pages/home')),
      },
      {
        path: '/otherPage',
        name: '其他页面',
        uuid: 'dsadas2312312312313',
        icon: <Icon component={ShowIcon} />,
        activeIcon: <Icon component={ShowIcon} />,
        component: loadable(() => import('src/pages/test')),
      },
      {
        path: '/three',
        name: '可视化',
        uuid: 'sdw343434',
        icon: <Icon component={ShowIcon} />,
        activeIcon: <Icon component={ShowIcon} />,
        component: loadable(() => import('src/pages/Three')),
      },
    ],
  },
  // {
  //   path: 'example',
  //   name: '示例数据',
  //   uuid: 'aascasce3rr4r4t',
  //   icon: <Icon component={ShowIcon} />,
  //   activeIcon: <Icon component={ShowIcon} />,
  //   component: loadable(() => import('src/pages/Example')),
  // },
  // {
  //   path: '*',
  //   name: '404',
  //   uuid: 'ascscscsdfw3e3e3',
  //   // redirect: '/', // 要展示404就把这行去掉 匹配不到路由会自动跳转到首页
  //   icon: <Icon component={ShowIcon} />,
  //   activeIcon: <Icon component={ShowIcon} />,
  //   component: loadable(() => import('src/pages/NotFound')),
  // },
];

export default routesConfig;
