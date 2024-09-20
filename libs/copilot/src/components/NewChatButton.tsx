import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, IconButton, IconButtonProps, Tooltip } from '@mui/material';

import { Translator } from '@chainlit/app/src/components/i18n';
import { useChatInteract } from '@chainlit/react-client';

interface NewChatButtonProps extends IconButtonProps {
  handleClick?: () => void;
}

export default function NewChatButton({
  handleClick,
  ...props
}: NewChatButtonProps) {
  const { clear } = useChatInteract();

  const handleNewChat = () => {
    clear();
    if (handleClick) {
      handleClick();
    }
  };

  return (
    <Box>
      <Tooltip
        title={<Translator path="components.molecules.newChatButton.newChat" />}
      >
        <IconButton id="new-chat-button" onClick={handleNewChat} {...props}>
          <RefreshIcon sx={{ height: 20, width: 20, color: 'white' }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
