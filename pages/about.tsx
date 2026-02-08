import type { GetStaticProps, NextPage } from 'next'
import { useEffect } from 'react';
import React from 'react';
import Profile from '../components/about/profile';
import Masonry from '@mui/lab/Masonry';
import { ABOUT_PATH } from '../shared/constant';
import { useAppDispatch } from '../shared/hooks';
import { updatePath } from '../shared/pathSlice';
import { login, logout } from '../shared/userSlice';
import { isGuest } from '../functions/auth';
import { getJSONInJSObjectFromS3, useLargeScreen } from '../functions/common';
import { Description, SkillSet, Cert, WorkExperience, AcademicBackground, Events } from '../components/about/root';
import { PageHeadingBlock } from '../components/textblock';
import { PageContainer } from '../components/root';

type ListElement = string | { h: string; body: ListElement[] };

interface Event {
  name: string;
  date: string;
  color: 'inherit' | 'grey' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

interface AboutData {
  description: {
    h1: string;
    body: string;
  };
  skillSet: {
    h1: string;
    body: ListElement[];
  };
  certificates: {
    h1: string;
    body: ListElement[];
  };
  workExperience: {
    h1: string;
    body: Array<{
      h: string;
      body: ListElement[];
    }>;
  };
  academicBackground: {
    h1: string;
    body: ListElement[];
  };
  events: {
    h1: string;
    body: ListElement[];
  };
}

interface AboutPageProps {
  aboutData: AboutData;
  timelineData: Event[];
}

const AboutPage: NextPage<AboutPageProps> = ({aboutData, timelineData}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const validateRole = async () => {
      dispatch(updatePath(ABOUT_PATH));
      dispatch(await isGuest() ? logout() : login("admin") )
    }
    validateRole(); 
  });

  const isLargeScreen = useLargeScreen();

  return (
    <PageContainer name="About">
      {!isLargeScreen && <PageHeadingBlock navDisplayName="About" />}
      <Masonry columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }} spacing={2} sx={{marginX: 0}}>
        <Description data={aboutData["description"]}/>
        <Profile data={timelineData}/>
        <SkillSet data={aboutData["skillSet"]}/>
        <Cert data={aboutData["certificates"]}/>
        <WorkExperience data={aboutData["workExperience"]}/>
        <AcademicBackground data={aboutData["academicBackground"]}/>
        <Events data={aboutData["events"]}/>
      </Masonry>
    </PageContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const aboutData: Object = await getJSONInJSObjectFromS3("blog/about.json");
  const timelineData: Object = await getJSONInJSObjectFromS3("blog/timeline.json");
  
  return {
    props: {
      aboutData, 
      timelineData
    },
  }
}

export default AboutPage;
