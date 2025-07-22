declare namespace NodeJS {
  interface ProcessEnv {
    // 数据库配置
    DB_HOST?: string;
    DB_PORT?: string;
    DB_USERNAME?: string;
    DB_PASSWORD?: string;
    DB_DATABASE?: string;

    // Redis配置
    REDIS_HOST?: string;
    REDIS_PORT?: string;

    // 应用配置
    NODE_ENV?: 'development' | 'production' | 'test';
    PORT?: string;

    // JWT配置
    JWT_SECRET?: string;
    JWT_EXPIRES_IN?: string;
  }
} 
