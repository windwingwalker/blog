import { CognitoIdentityProviderClient, GetUserCommand, GetUserCommandInput, GetUserCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import Cookies from 'universal-cookie';

export const accessTokenIsValid = async (accessToken: string) => {
  const client = new CognitoIdentityProviderClient({ region: "us-east-1" });
  const command: GetUserCommand = new GetUserCommand({AccessToken: accessToken});
  try{
    const response: GetUserCommandOutput = await client.send(command);
    return response["$metadata"]["httpStatusCode"] == 200
  }catch (e){
    return false;
  }
}

export const removeCookies = () => {
  const cookies = new Cookies();
  const cookieOption = { 
    path: '/', 
    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    httpOnly: false,
    secure: process.env.NEXT_PUBLIC_COOKIE_SECURE == "true",
    sameSite: true
  }
  cookies.remove('idToken', cookieOption);
  cookies.remove('refreshToken', cookieOption);
  cookies.remove('accessToken', cookieOption);
}

export const getIdToken = () =>{
  const cookies = new Cookies();
  return cookies.get('idToken');
}

export const isGuest = async () => {
  const cookies = new Cookies();

  const idToken = cookies.get('idToken');
  if (idToken == null) return true

  const accessToken = cookies.get('refreshToken');
  if (accessToken == null) return true

  const refreshToken = cookies.get('accessToken');
  if (refreshToken == null) return true

  const tokenIsValid = await accessTokenIsValid(cookies.get('accessToken'))
  if (!tokenIsValid) return true

  return false
}
