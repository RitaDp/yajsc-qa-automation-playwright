import { APIRequestContext, APIResponse, expect } from 'playwright/test';

export type UserCredentials = {
  email: string;
  password: string;
};

export async function performApiLogin (request: APIRequestContext, user: UserCredentials): Promise<APIResponse> {
  return await request.post('https://api.practicesoftwaretesting.com/users/login', {
    data: {
      email: user.email,
      password: user.password,
    },
  });
};

export async function getApiLoginToken (request: APIRequestContext, user: UserCredentials): Promise<string> {
  const response = await performApiLogin(request, user);
  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json() as { access_token: string };;
  return responseBody.access_token;
};