import { Avatar, IconButton, IconButtonProps } from '@mui/material';

export default function UserAvatar(props: IconButtonProps) {
  return (
    <IconButton {...props}>
      <Avatar
        sx={{
          width: '1.6rem',
          height: '1.6rem',
          bgcolor: 'transparent'
        }}
        src={
          'https://res.cloudinary.com/dvv44upa0/image/upload/v1724088690/xvvolyzavi6vrxg96a0a.png'
        }
      />
    </IconButton>
  );
}
