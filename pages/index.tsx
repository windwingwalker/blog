import type { NextPage } from 'next'
import { useEffect } from 'react';
import { useAppDispatch } from '../shared/hooks';
import { updatePath } from '../shared/pathSlice';
import { login, logout } from '../shared/userSlice';
import { isGuest } from '../functions/auth';
import { HOME_PATH } from '../shared/constant';
import 'react-medium-image-zoom/dist/styles.css'
import { Masonry } from '@mui/lab'
import { PageHeadingBlock } from '../components/textblock'
import ZoomableImage from '../components/zoomableImage'
import { PageContainer } from '../components/root';

const data = [
  {imagePath: "/overall.drawio.png", alt: "Overall Architecture"},
  {imagePath: "/dev.drawio.png", alt: "Development Zone"},
  {imagePath: "/article.drawio.png", alt: "Public Back-end Application: Article"},
  {imagePath: "/finance.drawio.png", alt: "Private Back-end Application: Finance"},
  {imagePath: "/frontend.drawio.png", alt: "Front-end Website"},
  {imagePath: "/tg-bot.drawio.png", alt: "Telegram bot"}
]

const HomePage: NextPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const validateRole = async () => {
      dispatch(updatePath(HOME_PATH));
      dispatch(await isGuest() ? logout() : login("admin") )
    }
    validateRole(); 
  });

  return (
    <PageContainer name="Home">
      <PageHeadingBlock size="h4" navDisplayName="Home" />
      <Masonry columns={{ xs: 2, sm: 3, md: 3, lg: 3, xl: 4 }} spacing={2} sx={{marginX: 0}}>
        {data.map((item) => <ZoomableImage key={item["imagePath"]} imagePath={item["imagePath"]} alt={item["alt"]} />)}
      </Masonry>
    </PageContainer>
  )
}

export default HomePage;
