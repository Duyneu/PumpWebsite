/**
 * PostgreSQL Database Connection Pool & Compatibility Layer
 * VOLTOR Vietnam Backend
 */

const { Pool, types } = require('pg');
require('dotenv').config();

// Parse INT8 (BIGINT / COUNT(*)) as standard JavaScript integer
types.setTypeParser(types.builtins.INT8, (val) => (val === null ? null : parseInt(val, 10)));
// Parse NUMERIC / DECIMAL as float for numeric arithmetic
types.setTypeParser(types.builtins.NUMERIC, (val) => (val === null ? null : parseFloat(val)));

// Determine connection options
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
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    };

// Create PostgreSQL connection pool
const pool = new Pool(poolConfig);

// Test pool connection asynchronously without crashing the server immediately
pool.connect((err, client, release) => {
  if (err) {
    console.error('⚠️  PostgreSQL Connection Notice:', err.message);
    console.error('👉 Make sure PostgreSQL is running or configure DATABASE_URL in .env');
    return;
  }
  
  console.log('✅ PostgreSQL Connected Successfully!');
  if (process.env.DATABASE_URL) {
    console.log(`📊 Connection: Using DATABASE_URL`);
  } else {
    console.log(`📊 Database: ${poolConfig.database}`);
    console.log(`🌐 Host: ${poolConfig.host}:${poolConfig.port}`);
  }
  release();
});

/**
 * Prepares and converts SQL and parameters from MySQL placeholder format (?)
 * to PostgreSQL format ($1, $2, ...) and adds RETURNING id to INSERTs if missing.
 */
function prepareQuery(sql, params = []) {
  const safeParams = (params || []).map((val) => (val === undefined ? null : val));
  let paramIndex = 1;
  let formattedSql = sql.replace(/\?/g, () => `$${paramIndex++}`);

  // Convert MySQL boolean expressions (= 1 / = 0) on boolean columns
  formattedSql = formattedSql.replace(
    /\b(is_active|is_featured|is_bestseller|is_new|is_approved|is_verified_purchase)\s*=\s*1\b/gi,
    '$1 = true'
  );
  formattedSql = formattedSql.replace(
    /\b(is_active|is_featured|is_bestseller|is_new|is_approved|is_verified_purchase)\s*=\s*0\b/gi,
    '$1 = false'
  );

  // Auto append RETURNING id for INSERT queries if not already present
  const trimmed = formattedSql.trim();
  if (/^insert\s+into/i.test(trimmed) && !/returning\s+/i.test(trimmed)) {
    formattedSql = `${formattedSql} RETURNING id`;
  }

  return { formattedSql, safeParams };
}

/**
 * Formats pg query result to be compatible with MySQL2 `[rows, resultHeader]` destructuring.
 */
function formatResult(res) {
  const rows = res.rows || [];
  const meta = {
    insertId: rows.length > 0 && rows[0].id !== undefined ? rows[0].id : null,
    affectedRows: res.rowCount,
    rowCount: res.rowCount,
    fields: res.fields,
  };

  const resultTuple = [rows, meta];
  resultTuple.rows = rows;
  resultTuple.rowCount = res.rowCount;
  resultTuple.insertId = meta.insertId;
  return resultTuple;
}

/**
 * Main query function
 */
async function executeQuery(sql, params = []) {
  const { formattedSql, safeParams } = prepareQuery(sql, params);
  const res = await pool.query(formattedSql, safeParams);
  return formatResult(res);
}

/**
 * Transaction connection helper compatible with MySQL2 promisePool.getConnection()
 */
const promisePool = {
  query: executeQuery,
  execute: executeQuery,
  getConnection: async () => {
    const client = await pool.connect();
    return {
      client,
      query: async (sql, params = []) => {
        const { formattedSql, safeParams } = prepareQuery(sql, params);
        const res = await client.query(formattedSql, safeParams);
        return formatResult(res);
      },
      execute: async (sql, params = []) => {
        const { formattedSql, safeParams } = prepareQuery(sql, params);
        const res = await client.query(formattedSql, safeParams);
        return formatResult(res);
      },
      beginTransaction: async () => {
        await client.query('BEGIN');
      },
      commit: async () => {
        await client.query('COMMIT');
      },
      rollback: async () => {
        await client.query('ROLLBACK');
      },
      release: () => {
        client.release();
      },
    };
  },
};

module.exports = {
  pool,
  promisePool,
  query: executeQuery,
  execute: executeQuery,
};
