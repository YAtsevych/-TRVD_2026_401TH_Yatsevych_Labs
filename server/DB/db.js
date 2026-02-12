import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
let pool;
try {
  pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // обов’язково для Neon
    },
  });

  // Перевіряємо підключення
  await pool.query("SELECT 1");
  console.log("✅ Connected to PostgreSQL (Neon) database");
} catch (err) {
  console.error("❌ Failed to connect to PostgreSQL:", err.message);
  process.exit(1);
}

export default pool;
