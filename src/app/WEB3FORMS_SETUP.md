# 📧 HƯỚNG DẪN SETUP WEB3FORMS - NHẬN EMAIL TẠI voltorvietnam@gmail.com

## ⚠️ VẤN ĐỀ: Không nhận được email?

Nếu bạn không nhận được email sau khi submit form, có thể do:
1. ❌ Access key chưa được verify
2. ❌ Email destination chưa được setup trong Web3Forms
3. ❌ Email bị vào thư mục Spam
4. ❌ Access key đã hết hạn

## ✅ GIẢI PHÁP: Setup lại Web3Forms từ đầu

---

## 🚀 BƯỚC 1: Đăng ký Web3Forms

### 1.1. Truy cập trang Web3Forms
```
https://web3forms.com/
```

### 1.2. Click "Get Started - It's Free"
- Không cần tạo account
- Hoàn toàn miễn phí
- Unlimited emails

### 1.3. Nhập email nhận
```
Email: voltorvietnam@gmail.com
```

### 1.4. Click "Create Access Key"
- Web3Forms sẽ tạo Access Key cho bạn
- Copy Access Key (format: abc12345-xxxx-xxxx-xxxx-xxxxxxxxxxxx)

---

## 📬 BƯỚC 2: Verify Email

### 2.1. Check inbox của voltorvietnam@gmail.com
```
From: Web3Forms <noreply@web3forms.com>
Subject: Verify your email address
```

### 2.2. Click vào link verify trong email
```
https://web3forms.com/verify/[token]
```

### 2.3. Xác nhận verification thành công
```
✅ Email verified!
✅ Your access key is now active
```

---

## 🔑 BƯỚC 3: Lấy Access Key mới

### 3.1. Sau khi verify, Web3Forms sẽ hiển thị Access Key

**Access Key hiện tại trong code:**
```
252ee315-5618-4876-a628-20be7c1cf61b
```

### 3.2. Nếu cần tạo Access Key mới:
```
1. Vào https://web3forms.com/
2. Nhập email: voltorvietnam@gmail.com
3. Click "Create Access Key"
4. Verify email
5. Copy Access Key mới
```

---

## 💻 BƯỚC 4: Cập nhật Access Key vào code

### 4.1. Mở file: `/utils/emailService.ts`

### 4.2. Tìm dòng:
```typescript
const WEB3FORMS_ACCESS_KEY = '252ee315-5618-4876-a628-20be7c1cf61b';
```

### 4.3. Thay bằng Access Key mới:
```typescript
const WEB3FORMS_ACCESS_KEY = 'YOUR_NEW_ACCESS_KEY_HERE';
```

### 4.4. Save file

---

## 🧪 BƯỚC 5: Test Email

### 5.1. Reload website
```
Ctrl + R (Windows)
Cmd + R (Mac)
```

### 5.2. Vào trang Contact
```
https://your-website.com/contact
```

### 5.3. Điền form test:
```
Họ tên:      Test User
Điện thoại:  0123456789
Email:       test@example.com
Nội dung:    Testing email system
```

### 5.4. Click "Gửi yêu cầu"

### 5.5. Mở Browser Console (F12)
```
Tìm logs:
🚀 Sending email via Web3Forms...
📧 To: voltorvietnam@gmail.com
👤 From: Test User (test@example.com)
✅ Web3Forms Response: {success: true}
✅ Email sent successfully to voltorvietnam@gmail.com
📬 Please check your inbox (or spam folder)
```

### 5.6. Check email voltorvietnam@gmail.com
```
Inbox → Check for new email
Spam → Check spam folder

From: Web3Forms <noreply@web3forms.com>
Subject: 🔔 Yêu cầu tư vấn từ Test User
```

---

## 📧 BƯỚC 6: Kiểm tra Spam Folder

### 6.1. Email có thể bị đánh dấu Spam lần đầu
```
1. Mở Gmail: voltorvietnam@gmail.com
2. Click vào "Spam" bên trái
3. Tìm email từ Web3Forms
4. Click "Not Spam" để move vào Inbox
```

### 6.2. Whitelist Web3Forms
```
1. Mở email từ Web3Forms
2. Click vào icon "More" (3 dots)
3. Chọn "Add noreply@web3forms.com to Contacts"
4. Emails tương lai sẽ vào Inbox
```

---

## 🔍 BƯỚC 7: Troubleshooting

### Vấn đề 1: Console log báo error
```javascript
❌ Web3Forms error: {success: false, message: "Invalid access key"}
```

**Giải pháp:**
- Access key chưa verify
- Quay lại BƯỚC 2 và verify email
- Hoặc tạo Access Key mới tại BƯỚC 3

---

### Vấn đề 2: Console log success nhưng không thấy email
```javascript
✅ Web3Forms Response: {success: true}
```

**Giải pháp:**
- Check Spam folder (BƯỚC 6)
- Đợi vài phút (có thể delay)
- Check email đúng: voltorvietnam@gmail.com

---

### Vấn đề 3: Network error
```javascript
❌ Web3Forms error: Failed to fetch
```

**Giải pháp:**
- Kiểm tra internet connection
- Thử lại sau vài phút
- Check firewall/antivirus

---

## 📋 CHECKLIST: Verify Setup

Trước khi test, đảm bảo:

- [ ] ✅ Đã đăng ký Web3Forms với email voltorvietnam@gmail.com
- [ ] ✅ Đã verify email (check inbox)
- [ ] ✅ Đã copy Access Key
- [ ] ✅ Đã paste Access Key vào `/utils/emailService.ts`
- [ ] ✅ Đã save file
- [ ] ✅ Đã reload website
- [ ] ✅ Console log hiển thị "✅ Email sent successfully"
- [ ] ✅ Đã check cả Inbox và Spam folder

---

## 🎯 KẾT QUẢ MONG ĐỢI

### Sau khi setup đúng:

**1. User submit form:**
```
User điền form → Click "Gửi yêu cầu"
```

**2. Console logs:**
```javascript
🚀 Sending email via Web3Forms...
📧 To: voltorvietnam@gmail.com
👤 From: Nguyễn Văn A (customer@example.com)
✅ Web3Forms Response: {success: true, message: "Email sent successfully"}
✅ Email sent successfully to voltorvietnam@gmail.com
📬 Please check your inbox (or spam folder)
```

**3. Email nhận được:**
```
From: Web3Forms <noreply@web3forms.com>
Reply-To: customer@example.com
To: voltorvietnam@gmail.com

Subject: 🔔 Yêu cầu tư vấn từ Nguyễn Văn A

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Họ tên: Nguyễn Văn A
Email: customer@example.com
Điện thoại: 0123456789

Nội dung:
Tôi muốn tư vấn về máy bơm...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**4. User nhận thông báo:**
```
✅ Yêu cầu của bạn đã được gửi thành công! 
   Chúng tôi sẽ liên hệ lại sớm.
```

---

## 🔄 ALTERNATIVE: Nếu Web3Forms không hoạt động

### Option 1: Sử dụng EmailJS

**File:** `/utils/emailService.ts`

```typescript
// Comment dòng này:
// export const sendEmail = sendContactEmailWeb3Forms;

// Uncomment dòng này:
export const sendEmail = sendContactEmailWithEmailJS;
```

**Setup EmailJS:**
1. Truy cập: https://www.emailjs.com/
2. Sign up với voltorvietnam@gmail.com
3. Connect Gmail service
4. Create template
5. Copy Service ID, Template ID, Public Key
6. Paste vào `/utils/emailService.ts`

---

### Option 2: Sử dụng Demo Mode (Chỉ lưu database)

**File:** `/utils/emailService.ts`

```typescript
// Comment dòng này:
// export const sendEmail = sendContactEmailWeb3Forms;

// Uncomment dòng này:
export const sendEmail = sendContactEmailDemo;
```

**Note:** Demo mode chỉ log ra console và lưu vào database, không gửi email thật.

---

## 📞 LIÊN HỆ HỖ TRỢ

Nếu vẫn gặp vấn đề, liên hệ:

- 📧 Email: voltorvietnam@gmail.com
- 📱 Phone: (+84) 898 296 336
- 💬 Zalo: https://zalo.me/84898296336
- 👤 Facebook: https://www.facebook.com/profile.php?id=61576883068377

---

## ✅ TÓM TẮT

**Setup Web3Forms trong 5 bước:**

1. ✅ Đăng ký tại https://web3forms.com/ với email voltorvietnam@gmail.com
2. ✅ Verify email (check inbox)
3. ✅ Copy Access Key
4. ✅ Paste vào `/utils/emailService.ts`
5. ✅ Test và check email (inbox + spam)

**Nếu thành công:**
- Console log: ✅ Email sent successfully
- Gmail nhận email từ noreply@web3forms.com
- User thấy thông báo success

**Nếu thất bại:**
- Check console logs để debug
- Verify lại email
- Hoặc dùng EmailJS/Demo mode

---

**Perfect! Web3Forms setup hoàn chỉnh! 🎉📧**
