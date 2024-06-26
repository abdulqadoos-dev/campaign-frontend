import { Puritan } from 'next/font/google';
import { cookies } from 'next/headers'

export const loggedInUser = () => {
  let user = cookies().get('user')?.value;
  return user ? JSON.parse(user) : {};
}

export const save = async (pathname: string, method: string, body: object) => {
 // TODO: Impliment login for refresh token
  const { accessToken = null } = loggedInUser();

  return await fetch(`${process.env.SERVER_PATH}${pathname}`, {
    cache: 'no-store',
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    },
    body: JSON.stringify(body),
  });
}

export const get = async (pathname: string) => {

  // TODO: Impliment login for refresh token
  const { accessToken = null } = loggedInUser();

  return await fetch(`${process.env.SERVER_PATH}${pathname}`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    },
  });


}