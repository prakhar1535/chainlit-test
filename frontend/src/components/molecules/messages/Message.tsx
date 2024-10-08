import { keyframes } from '@emotion/react';
import { MessageContext } from 'contexts/MessageContext';
import { memo, useContext, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { useConfig } from '@chainlit/react-client';

// import { AskUploadButton } from './components/AskUploadButton';
import { MessageAvatar } from './components/Avatar';
import { MessageActions } from './components/MessageActions';
import { MessageButtons } from './components/MessageButtons';
import { MessageContent } from './components/MessageContent';

import { useLayoutMaxWidth } from 'hooks/useLayoutMaxWidth';

import { type IAction, type IMessageElement, type IStep } from 'client-types/';

import { Messages } from './Messages';
import Step from './Step';
import UserMessage from './UserMessage';

interface Props {
  message: IStep;
  showAvatar?: boolean;
  elements: IMessageElement[];
  actions: IAction[];
  indent: number;
  isRunning?: boolean;
  isScorable?: boolean;
  scorableRun?: IStep;
  themeColor: string;
  hideFeedback: boolean;
  fontColor: string;
  avatarUrl: string;
}

const Message = memo(
  ({
    message,
    showAvatar = true,
    elements,
    actions,
    isRunning,
    indent,
    isScorable,
    scorableRun,
    themeColor,
    hideFeedback,
    fontColor,
    avatarUrl
  }: Props) => {
    const {
      highlightedMessage,
      defaultCollapseContent,
      allowHtml,
      latex,
      onError
    } = useContext(MessageContext);
    const { config } = useConfig();
    const layoutMaxWidth = useLayoutMaxWidth();
    const isAsk = message.waitForAnswer;
    const isUserMessage = message.type === 'user_message';
    const isStep = !message.type.includes('message');

    // Only keep tool calls if Chain of Thought is tool_call
    const toolCallSkip =
      isStep && config?.ui.cot === 'tool_call' && message.type !== 'tool';

    const hiddenSkip = isStep && config?.ui.cot === 'hidden';

    const skip = toolCallSkip || hiddenSkip;

    if (skip) {
      if (!message.steps) {
        return null;
      }
      return (
        <Messages
          avatarUrl={avatarUrl}
          messages={message.steps}
          elements={elements}
          actions={actions}
          indent={indent}
          isRunning={isRunning}
          scorableRun={scorableRun}
          themeColor={themeColor}
          hideFeedback={hideFeedback}
          fontColor={fontColor}
        />
      );
    }
    useEffect(() => {
      if (isUserMessage) {
        console.log(message, 'user-message');
      }
      if (!message.steps || message.steps.length === 0) {
        console.log(message, 'bot-message');
      }
    }, []);
    return (
      <>
        <Box
          sx={{
            color: 'text.primary',
            position: 'relative'
          }}
          className="step"
        >
          <Box
            sx={{
              boxSizing: 'border-box',
              mx: 'auto',
              width: '100%',
              maxWidth: indent ? '100%' : layoutMaxWidth,
              px: 2,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            <Stack
              id={`step-${message.id}`}
              direction="row"
              sx={{
                pb: indent ? 1 : 2,
                flexGrow: 1,
                animation:
                  message.id && highlightedMessage === message.id
                    ? `3s ease-in-out 0.1s ${flash}`
                    : 'none'
              }}
            >
              {/* User message is displayed differently */}
              {isUserMessage ? (
                <Box display="flex" flexDirection="column" flexGrow={1}>
                  <UserMessage
                    message={message}
                    isUserContent="chat-user-message"
                  >
                    <MessageContent
                      message={message}
                      linkColor="black"
                      elements={elements}
                      preserveSize={
                        !!message.streaming || !defaultCollapseContent
                      }
                      allowHtml={allowHtml}
                      latex={latex}
                      style={{
                        color: 'black'
                      }}
                    />
                  </UserMessage>
                </Box>
              ) : (
                <Stack
                  direction="row"
                  gap="1rem"
                  width="fit-content"
                  className="ai-message"
                  maxWidth={'70%'}
                >
                  {!isStep || !indent ? (
                    <MessageAvatar
                      avatarUrl={avatarUrl}
                      author={message.name}
                      hide={!showAvatar}
                    />
                  ) : null}
                  {/* Display the step and its children */}
                  {isStep ? (
                    <Step step={message} isRunning={isRunning}>
                      {message.steps ? (
                        <Messages
                          avatarUrl={avatarUrl}
                          messages={message.steps.filter(
                            (s) => !s.type.includes('message')
                          )}
                          elements={elements}
                          actions={actions}
                          indent={indent + 1}
                          isRunning={isRunning}
                          themeColor={themeColor}
                          hideFeedback={hideFeedback}
                          fontColor={fontColor}
                        />
                      ) : null}
                      <MessageContent
                        linkColor={fontColor}
                        elements={elements}
                        message={message}
                        preserveSize={
                          !!message.streaming || !defaultCollapseContent
                        }
                        allowHtml={allowHtml}
                        latex={latex}
                      />
                      {actions?.length ? (
                        <MessageActions message={message} actions={actions} />
                      ) : null}
                      <MessageButtons
                        hideFeedback={hideFeedback}
                        message={message}
                      />
                    </Step>
                  ) : (
                    // Display an assistant message
                    <Stack
                      alignItems="flex-start"
                      minWidth={150}
                      flexGrow={1}
                      position="relative"
                    >
                      <MessageContent
                        linkColor={fontColor}
                        style={{
                          backgroundColor:
                            themeColor !== themeColor
                              ? '#ededed'
                              : `${themeColor}`,
                          padding: '12px',
                          borderRadius: '6px',
                          color: fontColor !== '' ? fontColor : 'unset'
                        }}
                        elements={elements}
                        message={message}
                        preserveSize={
                          !!message.streaming || !defaultCollapseContent
                        }
                        allowHtml={allowHtml}
                        latex={latex}
                      />
                      {/* {!isRunning && isAsk && (
                        <AskUploadButton onError={onError} />
                      )} */}
                      {actions?.length ? (
                        <MessageActions message={message} actions={actions} />
                      ) : null}
                      {scorableRun && isScorable ? (
                        <MessageButtons
                          hideFeedback={hideFeedback}
                          message={message}
                          run={scorableRun}
                        />
                      ) : null}
                    </Stack>
                  )}
                </Stack>
              )}
            </Stack>
          </Box>
        </Box>
        {/* Make sure the child assistant messages of a step are displayed at the root level. */}
        {message.steps && isStep ? (
          <Messages
            avatarUrl={avatarUrl}
            messages={message.steps.filter((s) => s.type.includes('message'))}
            elements={elements}
            actions={actions}
            indent={0}
            isRunning={isRunning}
            scorableRun={scorableRun}
            themeColor={themeColor}
            hideFeedback={hideFeedback}
            fontColor={fontColor}
          />
        ) : null}
        {/* Display the child steps if the message is not a step (usually a user message). */}
        {message.steps && !isStep ? (
          <Messages
            avatarUrl={avatarUrl}
            messages={message.steps}
            elements={elements}
            actions={actions}
            indent={isUserMessage ? indent : indent + 1}
            isRunning={isRunning}
            themeColor={themeColor}
            hideFeedback={hideFeedback}
            fontColor={fontColor}
          />
        ) : null}
      </>
    );
  }
);

// Uses yellow[500] with 50% opacity
const flash = keyframes`
  from {
    background-color: transparent;
  }
  25% {
    background-color: rgba(255, 173, 51, 0.5);
  }
  to {
    background-color: transparent;
  }
`;

export { Message };
