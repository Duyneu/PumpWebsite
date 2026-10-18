-- ============================================
-- VOLTOR VIETNAM - Create Admin User
-- ============================================
-- Admin account for product management
-- ============================================

-- Create admin user
-- Email: huuduy0811@gmail.com
-- Password: Huuduy0911@ (hashed với bcrypt)
-- Note: Trong production, password sẽ được hash bởi backend

INSERT INTO users (
    email,
    password,
    name,
    phone,
    address,
    avatar,
    provider,
    provider_id,
    role,
    is_active,
    created_at
) VALUES (
    'huuduy0811@gmail.com',
    '$2b$10$rGfVkJ5tY8h9Z2KxQwN3/.F1XYvZ0qH3sP8tF5mK6pL7nQ9sR1tU2', -- 'Huuduy0911@' hashed
    'VOLTOR Admin',
    '0898296336',
    'Số 112-118 Lý Thường Kiệt, Thị trấn Lim, Tiên Du, Bắc Ninh',
    NULL,
    'local',
    NULL,
    'admin',
    TRUE,
    NOW()
);

-- ============================================
-- Admin User Created!
-- ============================================
-- Email: huuduy0811@gmail.com
-- Password: Huuduy0911@
-- Role: admin
-- ============================================

SELECT 'Admin user created successfully!' as message;
SELECT 
    id, 
    email, 
    name, 
    role, 
    created_at 
FROM users 
WHERE role = 'admin';
