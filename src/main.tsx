import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.less';
import dayjs from 'dayjs';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import { SWRConfig } from 'swr';
import 'dayjs/locale/zh-cn';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

dayjs.locale('zh-cn');

const swrConfig: React.ComponentProps<typeof SWRConfig>['value'] = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
  dedupingInterval: 3000,
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// 其他的一些配置可以根据实际情况加减 如 recoil jotai等
root.render(
  <React.StrictMode>
    <ConfigProvider locale={zh_CN}>
      <SWRConfig value={swrConfig}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SWRConfig>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
