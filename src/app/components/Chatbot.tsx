import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { getEffectiveProducts } from '../utils/productStorage';
import { Product } from '../types';
import { askGemini } from '../services/geminiChatService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestedProducts?: Product[];
  quickActions?: Array<{ label: string; value: string }>;
}

interface ChatbotProps {
  onClose: () => void;
  onProductClick: (product: Product) => void;
}

function renderInlineTokens(line: string, isUser: boolean) {
  // Regex to match:
  // 1. Markdown link: [label](url)
  // 2. URLs (including https://zalo.me/...)
  // 3. Bold text: **text**
  // 4. Hotline phone: 0898 296 336 or (+84) 898 296 336
  const tokenRegex =
    /(\[[^\]]+\]\([^\)]+\)|https?:\/\/[^\s\),]+|\*\*[^*]+\*\*|\(?\+84\)?\s?898\s?296\s?336|0898\s?296\s?336)/g;

  const parts = line.split(tokenRegex);

  return parts.map((part, pIdx) => {
    if (!part) return null;

    // 1. Markdown link [label](url)
    const mdLink = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (mdLink) {
      const label = mdLink[1];
      const url = mdLink[2];
      const isZalo = url.includes('zalo.me') || label.toLowerCase().includes('zalo');
      if (isZalo) {
        return (
          <a
            key={pIdx}
            href="https://zalo.me/0898296336"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#0068FF] text-white px-2.5 py-0.5 rounded-full text-xs font-semibold hover:bg-blue-700 transition-all shadow-2xs mx-1 align-middle"
          >
            <span className="bg-white text-[#0068FF] text-[9px] font-bold px-1 rounded">Zalo</span>
            <span>Chat Zalo</span>
          </a>
        );
      }
      return (
        <a
          key={pIdx}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-medium"
        >
          {label}
        </a>
      );
    }

    // 2. Raw URL (especially Zalo)
    if (part.startsWith('http://') || part.startsWith('https://')) {
      if (part.includes('zalo.me')) {
        return (
          <a
            key={pIdx}
            href="https://zalo.me/0898296336"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#0068FF] text-white px-2.5 py-0.5 rounded-full text-xs font-semibold hover:bg-blue-700 transition-all shadow-2xs mx-1 align-middle"
          >
            <span className="bg-white text-[#0068FF] text-[9px] font-bold px-1 rounded">Zalo</span>
            <span>0898 296 336</span>
          </a>
        );
      }
      return (
        <a
          key={pIdx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-medium break-all"
        >
          {part}
        </a>
      );
    }

    // 3. Bold text **text**
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong
          key={pIdx}
          className={isUser ? 'font-semibold text-white' : 'font-semibold text-slate-900'}
        >
          {part.slice(2, -2)}
        </strong>
      );
    }

    // 4. Phone number
    if (/898\s?296\s?336/.test(part)) {
      return (
        <a
          key={pIdx}
          href="tel:+84898296336"
          className={
            isUser
              ? 'text-white underline font-semibold'
              : 'text-blue-600 hover:underline font-bold inline-flex items-center gap-1'
          }
          title="Gọi Hotline tư vấn: 0898 296 336"
        >
          <span>📞 {part}</span>
        </a>
      );
    }

    // Clean stray markdown italics like *(Hotline...)*
    const cleanText = part.replace(/\*([^*]+)\*/g, '$1');
    return <span key={pIdx}>{cleanText}</span>;
  });
}

function FormattedMessage({ text, isUser }: { text: string; isUser: boolean }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5 text-[13.5px] leading-relaxed">
      {lines.map((line, idx) => {
        if (!line.trim()) return <div key={idx} className="h-1" />;

        if (
          line.trim().startsWith('•') ||
          line.trim().startsWith('- ') ||
          line.trim().startsWith('* ')
        ) {
          const content = line.trim().replace(/^[•\-\*]\s*/, '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-0.5">
              <span className={isUser ? 'text-blue-200 mt-1' : 'text-blue-600 mt-1 font-bold'}>•</span>
              <span className="flex-1">{renderInlineTokens(content, isUser)}</span>
            </div>
          );
        }

        return <p key={idx}>{renderInlineTokens(line, isUser)}</p>;
      })}
    </div>
  );
}

const INITIAL_MESSAGE: Message = {
  id: '1',
  text: 'Xin chào bạn! 👋 Tôi là trợ lý kỹ thuật AI của **VOLTOR**.\n\nTôi có thể giúp bạn tính toán cột áp, chọn máy bơm hoặc tìm kiếm sản phẩm phù hợp nhất.\n\nBạn đang quan tâm đến dòng sản phẩm nào?',
  sender: 'bot',
  timestamp: new Date(),
  quickActions: [
    { label: '🏠 Bơm tăng áp', value: 'Tư vấn máy bơm tăng áp gia đình' },
    { label: '💧 Bơm giếng khoan', value: 'Tư vấn máy bơm chìm giếng khoan' },
    { label: '⚡ Động cơ điện', value: 'Tư vấn động cơ điện' },
    { label: '🚗 Máy rửa xe', value: 'Tư vấn máy rửa xe' },
    { label: '📞 Hotline tư vấn', value: 'Cho tôi số hotline tư vấn kỹ thuật trực tiếp' },
  ],
};

export function Chatbot({ onClose, onProductClick }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const analyzeIntent = (message: string): { intent: string; details: string[] } => {
    const lowerMessage = message.toLowerCase();
    
    // Phân tích ý định - Máy bơm
    if (lowerMessage.includes('gia đình') || lowerMessage.includes('nhà') || lowerMessage.includes('sinh hoạt') || lowerMessage.includes('gia dụng')) {
      return { intent: 'home', details: ['gia đình', 'nhà ở'] };
    }
    if (lowerMessage.includes('công nghiệp') || lowerMessage.includes('nhà máy') || lowerMessage.includes('xí nghiệp')) {
      return { intent: 'industrial', details: ['công nghiệp'] };
    }
    if (lowerMessage.includes('giếng') || lowerMessage.includes('khoan')) {
      return { intent: 'well', details: ['giếng khoan'] };
    }
    if (lowerMessage.includes('tăng áp') || lowerMessage.includes('cao tầng') || lowerMessage.includes('áp lực')) {
      return { intent: 'pressure', details: ['tăng áp'] };
    }
    if (lowerMessage.includes('thải') || lowerMessage.includes('nước bẩn') || lowerMessage.includes('cống')) {
      return { intent: 'wastewater', details: ['nước thải'] };
    }
    if (lowerMessage.includes('hóa chất') || lowerMessage.includes('acid') || lowerMessage.includes('kiềm')) {
      return { intent: 'chemical', details: ['hóa chất'] };
    }
    if (lowerMessage.includes('chìm') || lowerMessage.includes('điện chìm')) {
      return { intent: 'submersible', details: ['chìm'] };
    }
    if (lowerMessage.includes('ly tâm')) {
      return { intent: 'centrifugal', details: ['ly tâm'] };
    }
    if (lowerMessage.includes('định lượng')) {
      return { intent: 'dosing', details: ['định lượng'] };
    }
    if (lowerMessage.includes('máy bơm') || lowerMessage.includes('bơm nước')) {
      return { intent: 'pump', details: ['máy bơm'] };
    }
    
    // Động cơ điện
    if (lowerMessage.includes('động cơ') || lowerMessage.includes('motor')) {
      return { intent: 'motor', details: ['động cơ điện'] };
    }
    
    // Ắc quy ô tô
    if (lowerMessage.includes('ắc quy') || lowerMessage.includes('bình điện') || lowerMessage.includes('xe hơi') || lowerMessage.includes('ô tô')) {
      return { intent: 'battery', details: ['ắc quy'] };
    }
    
    // Dụng cụ vệ sinh
    if (lowerMessage.includes('rửa xe') || lowerMessage.includes('máy rửa')) {
      return { intent: 'carwash', details: ['máy rửa xe'] };
    }
    if (lowerMessage.includes('hút bụi') || lowerMessage.includes('máy hút')) {
      return { intent: 'vacuum', details: ['máy hút bụi'] };
    }
    if (lowerMessage.includes('thổi bụi') || lowerMessage.includes('máy thổi')) {
      return { intent: 'blower', details: ['máy thổi'] };
    }
    if (lowerMessage.includes('vệ sinh') || lowerMessage.includes('làm sạch')) {
      return { intent: 'cleaning', details: ['vệ sinh'] };
    }
    
    // Điện công nghiệp
    if (lowerMessage.includes('biến tần') || lowerMessage.includes('inverter')) {
      return { intent: 'inverter', details: ['biến tần'] };
    }
    if (lowerMessage.includes('khởi động từ') || lowerMessage.includes('contactor')) {
      return { intent: 'contactor', details: ['khởi động từ'] };
    }
    if (lowerMessage.includes('aptomat') || lowerMessage.includes('cầu dao')) {
      return { intent: 'breaker', details: ['aptomat'] };
    }
    if (lowerMessage.includes('điện công nghiệp') || lowerMessage.includes('thiết bị điện')) {
      return { intent: 'electrical', details: ['điện công nghiệp'] };
    }
    
    // Công cụ & dụng cụ
    if (lowerMessage.includes('máy khoan') || lowerMessage.includes('khoan')) {
      return { intent: 'drill', details: ['máy khoan'] };
    }
    if (lowerMessage.includes('máy mài') || lowerMessage.includes('mài góc')) {
      return { intent: 'grinder', details: ['máy mài'] };
    }
    if (lowerMessage.includes('máy nén') || lowerMessage.includes('nén khí')) {
      return { intent: 'compressor', details: ['máy nén khí'] };
    }
    if (lowerMessage.includes('công cụ') || lowerMessage.includes('dụng cụ') || lowerMessage.includes('tool')) {
      return { intent: 'tools', details: ['công cụ'] };
    }
    
    // Phụ tùng máy công trình
    if (lowerMessage.includes('thủy lực') || lowerMessage.includes('bơm thủy lực')) {
      return { intent: 'hydraulic', details: ['thủy lực'] };
    }
    if (lowerMessage.includes('máy xúc') || lowerMessage.includes('máy công trình')) {
      return { intent: 'construction', details: ['máy công trình'] };
    }
    
    // Các intent chung
    if (lowerMessage.includes('giá') || lowerMessage.includes('rẻ') || lowerMessage.includes('tiết kiệm') || lowerMessage.includes('phải chăng')) {
      return { intent: 'price', details: ['giá cả'] };
    }
    if (lowerMessage.includes('mạnh') || lowerMessage.includes('công suất') || lowerMessage.includes('lớn')) {
      return { intent: 'power', details: ['công suất cao'] };
    }
    if (lowerMessage.includes('tất cả') || lowerMessage.includes('toàn bộ')) {
      return { intent: 'all', details: [] };
    }
    if (lowerMessage.includes('so sánh')) {
      return { intent: 'compare', details: [] };
    }
    if (lowerMessage.includes('tư vấn') || lowerMessage.includes('gợi ý')) {
      return { intent: 'consult', details: [] };
    }
    
    return { intent: 'general', details: [] };
  };

  const generateResponse = (userMessage: string): { text: string; products?: Product[]; quickActions?: Array<{ label: string; value: string }> } => {
    const { intent } = analyzeIntent(userMessage);
    
    switch (intent) {
      case 'home':
        const homeProducts = products.filter(p => 
          p.category.includes('gia đình') || 
          p.category.includes('tăng áp') ||
          p.name.toLowerCase().includes('gia đình') ||
          parseInt(p.specs.power) < 1000
        );
        return {
          text: '🏠 Tuyệt vời! Với nhu cầu sử dụng cho gia đình, tôi đề xuất các dòng máy bơm sau:\n\n Công suất vừa phải, tiết kiệm điện\n Hoạt động êm ái, ít tiếng ồn\n Dễ dàng lắp đặt và bảo trì\n\nDưới đây là các sản phẩm phù hợp nhất:',
          products: homeProducts,
          quickActions: [
            { label: '💰 Xem theo giá', value: 'Máy bơm giá rẻ' },
            { label: '⚡ Máy bơm tăng áp', value: 'Máy bơm tăng áp' },
            { label: '🔍 Tư vấn chi tiết', value: 'Tư vấn máy bơm gia đình' },
          ],
        };
        
      case 'industrial':
        const industrialProducts = products.filter(p => 
          p.category.includes('công nghiệp') || 
          p.category.includes('hóa chất') ||
          p.name.toLowerCase().includes('công nghiệp') ||
          parseInt(p.specs.power) > 2000
        );
        return {
          text: '🏭 Với nhu cầu công nghiệp, bạn cần máy bơm có:\n\n Công suất lớn, xử lý lưu lượng cao\n Độ bền cao, hoạt động liên tục 24/7\n Chất liệu chống ăn mòn, bảo hành dài hạn\n\nĐây là các giải pháp tôi đề xuất:',
          products: industrialProducts,
          quickActions: [
            { label: '⚡ Công suất cao', value: 'Máy bơm công suất lớn' },
            { label: '🧪 Bơm hóa chất', value: 'Máy bơm hóa chất' },
            { label: '📞 Liên hệ tư vấn', value: 'Tư vấn máy bơm công nghiệp' },
          ],
        };
        
      case 'well':
        const wellProducts = products.filter(p => 
          p.category.includes('giếng khoan') ||
          p.name.toLowerCase().includes('giếng')
        );
        return {
          text: '🌊 Máy bơm giếng khoan là lựa chọn hoàn hảo!\n\n Phù hợp với giếng sâu từ 10-100m\n Động cơ chìm bền bỉ, chịu áp lực cao\n Lưu lượng ổn định, tiết kiệm điện\n\nSản phẩm chuyên dụng cho giếng khoan:',
          products: wellProducts,
          quickActions: [
            { label: '💧 Máy bơm chìm', value: 'Máy bơm điện chìm' },
            { label: '🏠 Bơm gia đình', value: 'Máy bơm cho gia đình' },
          ],
        };
        
      case 'pressure':
        const pressureProducts = products.filter(p => 
          p.category.includes('tăng áp') ||
          p.name.toLowerCase().includes('tăng áp')
        );
        return {
          text: '⚡ Máy bơm tăng áp - Giải pháp cho nhà cao tầng!\n\n Tự động bật/tắt khi có nhu cầu nước\n Tăng áp lực nước hiệu quả\n Tiết kiệm điện năng tối đa\n\nCác sản phẩm máy bơm tăng áp:',
          products: pressureProducts,
          quickActions: [
            { label: '🏠 Bơm gia đình', value: 'Máy bơm cho gia đình' },
            { label: '💰 So sánh giá', value: 'Máy bơm giá rẻ' },
          ],
        };
        
      case 'wastewater':
        const wasteProducts = products.filter(p => 
          p.name.toLowerCase().includes('thải') || 
          (p.category.includes('chìm') && p.name.toLowerCase().includes('thải'))
        );
        return {
          text: '💧 Máy bơm nước thải chuyên dụng!\n\n Xử lý nước bẩn với tạp chất lớn\n Chất liệu chống ăn mòn bền bỉ\n Công suất mạnh, hoạt động ổn định\n\nCác sản phẩm phù hợp với nước thải:',
          products: wasteProducts.length > 0 ? wasteProducts : products.filter(p => p.category.includes('chìm')),
          quickActions: [
            { label: '🏭 Bơm công nghiệp', value: 'Máy bơm công nghiệp' },
            { label: '💧 Máy bơm chìm', value: 'Máy bơm điện chìm' },
          ],
        };
        
      case 'chemical':
        const chemicalProducts = products.filter(p => 
          p.category.includes('hóa chất') || 
          p.category.includes('định lượng') ||
          p.name.toLowerCase().includes('hóa chất')
        );
        return {
          text: '🧪 Máy bơm hóa chất - An toàn và chính xác!\n\n Vật liệu chống ăn mòn đặc biệt\n Phù hợp với acid, kiềm, dung môi\n Độ bền cao, an toàn tuyệt đối\n\nCác sản phẩm bơm hóa chất:',
          products: chemicalProducts,
          quickActions: [
            { label: '🏭 Bơm công nghiệp', value: 'Máy bơm công nghiệp' },
            { label: '📏 Bơm định lượng', value: 'Máy bơm định lượng' },
          ],
        };

      case 'submersible':
        const submersibleProducts = products.filter(p => 
          p.category.includes('chìm') ||
          p.name.toLowerCase().includes('chìm')
        );
        return {
          text: '💧 Máy bơm chìm - Đa năng và hiệu quả!\n\n Hoạt động ngầm dưới nước\n Tiết kiệm không gian lắp đặt\n Phù hợp nhiều ứng dụng khác nhau\n\nCác sản phẩm máy bơm chìm:',
          products: submersibleProducts,
          quickActions: [
            { label: '🌊 Bơm giếng khoan', value: 'Máy bơm giếng khoan' },
            { label: '💧 Bơm nước thải', value: 'Máy bơm nước thải' },
          ],
        };

      case 'centrifugal':
        const centrifugalProducts = products.filter(p => 
          p.category.includes('ly tâm') ||
          p.name.toLowerCase().includes('ly tâm')
        );
        return {
          text: '🔄 Máy bơm ly tâm - Phổ biến và tin cậy!\n\n Thiết kế đơn giản, dễ bảo trì\n Hiệu suất cao, hoạt động ổn định\n Giá cả phải chăng\n\nSản phẩm máy bơm ly tâm:',
          products: centrifugalProducts,
          quickActions: [
            { label: '🏠 Bơm gia đình', value: 'Máy bơm cho gia đình' },
            { label: '🏭 Bơm công nghiệp', value: 'Máy bơm công nghiệp' },
          ],
        };

      case 'dosing':
        const dosingProducts = products.filter(p => 
          p.category.includes('định lượng') ||
          p.name.toLowerCase().includes('định lượng')
        );
        return {
          text: '📏 Máy bơm định lượng - Chính xác tuyệt đối!\n\n Điều chỉnh lưu lượng linh hoạt\n Độ chính xác cao\n Dùng cho xử lý nước, dược phẩm\n\nSản phẩm máy bơm định lượng:',
          products: dosingProducts,
          quickActions: [
            { label: '🧪 Bơm hóa chất', value: 'Máy bơm hóa chất' },
            { label: '🏭 Bơm công nghiệp', value: 'Máy bơm công nghiệp' },
          ],
        };
        
      case 'pump':
        const pumpProducts = products.filter(p => 
          p.category.toLowerCase().includes('bơm') ||
          p.name.toLowerCase().includes('bơm')
        );
        return {
          text: '💦 Máy bơm nước - Đa dạng lựa chọn!\n\n Máy bơm gia đình & công nghiệp\n Máy bơm chìm & ly tâm\n Nhiều công suất khác nhau\n\nCác sản phẩm máy bơm:',
          products: pumpProducts.slice(0, 6),
          quickActions: [
            { label: '🏠 Bơm gia đình', value: 'Máy bơm cho gia đình' },
            { label: '🏭 Bơm công nghiệp', value: 'Máy bơm công nghiệp' },
            { label: '🌊 Bơm giếng khoan', value: 'Máy bơm giếng khoan' },
          ],
        };

      // Động cơ điện
      case 'motor':
        const motorProducts = products.filter(p => 
          p.category.includes('Động cơ điện') ||
          p.name.toLowerCase().includes('động cơ')
        );
        return {
          text: '⚡ Động cơ điện - Mạnh mẽ và bền bỉ!\n\n Động cơ 1 pha & 3 pha\n Nhiều công suất khác nhau\n Lõi đồng nguyên chất, hiệu suất cao\n\nCác sản phẩm động cơ điện:',
          products: motorProducts,
          quickActions: [
            { label: '🔌 Điện công nghiệp', value: 'Điện công nghiệp' },
            { label: '🏭 Máy bơm', value: 'Máy bơm nước' },
          ],
        };

      // Ắc quy ô tô
      case 'battery':
        const batteryProducts = products.filter(p => 
          p.category.includes('Ắc quy') ||
          p.name.toLowerCase().includes('ắc quy')
        );
        return {
          text: '🔋 Ắc quy ô tô - Chính hãng, chất lượng!\n\n Phù hợp đa dạng dòng xe\n Dung lượng cao, tuổi thọ lâu\n Khởi động mạnh mẽ\n\nCác sản phẩm ắc quy:',
          products: batteryProducts,
          quickActions: [
            { label: '🚗 Honda/Toyota', value: 'Ắc quy Honda' },
            { label: '🚙 Mercedes/BMW', value: 'Ắc quy Mercedes' },
          ],
        };

      // Dụng cụ vệ sinh
      case 'carwash':
        const carwashProducts = products.filter(p => 
          p.category.includes('rửa xe') ||
          p.name.toLowerCase().includes('rửa xe')
        );
        return {
          text: '🚗 Máy rửa xe cao áp - Làm sạch hoàn hảo!\n\n Áp lực cao, tiết kiệm nước\n Đa năng: xe, sân vườn, nhà cửa\n Công suất mạnh, độ bền cao\n\nCác sản phẩm máy rửa xe:',
          products: carwashProducts,
          quickActions: [
            { label: '🧹 Dụng cụ vệ sinh', value: 'Dụng cụ vệ sinh' },
            { label: '🏠 Thiết bị gia đình', value: 'Máy bơm cho gia đình' },
          ],
        };

      case 'vacuum':
        const vacuumProducts = products.filter(p => 
          p.category.includes('hút bụi') ||
          p.name.toLowerCase().includes('hút bụi')
        );
        return {
          text: '🌪️ Máy hút bụi - Sạch sẽ mọi không gian!\n\n Hút khô & ướt\n Công suất lớn, hút mạnh\n Phù hợp gia đình, xưởng, công trình\n\nCác sản phẩm máy hút bụi:',
          products: vacuumProducts,
          quickActions: [
            { label: '🧹 Dụng cụ vệ sinh', value: 'Dụng cụ vệ sinh' },
            { label: '🏭 Công nghiệp', value: 'Máy hút bụi công nghiệp' },
          ],
        };

      case 'blower':
        const blowerProducts = products.filter(p => 
          p.category.includes('thổi bụi') ||
          p.name.toLowerCase().includes('thổi')
        );
        return {
          text: '💨 Máy thổi bụi - Làm sạch nhanh chóng!\n\n Gọn nhẹ, dễ sử dụng\n Tốc độ gió mạnh\n Phù hợp nhiều mục đích\n\nCác sản phẩm máy thổi bụi:',
          products: blowerProducts,
          quickActions: [
            { label: '🧹 Dụng cụ vệ sinh', value: 'Dụng cụ vệ sinh' },
            { label: '🌪️ Máy hút bụi', value: 'Máy hút bụi' },
          ],
        };

      case 'cleaning':
        const cleaningProducts = products.filter(p => 
          p.category.includes('vệ sinh') ||
          p.category.includes('rửa') ||
          p.category.includes('hút bụi') ||
          p.category.includes('thổi')
        );
        return {
          text: '🧹 Dụng cụ vệ sinh - Giải pháp làm sạch toàn diện!\n\n Máy rửa xe cao áp\n Máy hút bụi công nghiệp\n Máy thổi bụi cầm tay\n\nCác sản phẩm vệ sinh:',
          products: cleaningProducts,
          quickActions: [
            { label: '🚗 Máy rửa xe', value: 'Máy rửa xe' },
            { label: '🌪️ Máy hút bụi', value: 'Máy hút bụi' },
            { label: '💨 Máy thổi bụi', value: 'Máy thổi bụi' },
          ],
        };

      // Điện công nghiệp
      case 'inverter':
        const inverterProducts = products.filter(p => 
          p.category.includes('Biến tần') ||
          p.name.toLowerCase().includes('biến tần')
        );
        return {
          text: '🔄 Biến tần - Điều khiển động cơ thông minh!\n\n Điều chỉnh tốc độ linh hoạt\n Tiết kiệm điện năng tối đa\n Bảo vệ quá tải, chạy êm\n\nCác sản phẩm biến tần:',
          products: inverterProducts,
          quickActions: [
            { label: '🔌 Điện công nghiệp', value: 'Điện công nghiệp' },
            { label: '⚡ Động cơ điện', value: 'Động cơ điện' },
          ],
        };

      case 'contactor':
        const contactorProducts = products.filter(p => 
          p.category.includes('Khởi động từ') ||
          p.name.toLowerCase().includes('khởi động từ')
        );
        return {
          text: '🔌 Khởi động từ - Điều khiển động cơ an toàn!\n\n Định mức đa dạng\n Thương hiệu uy tín\n Tuổi thọ cao, an toàn\n\nCác sản phẩm khởi động từ:',
          products: contactorProducts,
          quickActions: [
            { label: '🔌 Điện công nghiệp', value: 'Điện công nghiệp' },
            { label: '⚡ Động cơ điện', value: 'Động cơ điện' },
          ],
        };

      case 'breaker':
        const breakerProducts = products.filter(p => 
          p.category.includes('APTOPMAT') ||
          p.name.toLowerCase().includes('aptomat')
        );
        return {
          text: '⚡ Aptomat - Bảo vệ an toàn điện!\n\n Cắt nhanh khi quá tải\n Ngắn mạch tự động\n Tiêu chuẩn IEC\n\nCác sản phẩm aptomat:',
          products: breakerProducts,
          quickActions: [
            { label: '🔌 Điện công nghiệp', value: 'Điện công nghiệp' },
            { label: '🔄 Biến tần', value: 'Biến tần' },
          ],
        };

      case 'electrical':
        const electricalProducts = products.filter(p => 
          p.category.includes('Khởi động từ') ||
          p.category.includes('APTOPMAT') ||
          p.category.includes('Biến tần') ||
          p.name.toLowerCase().includes('điện')
        );
        return {
          text: '🔌 Điện công nghiệp - Dân dụng!\n\n Khởi động từ, Aptomat\n Biến tần điều khiển\n Đầy đủ thiết bị điều khiển\n\nCác sản phẩm điện công nghiệp:',
          products: electricalProducts,
          quickActions: [
            { label: '🔄 Biến tần', value: 'Biến tần' },
            { label: '🔌 Khởi động từ', value: 'Khởi động từ' },
            { label: '⚡ Aptomat', value: 'Aptomat' },
          ],
        };

      // Công cụ & dụng cụ
      case 'drill':
        const drillProducts = products.filter(p => 
          p.category.includes('cầm tay') ||
          p.name.toLowerCase().includes('khoan')
        );
        return {
          text: '🔨 Máy khoan - Công cụ đắc lực!\n\n Khoan bê tông, gỗ, sắt\n Công suất mạnh mẽ\n Thương hiệu uy tín\n\nCác sản phẩm máy khoan:',
          products: drillProducts,
          quickActions: [
            { label: '🔧 Công cụ', value: 'Công cụ dụng cụ' },
            { label: '⚙️ Máy mài', value: 'Máy mài' },
          ],
        };

      case 'grinder':
        const grinderProducts = products.filter(p => 
          p.name.toLowerCase().includes('mài')
        );
        return {
          text: '⚙️ Máy mài góc - Cắt & mài chuyên nghiệp!\n\n Cắt kim loại, đá, gạch\n Tốc độ cao, hiệu quả\n Thiết kế ergonomic\n\nCác sản phẩm máy mài:',
          products: grinderProducts,
          quickActions: [
            { label: '🔧 Công cụ', value: 'Công cụ dụng cụ' },
            { label: '🔨 Máy khoan', value: 'Máy khoan' },
          ],
        };

      case 'compressor':
        const compressorProducts = products.filter(p => 
          p.category.includes('nén khí') ||
          p.name.toLowerCase().includes('nén khí')
        );
        return {
          text: '💨 Máy nén khí - Cung cấp khí nén mạnh mẽ!\n\n Bình chứa lớn\n Áp suất cao\n Phù hợp xưởng, garage\n\nCác sản phẩm máy nén khí:',
          products: compressorProducts,
          quickActions: [
            { label: '🔧 Công cụ', value: 'Công cụ dụng cụ' },
            { label: '🔨 Dụng cụ cầm tay', value: 'Máy khoan' },
          ],
        };

      case 'tools':
        const toolsProducts = products.filter(p => 
          p.category.includes('Dụng cụ') ||
          p.category.includes('nén khí') ||
          p.name.toLowerCase().includes('máy khoan') ||
          p.name.toLowerCase().includes('máy mài')
        );
        return {
          text: '🔧 Công cụ & Dụng cụ - Đầy đủ trang thiết bị!\n\n Máy khoan, mài, cắt\n Máy nén khí\n Dụng cụ cầm tay & để bàn\n\nCác sản phẩm công cụ:',
          products: toolsProducts,
          quickActions: [
            { label: '🔨 Máy khoan', value: 'Máy khoan' },
            { label: '⚙️ Máy mài', value: 'Máy mài' },
            { label: '💨 Máy nén khí', value: 'Máy nén khí' },
          ],
        };

      // Phụ tùng máy công trình
      case 'hydraulic':
        const hydraulicProducts = products.filter(p => 
          p.category.includes('thủy lực') ||
          p.name.toLowerCase().includes('thủy lực')
        );
        return {
          text: '🔧 Bơm thủy lực - Phụ tùng chuyên dụng!\n\n Cho máy xúc, máy ủi\n Áp suất cao, bền bỉ\n Thay thế chính hãng\n\nCác sản phẩm thủy lực:',
          products: hydraulicProducts,
          quickActions: [
            { label: '🚜 Máy công trình', value: 'Máy công trình' },
            { label: '🔧 Phụ tùng', value: 'Phụ tùng máy công trình' },
          ],
        };

      case 'construction':
        const constructionProducts = products.filter(p => 
          p.category.includes('thủy lực') ||
          p.category.includes('máy xúc') ||
          p.name.toLowerCase().includes('máy xúc') ||
          p.name.toLowerCase().includes('công trình')
        );
        return {
          text: '🚜 Phụ tùng máy công trình - Chuyên nghiệp!\n\n Bơm thủy lực\n Máy khởi động 24V\n Phụ tùng chính hãng\n\nCác sản phẩm cho máy công trình:',
          products: constructionProducts,
          quickActions: [
            { label: '🔧 Thủy lực', value: 'Bơm thủy lực' },
            { label: '⚡ Động cơ', value: 'Động cơ điện' },
          ],
        };
        
      case 'price':
        const sortedByPrice = [...products].sort((a, b) => a.price - b.price);
        return {
          text: '💰 Các sản phẩm có giá tốt nhất!\n\n Giá cả phải chăng\n Chất lượng đảm bảo\n Bảo hành chính hãng\n\nTop sản phẩm giá tốt:',
          products: sortedByPrice.slice(0, 4),
          quickActions: [
            { label: '🏠 Bơm gia đình', value: 'Máy bơm cho gia đình' },
            { label: '⚡ Công suất cao', value: 'Máy bơm công suất lớn' },
          ],
        };
        
      case 'power':
        const sortedByPower = [...products].sort((a, b) => 
          parseInt(b.specs.power) - parseInt(a.specs.power)
        );
        return {
          text: '⚡ Các máy bơm công suất lớn nhất!\n\n Công suất cực mạnh\n Xử lý lưu lượng cao\n Phù hợp công nghiệp nặng\n\nTop máy bơm công suất cao:',
          products: sortedByPower.slice(0, 4),
          quickActions: [
            { label: '🏭 Bơm công nghiệp', value: 'Máy bơm công nghiệp' },
            { label: '💰 So sánh giá', value: 'Máy bơm giá rẻ' },
          ],
        };

      case 'all':
        return {
          text: '📋 Tất cả sản phẩm của chúng tôi!\n\nChúng tôi có đầy đủ các loại máy bơm:\n Máy bơm gia đình & công nghiệp\n Máy bơm chìm & ly tâm\n Máy bơm hóa chất & định lượng\n\nMột số sản phẩm nổi bật:',
          products: products.slice(0, 6),
          quickActions: [
            { label: '🏠 Bơm gia đình', value: 'Máy bơm cho gia đình' },
            { label: '🏭 Bơm công nghiệp', value: 'Máy bơm công nghiệp' },
            { label: '💰 Giá tốt nhất', value: 'Máy bơm giá rẻ' },
          ],
        };

      case 'compare':
        return {
          text: '🔍 So sánh sản phẩm!\n\nTôi có thể giúp bạn so sánh:\n Giá cả các sản phẩm\n Công suất và lưu lượng\n Tính năng và ứng dụng\n\nBạn muốn so sánh loại máy bơm nào?',
          products: products.slice(0, 4),
          quickActions: [
            { label: '💰 So sánh giá', value: 'Máy bơm giá rẻ' },
            { label: '⚡ So sánh công suất', value: 'Máy bơm công suất lớn' },
          ],
        };

      case 'consult':
        return {
          text: '💡 Tôi rất vui được tư vấn!\n\nĐể tư vấn chính xác nhất, hãy cho tôi biết:\n Mục đích sử dụng (gia đình/công nghiệp)\n Loại nước cần bơm\n Lưu lượng và cột áp mong muốn\n Ngân sách của bạn\n\nHoặc bạn có thể chọn nhanh:',
          quickActions: [
            { label: '🏠 Gia đình', value: 'Máy bơm cho gia đình' },
            { label: '🏭 Công nghiệp', value: 'Máy bơm công nghiệp' },
            { label: '🌊 Giếng khoan', value: 'Máy bơm giếng khoan' },
            { label: '💧 Nước thải', value: 'Máy bơm nước thải' },
          ],
        };
        
      default:
        return {
          text: '🤔 Tôi có thể giúp bạn tìm máy bơm phù hợp!\n\nChúng tôi chuyên cung cấp:\n Máy bơm gia đình & công nghiệp\n Máy bơm nước sạch & nước thải\n Máy bơm hóa chất & định lượng\n\nHãy cho tôi biết bạn cần loại nào nhé! 😊',
          products: products.slice(0, 4),
          quickActions: [
            { label: '🏠 Gia đình', value: 'Máy bơm cho gia đình' },
            { label: '🏭 Công nghiệp', value: 'Máy bơm công nghiệp' },
            { label: '💰 Giá tốt', value: 'Máy bơm giá rẻ' },
            { label: '🔍 Xem tất cả', value: 'Xem tất cả sản phẩm' },
          ],
        };
    }
  };

  const handleSend = async (message?: string) => {
    const messageToSend = message || inputValue;
    if (!messageToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageToSend,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Build conversation history for multi-turn chat (excluding welcome message)
      const history = messages
        .filter(m => m.id !== '1')
        .map(m => ({
          role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
          text: m.text,
        }));

      const availableProducts = getEffectiveProducts();
      const geminiRes = await askGemini(history, messageToSend, availableProducts);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: geminiRes.text,
        sender: 'bot',
        timestamp: new Date(),
        suggestedProducts: geminiRes.suggestedProducts.length > 0 ? geminiRes.suggestedProducts : undefined,
        quickActions: geminiRes.quickActions,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.warn('Gemini chat error, falling back to local engine:', error);
      // Fallback seamlessly to existing local rules engine
      const response = generateResponse(messageToSend);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        suggestedProducts: response.products,
        quickActions: response.quickActions,
      };

      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleResetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInputValue('');
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-650 to-blue-700 text-white px-4 py-3.5 flex items-center justify-between border-b border-blue-500/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/15 backdrop-blur-xs rounded-full flex items-center justify-center relative border border-white/20 shadow-xs">
            <Bot className="w-5 h-5 text-white" />
            <Sparkles className="w-3 h-3 text-amber-300 absolute -top-0.5 -right-0.5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm sm:text-base text-white tracking-tight">Trợ lý AI VOLTOR</span>
              <span className="text-[10px] bg-white/20 text-blue-50 px-2 py-0.5 rounded-full font-medium flex items-center gap-1 border border-white/20">
                <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                Gemini AI
              </span>
            </div>
            <div className="text-[11px] text-blue-100 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full inline-block animate-pulse"></span>
              <span>Tư vấn kỹ thuật 24/7 • Hotline: 0898 296 336</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleResetChat}
            className="p-2 hover:bg-white/15 rounded-lg transition-colors text-blue-100 hover:text-white"
            title="Làm mới cuộc trò chuyện"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/15 rounded-lg transition-colors text-blue-100 hover:text-white"
            title="Đóng chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scroll-smooth">
        {messages.map((message) => (
          <div key={message.id} className="space-y-2">
            <div
              className={`flex gap-2.5 ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs ${
                  message.sender === 'bot'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-white'
                }`}
              >
                {message.sender === 'bot' ? (
                  <Bot className="w-4 h-4" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-2xs ${
                  message.sender === 'bot'
                    ? 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/70'
                    : 'bg-blue-600 text-white rounded-tr-xs'
                }`}
              >
                <FormattedMessage text={message.text} isUser={message.sender === 'user'} />
              </div>
            </div>

            {/* Quick Action Buttons */}
            {message.quickActions && message.quickActions.length > 0 && (
              <div className="ml-9 flex flex-wrap gap-1.5 pt-1">
                {message.quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(action.value)}
                    className="text-xs font-medium bg-white hover:bg-blue-600 text-slate-700 hover:text-white px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-600 transition-all shadow-2xs active:scale-95"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {/* Suggested Products */}
            {message.suggestedProducts && message.suggestedProducts.length > 0 && (
              <div className="ml-9 mt-2 space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Sản phẩm gợi ý cho bạn:
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {message.suggestedProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => onProductClick(product)}
                      className="w-full bg-white border border-slate-200 hover:border-blue-500 rounded-xl p-2.5 hover:shadow-md transition-all text-left flex items-center gap-3 group"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-13 h-13 object-cover rounded-lg border border-slate-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{product.category}</div>
                        <div className="text-xs font-bold text-blue-600 mt-0.5">{formatPrice(product.price)}</div>
                      </div>
                      <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity pr-1 text-xs font-medium flex items-center gap-0.5">
                        <span>Xem</span>
                        <span>→</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2.5 items-center">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-xs px-3.5 py-2 border border-slate-200/70 shadow-2xs flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Gemini đang soạn câu trả lời...</span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-slate-200/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Hỏi về máy bơm, công suất, số tầng..."
            className="flex-1 px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs flex-shrink-0"
            title="Gửi câu hỏi"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}