/**
 * MySQL Database Connection Pool
 */

const mysql = require('mysql2');
const util = require('util');

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'voltor_db',
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  timezone: '+07:00',
  charset: 'utf8mb4',
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Promisify for async/await
const promisePool = pool.promise();

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ MySQL Connection Error:', err.message);
    console.error('⚠️  Please check:');
    console.error('   1. MySQL is running');
    console.error('   2. Database "voltor_db" exists');
    console.error('   3. User/password is correct');
    process.exit(1);
  }
  
  if (connection) {
    console.log('✅ MySQL Connected Successfully!');
    console.log(`📊 Database: ${dbConfig.database}`);
    console.log(`🌐 Host: ${dbConfig.host}:${dbConfig.port}`);
    connection.release();
  }
});

// Export both pool types
module.exports = {
  pool,           // For callback-style queries
  promisePool,    // For async/await queries
  query: promisePool.query.bind(promisePool),
  execute: promisePool.execute.bind(promisePool),
};
