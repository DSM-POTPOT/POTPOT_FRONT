import returnFetch from "return-fetch";

export const instance = returnFetch({
  baseUrl: "",
  headers: { Accept: "application/json" },
  interceptors: {
    request: async (args) => {
      const token = localStorage.getItem("accessToken");
      // //@ts-expect-error 위 headers와 같은 값인데, 객체로 인식이 안 되나 봄..
      // args[1]?.headers["Authorization"] = "Bearer " + token;
      return args;
    },
  },
});

export const mockUpInstance = async <N>(dataToReturn: N): Promise<N> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataToReturn);
    }, 1500);
  });
};
