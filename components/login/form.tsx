import { Typography, IconButton, Grid, Input, Button, Box, TextField, Paper, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import { CognitoIdentityProviderClient, InitiateAuthCommand, InitiateAuthCommandInput, InitiateAuthCommandOutput, RespondToAuthChallengeCommand, RespondToAuthChallengeCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { useAppDispatch } from '../../shared/hooks';
import { login, logout } from '../../shared/userSlice';
import Cookies from 'universal-cookie';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const Form: React.FC<{}> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [challengeName, setChallengeName] = useState<string | null>(null);
  const [session, setSession] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const _handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const _handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const _handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  }

  const _handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  }

  const _handleNewPasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength (Cognito requirements)
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    const client = new CognitoIdentityProviderClient({ region: "us-east-1" });
    const command = new RespondToAuthChallengeCommand({
      ChallengeName: "NEW_PASSWORD_REQUIRED",
      ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
      Session: session || undefined,
      ChallengeResponses: {
        "USERNAME": username,
        "NEW_PASSWORD": newPassword
      }
    });

    try {
      const response: RespondToAuthChallengeCommandOutput = await client.send(command);

      if (response.AuthenticationResult) {
        const idToken: string = response.AuthenticationResult.IdToken as string;
        const accessToken: string = response.AuthenticationResult.AccessToken as string;
        const refreshToken: string = response.AuthenticationResult.RefreshToken as string;

        dispatch(login("admin"));
        const cookies = new Cookies();
        const expire: number = response.AuthenticationResult.ExpiresIn as number - 10;

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

        // Reset challenge state
        setChallengeName(null);
        setSession(null);
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (e) {
      const error = e as Error;
      setError(error?.message || "Failed to set new password. Please try again.");
    }
  }

  const _handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const client = new CognitoIdentityProviderClient({ region: "us-east-1" });
    const command: InitiateAuthCommand = new InitiateAuthCommand({AuthParameters: { "USERNAME": username, "PASSWORD": password}, AuthFlow: "USER_PASSWORD_AUTH", ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID});
    try{
      const response: InitiateAuthCommandOutput = await client.send(command);

      // Check if there's a challenge (like NEW_PASSWORD_REQUIRED)
      if (response.ChallengeName) {
        setChallengeName(response.ChallengeName);
        setSession(response.Session || null);
        return;
      }

      // If authentication is successful
      if (response["$metadata"]["httpStatusCode"] == 200 && response.AuthenticationResult){
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
    }catch (e) {
      const error = e as Error;
      setError(error?.message || "Authentication failed. Please check your credentials.");
    }
  }
  // Show new password form if challenge is NEW_PASSWORD_REQUIRED
  if (challengeName === "NEW_PASSWORD_REQUIRED") {
    return (
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={_handleNewPasswordSubmit}
      >
        <Typography variant="body2" sx={{ mb: 2 }}>
          Please set a new password
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          required
          size="small"
          id="newPassword"
          name="newPassword"
          type="password"
          label="New Password"
          value={newPassword}
          onChange={_handleNewPasswordChange}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          required
          size="small"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={_handleConfirmPasswordChange}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<ArrowCircleRightOutlinedIcon />}
        >
          Set New Password
        </Button>
      </Box>
    );
  }

  // Default login form
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={_handleSubmit}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        required
        size="small"
        id="username"
        name="username"
        label="Username"
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
        label="Password"
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