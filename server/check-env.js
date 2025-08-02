// 檢查 .env 文件讀取狀態的腳本
const fs = require('fs');
const path = require('path');

// 方法一：檢查文件是否存在
function checkEnvFileExists() {
  const envPath = path.join(process.cwd(), '.env');
  const exists = fs.existsSync(envPath);
  
  console.log('📁 檢查 .env 文件是否存在:');
  console.log(`   文件路徑: ${envPath}`);
  console.log(`   文件存在: ${exists ? '✅ 是' : '❌ 否'}`);
  
  if (exists) {
    const stats = fs.statSync(envPath);
    console.log(`   文件大小: ${stats.size} bytes`);
    console.log(`   最後修改: ${stats.mtime}`);
  }
  
  return exists;
}

// 方法二：嘗試讀取文件內容
function checkEnvFileContent() {
  const envPath = path.join(process.cwd(), '.env');
  
  try {
    const content = fs.readFileSync(envPath, 'utf8');
    console.log('\n📄 檢查 .env 文件內容:');
    console.log(`   文件可讀: ✅ 是`);
    console.log(`   內容長度: ${content.length} 字符`);
    
    // 檢查是否有實際的環境變量
    const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    console.log(`   有效變量數量: ${lines.length}`);
    
    if (lines.length > 0) {
      console.log('   前幾個變量:');
      lines.slice(0, 3).forEach((line, index) => {
        const [key] = line.split('=');
        console.log(`     ${index + 1}. ${key}`);
      });
    }
    
    return true;
  } catch (error) {
    console.log('\n📄 檢查 .env 文件內容:');
    console.log(`   文件可讀: ❌ 否`);
    console.log(`   錯誤信息: ${error.message}`);
    return false;
  }
}

// 方法三：使用 dotenv 包檢查
function checkWithDotenv() {
  try {
    // 檢查是否已安裝 dotenv
    require.resolve('dotenv');
    console.log('\n🔧 檢查 dotenv 包:');
    console.log('   dotenv 已安裝: ✅ 是');
    
    // 嘗試加載 .env 文件
    const dotenv = require('dotenv');
    const result = dotenv.config();
    console.log(result,'result')
    
    if (result.error) {
      console.log('   .env 加載失敗: ❌ 是');
      console.log(`   錯誤信息: ${result.error.message}`);
      return false;
    } else {
      console.log('   .env 加載成功: ✅ 是');
      console.log(`   加載的變量數量: ${Object.keys(result.parsed || {}).length}`);
      
      // 顯示一些關鍵變量（隱藏敏感信息）
      const parsed = result.parsed || {};
      const safeVars = ['NODE_ENV', 'PORT', 'MYSQL_HOST', 'MYSQL_PORT', 'MYSQL_DATABASE'];
      
      console.log('   關鍵變量狀態:');
      safeVars.forEach(key => {
        if (parsed[key]) {
          console.log(`     ${key}: ✅ 已設置`);
        } else {
          console.log(`     ${key}: ❌ 未設置`);
        }
      });
      
      return true;
    }
  } catch (error) {
    console.log('\n🔧 檢查 dotenv 包:');
    console.log('   dotenv 已安裝: ❌ 否');
    console.log(`   錯誤信息: ${error.message}`);
    return false;
  }
}

// 方法四：檢查環境變量是否已設置
function checkEnvironmentVariables() {
  console.log('\n🌍 檢查環境變量:');
  
  const envVars = [
    'NODE_ENV',
    'PORT',
    'MYSQL_HOST',
    'MYSQL_PORT',
    'MYSQL_USER',
    'MYSQL_PASSWORD',
    'MYSQL_DATABASE'
  ];
  
  let foundCount = 0;
  envVars.forEach(key => {
    const value = process.env[key];
    if (value) {
      console.log(`   ${key}: ✅ 已設置 (${key.includes('PASSWORD') ? '***' : value})`);
      foundCount++;
    } else {
      console.log(`   ${key}: ❌ 未設置`);
    }
  });
  
  console.log(`\n   總計: ${foundCount}/${envVars.length} 個變量已設置`);
  return foundCount > 0;
}

// 主函數
function main() {
  console.log('🔍 開始檢查 .env 文件狀態...\n');
  
  const fileExists = checkEnvFileExists();
  const fileReadable = checkEnvFileContent();
  const dotenvLoaded = checkWithDotenv();
  const envVarsSet = checkEnvironmentVariables();
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 檢查結果總結:');
  console.log(`   文件存在: ${fileExists ? '✅' : '❌'}`);
  console.log(`   文件可讀: ${fileReadable ? '✅' : '❌'}`);
  console.log(`   dotenv 加載: ${dotenvLoaded ? '✅' : '❌'}`);
  console.log(`   環境變量設置: ${envVarsSet ? '✅' : '❌'}`);
  
  if (fileExists && fileReadable && dotenvLoaded && envVarsSet) {
    console.log('\n🎉 .env 文件配置完全正常！');
  } else {
    console.log('\n⚠️  發現問題，請檢查上述錯誤信息。');
  }
}

// 如果直接運行此腳本
if (require.main === module) {
  main();
}

module.exports = {
  checkEnvFileExists,
  checkEnvFileContent,
  checkWithDotenv,
  checkEnvironmentVariables,
  main
}; 
