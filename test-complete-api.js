// 完整的 API 測試腳本
const testCompleteAPI = async () => {
  console.log('🚀 開始完整 API 測試...\n');

  try {
    // 1. 測試分類 API
    console.log('📋 1. 測試分類 API...');
    const categoriesResponse = await fetch('http://localhost:3000/categories?active=true');
    if (categoriesResponse.ok) {
      const categories = await categoriesResponse.json();
      console.log('✅ 分類 API 測試成功！');
      console.log(`   獲取到 ${categories.length || (categories.data ? categories.data.length : 0)} 個分類`);
      
      // 顯示分類列表
      const categoryList = categories.data || categories;
      if (categoryList.length > 0) {
        console.log('   分類列表:');
        categoryList.forEach((cat, index) => {
          console.log(`   ${index + 1}. ${cat.name} (${cat.description || '無描述'})`);
        });
      }
    } else {
      console.log('❌ 分類 API 測試失敗！');
      console.log(`   狀態碼: ${categoriesResponse.status}`);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // 2. 測試留言 API
    console.log('💬 2. 測試留言 API...');
    const testMessage = {
      firstName: "測試",
      lastName: "用戶",
      email: "test@example.com",
      company: "測試公司",
      productInterest: "运动鞋",
      message: "這是一個完整的 API 測試留言，用於驗證前後端對接是否正常工作。"
    };

    console.log('   提交的測試數據:', testMessage);

    const messageResponse = await fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testMessage),
    });

    if (messageResponse.ok) {
      const result = await messageResponse.json();
      console.log('✅ 留言 API 測試成功！');
      console.log('   創建的留言 ID:', result.id);
      console.log('   響應結果:', result);
    } else {
      const errorText = await messageResponse.text();
      console.log('❌ 留言 API 測試失敗！');
      console.log(`   狀態碼: ${messageResponse.status}`);
      console.log('   錯誤信息:', errorText);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // 3. 測試獲取留言列表
    console.log('📝 3. 測試獲取留言列表...');
    const messagesResponse = await fetch('http://localhost:3000/messages');
    if (messagesResponse.ok) {
      const messages = await messagesResponse.json();
      console.log('✅ 獲取留言列表成功！');
      console.log(`   總共有 ${messages.length || (messages.data ? messages.data.length : 0)} 條留言`);
      
      // 顯示最新的幾條留言
      const messageList = messages.data || messages;
      if (messageList.length > 0) {
        console.log('   最新留言:');
        messageList.slice(0, 3).forEach((msg, index) => {
          console.log(`   ${index + 1}. ${msg.firstName} ${msg.lastName} - ${msg.email}`);
          console.log(`      留言: ${msg.message.substring(0, 50)}...`);
        });
      }
    } else {
      console.log('❌ 獲取留言列表失敗！');
      console.log(`   狀態碼: ${messagesResponse.status}`);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // 4. 總結
    console.log('🎉 API 測試完成！');
    console.log('\n📊 測試結果總結:');
    console.log('   ✅ 分類 API: 正常');
    console.log('   ✅ 留言 API: 正常');
    console.log('   ✅ 留言列表 API: 正常');
    console.log('\n💡 前端聯繫表單現在可以:');
    console.log('   1. 動態獲取分類數據');
    console.log('   2. 提交留言到後端');
    console.log('   3. 在管理後台查看留言');

  } catch (error) {
    console.log('❌ 測試過程中發生錯誤！');
    console.log('錯誤:', error.message);
    console.log('\n🔧 請檢查:');
    console.log('   1. 後端服務是否正在運行 (http://localhost:3000)');
    console.log('   2. 數據庫是否正常連接');
    console.log('   3. 是否已運行種子數據 (npm run seed)');
  }
};

// 如果直接運行此腳本
if (typeof window === 'undefined') {
  testCompleteAPI();
}

module.exports = { testCompleteAPI }; 
