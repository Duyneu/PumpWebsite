/**
 * Database Initialization Script for PostgreSQL
 * Runs schema-postgres.sql and seed-postgres.sql
 */

const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('sslmode=require') || process.env.DB_SSL === 'true'
        ? { rejectUnauthorized: false }
        : false,
    }
  : {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'voltor_db',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    };

const schemaPath = path.join(__dirname, '../../database/schema-postgres.sql');
const seedPath = path.join(__dirname, '../../database/seed-postgres.sql');

async function initDatabase() {
  console.log('🔄 Initializing PostgreSQL database for VOLTOR...');
  console.log(`📡 Connecting to: ${poolConfig.connectionString || `${poolConfig.host}:${poolConfig.port}/${poolConfig.database}`}`);

  const pool = new Pool(poolConfig);

  try {
    const client = await pool.connect();
    console.log('✅ Connection established.');

    console.log(`📄 Executing schema: ${schemaPath}`);
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await client.query(schemaSql);
    console.log('✅ Schema created successfully!');

    console.log(`🌱 Executing seed data: ${seedPath}`);
    const seedSql = fs.readFileSync(seedPath, 'utf8');
    await client.query(seedSql);
    console.log('✅ Seed data inserted successfully!');

    // Verify row counts
    const counts = await client.query(`
      SELECT 'users' AS table_name, count(*) FROM users
      UNION ALL SELECT 'categories', count(*) FROM categories
      UNION ALL SELECT 'products', count(*) FROM products
      UNION ALL SELECT 'reviews', count(*) FROM reviews
      UNION ALL SELECT 'orders', count(*) FROM orders;
    `);

    console.log('\n📊 Database summary:');
    console.table(counts.rows);

    client.release();
    console.log('\n🎉 PostgreSQL initialization complete!');
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    if (error.code === '3D000') {
      console.error(`💡 Database "${poolConfig.database}" does not exist. Please create it first:`);
      console.error(`   createdb -U postgres ${poolConfig.database}`);
    }
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initDatabase();

