import type { NextPage } from 'next'
import { Box, Typography, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { DASHBOARD_PATH } from '../shared/constant';
import { updatePath } from '../shared/pathSlice';
import { useAppDispatch, useAppSelector } from '../shared/hooks';
import axios, { AxiosResponse } from 'axios';
import MyResponsivePie from '../components/chart/pie';
import { Asset } from '../models/asset';
import Error404Page from '../pages/404';
import { getIdToken, isGuest } from '../functions/auth';
import { login, logout } from '../shared/userSlice';
import Masonry from '@mui/lab/Masonry';
import { HeadingBlock } from '../components/textblock';

interface pieData{
  id: string;
  label: string;
  value: number;
  color: string;
}

const processData = (data: Asset[], tmp: string): pieData[] => {
  var res: pieData[] = []
  var map: {[key: string]: number} = {}
  data = data.filter(element => element["normalized_value"] != 0)
  for (var element of data){
    var label = ""
    for (const [key, value] of Object.entries(element)) {
      if (key != tmp && key != "value" && key != "normalized_value"){
        label += "::"
        label += value
      }
    }

    if (label in map){
      map[label] = Math.floor(map[label] + element["normalized_value"])
    }else{
      map[label] = Math.floor(element["normalized_value"])
    }
  }

  for (const [key, value] of Object.entries(map)) {
    res.push({
      "id": key,
      "label": key,
      "value": Math.abs(value as number),
      "color": `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
    } as pieData)
  }
  return res;
}

const DashboardPage: NextPage<{}> = () =>{
  const [asset, setAsset] = useState<Asset[]>([] as Asset[]);
  const [ready, setReady] = useState<boolean>(false);
  const [validUser, setValidUser] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async (idToken: string) => {
      const response: AxiosResponse = await axios.get(`/api/asset-overview?idToken=${idToken}`);
      if (response["status"] == 200){
        setAsset(response["data"] as Asset[]);
        setReady(true);
      }
    }

    const validateRole = async () => {
      dispatch(updatePath(DASHBOARD_PATH)); 

      if (await isGuest()) {
        dispatch(logout());
        setValidUser(false);
      }else{
        dispatch(login("admin"))
        await getData(getIdToken());
      }
    }
    validateRole();
  }, []);

  if (!validUser) return <Error404Page />
  else if (validUser && !ready) return <CircularProgress color='success' />
  else{ 
    return (
      <>
        <HeadingBlock size="h5" text={`Total Value: ${Math.floor(asset.reduce((previousValue, currentValue) => previousValue + currentValue.normalized_value, 0))} HKD`} />
        <Masonry columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 3 }} spacing={2}>
          <Box sx={{height: "400px", width: "600px"}}>
            <MyResponsivePie data={processData(asset, "currency")} />
          </Box>
          <Box sx={{height: "400px", width: "600px"}}>
            <MyResponsivePie data={processData(asset, "account")} />
          </Box>
          <Box sx={{height: "400px", width: "600px"}}>
            <MyResponsivePie data={processData(asset, "asset_type")} />
          </Box>
        </Masonry>
      </>
    );
  }
}

export default DashboardPage;