import { Box, Stack, Typography } from '@mui/material';

import ChatProfiles from './ChatProfiles';
import NewChatButton from './NewChatButton';

// import { IWidgetConfig } from 'types';

interface headerProps {
  themeColor: string;
  avatarUrl?: string;
  handleClick: () => void;
  chatbot_name: string;
  fontColor: string;
}
const Header: React.FC<headerProps> = ({
  themeColor,
  avatarUrl,
  handleClick,
  fontColor,
  chatbot_name
}): JSX.Element => (
  <Stack
    px={2}
    py={1.5}
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    bgcolor={themeColor !== '' ? themeColor : 'background.paper'}
  >
    <Stack direction="row" alignItems="center" spacing={0.5}>
      {/* <Logo style={{ maxHeight: '25px' }} /> */}
      <Box display={'flex'} gap={'10px'} alignItems={'center'}>
        <img
          src={
            avatarUrl !== ''
              ? avatarUrl
              : 'https://res.cloudinary.com/dvv44upa0/image/upload/v1724088690/xvvolyzavi6vrxg96a0a.png'
          }
          style={{
            maxHeight: '25px',
            borderRadius: '50%'
          }}
        />
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: '500',
            color: fontColor ? fontColor : 'White'
          }}
        >
          {chatbot_name}
        </Typography>
      </Box>

      {/* <IconButton onClick={() => setExpanded(!expanded)}>
        {expanded ? (
          <MinimizeIcon sx={{ width: 16, height: 16 }} />
        ) : (
          <ExpandIcon sx={{ width: 16, height: 16 }} />
        )}
      </IconButton> */}
    </Stack>
    <Stack direction="row" alignItems="center" spacing={1}>
      <ChatProfiles />
      <NewChatButton handleClick={handleClick} />
    </Stack>
  </Stack>
);

export default Header;
