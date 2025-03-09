const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();

const port = 8000;
app.use(bodyParser.json());

app.use(cors());

let users = []
let conn = null

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webdb',
    port: 8830
  })
}
const validateData = (userData) => {
  let errors = []
  if (!userData.firstname) {
      errors.push = ('กรุณากรอกชื่อ')
  }
  if (!userData.lastname) {
      errors.push = ('กรุณากรอกนามสกุล')
  }
  if (!userData.age) {
      errors.push = ('กรุณากรอกอายุ')
  }
  if (!userData.gender) {
      errors.push = ('กรุณาเลือกเพศ')
  }
  if (!userData.interests) {
      errors.push = ('กรุณาเลือกความสนใจ')
  }
  if (!userData.description) {
      errors.push = ('กรุณากรอกคำอธิบาย')
  }
  return errors
}

// app.get('/testdb', (req, res) => {
//   mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'webdb',
//     port: 8830

//   }).then((conn) => {
//     conn
//     .query('SELECT * FROM users')
//     .then((result) => {
//       res.json(result[0])

//     })
//     .catch((error) => {
//       console.log('error', error.message)
//       res.status(500).json({error: 'Error fetching users'})
//     })
//   })
// })


// app.get('/testdbnew',async (req, res) => {
//   try {

//     const result = await conn.query('SELECT * FROM users')
//     res.json(result[0])

//   } catch (error) {
//     console.log('error', error.message)
//     res.status(500).json({error: 'Error fetching users'})
//   }

// })

/*
GET /users สำหรับ get users ทั้งหมดที่บันทึกไว้
POST /users สำหรับสร้าง users ใหม่บันทึกเข้าไป
PUT /user/:id สำหรับดึง users รายคน (ตาม id ที่บันทึกเข้าไป)
DELETE /user/:id สำหรับลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
*/ 

// path = GET / users สำหรับ get users ทั้งหมดที่บันทึกไว้
app.get('/user', async (req, res) => {
  const result = await conn.query('SELECT * FROM user')
    res.json(result[0])
})

// path = POST / user สำหรับสร้าง users ใหม่บันทึกเข้าไป
app.post('/user', async (req, res) => {
 
  try {
    let user = req.body;
    const errors = validateData(user)
    if (errors.length > 0) {
      //มี error
      throw {
          message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
          errors: errors
      }
    }
    const results = await conn.query('INSERT INTO user SET ?', user)
    res.json({
      message: 'Create user successfully',
      data: results[0]
   })
  }catch (error) {
    const errorMessage= error.errors || 'something went wrong'
    const errors = error.errors || []
    console.log('error', error.message)
    res.status(500).json({
      message:errorMessage,
      error: errors
    })
  }
})


 // path = GET / users /: id สำหรับดึง users รายคนออกมา
// path = GET / users /: id สำหรับดึง users รายคนออกมา
app.get('/user/:id', async (req, res) => {
  try {
  let id = req.params.id;
  const result = await conn.query('SELECT * FROM user WHERE id = ?', id)
  if (result[0].length == 0) {
    throw { statuscode: 404, message: 'User not found' }
    }
    res.json(result[0][0])
  } catch (error) {
      console.log('error', error.message)
      let statusCode = error.statusCode || 500
      res.status(500).json({ 
      message: 'something went wrong',
      errorMessage: error.message
    })
  }
})
   


 // path = PUT /user/:id สำหรับดึง users รายคน (ตาม id ที่บันทึกเข้าไป)
 app.put('/user/:id',async (req, res) => {
  try {
    let id = req.params.id;
    let updateUser = req.body;
    const results = await conn.query
    ('UPDATE user SET? WHERE id = ?',
       [updateUser, id]
      )
    res.json({
      message: 'Create user successfully',
      data: results[0]
   })
  }catch (error) {
    console.log('error', error.message)
    res.status(500).json({
      message:'something went wrong',
      errorMessage: error.message
    })
  }
})



 //path = DELETE /users/:id สำหรับลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
 app.delete('/user/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query(
      'DELETE from user WHERE id = ?', id)
    res.json({
      message: 'Delete user successfully',
      data: results[0]
   })
  } catch (error) {
    console.log('error', error.message)  
    res.status(500).json({
      message: 'something went wrong',
      errorMessage: error.message  
     })
   }
});

app.listen(port, async (req, res) => {  
  await initMySQL()
  console.log('Http Server is running on port ' + port);
});