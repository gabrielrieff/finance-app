import { cookies } from 'next/dist/client/components/headers';
import { parseCookies } from 'nookies';

export async function dataFetch<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) {
  const { '@nextauth.token': token } = parseCookies();
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${input}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${cookies['@nextauth.token']}`
    }
  });
  const result = data.json();

  return result as T;
}
