import { Box, Typography } from '@mui/material';

export default function Maintenance() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h5" component="h1" textAlign="center">
        Sorry, the blog is in maintenance, please come back later.
        <br/>
        抱歉，部落格正在維護，請稍後再來。
        <br/>
        - Elliot Kam
      </Typography>
    </Box>
  );
}
