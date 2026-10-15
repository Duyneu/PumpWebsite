/**
 * MySQL Database Configuration
 * 
 * ⚠️ HƯỚNG DẪN SETUP:
 * 
 * 1. Cài đặt MySQL:
 *    - Download: https://dev.mysql.com/downloads/mysql/
 *    - Hoặc dùng XAMPP: https://www.apachefriends.org/
 *    - Hoặc dùng MySQL Workbench
 * 
 * 2. Tạo Database:
 *    CREATE DATABASE voltor_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
 * 
 * 3. Import Schema:
 *    mysql -u root -p voltor_db < database/schema.sql
 * 
 * 4. Import Sample Data:
 *    mysql -u root -p voltor_db < database/seed.sql
 * 
 * 5. Cập nhật thông tin kết nối bên dưới
 */

export const DB_CONFIG = {
  host: 'localhost',        // MySQL host
  port: 3306,              // MySQL port (default: 3306)
  user: 'root',            // MySQL username
  password: '',            // MySQL password (để trống nếu không có)
  database: 'voltor_db',   // Database name
  
  // Connection pool settings
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  
  // Timezone
  timezone: '+07:00',      // Vietnam timezone
  
  // Character set
  charset: 'utf8mb4',
};

/**
 * Mock Database Connection (cho development không có MySQL)
 */
export const USE_MOCK_DB = false; // Set TRUE nếu chưa có MySQL

/**
 * API Endpoint (Frontend sẽ call đến đây)
 */
export const API_BASE_URL = 'http://localhost:3001/api'; // Backend API URL
