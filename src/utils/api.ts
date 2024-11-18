import client_cookies from "js-cookie";
import { headers } from "next/headers";
import returnFetch, { FetchArgs } from "return-fetch";

export type JsonRequestInit = Omit<NonNullable<FetchArgs[1]>, "body"> & { body?: object | string };

export interface JsonResponse<T> extends Omit<Awaited<ReturnType<typeof fetch>>, keyof Body> {
  body: T;
}

const fetch = returnFetch({
  baseUrl: "http://3.37.246.242:8080",
  headers: { "Content-Type": "application/json" },
  interceptors: {
    request: async (args) => {
      const cookie = client_cookies.get("access_token");

      return [
        args[0],
        {
          ...args[1],
          headers: cookie
            ? {
                ...args[1]?.headers,
                Authorization: cookie ? `Bearer ${cookie}` : undefined,
              }
            : args[1]?.headers,
        },
      ] as FetchArgs;
    },
  },
});

const parseJsonSafely = (text: string): object | string => {
  try {
    return JSON.parse(text);
  } catch (e) {
    if ((e as Error).name !== "SyntaxError") {
      throw e;
    }

    return text.trim();
  }
};

export const instance = async <T>(
  url: FetchArgs[0],
  init?: JsonRequestInit,
  isForm?: boolean
): Promise<JsonResponse<T>> => {
  try {
    const response = await fetch(url, {
      ...init,
      body: isForm ? (init?.body as any) : JSON.stringify(init?.body),
    });

    const body = parseJsonSafely(await response.text()) as T;

    return {
      headers: response.headers,
      ok: response.ok,
      redirected: response.redirected,
      status: response.status,
      statusText: response.statusText,
      type: response.type,
      url: response.url,
      body,
    } as JsonResponse<T>;
  } catch (e) {
    throw e;
  }
};

export const mockUpInstance = async <N>(dataToReturn: N): Promise<N> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataToReturn);
    }, 300);
  });
};
