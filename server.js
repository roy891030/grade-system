const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

// 使用 CORS 中间件
app.use(cors());

// 设置 MySQL 连接
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'roy891030891030',
  database: 'grades'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// 使用 body-parser 解析 JSON 请求
app.use(bodyParser.json());

// 测试根路径
app.get('/', (req, res) => {
  res.send('Hello, this is your server running!');
});

// 处理國語成绩提交请求
app.post('/api/grades/chinese', (req, res) => {
  const { time, gradeType, chapter, grades } = req.body;

  const subject = '國語';
  const date = new Date(time);

  grades.forEach((score, index) => {
    const studentId = index + 1; // 假设学生 ID 为 1, 2, ..., 40
    const scoreValue = score === '' || score === undefined ? null : score;
    const query = 'INSERT INTO grades (student_id, subject, date, grade_type, chapter, score) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [studentId, subject, date, gradeType, chapter, scoreValue], (err, result) => {
      if (err) {
        console.error('Error inserting grade:', err);
        res.status(500).json({ success: false, message: 'Database insertion error' });
        return;
      }
    });
  });

  res.json({ success: true, message: 'Grades submitted successfully!' });
});

// 处理數學成绩提交请求
app.post('/api/grades/math', (req, res) => {
  const { time, gradeType, chapter, grades } = req.body;

  const subject = '數學';
  const date = new Date(time);

  grades.forEach((score, index) => {
    const studentId = index + 1; // 假设学生 ID 为 1, 2, ..., 40
    const scoreValue = score === '' || score === undefined ? null : score;
    const query = 'INSERT INTO grades (student_id, subject, date, grade_type, chapter, score) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [studentId, subject, date, gradeType, chapter, scoreValue], (err, result) => {
      if (err) {
        console.error('Error inserting grade:', err);
        res.status(500).json({ success: false, message: 'Database insertion error' });
        return;
      }
    });
  });

  res.json({ success: true, message: 'Grades submitted successfully!' });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
