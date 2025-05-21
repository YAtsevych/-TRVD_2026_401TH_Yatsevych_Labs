import mysql from 'mysql2/promise'
let conn
try {
  conn = await mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '1111',
    database: 'db_course_sql',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  console.log('✅ Connected to MySQL database')
} catch (err) {
  console.error(' Failed to connect to MySQL:', err.message)
  process.exit(1) // Завершити процес, якщо підключення неможливе
}

export default conn
