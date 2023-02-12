import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { isLargeScreen, isSmallScreen } from '../functions/common';

export const PageContainer: React.FC<any> = (props: any) => {
  const index = [
    {name: "Changelog", horizontalPadding: isSmallScreen() ? 0 : 5},
    {name: "Q&A", horizontalPadding: isSmallScreen() ? 2: 5},
    {name: "Home", horizontalPadding: 1},
    {name: "Contributors", horizontalPadding: isSmallScreen() ? 2: 5},
    {name: "About", horizontalPadding: isLargeScreen() ? 2 : 0},
    {name: "Articles", horizontalPadding: isLargeScreen() ? 2 : 0}
  ]

  return (
    <Box padding={index.filter((item: any) => item["name"] == props["name"])[0].horizontalPadding}>
      {props["children"]}
    </Box>
  )
}

export const Center: React.FC = (props: any) => {
  return (
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: `calc(100% - 64px)` }}
      >
      <Grid item xs={3}>
        {props["children"]}
      </Grid>
    </Grid>
  );
}