import type { NextPage } from 'next'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { TextField, Grid, ListItemText,  MenuItem, MenuList } from '@mui/material';
import { CALCULATOR_PATH, PAGE_NOT_FOUND_PATH } from '../shared/constant';
import { useAppSelector } from '../shared/hooks';
import Error404Page from './404';
import { useAuthValidation } from '../functions/useAuthValidation';

const links = [
  {name: "Gathering Fee", label: "gethering-fee"},
  {name: "Sum of Geometric Sequence", label: "sum-of-geometric-sequence"},
]

const Input: React.FC = () => {
  return (
    <>
      <Paper sx={{padding: "2px"}}>
      <TextField id="outlined-basic" type="number" label="Number" variant="outlined" fullWidth={true} InputLabelProps={{shrink: true,}}/>
      <br />
      <br />
      <TextField id="outlined-basic" type="number" label="Number" variant="outlined" fullWidth={true} InputLabelProps={{shrink: true,}}/>
      </Paper>
    </>
  );
}

const CalculatorPage: NextPage = () => {
  useAuthValidation(CALCULATOR_PATH);

  const [type, setType] = React.useState("gethering-fee");
  const role = useAppSelector(state => state.user.role);

  if (role !== "admin") return <Error404Page />
  else{
    return (
      <>
        <Grid container spacing={2}>
          <Grid size={{md: 3, lg: 3, xl: 3}}>
            <Paper>
              <MenuList>
                {links.map((link, index) => (
                  <MenuItem key={index}>
                    <ListItemText>{link["name"]}</ListItemText>
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
          </Grid>
          <Grid size={{md: 3, lg: 3, xl: 3}}>
            <Input />
          </Grid>
          <Grid size={{md: 6, lg: 6, xl: 6}}>
          </Grid>
        </Grid>
      </>
    );
  }
  
}

export default CalculatorPage;