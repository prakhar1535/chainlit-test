import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// @ts-expect-error inlined
import clStyles from '@chainlit/app/src/App.css?inline';
import { IStep } from '@chainlit/react-client';

// @ts-expect-error inlined
import sonnerCss from './sonner.css?inline';
// @ts-expect-error inlined
import hljsStyles from 'highlight.js/styles/monokai-sublime.css?inline';

import AppWrapper from './src/appWrapper';
import { IWidgetConfig } from './src/types';

const id = 'chainlit-copilot';
let root: ReactDOM.Root | null = null;

declare global {
  interface Window {
    cl_shadowRootElement: HTMLDivElement;
    mountChainlitWidget: (config: IWidgetConfig) => void;
    unmountChainlitWidget: () => void;
    sendChainlitMessage: (message: IStep) => void;
    cl_chatbotId: string;  // Add this line
  }
}

window.mountChainlitWidget = (config: IWidgetConfig) => {
  const container = document.createElement('div');
  container.id = id;
  document.body.appendChild(container);

  const shadowContainer = container.attachShadow({ mode: 'open' });
  const shadowRootElement = document.createElement('div');
  shadowRootElement.id = 'cl-shadow-root';
  shadowContainer.appendChild(shadowRootElement);

  const cache = createCache({
    key: 'css',
    prepend: true,
    container: shadowContainer
  });

  window.cl_shadowRootElement = shadowRootElement;
  window.cl_chatbotId = config.chatBotID || "";  
  // Send chatbotId to backend

  root = ReactDOM.createRoot(shadowRootElement);
  root.render(
    <React.StrictMode>
      <CacheProvider value={cache}>
        <style type="text/css">
          {clStyles}
          {hljsStyles}
          {sonnerCss}
        </style>
        <AppWrapper widgetConfig={config} />
      </CacheProvider>
    </React.StrictMode>
  );
};

window.unmountChainlitWidget = () => {
  root?.unmount();
};

window.sendChainlitMessage = (message: IStep) => {
  // Include chatbotId in the message
  const messageWithChatbotId = {
    ...message,
    chatbotId: window.cl_chatbotId,
  };
  
  // Here you would typically send this message to your backend
  console.info('Sending message with chatbotId:', messageWithChatbotId);
};