
import imageURL from './assets/403.svg';

const config = {
  403: {
    img: `./dist/${imageURL}`,
    title: '403',
    desc: '抱歉，你无权访问该页面',
  },
  404: {
    img: `./dist/${imageURL}`,
    title: '404',
    desc: '抱歉，你访问的页面不存在',
  },
  500: {
    img: `./dist/${imageURL}`,
    title: '500',
    desc: '抱歉，服务器出错了',
  },
};

export default config;
