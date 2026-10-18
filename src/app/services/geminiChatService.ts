import { Product } from '../types';

const API_KEY = (import.meta.env.VITE_GEMINI_API_KEY as string) || '';

export interface ChatHistoryItem {
  role: 'user' | 'model';
  text: string;
}

export interface GeminiResponse {
  text: string;
  suggestedProducts: Product[];
  quickActions: Array<{ label: string; value: string }>;
}

/**
 * Builds a compact catalog summary to inject into Gemini context
 */
function buildCatalogContext(products: Product[]): string {
  // Take a representative sample across categories to keep token count optimal
  const sample = products.slice(0, 50).map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    power: p.specs?.power || '',
    head: p.specs?.head || '',
    flow: p.specs?.flow || ''
  }));

  return JSON.stringify(sample);
}

const SYSTEM_INSTRUCTION = `Bạn là Kỹ sư tư vấn kỹ thuật & Bán hàng AI cao cấp của VOLTOR (Máy Bơm Việt).
Hotline / Zalo: 0898 296 336 (https://zalo.me/0898296336)
Địa chỉ: Số 112-118 Lý Thường Kiệt, Thị trấn Lim, Tiên Du, Bắc Ninh.

LĨNH VỰC CHUYÊN MÔN CỦA VOLTOR:
1. Máy bơm nước: Bơm tăng áp điện tử/cơ, bơm ly tâm dân dụng & công nghiệp, bơm chìm giếng khoan (hỏa tiễn DONGYIN/VOLTOR), bơm chìm nước thải, bơm hóa chất, bơm định lượng.
2. Động cơ điện (motor): 1 pha (220V), 3 pha (380V), dây đồng 100%.
3. Thiết bị điện công nghiệp: Biến tần, khởi động từ (contactor), aptomat, rơ le bảo vệ, tủ điện điều khiển.
4. Dụng cụ & máy vệ sinh: Máy rửa xe cao áp, máy hút bụi công nghiệp, máy nén khí, dụng cụ cầm tay.
5. Ắc quy ô tô: GS, Đồng Nai, Schaeffler cho mọi dòng xe.
6. Phụ tùng máy công trình: Bơm thủy lực máy xúc, máy khởi động 24V.

NGUYÊN TẮC TƯ VẤN:
- Cực kỳ ngắn gọn, súc tích, tự nhiên (khoảng 3 - 6 câu), cách dòng thông thoáng, tránh viết các đoạn văn quá dài gây mỏi mắt.
- Giọng điệu thân thiện, chuyên nghiệp, nhiệt tình như kỹ sư lâu năm của VOLTOR.
- Tư vấn trúng đích: gợi ý ngay giải pháp, công suất hoặc model phù hợp.
- Dùng gạch đầu dòng ngắn khi liệt kê ưu điểm hoặc lưu ý.
- Khi nhắc đến Zalo hay Hotline: TUYỆT ĐỐI KHÔNG viết cú pháp [https://...](https://...) hay đường link https:// thô kệch. Chỉ cần viết tự nhiên: "Hotline / Zalo: 0898 296 336", giao diện web sẽ tự động tạo nút bấm Zalo đẹp mắt cho khách hàng.

QUY TẮC ĐẶC BIỆT ĐỂ GỢI Ý SẢN PHẨM:
- Cuối câu trả lời, nếu có sản phẩm phù hợp trong danh mục, hãy đính kèm cú pháp bí mật:
  [RECOMMEND: id1, id2] (thay id1, id2 bằng ID thực tế của sản phẩm).
- Đính kèm thêm 2-4 câu hỏi nhanh tiếp theo bằng cú pháp:
  [QUICK: Câu hỏi gợi ý 1 | Câu hỏi gợi ý 2 | Câu hỏi gợi ý 3]
`;

export async function askGemini(
  history: ChatHistoryItem[],
  userMessage: string,
  availableProducts: Product[]
): Promise<GeminiResponse> {
  if (!API_KEY) {
    throw new Error('VITE_GEMINI_API_KEY is not configured');
  }

  const models = ['gemini-3.8-flash', 'gemini-flash-latest'];
  let lastError: Error | null = null;

  const catalogContext = buildCatalogContext(availableProducts);
  const fullSystemInstruction = `${SYSTEM_INSTRUCTION}\n\nDANH MỤC SẢN PHẨM THAM KHẢO:\n${catalogContext}`;

  // Build contents history
  const contents = [
    ...history.slice(-8).map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    })),
    {
      role: 'user',
      parts: [{ text: userMessage }]
    }
  ];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: fullSystemInstruction }]
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Gemini API error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        throw new Error('Empty response from Gemini');
      }

      // Parse recommendations [RECOMMEND: id1, id2]
      const recommendMatch = rawText.match(/\[RECOMMEND:\s*([^\]]+)\]/i);
      let suggestedProducts: Product[] = [];

      if (recommendMatch && recommendMatch[1]) {
        const ids = recommendMatch[1]
          .split(',')
          .map((id: string) => id.trim().replace(/['"]/g, ''));
        suggestedProducts = availableProducts.filter(p => ids.includes(p.id));
      }

      // If no matched IDs by exact tag, smartly match keywords from message & response
      if (suggestedProducts.length === 0) {
        const lowerRes = rawText.toLowerCase();
        const lowerUser = userMessage.toLowerCase();
        suggestedProducts = availableProducts
          .filter(p => {
            const nameLower = p.name.toLowerCase();
            const catLower = p.category.toLowerCase();
            return (
              lowerRes.includes(nameLower) ||
              (lowerUser.includes('tăng áp') && catLower.includes('tăng áp')) ||
              (lowerUser.includes('giếng') && (catLower.includes('giếng') || catLower.includes('hỏa tiễn'))) ||
              (lowerUser.includes('rửa xe') && catLower.includes('vệ sinh')) ||
              (lowerUser.includes('nước thải') && catLower.includes('chìm'))
            );
          })
          .slice(0, 3);
      }

      // Parse quick actions [QUICK: action 1 | action 2]
      let quickActions: Array<{ label: string; value: string }> = [];
      const quickMatch = rawText.match(/\[QUICK:\s*([^\]]+)\]/i);
      if (quickMatch && quickMatch[1]) {
        quickActions = quickMatch[1]
          .split('|')
          .map((q: string) => q.trim())
          .filter((q: string) => q.length > 0)
          .map((label: string) => ({ label, value: label }));
      }

      if (quickActions.length === 0) {
        quickActions = [
          { label: '📞 Gọi 0898 296 336', value: 'Hotline tư vấn trực tiếp' },
          { label: '💬 Chat qua Zalo', value: 'Chat Zalo với kỹ thuật' },
          { label: '💰 Báo giá chi tiết', value: 'Báo giá máy bơm' }
        ];
      }

      // Strip internal tags from user-facing text and clean ugly raw URL markdown links
      let cleanText = rawText
        .replace(/\[RECOMMEND:[^\]]+\]/gi, '')
        .replace(/\[QUICK:[^\]]+\]/gi, '')
        .replace(/\[https?:\/\/[^\]]+\]\((https?:\/\/[^)]+)\)/gi, '$1')
        .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/gi, '$1 ($2)')
        .trim();

      return {
        text: cleanText,
        suggestedProducts,
        quickActions
      };
    } catch (err: unknown) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.warn(`Model ${model} failed, trying next model...`, err);
    }
  }

  throw lastError || new Error('All Gemini models failed');
}
