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
app.get('/User', async (req, res) => {
  const result = await conn.query('SELECT * FROM User')
    res.json(result[0])
})

// path = POST / user สำหรับสร้าง users ใหม่บันทึกเข้าไป
app.post('/User', async (req, res) => {
 
  try {
    let User = req.body;
    const results = await conn.query('INSERT INTO User SET ?', User)
    res.json({
      message: 'Create User successfully',
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


 // path = GET / users /: id สำหรับดึง users รายคนออกมา
// path = GET / users /: id สำหรับดึง users รายคนออกมา
app.get('/User/:id', async (req, res) => {
  try {
  let id = req.params.id;
  const result = await conn.query('SELECT * FROM User WHERE id = ?', id)
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
 app.put('/User/:id',async (req, res) => {
  try {
    let id = req.params.id;
    let updateUser = req.body;
    const results = await conn.query
    ('UPDATE User SET? WHERE id = ?',
       [updateUser, id]
      )
    res.json({
      message: 'Create User successfully',
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
 app.delete('/User/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query(
      'DELETE from User WHERE id = ?', id)
    res.json({
      message: 'Delete User successfully',
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
