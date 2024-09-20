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
  themeColor: string;
  hideFeedback: boolean;
  fontColor: string;
  avatarUrl: string;
}

const MessageContainer = memo(
  ({
    actions,
    context,
    elements,
    messages,
    themeColor,
    hideFeedback,
    fontColor,
    avatarUrl
  }: Props) => {
    return (
      <MessageContext.Provider value={context || defaultMessageContext}>
        <Messages
          avatarUrl={avatarUrl}
          indent={0}
          messages={messages}
          elements={elements}
          actions={actions}
          themeColor={themeColor}
          hideFeedback={hideFeedback}
          fontColor={fontColor}
        />
      </MessageContext.Provider>
    );
  }
);

export { MessageContainer };
