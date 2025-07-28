const OSS = require('ali-oss');
import config from '../config/oss.config';

// 定义 OSS 配置接口
interface OSSConfig {
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  bucket: string;
}

// 获取 OSS 配置
const ossConfig: OSSConfig = config().oss;

/**
 * 初始化 OSS 客户端
 * @returns OSS 客户端实例或 null（如果配置不完整）
 */
function createOSSClient(): any {
  // 检查必要的配置项
  if (!ossConfig.accessKeyId || !ossConfig.accessKeySecret) {
    console.warn('OSS配置缺失，请设置环境变量 OSS_ACCESS_KEY_ID 和 OSS_ACCESS_KEY_SECRET');
    
    // 在生产环境中，配置缺失时抛出错误
    if (process.env.NODE_ENV === 'production') {
      throw new Error('OSS配置缺失，无法初始化OSS客户端');
    }
    
    // 配置不完整时返回 null
    return null;
  }

  // 创建并返回 OSS 客户端实例
  return new OSS({
    region: ossConfig.region,
    accessKeyId: ossConfig.accessKeyId,
    accessKeySecret: ossConfig.accessKeySecret,
    bucket: ossConfig.bucket,
    authorizationV4: true,
  });
}

// 创建 OSS 客户端实例
const client = createOSSClient();

export default client;
