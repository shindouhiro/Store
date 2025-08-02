// 測試留言 API 的腳本
const testMessageAPI = async () => {
  const testData = {
    firstName: "測試",
    lastName: "用戶",
    email: "test@example.com",
    company: "測試公司",
    productInterest: "運動鞋",
    message: "這是一個測試留言，用於驗證 API 是否正常工作。"
  };

  try {
    console.log('正在測試留言 API...');
    console.log('測試數據:', testData);

    const response = await fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ API 測試成功！');
      console.log('響應結果:', result);
    } else {
      const errorText = await response.text();
      console.log('❌ API 測試失敗！');
      console.log('狀態碼:', response.status);
      console.log('錯誤信息:', errorText);
    }
  } catch (error) {
    console.log('❌ 請求失敗！');
    console.log('錯誤:', error.message);
  }
};

// 如果直接運行此腳本
if (typeof window === 'undefined') {
  testMessageAPI();
}

module.exports = { testMessageAPI }; 
