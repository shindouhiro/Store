export default () => ({
  oss: {
    region: process.env.OSS_REGION || 'oss-cn-shanghai',
    accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
    bucket: process.env.OSS_BUCKET || 'dulizha',
  },
}); 
