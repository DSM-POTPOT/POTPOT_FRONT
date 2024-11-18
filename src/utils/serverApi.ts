"use server";
import { cookies } from "next/headers";
import returnFetch, { FetchArgs } from "return-fetch";
import { JsonResponse, JsonRequestInit } from "./api";

const fetch = returnFetch({
  baseUrl: "http://3.37.246.242:8080",
  headers: {
    "Content-Type": "application/json",
  },
  interceptors: {
    request: async (args) => {
      const cookie = (await cookies()).get("access_token");

      return [
        args[0],
        {
          ...args[1],
          headers: cookie
            ? {
                ...args[1]?.headers,
                Authorization: cookie ? `Bearer ${cookie.value}` : undefined,
              }
            : args[1]?.headers,
        },
      ] as FetchArgs;
    },
  },
});

export const server_instance = async <T>(
  url: FetchArgs[0],
  init?: JsonRequestInit
): Promise<JsonResponse<T>> => {
  try {
    const response = await fetch(url, {
      ...init,
      body: init?.body && JSON.stringify(init.body),
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

export const server_mockUpInstance = async <N>(dataToReturn: N): Promise<N> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataToReturn);
    }, 300);
  });
};
