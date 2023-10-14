import hyRequest from "../index";

// 发送网络请求
interface IHomeData {
  data: any,
  returnCode: string,
  success: boolean
}

hyRequest.request<IHomeData>({
  url: "/home/multidata"
}).then(res => {
  console.log(res)
})