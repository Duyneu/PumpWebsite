import { Product } from '../types';
import { dongyinPart1 } from './dongyin-complete-120';
import { dongyinPart2 } from './dongyin-complete-part2';

export interface Category {
  id: string;
  name: string;
  subcategories?: string[];
}

export const mainCategories: Category[] = [
  {
    id: 'may-bom-nuoc',
    name: 'Máy bơm nước',
    subcategories: [
      'Máy bơm hỏa tiễn',
      'Máy bơm trục đứng',
      'Máy bơm trục ngang',
      'Máy bơm điện chìm',
      'Máy bơm chân không',
      'Máy bơm tăng áp tự động',
      'Máy bơm chạy xăng',
      'Máy bơm hóa chất',
      'Máy bơm bê cá',
    ],
  },
  {
    id: 'dong-co-dien',
    name: 'Động cơ điện',
    subcategories: [
      'Động cơ điện 1 PHA',
      'Động cơ điện 3 PHA',
    ],
  },
  {
    id: 'phu-tung-may-cong-trinh',
    name: 'Phụ tùng máy công trình',
    subcategories: [
      'Bơm thủy lực',
      'Phụ tùng điện điều khiển',
      'Phụ tùng máy xúc lật',
      'Phụ tùng máy búa đập',
    ],
  },
  {
    id: 'cong-cu-dung-cu',
    name: 'Công cụ & dụng cụ',
    subcategories: [
      'Dụng cụ cầm tay',
      'Dụng cụ để bàn',
      'Máy nén khí',
      'Thiết bị nâng hạ',
      'Quạt làm mát',
    ],
  },
  {
    id: 'dien-cong-nghiep',
    name: 'Điện công nghiệp – dân dụng',
    subcategories: [
      'Khởi động từ',
      'APTOPMAT',
      'Biến tần',
      'Tủ điện',
      'Dây điện',
    ],
  },
  {
    id: 'ac-quy-oto',
    name: 'Ắc quy ô tô',
    subcategories: [
      'Theo hãng xe',
      'Theo thương hiệu',
    ],
  },
  {
    id: 'dung-cu-ve-sinh',
    name: 'Dụng cụ vệ sinh',
    subcategories: [
      'Máy rửa xe',
      'Máy thổi bụi',
      'Máy hút bụi',
      'Phụ kiện vệ sinh',
    ],
  },
];

export const subcategoryProductCodes: Record<string, string[]> = {
  'Máy bơm hỏa tiễn': ['2SDM', '2,5SDM', '3SDM – 3SD', '4SDM – 4SD'],
  'Máy bơm điện chìm': ['Máy bơm nước sạch', 'Máy bơm nước thải'],
  'Phụ tùng điện điều khiển': ['Dây điện động cơ', 'Cảm biến', 'Van điện'],
  'Phụ tùng máy xúc lật': ['Máy để khởi động 24V', 'Máy bơm nước làm mát', 'Cánh quạt làm mát', 'Bộ bạc trục cam'],
  'Dụng cụ cầm tay': ['Máy khoan', 'Máy mai', 'Máy siết bu lông', 'Máy cưa xích', 'Máy khâu bao'],
  'Dụng cụ để bàn': ['Máy cắt sắt', 'Máy cắt gạch', 'Máy may bao'],
  'Theo hãng xe': ['MERCEDES', 'BMW', 'AUDI', 'LEXUS', 'LAND ROVER', 'FORD', 'CHEVROLET', 'HYUNDAI', 'KIA', 'HONDA', 'MAZDA', 'MITSUBISHI'],
  'Theo thương hiệu': ['SCHAEFFLER', 'GS', 'DONGNAI'],
};

// Kết hợp tất cả products DONGYIN
const allDongyinProducts = [
  ...dongyinPart1,
  ...dongyinPart2,
];

// Export products bao gồm cả DONGYIN
export const products: Product[] = [
  // Products gốc
  {
    id: '1',
    name: 'Máy bơm nước ly tâm DNP 1500W',
    category: 'Máy bơm ly tâm',
    price: 2500000,
    image: 'https://images.unsplash.com/photo-1746907168464-f61a24a283ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHB1bXAlMjBpbmR1c3RyaWFsfGVufDF8fHx8MTc2NjI1MzYwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Máy bơm ly tâm công suất lớn, phù hợp cho các công trình công nghiệp và dân dụng. Thiết kế bền bỉ, hoạt động ổn định.',
    specs: {
      power: '1500W',
      flow: '200 lít/phút',
      head: '35m',
      material: 'Gang đúc',
    },
    inStock: true,
  },
  {
    id: '2',
    name: 'Máy bơm chìm nước thải 2200W',
    category: 'Máy bơm chìm',
    price: 3500000,
    image: 'https://images.unsplash.com/photo-1764723901694-b94b95f3039d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdW1wJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NjMyNDk0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Máy bơm chìm chuyên dụng cho nước thải, có khả năng xử lý nước bẩn với tạp chất lớn. Động cơ bền bỉ chống ăn mòn.',
    specs: {
      power: '2200W',
      flow: '300 lít/phút',
      head: '20m',
      material: 'Inox 304',
    },
    inStock: true,
  },
  {
    id: '3',
    name: 'Máy bơm tăng áp tự động 750W',
    category: 'Máy bơm tăng áp',
    price: 1800000,
    image: 'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmFjdG9yeXxlbnwxfHx8fDE3NjYzMTI0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Máy bơm tăng áp tự động, phù hợp cho nhà cao tầng. Tự động bật/tắt khi có nhu cầu sử dụng nước, tiết kiệm điện năng.',
    specs: {
      power: '750W',
      flow: '120 lít/phút',
      head: '28m',
      material: 'Inox 316',
    },
    inStock: true,
  },
  {
    id: '4',
    name: 'Máy bơm hóa chất công nghiệp 3000W',
    category: 'Máy bơm hóa chất',
    price: 8500000,
    image: 'https://images.unsplash.com/photo-1746907168464-f61a24a283ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHB1bXAlMjBpbmR1c3RyaWFsfGVufDF8fHx8MTc2NjI1MzYwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Máy bơm chuyên dụng cho hóa chất ăn mòn, acid, kiềm. Chế tạo từ vật liệu chống ăn mòn đặc biệt, đảm bảo an toàn.',
    specs: {
      power: '3000W',
      flow: '250 lít/phút',
      head: '40m',
      material: 'PP/PVDF',
    },
    inStock: true,
  },
  {
    id: '5',
    name: 'Máy bơm nước giếng khoan 1100W',
    category: 'Máy bơm giếng khoan',
    price: 4200000,
    image: 'https://images.unsplash.com/photo-1764723901694-b94b95f3039d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdW1wJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NjMyNDk0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Máy bơm chìm giếng khoan sâu, phù hợp cho giếng từ 10-100m. Động cơ bền bỉ, vận hành êm ái.',
    specs: {
      power: '1100W',
      flow: '80 lít/phút',
      head: '85m',
      material: 'Inox 304',
    },
    inStock: true,
  },
  {
    id: '6',
    name: 'Máy bơm định lượng hóa chất 180W',
    category: 'Máy bơm định lượng',
    price: 6500000,
    image: 'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmFjdG9yeXxlbnwxfHx8fDE3NjYzMTI0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Máy bơm định lượng chính xác cao, sử dụng cho các hệ thống xử lý nước, dược phẩm. Điều chỉnh lưu lượng linh hoạt.',
    specs: {
      power: '180W',
      flow: '0-50 lít/giờ',
      head: '15m',
      material: 'PVC/PTFE',
    },
    inStock: true,
  },
  {
    id: '7',
    name: 'Máy bơm nước sạch gia đình 550W',
    category: 'Máy bơm gia đình',
    price: 1350000,
    image: 'https://images.unsplash.com/photo-1746907168464-f61a24a283ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHB1bXAlMjBpbmR1c3RyaWFsfGVufDF8fHx8MTc2NjI1MzYwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Máy bơm nước sạch dành cho hộ gia đình, kích thước nhỏ gọn, tiêu thụ điện năng thấp. Hoạt động êm ái.',
    specs: {
      power: '550W',
      flow: '60 lít/phút',
      head: '22m',
      material: 'Nhôm đúc',
    },
    inStock: true,
  },
  {
    id: '8',
    name: 'Máy bơm nước thải công nghiệp 5500W',
    category: 'Máy bơm công nghiệp',
    price: 12500000,
    image: 'https://images.unsplash.com/photo-1764723901694-b94b95f3039d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdW1wJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NjMyNDk0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Máy bơm công nghiệp công suất lớn, xử lý lưu lượng nước lớn. Thiết kế chắc chắn cho hoạt động liên tục 24/7.',
    specs: {
      power: '5500W',
      flow: '600 lít/phút',
      head: '30m',
      material: 'Gang + Inox',
    },
    inStock: true,
  },
  // Động cơ điện
  {
    id: '9',
    name: 'Động cơ điện 1 PHA 1.5HP',
    category: 'Động cơ điện 1 PHA',
    price: 1800000,
    image: 'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmFjdG9yeXxlbnwxfHx8fDE3NjYzMTI0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Động cơ điện 1 pha công suất 1.5HP, phù hợp cho máy bơm nước, máy cắt, máy mài. Hiệu suất cao, tiết kiệm điện.',
    specs: {
      power: '1.5HP (1100W)',
      flow: 'Tốc độ 2800 rpm',
      head: 'Điện áp 220V',
      material: 'Lõi đồng',
    },
    inStock: true,
  },
  {
    id: '10',
    name: 'Động cơ điện 3 PHA 5HP',
    category: 'Động cơ điện 3 PHA',
    price: 4500000,
    image: 'https://images.unsplash.com/photo-1746907168464-f61a24a283ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHB1bXAlMjBpbmR1c3RyaWFsfGVufDF8fHx8MTc2NjI1MzYwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Động cơ điện 3 pha công suất lớn 5HP, dùng cho công nghiệp. Hoạt động mạnh mẽ, bền bỉ, ít hao mòn.',
    specs: {
      power: '5HP (3700W)',
      flow: 'Tốc độ 1450 rpm',
      head: 'Điện áp 380V',
      material: 'Lõi đồng nguyên chất',
    },
    inStock: true,
  },
  // Ắc quy ô tô
  {
    id: '11',
    name: 'Ắc quy GS 12V-50Ah cho xe Honda',
    category: 'Ắc quy ô tô',
    price: 1200000,
    image: 'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmFjdG9yeXxlbnwxfHx8fDE3NjYzMTI0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Ắc quy GS chính hãng 12V 50Ah, phù hợp cho xe Honda City, Civic, Accord. Dung lượng cao, tuổi thọ lâu dài.',
    specs: {
      power: '12V - 50Ah',
      flow: 'Bảo hành 12 tháng',
      head: 'Khởi động mạnh',
      material: 'Chì Canxi',
    },
    inStock: true,
  },
  {
    id: '12',
    name: 'Ắc quy Bosch 12V-70Ah cho Mercedes',
    category: 'Ắc quy ô tô',
    price: 3200000,
    image: 'https://images.unsplash.com/photo-1764723901694-b94b95f3039d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdW1wJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NjMyNDk0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Ắc quy Bosch cao cấp cho xe Mercedes, BMW, Audi. Công nghệ AGM, khởi động mạnh mẽ ngay cả trong điều kiện khắc nghiệt.',
    specs: {
      power: '12V - 70Ah',
      flow: 'Bảo hành 18 tháng',
      head: 'Công nghệ AGM',
      material: 'Chì tinh khiết',
    },
    inStock: true,
  },
  // Dụng cụ vệ sinh
  {
    id: '13',
    name: 'Máy rửa xe cao áp 2000W',
    category: 'Máy rửa xe',
    price: 2800000,
    image: 'https://images.unsplash.com/photo-1746907168464-f61a24a283ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHB1bXAlMjBpbmR1c3RyaWFsfGVufDF8fHx8MTc2NjI1MzYwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Máy rửa xe cao áp 2000W, áp lực mạnh 130Bar. Làm sạch xe, sân vườn, tường nhà hiệu quả. Tiết kiệm nước.',
    specs: {
      power: '2000W',
      flow: 'Áp lực 130 Bar',
      head: 'Lưu lượng 420L/h',
      material: 'Nhựa ABS cao cấp',
    },
    inStock: true,
  },
  {
    id: '14',
    name: 'Máy hút bụi công nghiệp 3000W',
    category: 'Máy hút bụi',
    price: 4500000,
    image: 'https://images.unsplash.com/photo-1764723901694-b94b95f3039d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdW1wJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NjMyNDk0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Máy hút bụi công nghiệp 3000W, hút khô và ướt. Dung tích thùng 80L, phù hợp cho xưởng, nhà máy, công trình.',
    specs: {
      power: '3000W',
      flow: 'Dung tích 80L',
      head: 'Hút khô & ướt',
      material: 'Thép không gỉ',
    },
    inStock: true,
  },
  {
    id: '15',
    name: 'Máy thổi bụi 600W cầm tay',
    category: 'Máy thổi bụi',
    price: 850000,
    image: 'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmFjdG9yeXxlbnwxfHx8fDE3NjYzMTI0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Máy thổi bụi cầm tay 600W, gọn nhẹ. Làm sạch bụi bẩn, lá cây. Phù hợp cho gia đình, văn phòng, xưởng.',
    specs: {
      power: '600W',
      flow: 'Tốc độ gió 16000rpm',
      head: 'Trọng lượng 1.5kg',
      material: 'Nhựa chống va đập',
    },
    inStock: true,
  },
  // Điện công nghiệp - dân dụng
  {
    id: '16',
    name: 'Khởi động từ 3 pha 32A',
    category: 'Khởi động từ',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1746907168464-f61a24a283ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHB1bXAlMjBpbmR1c3RyaWFsfGVufDF8fHx8MTc2NjI1MzYwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Khởi động từ 3 pha 32A, hãng Schneider. Dùng để điều khiển động cơ điện. An toàn, bền bỉ.',
    specs: {
      power: 'Định mức 32A',
      flow: 'Điện áp 220V-380V',
      head: 'Tuổi thọ cao',
      material: 'Linh kiện chất lượng',
    },
    inStock: true,
  },
  {
    id: '17',
    name: 'Biến tần 2.2KW Mitsubishi',
    category: 'Biến tần',
    price: 5800000,
    image: 'https://images.unsplash.com/photo-1764723901694-b94b95f3039d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdW1wJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NjMyNDk0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Biến tần Mitsubishi 2.2KW, điều khiển tốc độ động cơ. Tiết kiệm điện năng, chạy êm, bảo vệ quá tải.',
    specs: {
      power: '2.2KW',
      flow: 'Input 380V 3 pha',
      head: 'Output 0-380V',
      material: 'Chính hãng Nhật',
    },
    inStock: true,
  },
  {
    id: '18',
    name: 'Aptomat 3 pha 63A',
    category: 'APTOPMAT',
    price: 280000,
    image: 'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmFjdG9yeXxlbnwxfHx8fDE3NjYzMTI0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Aptomat 3 pha 63A, bảo vệ quá tải và ngắn mạch. Chất lượng cao, đảm bảo an toàn điện.',
    specs: {
      power: 'Định mức 63A',
      flow: 'Điện áp 380V',
      head: 'Cắt nhanh',
      material: 'Tiêu chuẩn IEC',
    },
    inStock: true,
  },
  // Công cụ & dụng cụ
  {
    id: '19',
    name: 'Máy khoan động lực 800W Bosch',
    category: 'Dụng cụ cầm tay',
    price: 1850000,
    image: 'https://images.unsplash.com/photo-1746907168464-f61a24a283ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHB1bXAlMjBpbmR1c3RyaWFsfGVufDF8fHx8MTc2NjI1MzYwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Máy khoan động lực Bosch 800W, khoan bê tông, gạch, gỗ, sắt. Công suất mạnh, độ bền cao.',
    specs: {
      power: '800W',
      flow: 'Tốc độ 0-3000rpm',
      head: 'Khoan max 13mm',
      material: 'Thân máy kim loại',
    },
    inStock: true,
  },
  {
    id: '20',
    name: 'Máy mài góc 950W Makita',
    category: 'Dụng cụ cầm tay',
    price: 1350000,
    image: 'https://images.unsplash.com/photo-1764723901694-b94b95f3039d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdW1wJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NjMyNDk0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Máy mài góc Makita 950W, đĩa 100mm. Cắt, mài kim loại, đá, gạch. Thiết kế cầm tay thoải mái.',
    specs: {
      power: '950W',
      flow: 'Tốc độ 11000rpm',
      head: 'Đĩa 100mm',
      material: 'Chính hãng Nhật',
    },
    inStock: true,
  },
  {
    id: '21',
    name: 'Máy nén khí 3HP 100L',
    category: 'Máy nén khí',
    price: 7500000,
    image: 'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmFjdG9yeXxlbnwxfHx8fDE3NjYzMTI0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Máy nén khí 3HP, bình chứa 100L. Cung cấp khí nén cho xưởng, tiệm sửa xe, công trình. Hoạt động mạnh mẽ.',
    specs: {
      power: '3HP (2200W)',
      flow: 'Lưu lượng 280L/phút',
      head: 'Áp suất 8 Bar',
      material: 'Bình thép',
    },
    inStock: true,
  },
  // Phụ tùng máy công trình
  {
    id: '22',
    name: 'Bơm thủy lực máy xúc',
    category: 'Bơm thủy lực',
    price: 15000000,
    image: 'https://images.unsplash.com/photo-1746907168464-f61a24a283ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHB1bXAlMjBpbmR1c3RyaWFsfGVufDF8fHx8MTc2NjI1MzYwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Bơm thủy lực cho máy xúc Komatsu, Hitachi, Kobelco. Chất lượng cao, độ bền tốt, thay thế chính hãng.',
    specs: {
      power: 'Áp suất 280 Bar',
      flow: 'Lưu lượng 120L/phút',
      head: 'Phù hợp 20-30 tấn',
      material: 'Hợp kim đặc biệt',
    },
    inStock: true,
  },
  {
    id: '23',
    name: 'Máy khởi động 24V cho máy công trình',
    category: 'Phụ tùng máy xúc lật',
    price: 3500000,
    image: 'https://images.unsplash.com/photo-1764723901694-b94b95f3039d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdW1wJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NjMyNDk0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Máy khởi động 24V cho máy xúc, máy ủi, xe tải. Công suất mạnh, khởi động êm, độ bền cao.',
    specs: {
      power: '24V 7.5KW',
      flow: 'Răng 11 răng',
      head: 'Chịu tải tốt',
      material: 'Đồng nguyên chất',
    },
    inStock: true,
  },
  ...allDongyinProducts, // Thêm 120 sản phẩm DONGYIN (61 từ Part 1 + 59 từ Part 2)
];

// ============================================
// PRODUCT STATISTICS
// ============================================
// Original products: 23
// DONGYIN products: 120 (QS:14, WS:16, WQ:16, TD:15, SD:21, 4SP:17, 6SR/6SP:18, 4DP:3)
// Part 1: 61 products (QS:14 + WS:16 + WQ:16 + TD:15)
// Part 2: 59 products (SD:21 + 4SP:17 + 6SR/6SP:18 + 4DP:3)
// TOTAL: 143 products
// ============================================