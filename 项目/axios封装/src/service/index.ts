import { BASE_URL, TIME_OUT } from "./config/index";
import HYRequest from "./request/index";

// 这里可以根据不同的url创建不同的实例：
// hyRequest，hyRequest1，hyRequest2···
const hyRequest = new HYRequest({
  // config/index.ts中导出的BASE_URL，TIME_OUT
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

export const hyRequest2 = new HYRequest({
  baseURL: "http://codercba.com:1888/airbnb/api",
  timeout: 8000,

  interceptors: {
    requestSuccessFn: (config) => {
      console.log("爱彼迎的请求成功的拦截");
      return config;
    },
    requestFailureFn: (err) => {
      console.log("爱彼迎的请求失败的拦截");
      return err;
    },
    responseSuccessFn: (res) => {
      console.log("爱彼迎的响应成功的拦截");
      return res;
    },
    responseFailureFn: (err) => {
      console.log("爱彼迎的响应失败的拦截");
      return err;
    },
  },
});

export default hyRequest;
