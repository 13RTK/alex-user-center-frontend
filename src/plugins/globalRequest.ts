import {extend} from 'umi-request';
import {stringify} from "querystring";
import {message} from "antd";
import {history} from "@@/core/history";

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
  profix: process.env.NODE_ENV === 'production' ? 'http://user-backend.cn' : undefined,
});

/**
 * 所以请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  console.log(`request url = ${url}`)
  return {
    url,
    options: {
      ...options,
      headers: {},
    },
  };
});

/**
 * 所有响应拦截器
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
request.interceptors.response.use(async (response, options): Promise<any> => {
  const res = await response.clone().json();
  if (res.code === 20000) {
    return res.data;
  }
  if (res.code === 40100) {
    message.error('请先登录');
    history.replace({
      pathname: 'user/login',
      search: stringify({
        redirect: location.pathname,
      }),
    });
  } else {
    message.error(res.description);
  }

  return res;
});

export default request;
