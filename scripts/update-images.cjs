const fs = require('fs');

// 1. Update dongyin-complete-120.ts
let c1 = fs.readFileSync('src/app/data/dongyin-complete-120.ts', 'utf-8');
c1 = c1.replace(/const qsImageWithFloat = '.*?';/, "const qsImageWithFloat = '/dongyin-images/qs_with_float.jpg';");
c1 = c1.replace(/const qsImageNoFloat = '.*?';/, "const qsImageNoFloat = '/dongyin-images/qs_no_float.jpg';");

// WS Series
c1 = c1.replace(/export const wsSeries: Product\[\] = \[([\s\S]*?)\];/m, (match) => {
  return match.replace(/https:\/\/images\.unsplash\.com\/photo-1607400201889-565b1ee75f8e\?w=800/g, '/dongyin-images/ws_pump.jpg');
});

// WQ Series
c1 = c1.replace(/export const wqSeries: Product\[\] = \[([\s\S]*?)\];/m, (match) => {
  return match.replace(/https:\/\/images\.unsplash\.com\/photo-1607400201889-565b1ee75f8e\?w=800/g, '/dongyin-images/wq_pump.jpg');
});

// TD Series
c1 = c1.replace(/export const tdSeries: Product\[\] = \[([\s\S]*?)\];/m, (match) => {
  return match.replace(/https:\/\/images\.unsplash\.com\/photo-1581092160607-ee22621dd758\?w=800/g, '/dongyin-images/td_box.jpg');
});
fs.writeFileSync('src/app/data/dongyin-complete-120.ts', c1, 'utf-8');

// 2. Update dongyin-complete-part2.ts
let c2 = fs.readFileSync('src/app/data/dongyin-complete-part2.ts', 'utf-8');

// SD Series
c2 = c2.replace(/export const sdSeries: Product\[\] = \[([\s\S]*?)\];/m, (match) => {
  let updated = match.replace(/name: 'Bơm Hỏa Tiễn 2SDM([\s\S]*?)image: '.*?'/g, "name: 'Bơm Hỏa Tiễn 2SDM$1image: '/dongyin-images/sd_pump_2sdm.jpg'");
  updated = updated.replace(/name: 'Bơm Hỏa Tiễn 2\.5SDM([\s\S]*?)image: '.*?'/g, "name: 'Bơm Hỏa Tiễn 2.5SDM$1image: '/dongyin-images/sd_pump_2_5sdm.jpg'");
  updated = updated.replace(/name: 'Bơm Hỏa Tiễn 3SDM([\s\S]*?)image: '.*?'/g, "name: 'Bơm Hỏa Tiễn 3SDM$1image: '/dongyin-images/sd_pump_3sdm.jpg'");
  updated = updated.replace(/https:\/\/images\.unsplash\.com\/photo-1625265524815-f099f9a0b680\?w=800/g, '/dongyin-images/sd_pump_4sdm.jpg');
  return updated;
});

// 4SP Series
c2 = c2.replace(/export const sp4Series: Product\[\] = \[([\s\S]*?)\];/m, (match) => {
  return match.replace(/https:\/\/images\.unsplash\.com\/photo-1625265524815-f099f9a0b680\?w=800/g, '/dongyin-images/sp4_pump.jpg');
});

// 6SR/6SP Series
c2 = c2.replace(/export const sr6Series: Product\[\] = \[([\s\S]*?)\];/m, (match) => {
  return match.replace(/https:\/\/images\.unsplash\.com\/photo-1625265524815-f099f9a0b680\?w=800/g, '/dongyin-images/sr6_pump.jpg');
});

// 4DP Solar
c2 = c2.replace(/export const dp4Series: Product\[\] = \[([\s\S]*?)\];/m, (match) => {
  return match.replace(/https:\/\/images\.unsplash\.com\/photo-1509391365360-2e959784a276\?w=800/g, '/dongyin-images/solar_4dp.jpg');
});
fs.writeFileSync('src/app/data/dongyin-complete-part2.ts', c2, 'utf-8');

console.log('Successfully updated product files with local image URLs!');
