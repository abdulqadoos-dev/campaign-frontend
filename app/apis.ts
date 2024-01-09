import { cookies } from 'next/headers'

export const loggedInUser = () => {
  let user = cookies().get('user')?.value;
  return user && JSON.parse(user);
}

export const post = async (pathname: string, body: object) => {

  const { accessToken } = loggedInUser();

  const response = await fetch(`${process.env.SERVER_PATH}${pathname}`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken 
    },
    body: JSON.stringify(body),
  });

  return response;

}

export const get = async (pathname: string) => {

  const { accessToken } = loggedInUser();

  const response = await fetch(`${process.env.SERVER_PATH}${pathname}`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken 
    },
  });

  return response;

}