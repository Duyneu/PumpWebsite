# 📧 TÌNH TRẠNG EMAIL - VOLTOR WEBSITE

## ✅ CẤU HÌNH HIỆN TẠI

**Email nhận:** voltorvietnam@gmail.com  
**Số điện thoại:** (+84) 836 389 488  
**Địa chỉ:** Số 112-118 Lý Thường Kiệt, Thị trấn Lim, Tiên Du, Bắc Ninh

---

## 🔧 THIẾT LẬP EMAIL SERVICE

### Web3Forms - PRODUCTION MODE ✅

**File:** `/utils/emailService.ts`  
**Access Key:** `252ee315-5618-4876-a628-20be7c1cf61b`  
**Status:** ACTIVE

```typescript
export const sendEmail = sendContactEmailWeb3Forms;
```

**Email flow:**
```
User submit form
  ↓
Web3Forms API
  ↓
Email gửi đến: voltorvietnam@gmail.com
  ↓
Lưu vào Database (/api/messages)
```

---

## ⚠️ VẤN ĐỀ: Không nhận được email?

### Checklist Troubleshooting:

#### 1️⃣ **Kiểm tra Spam/Junk folder**
```
Gmail → Spam folder
Tìm email từ: noreply@web3forms.com
```

#### 2️⃣ **Verify Access Key**
```
1. Truy cập: https://web3forms.com/
2. Đăng ký với: voltorvietnam@gmail.com
3. Verify email (check inbox)
4. Lấy Access Key mới
5. Cập nhật vào /utils/emailService.ts
```

#### 3️⃣ **Kiểm tra Console Logs**
```
F12 → Console

Logs mong đợi:
🚀 Sending email via Web3Forms...
📧 To: voltorvietnam@gmail.com
👤 From: [Tên khách hàng] ([Email])
✅ Web3Forms Response: {success: true}
✅ Email sent successfully to voltorvietnam@gmail.com
📬 Please check your inbox (or spam folder)
```

#### 4️⃣ **Test gửi email**
```
1. Vào /contact
2. Điền form:
   - Tên: Test User
   - Điện thoại: 0123456789
   - Email: test@example.com
   - Nội dung: Testing email
3. Click "Gửi yêu cầu"
4. Check console logs
5. Check email voltorvietnam@gmail.com
```

---

## 🔄 BACKUP OPTIONS

### Option 1: EmailJS (200 emails/tháng)

**Setup:**
```typescript
// Trong /utils/emailService.ts
export const sendEmail = sendContactEmailWithEmailJS;
```

**Cần config:**
- Service ID
- Template ID  
- Public Key

**Link:** https://www.emailjs.com/

---

### Option 2: Demo Mode (Chỉ lưu database)

**Setup:**
```typescript
// Trong /utils/emailService.ts
export const sendEmail = sendContactEmailDemo;
```

**Lưu ý:** Không gửi email thật, chỉ log console + save database

---

## 📊 KIỂM TRA LOGS

### Browser Console (F12):

**Success:**
```javascript
🚀 Sending email via Web3Forms...
📧 To: voltorvietnam@gmail.com
👤 From: Nguyễn Văn A (customer@example.com)
✅ Web3Forms Response: {
  success: true,
  message: "Email sent successfully"
}
✅ Email sent successfully to voltorvietnam@gmail.com
📬 Please check your inbox (or spam folder)
```

**Error:**
```javascript
❌ Web3Forms error: {
  success: false,
  message: "Invalid access key"
}
```

---

## 🛠️ CÁCH SỬA LỖI "INVALID ACCESS KEY"

### Bước 1: Tạo Access Key mới

```
1. Vào: https://web3forms.com/
2. Click "Get Started - It's Free"
3. Nhập email: voltorvietnam@gmail.com
4. Click "Create Access Key"
```

### Bước 2: Verify Email

```
1. Check inbox: voltorvietnam@gmail.com
2. Tìm email từ Web3Forms
3. Click link verify
4. Confirm verification
```

### Bước 3: Copy Access Key

```
Format: abc12345-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Example: 252ee315-5618-4876-a628-20be7c1cf61b
```

### Bước 4: Cập nhật Code

**File:** `/utils/emailService.ts`

```typescript
// Tìm dòng này:
const WEB3FORMS_ACCESS_KEY = '252ee315-5618-4876-a628-20be7c1cf61b';

// Thay bằng Access Key mới:
const WEB3FORMS_ACCESS_KEY = 'YOUR_NEW_ACCESS_KEY_HERE';
```

### Bước 5: Test

```
1. Save file
2. Reload website (Ctrl + R)
3. Vào /contact
4. Submit test form
5. Check console logs
6. Check email
```

---

## 📬 ĐỊNH DẠNG EMAIL NHẬN ĐƯỢC

```
From: Web3Forms <noreply@web3forms.com>
Reply-To: customer@example.com
To: voltorvietnam@gmail.com

Subject: 🔔 Yêu cầu tư vấn từ Nguyễn Văn A

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 THÔNG TIN KHÁCH HÀNG:
   Họ tên:      Nguyễn Văn A
   Điện thoại:  0123456789
   Email:       customer@example.com

💬 NỘI DUNG:
Tôi muốn tư vấn về máy bơm nước...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## ✅ CHECKLIST HOÀN CHỈNH

Trước khi liên hệ support, đảm bảo đã kiểm tra:

- [ ] ✅ Access key đúng trong `/utils/emailService.ts`
- [ ] ✅ Email `voltorvietnam@gmail.com` đã verify với Web3Forms
- [ ] ✅ Đã check Spam folder trong Gmail
- [ ] ✅ Console logs hiển thị `success: true`
- [ ] ✅ Đã test với form liên hệ
- [ ] ✅ Internet connection ổn định
- [ ] ✅ Website đã reload sau khi sửa code

---

## 📞 HỖ TRỢ

**Nếu vẫn không nhận được email sau khi đã làm hết checklist:**

1. **Check Web3Forms Dashboard:**
   - Login: https://web3forms.com/
   - Xem submissions history
   - Kiểm tra quota còn lại

2. **Tạo Access Key mới:**
   - Có thể key cũ đã hết hạn
   - Follow Bước 1-5 ở trên

3. **Thử EmailJS:**
   - Switch sang EmailJS (Option 1)
   - Hoặc dùng Demo mode tạm thời

4. **Liên hệ Web3Forms Support:**
   - https://web3forms.com/support
   - Email: support@web3forms.com

---

## 📄 TÀI LIỆU THAM KHẢO

- **Setup Guide:** `/WEB3FORMS_SETUP.md`
- **Email Guide:** `/EMAIL_SETUP_GUIDE.md`
- **Production Status:** `/PRODUCTION_EMAIL_ACTIVE.md`
- **Email Service Code:** `/utils/emailService.ts`

---

**Last Updated:** 27/12/2024  
**Status:** ✅ PRODUCTION READY  
**Email Service:** Web3Forms  
**Fallback:** Database save + Console logs

---
