import type { NextPage } from 'next'
import { HeadingBlock  } from '../components/textblock';

const Error500Page: NextPage = () =>{
  return <HeadingBlock size="h1" text="500! Unknown error" />
}

export default Error500Page;