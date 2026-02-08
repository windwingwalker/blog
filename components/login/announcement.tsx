import { HeadingBlock} from '../textblock';
import data from "../../data/announcement.json"

interface AnnouncementData {
  heading: string;
  body: string[];
}

const LoginAnnouncement: React.FC = () => {
  const typedData = data as AnnouncementData;

  return (
    <>
      <HeadingBlock size="h3" text={typedData.heading} />
      {typedData.body.map((item, index) => {
        return (
          <div key={index}>
            <br />
            <HeadingBlock size="h6" text={item}/>
          </div>
        )
      })}
    </>
  );
}

export default LoginAnnouncement;