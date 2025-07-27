const OSS = require('ali-oss');
import config from '../config/oss.config';

const ossConfig = config().oss;
console.log(config(),'ossConfig');

// 这里直接使用你提供的配置信息进行初始化
const client = new OSS({
  region: ossConfig.region,
  accessKeyId: ossConfig.accessKeyId,
  accessKeySecret: ossConfig.accessKeySecret,
  bucket: ossConfig.bucket,
  authorizationV4: true,
});

export default client;
