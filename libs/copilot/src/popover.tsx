import Chat from 'chat';

// import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import Popper from '@mui/material/Popper';

import Header from 'components/Header';

interface ChatMessage {
  role: 'user' | 'assistant';
  message: string;
}
interface Props {
  anchorEl?: HTMLElement | null;
  buttonHeight: string;
  popoverBackground: string;
  themeColor: string;
  avatarUrl: string;
  hideFeedback: boolean;
  fontColor: string;
  branding: boolean;
  status: boolean;
  handleClick: () => void;
  chatbot_name: string;
  chatHistory?: ChatMessage[];
}

export default function PopOver({
  anchorEl,
  buttonHeight,
  popoverBackground,
  themeColor,
  avatarUrl,
  hideFeedback,
  fontColor,
  branding,
  status,
  chatbot_name,
  handleClick,
  chatHistory
}: Props) {
  // const [expanded, setExpanded] = useState(false);
  return (
    <Popper
      id="chainlit-copilot-popover"
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      placement="top"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        '& .MuiTypography-root-MuiLink-root': {
          color: `${fontColor} !important`
        },
        inset: {
          sm: 'auto auto 14px -24px !important',
          xs: 'auto 0 14px 0px !important'
        },
        height: `min(730px, calc(100vh - ${buttonHeight} - 48px))`,
        width: { sm: '400px', xs: '100%' },
        overflow: 'hidden',
        borderRadius: '12px',
        background: popoverBackground === '' ? 'white' : popoverBackground,
        boxShadow:
          '0 6px 6px 0 rgba(0,0,0,.02),0 8px 24px 0 rgba(0,0,0,.12)!important',
        zIndex: 1000
      }}
    >
      <Fade in={!!anchorEl}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%'
          }}
        >
          <Header
            chatbot_name={chatbot_name}
            fontColor={fontColor}
            handleClick={handleClick}
            themeColor={themeColor}
            avatarUrl={avatarUrl}
          />
          {status ? (
            <Chat
              chatHistory={chatHistory || []}
              avatarUrl={avatarUrl}
              branding={branding}
              fontColor={fontColor}
              hideFeedback={hideFeedback}
              themeColor={themeColor}
            />
          ) : (
            <Typography
              sx={{
                fontWeight: '600',
                textAlign: 'center',
                marginTop: '250px',
                marginX: '25px'
              }}
            >
              There is some problem with the chatbot please contact support.
            </Typography>
          )}
        </Box>
      </Fade>
    </Popper>
  );
}
