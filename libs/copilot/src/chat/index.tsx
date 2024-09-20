import { WidgetContext } from 'context';
import { useContext, useEffect } from 'react';

import { useChatInteract, useChatSession } from '@chainlit/react-client';

import ChatBody from './body';

interface ChatMessage {
  role: 'user' | 'assistant';
  message: string;
}
export default function ChatWrapper({
  themeColor,
  hideFeedback,
  fontColor,
  branding,
  avatarUrl,
  chatHistory
}: {
  themeColor: string;
  hideFeedback: boolean;
  fontColor: string;
  branding: boolean;
  avatarUrl: string;
  chatHistory: ChatMessage[];
}) {
  const { accessToken } = useContext(WidgetContext);
  const { connect, session } = useChatSession();
  const { sendMessage } = useChatInteract();
  useEffect(() => {
    if (session?.socket?.connected) return;
    connect({
      userEnv: {},
      accessToken: `Bearer ${accessToken}`
    });
  }, [connect, accessToken]);

  useEffect(() => {
    // @ts-expect-error is not a valid prop
    window.sendChainlitMessage = sendMessage;
  }, [sendMessage]);

  return (
    <ChatBody
      chatHistory={chatHistory}
      avatarUrl={avatarUrl}
      branding={branding}
      fontColor={fontColor}
      hideFeedback={hideFeedback}
      themeColor={themeColor}
    />
  );
}
