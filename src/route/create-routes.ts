import { createElement } from 'react';
import { Routes, Route, Location, Navigate } from 'react-router-dom';

type IComponent = React.ComponentType<any>;

export interface RoutesConfig {
  /** 区分大小写 */
  caseSensitive?: boolean;
  /** 子路由 */
  routes?: RoutesConfig[];
  // element?: string | IComponent;
  component?: string | IComponent;
  /** 是否默认子路由 */
  index?: boolean;
  /** 存在index属性时，path会被忽略 */
  path?: string;
  name?: string;
  title?: string;
  redirect?: string;
  wrappers?: IComponent[];
  /** 隐藏当前menu */
  hideInMenu?: boolean;
  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
  /** 隐藏子menu */
  hideChildrenInMenu?: boolean;
  /** 路由唯一值 */
  uuid?: string;
  /** 当前路由下是否收缩侧边栏 */
  shrinkSiderMenu?: boolean;
}

// 创建组件元素
function createComponentElement(route: RoutesConfig) {
  let { component: Component, wrappers } = route;
  if (Component) {
    let ret = createElement(Component);

    if (wrappers) {
      let len = wrappers.length - 1;
      while (len >= 0) {
        ret = createElement(wrappers[len], null, ret);
        len -= 1;
      }
    }

    return ret;
  }
}

// 创建Route元素
function createRoute(
  { path, index, caseSensitive, uuid, ...rest }: RoutesConfig,
  i: number
) {
  const key = uuid || path || i;
  const props = index ? { index: true } : { path };

  // 重定向
  if (rest.redirect) {
    return createElement(Route, {
      key,
      ...props,
      caseSensitive,
      element: createElement(Navigate, { replace: true, to: rest.redirect }),
    });
  }

  return createElement(
    Route,
    {
      key,
      ...props,
      caseSensitive,
      element: createComponentElement(rest),
    },
    createRouteList(rest.routes)
  );
}

// 创建route列表
export function createRouteList(
  routes?: RoutesConfig[]
): null | React.ReactNode[] {
  if (routes && routes.length) {
    return routes.map((item, index) => createRoute(item, index));
  }
  return null;
}

// 创建routes元素
export default function createRoutes(
  routes?: RoutesConfig[],
  location?: Location
) {
  return createElement(Routes, location, createRouteList(routes));
}
