import { MessageContext, defaultMessageContext } from 'contexts/MessageContext';
import { memo } from 'react';

import type { IAction, IMessageElement, IStep } from 'client-types/';
import { IMessageContext } from 'types/messageContext';

import { Messages } from './Messages';

interface Props {
  actions: IAction[];
  context: IMessageContext;
  elements: IMessageElement[];
  messages: IStep[];
  themeColor: string
}

const MessageContainer = memo(
  ({ actions, context, elements, messages, themeColor }: Props) => {
    return (
      <MessageContext.Provider value={context || defaultMessageContext}>
        <Messages
          indent={0}
          messages={messages}
          elements={elements}
          actions={actions}
          themeColor={themeColor}
        />
      </MessageContext.Provider>
    );
  }
);

export { MessageContainer };
