import React from 'react'
import ReactDOM from 'react-dom/client'
import vkBridge from '@vkontakte/vk-bridge'
import { AdaptivityProvider, ConfigProvider, AppRoot } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import App from './App'

vkBridge.send('VKWebAppInit')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <App />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  </React.StrictMode>
)