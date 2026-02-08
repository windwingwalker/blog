import Timeline from './timeline';
import { Box, Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';

interface Event {
  name: string;
  date: string;
  color: 'inherit' | 'grey' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

interface ProfileProps {
  data: Event[];
}

const Profile: React.FC<ProfileProps> = ({data}) => {
  const handleLinkedInClick = () => {
    window.open("http://www.linkedin.com/in/elliot-kam-8043b1188");
  };
  
  const handleGithubClick = () => {
    window.open("https://github.com/windwingwalker");
  };

  return (
    <Paper >
      <Stack spacing={1}>
        <Container>
          <Avatar sx={{ width: 200, height: 200, margin: 'auto' }} >
            <Image src="/avator.jpeg" alt="my avator" width="200" height="260"/>
          </Avatar>
          <Typography variant="h4" gutterBottom component="div" sx={{textAlign: 'center'}}>
              Elliot Kam 
          </Typography>
          <Typography variant="h6" gutterBottom component="div" sx={{textAlign: 'center'}}>
              Software Engineer | DevOps | Cloud
          </Typography>
          <Grid container justifyContent="space-evenly" alignItems="center"> 
            <Grid>
              <Box margin="auto">
                <Chip icon={<LinkedInIcon />} label="Elliot Kam's LinkedIn" onClick={handleLinkedInClick} variant="outlined" clickable  />
              </Box>
            </Grid>
            <Grid>
              <Box margin="auto">
                <Chip icon={<GitHubIcon />} label="@windwingwalker" onClick={handleGithubClick} variant="outlined" clickable />
              </Box>
            </Grid>
          </Grid>
          <Timeline data={data}/>
        </Container>
      </Stack>
    </Paper>
  );
}

export default Profile;