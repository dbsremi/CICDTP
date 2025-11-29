const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

async function runMigrations() {
  let pool;
  try {
    console.log('Démarrage des migrations...');

    pool = await mysql.createPool(dbConfig);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        uuid VARCHAR(36) PRIMARY KEY,
        fullname VARCHAR(255) NOT NULL,
        study_level VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('Migrations terminées avec succès.');
  } catch (err) {
    console.error('Erreur lors des migrations :', err);
    process.exit(1);
  } finally {
    if (pool) {
      await pool.end();
    }
  }
}

runMigrations();
