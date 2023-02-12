import { Typography, IconButton, Grid, Input, Button, Box, TextField, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { CognitoIdentityProviderClient, InitiateAuthCommand, InitiateAuthCommandInput, InitiateAuthCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { useAppDispatch } from '../../shared/hooks';
import { login, logout } from '../../shared/userSlice';
import Cookies from 'universal-cookie';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const Form: React.FC<{}> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const _handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const _handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const _handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const client = new CognitoIdentityProviderClient({ region: "us-east-1" });
    const command: InitiateAuthCommand = new InitiateAuthCommand({AuthParameters: { "USERNAME": username, "PASSWORD": password}, AuthFlow: "USER_PASSWORD_AUTH", ClientId: "7gdgu5pn2im7p8d2681d24kjm7"});
    try{
      const response: InitiateAuthCommandOutput = await client.send(command);
      if (response["$metadata"]["httpStatusCode"] == 200){
        const idToken: string = response["AuthenticationResult"]!["IdToken"] as string;
        const accessToken: string = response["AuthenticationResult"]!["AccessToken"] as string;
        const refreshToken: string = response["AuthenticationResult"]!["RefreshToken"] as string;

        dispatch(login("admin")); 
        const cookies = new Cookies();
        const expire: number = response["AuthenticationResult"]!["ExpiresIn"] as number - 10;

        const cookieOption = { 
          path: '/', 
          maxAge: expire, 
          domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
          httpOnly: false,
          secure: process.env.NEXT_PUBLIC_COOKIE_SECURE == "true",
          sameSite: true
        }

        cookies.set('idToken', idToken, cookieOption);
        cookies.set('accessToken', accessToken, cookieOption);
        cookies.set('refreshToken', refreshToken, cookieOption);
      }
    }catch (e){
      console.log("Error");
    }  
  }
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={(e: any) => _handleSubmit(e)}
    >
      <TextField 
        required
        size="small" 
        id="username" 
        name="username"
        value={username}
        onChange={_handleUsernameChange}
        variant="outlined" />

      <div />
      <br />

      <TextField 
        required 
        size="small" 
        id="password" 
        name="password"
        type="password"
        value={password}
        onChange={_handlePasswordChange}
        variant="outlined" />

      <IconButton aria-label="submit" type="submit">
        <ArrowCircleRightOutlinedIcon sx={{ color: "jadeite.main" }} fontSize="medium"/>
      </IconButton>
    </Box>
  );
}

export default Form;