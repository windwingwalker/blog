import { ListItemText, ListItemButton, ListItemIcon} from '@mui/material';
import { useAppSelector } from '../../shared/hooks';
import NextLink from 'next/link';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { MILK } from '../../shared/constant';
import { ReactElement } from 'react';

interface Props {
  name: string;
  icon: ReactElement;
  path: string;
  action?: () => void;
}

const DrawerItem: React.FC<Props> = ({name, icon, path, action}) => {
  const currentPath: string = useAppSelector(state => state["path"]["value"]);

  return (
    <ListItemButton onClick={action} LinkComponent={NextLink} href={path} sx={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemIcon sx={{ color: MILK }}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={name} primaryTypographyProps={{variant: "darkbutton"}}/>
      {path == currentPath &&
        <ListItemIcon sx={{ color: MILK,  marginRight: -5}}>
          <ArrowBackIosIcon />
        </ListItemIcon>}
    </ListItemButton>
  );
}

export default DrawerItem;