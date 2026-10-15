# 📧 Email Setup Guide - VOLTOR Contact Form

## 📬 Email nhận: **voltorvietnam@gmail.com**

---

## ✅ Hiện tại (Demo Mode)

**Status:** ✅ Hoạt động - Lưu database + Log console

**Khi khách hàng gửi form liên hệ:**
1. ✅ Data được lưu vào **JSON Database** (`/api/messages`)
2. ✅ Email preview hiển thị trong **Console** (F12)
3. ✅ Data lưu vào **localStorage** để tracking
4. ✅ Thông báo thành công cho user

**Xem email preview:**
```
1. Mở DevTools (F12)
2. Tab Console
3. Submit form liên hệ
4. Thấy email format đẹp với đầy đủ thông tin
```

**Xem messages đã gửi:**
```javascript
// Console
JSON.parse(localStorage.getItem('contact_requests'))
```

---

## 🚀 Chuyển sang gửi EMAIL THẬT

Chọn 1 trong 3 options miễn phí:

---

### ⭐ OPTION 1: Web3Forms (KHUYẾN NGHỊ)

**Ưu điểm:**
- ✅ **100% FREE** - Không giới hạn emails
- ✅ **Setup 5 phút** - Cực kỳ đơn giản
- ✅ **Không cần backend** - Chỉ cần API key
- ✅ **SPAM protection** - Recaptcha tích hợp
- ✅ **Email đẹp** - Template professional

---

#### 📝 Hướng dẫn Setup Web3Forms:

**Bước 1: Đăng ký**
```
1. Truy cập: https://web3forms.com/
2. Click "Get Started - It's Free"
3. Đăng ký với email: voltorvietnam@gmail.com
4. Verify email (check inbox)
```

**Bước 2: Tạo Form**
```
1. Login vào Web3Forms dashboard
2. Click "Create New Form"
3. Form name: "VOLTOR Contact Form"
4. Nhập email nhận: voltorvietnam@gmail.com
5. Click "Create Form"
```

**Bước 3: Copy Access Key**
```
Dashboard sẽ hiển thị Access Key dạng:
abc12345-6789-defg-hijk-lmnopqrstuv

→ Copy key này
```

**Bước 4: Cập nhật Code**

Mở file: `/utils/emailService.ts`

Tìm dòng 106:
```typescript
const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';
```

Thay bằng:
```typescript
const WEB3FORMS_ACCESS_KEY = 'abc12345-6789-defg-hijk-lmnopqrstuv'; // Key thật
```

**Bước 5: Bật Production Mode**

Mở file: `/utils/emailService.ts`

Tìm dòng 243:
```typescript
export const sendEmail = sendContactEmailDemo;
```

Thay bằng:
```typescript
export const sendEmail = sendContactEmailWeb3Forms;
```

**Bước 6: Test**
```
1. Reload website
2. Vào trang Contact
3. Điền form và gửi
4. Check email voltorvietnam@gmail.com
5. ✅ Nhận được email ngay!
```

---

**Email format nhận được:**
```
From: noreply@web3forms.com
Reply-To: [Email khách hàng]
To: voltorvietnam@gmail.com

Subject: 🔔 Yêu cầu tư vấn từ [Tên khách hàng]

Họ tên: [Tên]
Email: [Email]
Điện thoại: [SĐT]

Nội dung:
[Message từ khách hàng]
```

---

### ⭐ OPTION 2: EmailJS

**Ưu điểm:**
- ✅ **Free tier:** 200 emails/tháng
- ✅ **Custom templates** - Thiết kế email đẹp
- ✅ **Dashboard analytics** - Xem stats
- ✅ **Multiple services** - Gmail, Outlook, etc.

---

#### 📝 Hướng dẫn Setup EmailJS:

**Bước 1: Đăng ký**
```
1. Truy cập: https://www.emailjs.com/
2. Click "Sign Up"
3. Đăng ký với email: voltorvietnam@gmail.com
4. Verify email
```

**Bước 2: Add Email Service**
```
1. Dashboard → "Email Services"
2. Click "Add New Service"
3. Chọn "Gmail"
4. Connect với Gmail: voltorvietnam@gmail.com
5. Click "Create Service"
6. Copy Service ID (dạng: service_abc123)
```

**Bước 3: Create Email Template**
```
1. Dashboard → "Email Templates"
2. Click "Create New Template"
3. Template Name: "VOLTOR Contact"

Subject:
🔔 Yêu cầu tư vấn từ {{from_name}}

Content:
Khách hàng: {{from_name}}
Email: {{from_email}}
Điện thoại: {{phone}}

Nội dung:
{{message}}

4. Click "Save"
5. Copy Template ID (dạng: template_xyz789)
```

**Bước 4: Get Public Key**
```
1. Dashboard → "Account" → "General"
2. Copy Public Key (dạng: user_ABC123DEF456)
```

**Bước 5: Cập nhật Code**

Mở file: `/utils/emailService.ts`

Tìm dòng 157-159:
```typescript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
```

Thay bằng:
```typescript
const EMAILJS_SERVICE_ID = 'service_abc123';      // Service ID thật
const EMAILJS_TEMPLATE_ID = 'template_xyz789';    // Template ID thật
const EMAILJS_PUBLIC_KEY = 'user_ABC123DEF456';   // Public Key thật
```

**Bước 6: Bật Production Mode**

Tìm dòng 243:
```typescript
export const sendEmail = sendContactEmailDemo;
```

Thay bằng:
```typescript
export const sendEmail = sendContactEmailWithEmailJS;
```

**Bước 7: Test**
```
1. Reload website
2. Vào Contact form
3. Gửi test message
4. Check email voltorvietnam@gmail.com
5. ✅ Nhận được email với template đẹp!
```

---

### ⭐ OPTION 3: Formspree

**Ưu điểm:**
- ✅ **Free tier:** 50 submissions/tháng
- ✅ **Đơn giản nhất** - 1 dòng code
- ✅ **SPAM filtering**
- ✅ **File uploads** support

---

#### 📝 Hướng dẫn Setup Formspree:

**Bước 1: Đăng ký**
```
1. Truy cập: https://formspree.io/
2. Click "Get Started - It's Free"
3. Đăng ký với email: voltorvietnam@gmail.com
4. Verify email
```

**Bước 2: Tạo Form**
```
1. Dashboard → "New Form"
2. Form name: "VOLTOR Contact"
3. Email: voltorvietnam@gmail.com
4. Click "Create Form"
5. Copy Form ID (dạng: abc123xyz)
```

**Bước 3: Cập nhật Code**

Mở file: `/utils/emailService.ts`

Tìm dòng 33:
```typescript
const FORMSPREE_FORM_ID = 'YOUR_FORM_ID';
```

Thay bằng:
```typescript
const FORMSPREE_FORM_ID = 'abc123xyz'; // Form ID thật
```

**Bước 4: Bật Production Mode**

Tìm dòng 243:
```typescript
export const sendEmail = sendContactEmailDemo;
```

Thay bằng:
```typescript
export const sendEmail = sendContactEmailProduction;
```

**Bước 5: Test**
```
1. Reload website
2. Submit contact form
3. Check email voltorvietnam@gmail.com
4. ✅ Done!
```

---

## 📊 So sánh các Options

| Feature | Web3Forms | EmailJS | Formspree |
|---------|-----------|---------|-----------|
| **Free emails** | ∞ Unlimited | 200/tháng | 50/tháng |
| **Setup time** | 5 phút | 10 phút | 3 phút |
| **Custom template** | ✅ | ✅✅ | ⚠️ Limited |
| **SPAM protection** | ✅ | ⚠️ Manual | ✅ |
| **Dashboard** | ✅ | ✅✅ | ✅ |
| **File upload** | ❌ | ❌ | ✅ |
| **Analytics** | ⚠️ Basic | ✅✅ | ✅ |

**Khuyến nghị:** Web3Forms (Free unlimited + Đơn giản nhất)

---

## 🎯 Email Format mong muốn

```
From: Customer <customer@example.com>
Reply-To: customer@example.com
To: voltorvietnam@gmail.com

Subject: 🔔 Yêu cầu tư vấn từ [Tên khách hàng]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YÊU CẦU TƯ VẤN MỚI - VOLTOR WEBSITE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 THÔNG TIN KHÁCH HÀNG:
   Họ tên:      [Tên]
   Điện thoại:  [SĐT]
   Email:       [Email]

💬 NỘI DUNG:
[Message từ khách hàng...]

🔗 LIÊN HỆ LẠI:
   • Gọi:  [SĐT]
   • Email: [Email]
   • Zalo: https://zalo.me/[SĐT]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Nguồn: Website VOLTOR
⏰ Thời gian: [Timestamp]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🧪 Testing

### **Test Demo Mode:**
```
1. Vào trang Contact: /contact
2. Điền form:
   - Tên: Nguyễn Văn A
   - Phone: 0901234567
   - Email: test@example.com
   - Message: Tôi muốn tư vấn máy bơm

3. Click "Gửi yêu cầu"

4. Mở Console (F12):
   ✅ Thấy: "📧 [DEMO] Email notification sent..."
   ✅ Thấy: Email preview với format đẹp
   
5. Check localStorage:
   JSON.parse(localStorage.getItem('contact_requests'))
   ✅ Thấy message vừa gửi
```

### **Test Production Mode:**
```
1. Setup xong (Web3Forms/EmailJS/Formspree)
2. Thay export trong emailService.ts
3. Reload website
4. Submit form test
5. Check email voltorvietnam@gmail.com
6. ✅ Nhận được email thật!
```

---

## 🔧 Troubleshooting

### **Lỗi: "Email gửi thất bại"**
```
✅ Solution:
1. Check API key đã đúng chưa
2. Check đã verify email chưa
3. Check internet connection
4. Xem Console log để debug
```

### **Không nhận được email**
```
✅ Check:
1. Spam folder trong Gmail
2. Email voltorvietnam@gmail.com đã verify chưa
3. API key có active không
4. Free tier còn quota không (EmailJS/Formspree)
```

### **Form submit nhưng không gửi**
```
✅ Debug:
1. Mở Console (F12)
2. Xem error message
3. Check network tab
4. Verify API endpoint
```

---

## 📱 Database Integration

**Mỗi lần submit form:**

1. ✅ **Email** → voltorvietnam@gmail.com
2. ✅ **Database** → `/api/messages` (JSON database)
3. ✅ **localStorage** → Tracking log

**Xem messages trong database:**
```typescript
import { useMessages } from './hooks/useDatabase';

function AdminPanel() {
  const { messages } = useMessages();
  
  return (
    <div>
      {messages.map(msg => (
        <div key={msg.id}>
          <h3>{msg.name}</h3>
          <p>{msg.phone}</p>
          <p>{msg.email}</p>
          <p>{msg.message}</p>
          <p>Status: {msg.status}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 🎉 Summary

**Hiện tại:**
- ✅ Demo mode hoạt động
- ✅ Database lưu messages
- ✅ Console log email preview
- ✅ localStorage tracking

**Để gửi email thật:**
1. Chọn 1 service: Web3Forms / EmailJS / Formspree
2. Đăng ký (5-10 phút)
3. Copy API keys
4. Paste vào `/utils/emailService.ts`
5. Thay export function
6. ✅ Done! Email tự động gửi đến voltorvietnam@gmail.com

**Khuyến nghị:** Web3Forms
- Free unlimited
- Setup nhanh nhất
- Không cần backend

---

## 📞 Support

**Nếu cần hỗ trợ:**
- 📧 Email: voltorvietnam@gmail.com
- 📱 Phone: (+84) 836 389 488
- 💬 Zalo: https://zalo.me/84836389488

---

Made with ❤️ by VOLTOR Team  
Last updated: December 26, 2025
