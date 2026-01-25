import { APIRequestContext, APIResponse, expect } from 'playwright/test';
import { baseConfig } from '../config/base.config';

export type UserCredentials = {
  email: string;
  password: string;
};

export async function performApiLogin (request: APIRequestContext, user: UserCredentials): Promise<APIResponse> {
  return await request.post(`${baseConfig.apiUrl}${baseConfig.endpoints.login}`, {
    data: {
      email: user.email,
      password: user.password,
    },
  });
};

export async function getApiLoginToken (request: APIRequestContext, user: UserCredentials): Promise<string> {
  const response = await performApiLogin(request, user);
  if (!response.ok()) {
    const errorStatus = response.status();
    const errorText = await response.text();
    console.error(`API Login Failed! Status: ${errorStatus}`);
    console.error(`Response: ${errorText}`);
    console.error(`Sending Email: ${user.email ? 'Provided' : 'EMPTY'}`);
    console.error(`Sending Password: ${user.password ? 'Provided' : 'EMPTY'}`);
  }

  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json() as { access_token: string };
  return responseBody.access_token;
};