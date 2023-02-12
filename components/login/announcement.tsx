import { HeadingBlock, HyperLinkSpan } from '../textblock';
import data from "../../data/announcement.json"

const LoginAnnouncement: React.FC<any> = () => {
  return (
    <>
      <HeadingBlock size="h3" text={data["heading"]} />
      {data["body"].map((item: any) => {
        return (
          <>
            <br />
            <HeadingBlock key={item} size="h6" text={item}/>
          </>
        )
      })}
    </>
  );
}

export default LoginAnnouncement;