import pkg from 'pg'
const { Pool } = pkg
DATABASE_URL =
  'postgresql://neondb_owner:npg_a3mKw9jLJlUP@ep-billowing-snowflake-a81pof5v-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
let pool
try {
  pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // обов’язково для Neon
    },
  })

  // Перевіряємо підключення
  await pool.query('SELECT 1')
  console.log('✅ Connected to PostgreSQL (Neon) database')
} catch (err) {
  console.error('❌ Failed to connect to PostgreSQL:', err.message)
  process.exit(1)
}

export default pool
