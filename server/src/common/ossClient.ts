const OSS = require('ali-oss');
import config from '../config/oss.config';

const ossConfig = config().oss;

// 检查必要的环境变量
if (!ossConfig.accessKeyId || !ossConfig.accessKeySecret) {
  console.warn('OSS配置缺失，请设置环境变量 OSS_ACCESS_KEY_ID 和 OSS_ACCESS_KEY_SECRET');
  // 在开发环境中，可以提供一个默认的客户端或抛出错误
  if (process.env.NODE_ENV === 'production') {
    throw new Error('OSS配置缺失，无法初始化OSS客户端');
  }
}

// 只有在配置完整时才创建客户端
let client: any = null;

if (ossConfig.accessKeyId && ossConfig.accessKeySecret) {
  client = new OSS({
    region: ossConfig.region,
    accessKeyId: ossConfig.accessKeyId,
    accessKeySecret: ossConfig.accessKeySecret,
    bucket: ossConfig.bucket,
    authorizationV4: true,
  });
}

export default client;
