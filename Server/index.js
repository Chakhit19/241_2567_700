const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

let conn = null;

// เชื่อมต่อ MySQL
const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webdb',
    port: 8830
  });
};

// ฟังก์ชันตรวจสอบข้อมูล
const validateData = (userData) => {
  let errors = [];
  if (!userData.firstname) errors.push('กรุณากรอกชื่อ');
  if (!userData.lastname) errors.push('กรุณากรอกนามสกุล');
  if (!userData.age) errors.push('กรุณากรอกอายุ');
  if (!userData.gender) errors.push('กรุณาเลือกเพศ');
  if (!userData.interests) errors.push('กรุณาเลือกความสนใจ');
  if (!userData.description) errors.push('กรุณากรอกคำอธิบาย');
  return errors;
};

// ดึง Users ทั้งหมด
app.get('/user', async (req, res) => {
  try {
    const [result] = await conn.query('SELECT * FROM users');
    res.json(result);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
  }
});

// เพิ่ม User ใหม่
app.post('/user', async (req, res) => {
  try {
    let userData = req.body;
    const errors = validateData(userData);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน', errors });
    }

    const [result] = await conn.query('INSERT INTO users SET ?', userData);
    res.json({ message: 'Create user successfully', data: result });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
  }
});

// ดึง User ตาม ID
app.get('/user/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const [result] = await conn.query('SELECT * FROM users WHERE id = ?', [id]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result[0]);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
  }
});

// อัปเดตข้อมูล User ตาม ID
app.put('/user/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let updateData = req.body;

    const [result] = await conn.query('UPDATE users SET ? WHERE id = ?', [updateData, id]);

    res.json({ message: 'Update user successfully', data: result });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
  }
});

// ลบ User ตาม ID
app.delete('/user/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const [result] = await conn.query('DELETE FROM users WHERE id = ?', [id]);

    res.json({ message: 'Delete user successfully', data: result });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
  }
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, async () => {
  await initMySQL();
  console.log(`Http Server is running on port ${port}`);
});
