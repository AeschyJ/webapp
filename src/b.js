const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

// 存儲用戶數據的示例數組，實際應使用數據庫
const users = [];

// 註冊頁面url
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
  });

// 處理註冊表單提交
app.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // 验证表单数据
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).send('請勿留白');
  }

  if (password !== confirmPassword) {
    return res.status(400).send('密碼和確認密碼不匹配');
  }

  // 检查邮箱是否已经存在
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).send('該電子郵件已被註冊');
  }

  // 创建新用户
  const newUser = { name, email, password };
  users.push(newUser);

  res.send('註冊成功');
});

// 啟動服務器測試
app.listen(3000, () => {
  console.log('服務器已啟動在 http://localhost:3000');
});
