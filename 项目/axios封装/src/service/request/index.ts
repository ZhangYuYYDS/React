import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { HYRequestConfig } from "./type";

// 针对AxiosRequestConfig配置进行扩展，因为AxiosRequestConfig中没有interceptors这个属性，而hyRequest中又需要传入一个interceptors
// 在request/type.ts中封装了

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */

class HYRequest {
  // 声明属性,并且我们希望instance类型与create出的类型一致（create里提供的，不用记）
  instance: AxiosInstance;
  // 1.request实例 => axios实例
  // 创建出来的每个实例都对应一个axios实例
  constructor(config: HYRequestConfig) {
    // config: any
    // any类型不好，传入参数的类型不规范，所以改成AxiosRequestConfig类型（create里提供的，不用记）
    this.instance = axios.create(
      // 我们不希望baseURL，timeout写死，希望是别人传过来的,所以在创建实例的时候可以传过来config
      // {
      // baseURL: "xxx",
      // timeout: 10000
      // }
      config
    );

    // 给每一个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        console.log("全局请求成功的拦截");
        return config;
      },
      (err) => {
        console.log("全局请求失败的拦截");
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        console.log("全局响应成功拦截");
        return res.data;
      },
      (err) => {
        console.log("全局响应失败拦截");
        return err;
      }
    );

    // 针对特定的hyRequest实例，比如hyRequest2，添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    );

    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    );
  }

  // 2.封装网络请求的方法（主要封装request方法）
  request<T = any>(config: HYRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config);
    }

    // return this.instance.request(config)
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "GET" });
  }
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "POST" });
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "DELETE" });
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: "PATCH" });
  }
}
export default HYRequest;
