const COLORS = ['#ff6b6b','#4ecdc4','#ffd93d','#6c5ce7','#1dd1a1','#ff9f43','#54a0ff','#ee5a6f','#00d2d3','#feca57'];
function colorFor(i) { return COLORS[i % COLORS.length]; }

const ABC_LIST = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => ({
  label: l,
  speak: l
}));

const HIJAIYAH_LIST = [
  { label: 'ا', speak: 'alif' },
  { label: 'ب', speak: 'ba' },
  { label: 'ت', speak: 'ta' },
  { label: 'ث', speak: 'tsa' },
  { label: 'ج', speak: 'jim' },
  { label: 'ح', speak: 'ha' },
  { label: 'خ', speak: 'kha' },
  { label: 'د', speak: 'dal' },
  { label: 'ذ', speak: 'dzal' },
  { label: 'ر', speak: 'ra' },
  { label: 'ز', speak: 'zai' },
  { label: 'س', speak: 'sin' },
  { label: 'ش', speak: 'syin' },
  { label: 'ص', speak: 'shad' },
  { label: 'ض', speak: 'dhad' },
  { label: 'ط', speak: 'tha' },
  { label: 'ظ', speak: 'zha' },
  { label: 'ع', speak: 'ain' },
  { label: 'غ', speak: 'ghain' },
  { label: 'ف', speak: 'fa' },
  { label: 'ق', speak: 'qaf' },
  { label: 'ك', speak: 'kaf' },
  { label: 'ل', speak: 'lam' },
  { label: 'م', speak: 'mim' },
  { label: 'ن', speak: 'nun' },
  { label: 'و', speak: 'wawu' },
  { label: 'ه', speak: 'ha' },
  { label: 'ء', speak: 'hamzah' },
  { label: 'ي', speak: 'ya' }
];

const HEWAN_LIST = [
  { emoji: '🐶', label: 'Anjing', speak: 'Anjing' },
  { emoji: '🐱', label: 'Kucing', speak: 'Kucing' },
  { emoji: '🐮', label: 'Sapi', speak: 'Sapi' },
  { emoji: '🐷', label: 'Babi', speak: 'Babi' },
  { emoji: '🐔', label: 'Ayam', speak: 'Ayam' },
  { emoji: '🐴', label: 'Kuda', speak: 'Kuda' },
  { emoji: '🐑', label: 'Domba', speak: 'Domba' },
  { emoji: '🐰', label: 'Kelinci', speak: 'Kelinci' },
  { emoji: '🐻', label: 'Beruang', speak: 'Beruang' },
  { emoji: '🐸', label: 'Katak', speak: 'Katak' },
  { emoji: '🦁', label: 'Singa', speak: 'Singa' },
  { emoji: '🐘', label: 'Gajah', speak: 'Gajah' },
  { emoji: '🐵', label: 'Monyet', speak: 'Monyet' },
  { emoji: '🐢', label: 'Kura-kura', speak: 'Kura kura' },
  { emoji: '🐠', label: 'Ikan', speak: 'Ikan' },
  { emoji: '🦋', label: 'Kupu-kupu', speak: 'Kupu kupu' },
  { emoji: '🐝', label: 'Lebah', speak: 'Lebah' },
  { emoji: '🦆', label: 'Bebek', speak: 'Bebek' }
];

const ANGKA_LIST = [
  { emoji: '1️⃣', label: 'Satu', speak: 'Satu' },
  { emoji: '2️⃣', label: 'Dua', speak: 'Dua' },
  { emoji: '3️⃣', label: 'Tiga', speak: 'Tiga' },
  { emoji: '4️⃣', label: 'Empat', speak: 'Empat' },
  { emoji: '5️⃣', label: 'Lima', speak: 'Lima' },
  { emoji: '6️⃣', label: 'Enam', speak: 'Enam' },
  { emoji: '7️⃣', label: 'Tujuh', speak: 'Tujuh' },
  { emoji: '8️⃣', label: 'Delapan', speak: 'Delapan' },
  { emoji: '9️⃣', label: 'Sembilan', speak: 'Sembilan' },
  { emoji: '🔟', label: 'Sepuluh', speak: 'Sepuluh' }
];

const PLANET_LIST = [
  { emoji: '☀️', label: 'Matahari', speak: 'Matahari' },
  { emoji: '🌍', label: 'Bumi', speak: 'Bumi' },
  { emoji: '🌕', label: 'Bulan', speak: 'Bulan' },
  { emoji: '🪐', label: 'Saturnus', speak: 'Saturnus' },
  { emoji: '⭐', label: 'Bintang', speak: 'Bintang' },
  { emoji: '☁️', label: 'Awan', speak: 'Awan' },
  { emoji: '🌈', label: 'Pelangi', speak: 'Pelangi' },
  { emoji: '🚀', label: 'Roket', speak: 'Roket' }
];
