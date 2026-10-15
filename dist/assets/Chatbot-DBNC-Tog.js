import{r as l,j as t}from"./vendor-C3-tQSI9.js";import{p as i}from"./products-DeUPoqaw.js";import{V as g,X as A,U as B,p as T}from"./vendor-icons-CWh_bPXI.js";function sn({onClose:k,onProductClick:M}){const[u,d]=l.useState([{id:"1",text:`Xin chào! 👋 Tôi là trợ lý AI của Máy Bơm Việt.

Tôi có thể giúp bạn tìm kiếm và tư vấn sản phẩm phù hợp nhất:
 -Máy bơm nước
 -Động cơ điện
 -Ắc quy ô tô
 -Dụng cụ vệ sinh
 -Điện công nghiệp
 -Công cụ & dụng cụ
 -Phụ tùng máy công trình

Bạn cần tìm loại sản phẩm nào?`,sender:"bot",timestamp:new Date,quickActions:[{label:"🏠 Máy bơm",value:"Máy bơm nước"},{label:"⚡ Động cơ điện",value:"Động cơ điện"},{label:"🔋 Ắc quy ô tô",value:"Ắc quy ô tô"},{label:"🧹 Dụng cụ vệ sinh",value:"Dụng cụ vệ sinh"},{label:"🔌 Điện công nghiệp",value:"Điện công nghiệp"},{label:"🔧 Công cụ",value:"Công cụ dụng cụ"}]}]),[h,m]=l.useState(""),[b,y]=l.useState(!1),p=l.useRef(null),C=()=>{var c;(c=p.current)==null||c.scrollIntoView({behavior:"smooth"})};l.useEffect(()=>{C()},[u,b]);const w=c=>{const e=c.toLowerCase();return e.includes("gia đình")||e.includes("nhà")||e.includes("sinh hoạt")||e.includes("gia dụng")?{intent:"home",details:["gia đình","nhà ở"]}:e.includes("công nghiệp")||e.includes("nhà máy")||e.includes("xí nghiệp")?{intent:"industrial",details:["công nghiệp"]}:e.includes("giếng")||e.includes("khoan")?{intent:"well",details:["giếng khoan"]}:e.includes("tăng áp")||e.includes("cao tầng")||e.includes("áp lực")?{intent:"pressure",details:["tăng áp"]}:e.includes("thải")||e.includes("nước bẩn")||e.includes("cống")?{intent:"wastewater",details:["nước thải"]}:e.includes("hóa chất")||e.includes("acid")||e.includes("kiềm")?{intent:"chemical",details:["hóa chất"]}:e.includes("chìm")||e.includes("điện chìm")?{intent:"submersible",details:["chìm"]}:e.includes("ly tâm")?{intent:"centrifugal",details:["ly tâm"]}:e.includes("định lượng")?{intent:"dosing",details:["định lượng"]}:e.includes("máy bơm")||e.includes("bơm nước")?{intent:"pump",details:["máy bơm"]}:e.includes("động cơ")||e.includes("motor")?{intent:"motor",details:["động cơ điện"]}:e.includes("ắc quy")||e.includes("bình điện")||e.includes("xe hơi")||e.includes("ô tô")?{intent:"battery",details:["ắc quy"]}:e.includes("rửa xe")||e.includes("máy rửa")?{intent:"carwash",details:["máy rửa xe"]}:e.includes("hút bụi")||e.includes("máy hút")?{intent:"vacuum",details:["máy hút bụi"]}:e.includes("thổi bụi")||e.includes("máy thổi")?{intent:"blower",details:["máy thổi"]}:e.includes("vệ sinh")||e.includes("làm sạch")?{intent:"cleaning",details:["vệ sinh"]}:e.includes("biến tần")||e.includes("inverter")?{intent:"inverter",details:["biến tần"]}:e.includes("khởi động từ")||e.includes("contactor")?{intent:"contactor",details:["khởi động từ"]}:e.includes("aptomat")||e.includes("cầu dao")?{intent:"breaker",details:["aptomat"]}:e.includes("điện công nghiệp")||e.includes("thiết bị điện")?{intent:"electrical",details:["điện công nghiệp"]}:e.includes("máy khoan")||e.includes("khoan")?{intent:"drill",details:["máy khoan"]}:e.includes("máy mài")||e.includes("mài góc")?{intent:"grinder",details:["máy mài"]}:e.includes("máy nén")||e.includes("nén khí")?{intent:"compressor",details:["máy nén khí"]}:e.includes("công cụ")||e.includes("dụng cụ")||e.includes("tool")?{intent:"tools",details:["công cụ"]}:e.includes("thủy lực")||e.includes("bơm thủy lực")?{intent:"hydraulic",details:["thủy lực"]}:e.includes("máy xúc")||e.includes("máy công trình")?{intent:"construction",details:["máy công trình"]}:e.includes("giá")||e.includes("rẻ")||e.includes("tiết kiệm")||e.includes("phải chăng")?{intent:"price",details:["giá cả"]}:e.includes("mạnh")||e.includes("công suất")||e.includes("lớn")?{intent:"power",details:["công suất cao"]}:e.includes("tất cả")||e.includes("toàn bộ")?{intent:"all",details:[]}:e.includes("so sánh")?{intent:"compare",details:[]}:e.includes("tư vấn")||e.includes("gợi ý")?{intent:"consult",details:[]}:{intent:"general",details:[]}},P=c=>{const{intent:e}=w(c);switch(e){case"home":return{text:`🏠 Tuyệt vời! Với nhu cầu sử dụng cho gia đình, tôi đề xuất các dòng máy bơm sau:

 Công suất vừa phải, tiết kiệm điện
 Hoạt động êm ái, ít tiếng ồn
 Dễ dàng lắp đặt và bảo trì

Dưới đây là các sản phẩm phù hợp nhất:`,products:i.filter(n=>n.category.includes("gia đình")||n.category.includes("tăng áp")||n.name.toLowerCase().includes("gia đình")||parseInt(n.specs.power)<1e3),quickActions:[{label:"💰 Xem theo giá",value:"Máy bơm giá rẻ"},{label:"⚡ Máy bơm tăng áp",value:"Máy bơm tăng áp"},{label:"🔍 Tư vấn chi tiết",value:"Tư vấn máy bơm gia đình"}]};case"industrial":return{text:`🏭 Với nhu cầu công nghiệp, bạn cần máy bơm có:

 Công suất lớn, xử lý lưu lượng cao
 Độ bền cao, hoạt động liên tục 24/7
 Chất liệu chống ăn mòn, bảo hành dài hạn

Đây là các giải pháp tôi đề xuất:`,products:i.filter(n=>n.category.includes("công nghiệp")||n.category.includes("hóa chất")||n.name.toLowerCase().includes("công nghiệp")||parseInt(n.specs.power)>2e3),quickActions:[{label:"⚡ Công suất cao",value:"Máy bơm công suất lớn"},{label:"🧪 Bơm hóa chất",value:"Máy bơm hóa chất"},{label:"📞 Liên hệ tư vấn",value:"Tư vấn máy bơm công nghiệp"}]};case"well":return{text:`🌊 Máy bơm giếng khoan là lựa chọn hoàn hảo!

 Phù hợp với giếng sâu từ 10-100m
 Động cơ chìm bền bỉ, chịu áp lực cao
 Lưu lượng ổn định, tiết kiệm điện

Sản phẩm chuyên dụng cho giếng khoan:`,products:i.filter(n=>n.category.includes("giếng khoan")||n.name.toLowerCase().includes("giếng")),quickActions:[{label:"💧 Máy bơm chìm",value:"Máy bơm điện chìm"},{label:"🏠 Bơm gia đình",value:"Máy bơm cho gia đình"}]};case"pressure":return{text:`⚡ Máy bơm tăng áp - Giải pháp cho nhà cao tầng!

 Tự động bật/tắt khi có nhu cầu nước
 Tăng áp lực nước hiệu quả
 Tiết kiệm điện năng tối đa

Các sản phẩm máy bơm tăng áp:`,products:i.filter(n=>n.category.includes("tăng áp")||n.name.toLowerCase().includes("tăng áp")),quickActions:[{label:"🏠 Bơm gia đình",value:"Máy bơm cho gia đình"},{label:"💰 So sánh giá",value:"Máy bơm giá rẻ"}]};case"wastewater":const f=i.filter(n=>n.name.toLowerCase().includes("thải")||n.category.includes("chìm")&&n.name.toLowerCase().includes("thải"));return{text:`💧 Máy bơm nước thải chuyên dụng!

 Xử lý nước bẩn với tạp chất lớn
 Chất liệu chống ăn mòn bền bỉ
 Công suất mạnh, hoạt động ổn định

Các sản phẩm phù hợp với nước thải:`,products:f.length>0?f:i.filter(n=>n.category.includes("chìm")),quickActions:[{label:"🏭 Bơm công nghiệp",value:"Máy bơm công nghiệp"},{label:"💧 Máy bơm chìm",value:"Máy bơm điện chìm"}]};case"chemical":return{text:`🧪 Máy bơm hóa chất - An toàn và chính xác!

 Vật liệu chống ăn mòn đặc biệt
 Phù hợp với acid, kiềm, dung môi
 Độ bền cao, an toàn tuyệt đối

Các sản phẩm bơm hóa chất:`,products:i.filter(n=>n.category.includes("hóa chất")||n.category.includes("định lượng")||n.name.toLowerCase().includes("hóa chất")),quickActions:[{label:"🏭 Bơm công nghiệp",value:"Máy bơm công nghiệp"},{label:"📏 Bơm định lượng",value:"Máy bơm định lượng"}]};case"submersible":return{text:`💧 Máy bơm chìm - Đa năng và hiệu quả!

 Hoạt động ngầm dưới nước
 Tiết kiệm không gian lắp đặt
 Phù hợp nhiều ứng dụng khác nhau

Các sản phẩm máy bơm chìm:`,products:i.filter(n=>n.category.includes("chìm")||n.name.toLowerCase().includes("chìm")),quickActions:[{label:"🌊 Bơm giếng khoan",value:"Máy bơm giếng khoan"},{label:"💧 Bơm nước thải",value:"Máy bơm nước thải"}]};case"centrifugal":return{text:`🔄 Máy bơm ly tâm - Phổ biến và tin cậy!

 Thiết kế đơn giản, dễ bảo trì
 Hiệu suất cao, hoạt động ổn định
 Giá cả phải chăng

Sản phẩm máy bơm ly tâm:`,products:i.filter(n=>n.category.includes("ly tâm")||n.name.toLowerCase().includes("ly tâm")),quickActions:[{label:"🏠 Bơm gia đình",value:"Máy bơm cho gia đình"},{label:"🏭 Bơm công nghiệp",value:"Máy bơm công nghiệp"}]};case"dosing":return{text:`📏 Máy bơm định lượng - Chính xác tuyệt đối!

 Điều chỉnh lưu lượng linh hoạt
 Độ chính xác cao
 Dùng cho xử lý nước, dược phẩm

Sản phẩm máy bơm định lượng:`,products:i.filter(n=>n.category.includes("định lượng")||n.name.toLowerCase().includes("định lượng")),quickActions:[{label:"🧪 Bơm hóa chất",value:"Máy bơm hóa chất"},{label:"🏭 Bơm công nghiệp",value:"Máy bơm công nghiệp"}]};case"pump":return{text:`💦 Máy bơm nước - Đa dạng lựa chọn!

 Máy bơm gia đình & công nghiệp
 Máy bơm chìm & ly tâm
 Nhiều công suất khác nhau

Các sản phẩm máy bơm:`,products:i.filter(n=>n.category.toLowerCase().includes("bơm")||n.name.toLowerCase().includes("bơm")).slice(0,6),quickActions:[{label:"🏠 Bơm gia đình",value:"Máy bơm cho gia đình"},{label:"🏭 Bơm công nghiệp",value:"Máy bơm công nghiệp"},{label:"🌊 Bơm giếng khoan",value:"Máy bơm giếng khoan"}]};case"motor":return{text:`⚡ Động cơ điện - Mạnh mẽ và bền bỉ!

 Động cơ 1 pha & 3 pha
 Nhiều công suất khác nhau
 Lõi đồng nguyên chất, hiệu suất cao

Các sản phẩm động cơ điện:`,products:i.filter(n=>n.category.includes("Động cơ điện")||n.name.toLowerCase().includes("động cơ")),quickActions:[{label:"🔌 Điện công nghiệp",value:"Điện công nghiệp"},{label:"🏭 Máy bơm",value:"Máy bơm nước"}]};case"battery":return{text:`🔋 Ắc quy ô tô - Chính hãng, chất lượng!

 Phù hợp đa dạng dòng xe
 Dung lượng cao, tuổi thọ lâu
 Khởi động mạnh mẽ

Các sản phẩm ắc quy:`,products:i.filter(n=>n.category.includes("Ắc quy")||n.name.toLowerCase().includes("ắc quy")),quickActions:[{label:"🚗 Honda/Toyota",value:"Ắc quy Honda"},{label:"🚙 Mercedes/BMW",value:"Ắc quy Mercedes"}]};case"carwash":return{text:`🚗 Máy rửa xe cao áp - Làm sạch hoàn hảo!

 Áp lực cao, tiết kiệm nước
 Đa năng: xe, sân vườn, nhà cửa
 Công suất mạnh, độ bền cao

Các sản phẩm máy rửa xe:`,products:i.filter(n=>n.category.includes("rửa xe")||n.name.toLowerCase().includes("rửa xe")),quickActions:[{label:"🧹 Dụng cụ vệ sinh",value:"Dụng cụ vệ sinh"},{label:"🏠 Thiết bị gia đình",value:"Máy bơm cho gia đình"}]};case"vacuum":return{text:`🌪️ Máy hút bụi - Sạch sẽ mọi không gian!

 Hút khô & ướt
 Công suất lớn, hút mạnh
 Phù hợp gia đình, xưởng, công trình

Các sản phẩm máy hút bụi:`,products:i.filter(n=>n.category.includes("hút bụi")||n.name.toLowerCase().includes("hút bụi")),quickActions:[{label:"🧹 Dụng cụ vệ sinh",value:"Dụng cụ vệ sinh"},{label:"🏭 Công nghiệp",value:"Máy hút bụi công nghiệp"}]};case"blower":return{text:`💨 Máy thổi bụi - Làm sạch nhanh chóng!

 Gọn nhẹ, dễ sử dụng
 Tốc độ gió mạnh
 Phù hợp nhiều mục đích

Các sản phẩm máy thổi bụi:`,products:i.filter(n=>n.category.includes("thổi bụi")||n.name.toLowerCase().includes("thổi")),quickActions:[{label:"🧹 Dụng cụ vệ sinh",value:"Dụng cụ vệ sinh"},{label:"🌪️ Máy hút bụi",value:"Máy hút bụi"}]};case"cleaning":return{text:`🧹 Dụng cụ vệ sinh - Giải pháp làm sạch toàn diện!

 Máy rửa xe cao áp
 Máy hút bụi công nghiệp
 Máy thổi bụi cầm tay

Các sản phẩm vệ sinh:`,products:i.filter(n=>n.category.includes("vệ sinh")||n.category.includes("rửa")||n.category.includes("hút bụi")||n.category.includes("thổi")),quickActions:[{label:"🚗 Máy rửa xe",value:"Máy rửa xe"},{label:"🌪️ Máy hút bụi",value:"Máy hút bụi"},{label:"💨 Máy thổi bụi",value:"Máy thổi bụi"}]};case"inverter":return{text:`🔄 Biến tần - Điều khiển động cơ thông minh!

 Điều chỉnh tốc độ linh hoạt
 Tiết kiệm điện năng tối đa
 Bảo vệ quá tải, chạy êm

Các sản phẩm biến tần:`,products:i.filter(n=>n.category.includes("Biến tần")||n.name.toLowerCase().includes("biến tần")),quickActions:[{label:"🔌 Điện công nghiệp",value:"Điện công nghiệp"},{label:"⚡ Động cơ điện",value:"Động cơ điện"}]};case"contactor":return{text:`🔌 Khởi động từ - Điều khiển động cơ an toàn!

 Định mức đa dạng
 Thương hiệu uy tín
 Tuổi thọ cao, an toàn

Các sản phẩm khởi động từ:`,products:i.filter(n=>n.category.includes("Khởi động từ")||n.name.toLowerCase().includes("khởi động từ")),quickActions:[{label:"🔌 Điện công nghiệp",value:"Điện công nghiệp"},{label:"⚡ Động cơ điện",value:"Động cơ điện"}]};case"breaker":return{text:`⚡ Aptomat - Bảo vệ an toàn điện!

 Cắt nhanh khi quá tải
 Ngắn mạch tự động
 Tiêu chuẩn IEC

Các sản phẩm aptomat:`,products:i.filter(n=>n.category.includes("APTOPMAT")||n.name.toLowerCase().includes("aptomat")),quickActions:[{label:"🔌 Điện công nghiệp",value:"Điện công nghiệp"},{label:"🔄 Biến tần",value:"Biến tần"}]};case"electrical":return{text:`🔌 Điện công nghiệp - Dân dụng!

 Khởi động từ, Aptomat
 Biến tần điều khiển
 Đầy đủ thiết bị điều khiển

Các sản phẩm điện công nghiệp:`,products:i.filter(n=>n.category.includes("Khởi động từ")||n.category.includes("APTOPMAT")||n.category.includes("Biến tần")||n.name.toLowerCase().includes("điện")),quickActions:[{label:"🔄 Biến tần",value:"Biến tần"},{label:"🔌 Khởi động từ",value:"Khởi động từ"},{label:"⚡ Aptomat",value:"Aptomat"}]};case"drill":return{text:`🔨 Máy khoan - Công cụ đắc lực!

 Khoan bê tông, gỗ, sắt
 Công suất mạnh mẽ
 Thương hiệu uy tín

Các sản phẩm máy khoan:`,products:i.filter(n=>n.category.includes("cầm tay")||n.name.toLowerCase().includes("khoan")),quickActions:[{label:"🔧 Công cụ",value:"Công cụ dụng cụ"},{label:"⚙️ Máy mài",value:"Máy mài"}]};case"grinder":return{text:`⚙️ Máy mài góc - Cắt & mài chuyên nghiệp!

 Cắt kim loại, đá, gạch
 Tốc độ cao, hiệu quả
 Thiết kế ergonomic

Các sản phẩm máy mài:`,products:i.filter(n=>n.name.toLowerCase().includes("mài")),quickActions:[{label:"🔧 Công cụ",value:"Công cụ dụng cụ"},{label:"🔨 Máy khoan",value:"Máy khoan"}]};case"compressor":return{text:`💨 Máy nén khí - Cung cấp khí nén mạnh mẽ!

 Bình chứa lớn
 Áp suất cao
 Phù hợp xưởng, garage

Các sản phẩm máy nén khí:`,products:i.filter(n=>n.category.includes("nén khí")||n.name.toLowerCase().includes("nén khí")),quickActions:[{label:"🔧 Công cụ",value:"Công cụ dụng cụ"},{label:"🔨 Dụng cụ cầm tay",value:"Máy khoan"}]};case"tools":return{text:`🔧 Công cụ & Dụng cụ - Đầy đủ trang thiết bị!

 Máy khoan, mài, cắt
 Máy nén khí
 Dụng cụ cầm tay & để bàn

Các sản phẩm công cụ:`,products:i.filter(n=>n.category.includes("Dụng cụ")||n.category.includes("nén khí")||n.name.toLowerCase().includes("máy khoan")||n.name.toLowerCase().includes("máy mài")),quickActions:[{label:"🔨 Máy khoan",value:"Máy khoan"},{label:"⚙️ Máy mài",value:"Máy mài"},{label:"💨 Máy nén khí",value:"Máy nén khí"}]};case"hydraulic":return{text:`🔧 Bơm thủy lực - Phụ tùng chuyên dụng!

 Cho máy xúc, máy ủi
 Áp suất cao, bền bỉ
 Thay thế chính hãng

Các sản phẩm thủy lực:`,products:i.filter(n=>n.category.includes("thủy lực")||n.name.toLowerCase().includes("thủy lực")),quickActions:[{label:"🚜 Máy công trình",value:"Máy công trình"},{label:"🔧 Phụ tùng",value:"Phụ tùng máy công trình"}]};case"construction":return{text:`🚜 Phụ tùng máy công trình - Chuyên nghiệp!

 Bơm thủy lực
 Máy khởi động 24V
 Phụ tùng chính hãng

Các sản phẩm cho máy công trình:`,products:i.filter(n=>n.category.includes("thủy lực")||n.category.includes("máy xúc")||n.name.toLowerCase().includes("máy xúc")||n.name.toLowerCase().includes("công trình")),quickActions:[{label:"🔧 Thủy lực",value:"Bơm thủy lực"},{label:"⚡ Động cơ",value:"Động cơ điện"}]};case"price":return{text:`💰 Các sản phẩm có giá tốt nhất!

 Giá cả phải chăng
 Chất lượng đảm bảo
 Bảo hành chính hãng

Top sản phẩm giá tốt:`,products:[...i].sort((n,o)=>n.price-o.price).slice(0,4),quickActions:[{label:"🏠 Bơm gia đình",value:"Máy bơm cho gia đình"},{label:"⚡ Công suất cao",value:"Máy bơm công suất lớn"}]};case"power":return{text:`⚡ Các máy bơm công suất lớn nhất!

 Công suất cực mạnh
 Xử lý lưu lượng cao
 Phù hợp công nghiệp nặng

Top máy bơm công suất cao:`,products:[...i].sort((n,o)=>parseInt(o.specs.power)-parseInt(n.specs.power)).slice(0,4),quickActions:[{label:"🏭 Bơm công nghiệp",value:"Máy bơm công nghiệp"},{label:"💰 So sánh giá",value:"Máy bơm giá rẻ"}]};case"all":return{text:`📋 Tất cả sản phẩm của chúng tôi!

Chúng tôi có đầy đủ các loại máy bơm:
 Máy bơm gia đình & công nghiệp
 Máy bơm chìm & ly tâm
 Máy bơm hóa chất & định lượng

Một số sản phẩm nổi bật:`,products:i.slice(0,6),quickActions:[{label:"🏠 Bơm gia đình",value:"Máy bơm cho gia đình"},{label:"🏭 Bơm công nghiệp",value:"Máy bơm công nghiệp"},{label:"💰 Giá tốt nhất",value:"Máy bơm giá rẻ"}]};case"compare":return{text:`🔍 So sánh sản phẩm!

Tôi có thể giúp bạn so sánh:
 Giá cả các sản phẩm
 Công suất và lưu lượng
 Tính năng và ứng dụng

Bạn muốn so sánh loại máy bơm nào?`,products:i.slice(0,4),quickActions:[{label:"💰 So sánh giá",value:"Máy bơm giá rẻ"},{label:"⚡ So sánh công suất",value:"Máy bơm công suất lớn"}]};case"consult":return{text:`💡 Tôi rất vui được tư vấn!

Để tư vấn chính xác nhất, hãy cho tôi biết:
 Mục đích sử dụng (gia đình/công nghiệp)
 Loại nước cần bơm
 Lưu lượng và cột áp mong muốn
 Ngân sách của bạn

Hoặc bạn có thể chọn nhanh:`,quickActions:[{label:"🏠 Gia đình",value:"Máy bơm cho gia đình"},{label:"🏭 Công nghiệp",value:"Máy bơm công nghiệp"},{label:"🌊 Giếng khoan",value:"Máy bơm giếng khoan"},{label:"💧 Nước thải",value:"Máy bơm nước thải"}]};default:return{text:`🤔 Tôi có thể giúp bạn tìm máy bơm phù hợp!

Chúng tôi chuyên cung cấp:
 Máy bơm gia đình & công nghiệp
 Máy bơm nước sạch & nước thải
 Máy bơm hóa chất & định lượng

Hãy cho tôi biết bạn cần loại nào nhé! 😊`,products:i.slice(0,4),quickActions:[{label:"🏠 Gia đình",value:"Máy bơm cho gia đình"},{label:"🏭 Công nghiệp",value:"Máy bơm công nghiệp"},{label:"💰 Giá tốt",value:"Máy bơm giá rẻ"},{label:"🔍 Xem tất cả",value:"Xem tất cả sản phẩm"}]}}},a=c=>{const e=c||h;if(!e.trim())return;const r={id:Date.now().toString(),text:e,sender:"user",timestamp:new Date};d(s=>[...s,r]),m(""),y(!0),setTimeout(()=>{const s=P(e),v={id:(Date.now()+1).toString(),text:s.text,sender:"bot",timestamp:new Date,suggestedProducts:s.products,quickActions:s.quickActions};d(x=>[...x,v]),y(!1)},1e3+Math.random()*1e3)},j=c=>{c.key==="Enter"&&!c.shiftKey&&(c.preventDefault(),a())},q=c=>new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(c),N=["Máy bơm cho gia đình","Máy bơm công nghiệp","Máy bơm giếng khoan","Máy bơm giá rẻ"];return t.jsxs("div",{className:"flex flex-col h-full bg-white rounded-t-2xl md:rounded-2xl shadow-2xl",children:[t.jsxs("div",{className:"bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl md:rounded-t-2xl flex items-center justify-between",children:[t.jsxs("div",{className:"flex items-center gap-3",children:[t.jsx("div",{className:"w-10 h-10 bg-white/20 rounded-full flex items-center justify-center",children:t.jsx(g,{className:"w-6 h-6"})}),t.jsxs("div",{children:[t.jsx("div",{children:"Trợ lý AI"}),t.jsx("div",{className:"text-xs text-blue-100",children:"Tư vấn máy bơm"})]})]}),t.jsx("button",{onClick:k,className:"p-2 hover:bg-white/10 rounded-lg transition-colors",children:t.jsx(A,{className:"w-5 h-5"})})]}),t.jsxs("div",{className:"flex-1 overflow-y-auto p-4 space-y-4",children:[u.map(c=>t.jsxs("div",{children:[t.jsxs("div",{className:`flex gap-3 ${c.sender==="user"?"flex-row-reverse":""}`,children:[t.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${c.sender==="bot"?"bg-blue-100 text-blue-600":"bg-gray-200 text-gray-600"}`,children:c.sender==="bot"?t.jsx(g,{className:"w-5 h-5"}):t.jsx(B,{className:"w-5 h-5"})}),t.jsx("div",{className:`max-w-[75%] rounded-2xl px-4 py-2.5 ${c.sender==="bot"?"bg-gray-100 text-gray-800":"bg-blue-600 text-white"}`,children:t.jsx("p",{className:"text-sm whitespace-pre-line",children:c.text})})]}),c.quickActions&&c.quickActions.length>0&&t.jsx("div",{className:"ml-11 mt-3 flex flex-wrap gap-2",children:c.quickActions.map((e,r)=>t.jsx("button",{onClick:()=>a(e.value),className:"text-sm bg-white border border-blue-200 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-colors",children:e.label},r))}),c.suggestedProducts&&c.suggestedProducts.length>0&&t.jsx("div",{className:"ml-11 mt-3 space-y-2",children:c.suggestedProducts.map(e=>t.jsx("button",{onClick:()=>M(e),className:"w-full bg-white border border-gray-200 rounded-lg p-3 hover:border-blue-500 hover:shadow-md transition-all text-left",children:t.jsxs("div",{className:"flex gap-3",children:[t.jsx("img",{src:e.image,alt:e.name,className:"w-16 h-16 object-cover rounded"}),t.jsxs("div",{className:"flex-1 min-w-0",children:[t.jsx("div",{className:"text-sm mb-1 truncate",children:e.name}),t.jsx("div",{className:"text-xs text-gray-500 mb-1",children:e.category}),t.jsx("div",{className:"text-sm text-blue-600",children:q(e.price)})]})]})},e.id))})]},c.id)),b&&t.jsxs("div",{className:"flex gap-3",children:[t.jsx("div",{className:"w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0",children:t.jsx(g,{className:"w-5 h-5"})}),t.jsx("div",{className:"bg-gray-100 rounded-2xl px-4 py-3",children:t.jsxs("div",{className:"flex gap-1",children:[t.jsx("div",{className:"w-2 h-2 bg-gray-400 rounded-full animate-bounce",style:{animationDelay:"0ms"}}),t.jsx("div",{className:"w-2 h-2 bg-gray-400 rounded-full animate-bounce",style:{animationDelay:"150ms"}}),t.jsx("div",{className:"w-2 h-2 bg-gray-400 rounded-full animate-bounce",style:{animationDelay:"300ms"}})]})})]}),t.jsx("div",{ref:p})]}),u.length<=2&&t.jsxs("div",{className:"px-4 pb-3",children:[t.jsx("div",{className:"text-xs text-gray-500 mb-2",children:"Câu hỏi gợi ý:"}),t.jsx("div",{className:"flex flex-wrap gap-2",children:N.map(c=>t.jsx("button",{onClick:()=>a(c),className:"text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors",children:c},c))})]}),t.jsx("div",{className:"p-4 border-t",children:t.jsxs("div",{className:"flex gap-2",children:[t.jsx("input",{type:"text",value:h,onChange:c=>m(c.target.value),onKeyPress:j,placeholder:"Nhập câu hỏi của bạn...",className:"flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"}),t.jsx("button",{onClick:()=>a(),disabled:!h.trim(),className:"bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed",children:t.jsx(T,{className:"w-5 h-5"})})]})})]})}export{sn as Chatbot};
