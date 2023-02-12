import type { NextPage } from 'next'
import { HeadingBlock } from '../components/textblock';

const Error404Page: NextPage = () =>{
  return <HeadingBlock size="h4" text="404! Page Not found" />
}

export default Error404Page;