import { grey } from 'theme/palette';

import Stack from '@mui/material/Stack';

import { useChatMessages, useConfig } from '@chainlit/react-client';

import { ClipboardCopy } from 'components/atoms/ClipboardCopy';

import { useIsDarkMode } from 'hooks/useIsDarkMode';

import { type IStep } from 'client-types/';

import { DebugButton } from './DebugButton';
import { FeedbackButtons } from './FeedbackButtons';

interface Props {
  message: IStep;
  run?: IStep;
  hideFeedback: boolean
}

const MessageButtons = ({ message, run, hideFeedback }: Props) => {
  const isDark = useIsDarkMode();
  const { config } = useConfig();
  const { firstInteraction } = useChatMessages();

  const isUser = message.type === 'user_message';
  const isAsk = message.waitForAnswer;
  const hasContent = !!message.output;
  const showCopyButton = hasContent && !isUser && !isAsk;

  const showDebugButton =
    !!config?.debugUrl && !!message.threadId && !!firstInteraction;

  const show = showCopyButton || showDebugButton;

  if (!show || message.streaming) {
    return null;
  }

  return (
    <Stack
      sx={{ marginLeft: '-8px !important' }}
      alignItems="center"
      direction="row"
      color={isDark ? grey[400] : grey[600]}
    >{hideFeedback === true && showCopyButton && run ? (
      <>
      <ClipboardCopy value={message.output} />
      <FeedbackButtons message={run} />
      </>
    ): null}
      {showDebugButton ? (
        <DebugButton debugUrl={config.debugUrl!} step={message} />
      ) : null}
    </Stack>
  );
};

export { MessageButtons };
