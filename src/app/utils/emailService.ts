export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Save contact message to database
 */
async function saveContactToDatabase(formData: ContactFormData): Promise<void> {
  const { apiCall } = await import('../server/api/routes');
  
  await apiCall('/api/messages', 'POST', {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    subject: 'Yêu cầu tư vấn từ website',
    message: formData.message,
  });
}

/**
 * DEMO MODE: Giả lập gửi email + Lưu vào database
 * (Dùng khi chưa setup Formspree)
 */
export async function sendContactEmailDemo(formData: ContactFormData): Promise<EmailResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Save to database
  try {
    await saveContactToDatabase(formData);
  } catch (error) {
    console.error('Database save error:', error);
  }

  // Log to console (có thể xem trong browser DevTools)
  console.log('📧 [DEMO] Email notification sent to: voltorvietnam@gmail.com');
  console.log('📋 Form Data:', {
    from: formData.name,
    email: formData.email,
    phone: formData.phone,
    message: formData.message,
    timestamp: new Date().toLocaleString('vi-VN')
  });

  // Tạo email preview
  const emailPreview = `
╔═══════════════════════════════════════════════╗
║     YÊU CẦU TƯ VẤN MỚI - VOLTOR WEBSITE       ║
╚═══════════════════════════════════════════════╝

📧 Gửi đến: voltorvietnam@gmail.com
⏰ Thời gian: ${new Date().toLocaleString('vi-VN')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 THÔNG TIN KHÁCH HÀNG:
   Họ tên:      ${formData.name}
   Điện thoại:  ${formData.phone}
   Email:       ${formData.email}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 NỘI DUNG:
${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔗 LIÊN HỆ LẠI:
   • Gọi:  ${formData.phone}
   • Email: ${formData.email}
   • Zalo: https://zalo.me/${formData.phone.replace(/[^0-9]/g, '')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Nguồn: Website VOLTOR
🌐 URL: ${typeof window !== 'undefined' ? window.location.origin : 'https://voltor.com'}

╚═══════════════════════════════════════════════╝
  `;

  console.log(emailPreview);

  // Lưu vào localStorage để tracking (optional)
  if (typeof localStorage !== 'undefined') {
    const existingContacts = JSON.parse(localStorage.getItem('contact_requests') || '[]');
    existingContacts.push({
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    });
    localStorage.setItem('contact_requests', JSON.stringify(existingContacts));
  }

  return {
    success: true,
    message: '✅ Yêu cầu của bạn đã được ghi nhận! Chúng tôi sẽ liên hệ lại sớm nhất.'
  };
}

/**
 * Alternative Option 1: Web3Forms (Free & Unlimited)
 * Đăng ký tại: https://web3forms.com/
 */
export async function sendContactEmailWeb3Forms(formData: ContactFormData): Promise<EmailResponse> {
  try {
    // Web3Forms Access Key - PRODUCTION
    const WEB3FORMS_ACCESS_KEY = '252ee315-5618-4876-a628-20be7c1cf61b';
    
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `🔔 Yêu cầu tư vấn từ ${formData.name}`,
        from_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_email: 'voltorvietnam@gmail.com',
        replyto: formData.email,
      })
    });

    const data = await response.json();

    if (data.success) {
      await saveContactToDatabase(formData);
      return {
        success: true,
        message: '✅ Yêu cầu của bạn đã được gửi thành công! Chúng tôi sẽ liên hệ lại sớm.'
      };
    } else {
      throw new Error(data.message || 'Gửi email thất bại');
    }
  } catch (error) {
    console.error('Web3Forms error:', error);
    // Fallback to database save
    try {
      await saveContactToDatabase(formData);
      return {
        success: true,
        message: '✅ Yêu cầu của bạn đã được ghi nhận! Chúng tôi sẽ liên hệ lại sớm.'
      };
    } catch (dbError) {
      return {
        success: false,
        message: '❌ Có lỗi xảy ra. Vui lòng gọi trực tiếp: (+84) 898 296 336'
      };
    }
  }
}

/**
 * Alternative Option 2: EmailJS (Free 200 emails/month)
 * Đăng ký tại: https://www.emailjs.com/
 */
export async function sendContactEmailWithEmailJS(formData: ContactFormData): Promise<EmailResponse> {
  try {
    // SETUP GUIDE:
    // 1. Truy cập: https://www.emailjs.com/
    // 2. Sign up với email: voltorvietnam@gmail.com
    // 3. Add Email Service → Connect Gmail
    // 4. Create Template với fields: from_name, from_email, phone, message
    // 5. Copy Service ID, Template ID, Public Key
    // 6. Paste vào bên dưới
    
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
      to_email: 'voltorvietnam@gmail.com',
      reply_to: formData.email
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: templateParams
      })
    });

    if (response.ok) {
      await saveContactToDatabase(formData);
      return {
        success: true,
        message: '✅ Yêu cầu của bạn đã được gửi thành công! Chúng tôi sẽ liên hệ lại sớm.'
      };
    } else {
      throw new Error('EmailJS request failed');
    }
  } catch (error) {
    console.error('EmailJS error:', error);
    try {
      await saveContactToDatabase(formData);
      return {
        success: true,
        message: '✅ Yêu cầu của bạn đã được ghi nhận! Chúng tôi sẽ liên hệ lại sớm.'
      };
    } catch (dbError) {
      return {
        success: false,
        message: '❌ Có lỗi xảy ra. Vui lòng gọi trực tiếp: (+84) 898 296 336'
      };
    }
  }
}

/**
 * MAIN EXPORT
 * 
 * CHỌN 1 TRONG CÁC OPTIONS:
 * 
 * 1. DEMO MODE (Chỉ log console + lưu database):
 *    export const sendEmail = sendContactEmailDemo;
 * 
 * 2. WEB3FORMS (Free & Unlimited) - PRODUCTION:
 *    export const sendEmail = sendContactEmailWeb3Forms;
 * 
 * 3. EMAILJS (Free 200/month):
 *    export const sendEmail = sendContactEmailWithEmailJS;
 */

// ✅ PRODUCTION MODE ACTIVE - Web3Forms
// Email sẽ được gửi thật đến voltorvietnam@gmail.com
export const sendEmail = sendContactEmailWeb3Forms;

// Previous demo mode (uncomment to switch back):
// export const sendEmail = sendContactEmailDemo;