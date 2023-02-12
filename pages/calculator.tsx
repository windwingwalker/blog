import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { TextField, Grid, ListItemText,  MenuItem, MenuList } from '@mui/material';
import { CALCULATOR_PATH, PAGE_NOT_FOUND_PATH } from '../shared/constant';
import { updatePath } from '../shared/pathSlice';
import { useAppDispatch, useAppSelector } from '../shared/hooks';
import Error404Page from './404';
import { isGuest } from '../functions/auth';
import { login, logout } from '../shared/userSlice';

const links = [
  {name: "Gathering Fee", label: "gethering-fee"},
  {name: "Sum of Geometric Sequence", label: "sum-of-geometric-sequence"},
]

const Input: React.FC<any> = () => {
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
  const [type, setType] = React.useState("gethering-fee");
  const [validUser, setValidUser] = useState<boolean>(true);
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    const validateRole = async () => {
      dispatch(updatePath(CALCULATOR_PATH)); 

      if (await isGuest()) {
        dispatch(logout());
        setValidUser(false);
      }else{
        dispatch(login("admin"))
      }
    }
    validateRole();
  }, []);

  if (!validUser) return <Error404Page />
  else{
    return (
      <>
        <Grid container spacing={2}>
          <Grid item md={3} lg={3} xl={3}>
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
          <Grid item md={3} lg={3} xl={3}>
            <Input />
          </Grid>
          <Grid item md={6} lg={6} xl={6}>
          </Grid>
        </Grid>
      </>
    );
  }
  
}

export default CalculatorPage;