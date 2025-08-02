// 測試分類 API 的腳本
const testCategoriesAPI = async () => {
  try {
    console.log('正在測試分類 API...');

    // 測試獲取所有分類
    console.log('\n1. 測試獲取所有分類...');
    const allCategoriesResponse = await fetch('http://localhost:3000/categories');
    if (allCategoriesResponse.ok) {
      const allCategories = await allCategoriesResponse.json();
      console.log('✅ 獲取所有分類成功！');
      console.log('分類數量:', allCategories.length || (allCategories.data ? allCategories.data.length : 0));
      console.log('分類列表:', allCategories.data || allCategories);
    } else {
      console.log('❌ 獲取所有分類失敗！');
      console.log('狀態碼:', allCategoriesResponse.status);
    }

    // 測試獲取啟用的分類
    console.log('\n2. 測試獲取啟用的分類...');
    const activeCategoriesResponse = await fetch('http://localhost:3000/categories?active=true');
    if (activeCategoriesResponse.ok) {
      const activeCategories = await activeCategoriesResponse.json();
      console.log('✅ 獲取啟用分類成功！');
      console.log('啟用分類數量:', activeCategories.length || (activeCategories.data ? activeCategories.data.length : 0));
      console.log('啟用分類列表:', activeCategories.data || activeCategories);
    } else {
      console.log('❌ 獲取啟用分類失敗！');
      console.log('狀態碼:', activeCategoriesResponse.status);
    }

    // 測試創建新分類（如果需要）
    console.log('\n3. 測試創建新分類...');
    const newCategory = {
      name: "測試分類",
      description: "這是一個測試分類",
      isActive: true,
      sortOrder: 0
    };

    const createResponse = await fetch('http://localhost:3000/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    });

    if (createResponse.ok) {
      const createdCategory = await createResponse.json();
      console.log('✅ 創建分類成功！');
      console.log('創建的分類:', createdCategory);
    } else {
      const errorText = await createResponse.text();
      console.log('❌ 創建分類失敗！');
      console.log('狀態碼:', createResponse.status);
      console.log('錯誤信息:', errorText);
    }

  } catch (error) {
    console.log('❌ 請求失敗！');
    console.log('錯誤:', error.message);
  }
};

// 如果直接運行此腳本
if (typeof window === 'undefined') {
  testCategoriesAPI();
}

module.exports = { testCategoriesAPI }; 
