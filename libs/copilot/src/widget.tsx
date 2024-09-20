import PopOver from 'popover';
import { useEffect, useState } from 'react';
import { IWidgetConfig } from 'types';

import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import Fade from '@mui/material/Fade';

import MessageCircleIcon from '@chainlit/app/src/assets/MessageCircle';

interface Props {
  config: IWidgetConfig;
}
interface ChatMessage {
  role: 'user' | 'assistant';
  message: string;
}
export default function Widget({ config }: Props) {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();
  const [branding, setBranding] = useState<boolean>(true);
  const [status, setStatus] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chatbotName, setChatbotName] = useState<string>('');
  const [fAvatarUrl, setFAvatarUrl] = useState<string>('');
  const customStyle = config.button?.style || {};
  const buttonHeight = customStyle.height || customStyle.size || '60px';
  const popoverBackground = config.popoverBackground || undefined;
  const themeColor = config.themeColor || undefined;
  const fontColor = config.fontColor || undefined;
  const hideFeedback = config.hideFeedback || undefined;
  const chatbotId = config.chatBotID || undefined;
  const style = {
    width: customStyle.width || customStyle.size || '60px',
    height: buttonHeight,
    bgcolor: config.themeColor || '#F80061',
    color: customStyle.color || 'white',
    '&:hover': {
      bgcolor: config.themeColor || '#DA0054'
    },
    borderColor: customStyle.borderColor || 'transparent',
    borderWidth: customStyle.borderWidth || '0px',
    borderStyle: customStyle.borderStyle || 'solid',
    borderRadius: customStyle.borderRadius || '50%',
    boxShadow: customStyle.boxShadow || '0 4px 10px 0 rgba(0,0,0,.05)!important'
  };

  const isPopoverOpen = Boolean(anchorEl);
  const fetchChatHistory = async (userId: string): Promise<ChatMessage[]> => {
    try {
      const response = await fetch(
        'https://www.app-backend.galadon.com/get-chat-history',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch chat history');
      }

      const data = await response.json();
      return data.data as ChatMessage[];
    } catch (error) {
      console.error('Error fetching chat history:', error);
      return [];
    }
  };
  const sendChatbotID = async (chatBotID: string) => {
    setIsLoading(true);
    try {
      let userId = localStorage.getItem('userId');

      if (!userId) {
        const createUserResponse = await fetch(
          'https://www.app-backend.galadon.com/create-user',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ chatbotId: chatBotID })
          }
        );

        if (!createUserResponse.ok) {
          throw new Error('Failed to create user');
        }

        const createUserData = await createUserResponse.json();
        userId = createUserData.data[0].userId;
        localStorage.setItem('userId', userId);
      }

      const response = await fetch('https://www.livechat.galadon.com/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chatbot_id: chatBotID, user_id: userId })
      });

      if (!response.ok) {
        throw new Error('Failed to send chatbot ID');
      }

      const data = await response.json();
      console.log('Response:', data);

      const history = await fetchChatHistory(userId);
      setChatHistory(history);
      // New request to get branding information
      const brandingResponse = await fetch(
        'https://www.app-backend.galadon.com/get-sessions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ chatbotId: chatBotID })
        }
      );

      if (!brandingResponse.ok) {
        throw new Error('Failed to get branding information');
      }

      const brandingData = await brandingResponse.json();
      setBranding(brandingData.branding);
      setStatus(brandingData.status);
      setChatbotName(brandingData.chatbot_name);
      setFAvatarUrl(brandingData.avatarUrl);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatbotId) {
      sendChatbotID(chatbotId);
    }
  }, [chatbotId]);
  console.log(chatHistory, 'chayHistory');

  return (
    <>
      <PopOver
        // chatHistory={chatHistory}
        chatbot_name={chatbotName || 'Galadon'}
        status={status}
        branding={branding}
        fontColor={fontColor || ''}
        anchorEl={anchorEl}
        buttonHeight={buttonHeight}
        popoverBackground={popoverBackground ? popoverBackground : ''}
        themeColor={themeColor ? themeColor : ''}
        avatarUrl={fAvatarUrl ? fAvatarUrl : ''}
        hideFeedback={hideFeedback || false}
        handleClick={() => sendChatbotID(chatbotId || '')}
      />

      <Fab
        disableRipple
        aria-label="open copilot"
        id="chainlit-copilot-button"
        sx={{
          minHeight: 'auto',
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          ...style
        }}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          if (!isLoading) {
            setAnchorEl(anchorEl ? null : event.currentTarget);
          }
        }}
      >
        <Fade in={!isPopoverOpen} timeout={300}>
          <Box
            position={'absolute'}
            top={0}
            left={0}
            bottom={0}
            right={0}
            p={1.5}
          >
            {config.button?.imageUrl ? (
              <img width="100%" src={config.button?.imageUrl} />
            ) : (
              <MessageCircleIcon
                color="inherit"
                sx={{ width: '90%', height: '90%' }}
              />
            )}
          </Box>
        </Fade>
        <Fade in={isPopoverOpen} timeout={300}>
          <Box
            position={'absolute'}
            top={0}
            left={0}
            bottom={0}
            right={0}
            p={1.5}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <CloseIcon color="inherit" sx={{ width: '90%', height: '90%' }} />
          </Box>
        </Fade>
      </Fab>
    </>
  );
}
