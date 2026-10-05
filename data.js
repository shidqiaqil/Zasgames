const COLORS = ['#ff6b6b','#4ecdc4','#ffd93d','#6c5ce7','#1dd1a1','#ff9f43','#54a0ff','#ee5a6f','#00d2d3','#feca57'];
function colorFor(i) { return COLORS[i % COLORS.length]; }

const ABC_LIST = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => ({ label: l, speak: l }));

const HIJAIYAH_LIST = [
  { label: 'ا', speak: 'alif' }, { label: 'ب', speak: 'ba' }, { label: 'ت', speak: 'ta' },
  { label: 'ث', speak: 'tsa' }, { label: 'ج', speak: 'jim' }, { label: 'ح', speak: 'ha' },
  { label: 'خ', speak: 'kho' }, { label: 'د', speak: 'dal' }, { label: 'ذ', speak: 'dzal' },
  { label: 'ر', speak: 'ro' }, { label: 'ز', speak: 'zai' }, { label: 'س', speak: 'sin' },
  { label: 'ش', speak: 'syin' }, { label: 'ص', speak: 'shod' }, { label: 'ض', speak: 'dhod' },
  { label: 'ط', speak: 'tho' }, { label: 'ظ', speak: 'zho' }, { label: 'ع', speak: 'ain' },
  { label: 'غ', speak: 'ghoin' }, { label: 'ف', speak: 'fa' }, { label: 'ق', speak: 'qof' },
  { label: 'ك', speak: 'kaf' }, { label: 'ل', speak: 'lam' }, { label: 'م', speak: 'mim' },
  { label: 'ن', speak: 'nun' }, { label: 'و', speak: 'wawu' }, { label: 'ه', speak: 'ha' },
  { label: 'ء', speak: 'hamzah' }, { label: 'ي', speak: 'ya' }
];

const HEWAN_LIST = [
  { emoji: '🐱', name: 'Kucing', sound: 'meong meong' },
  { emoji: '🐶', name: 'Anjing', sound: 'guk guk' },
  { emoji: '🐮', name: 'Sapi', sound: 'mooo' },
  { emoji: '🐔', name: 'Ayam', sound: 'kukuruyuk' },
  { emoji: '🦆', name: 'Bebek', sound: 'kwek kwek' },
  { emoji: '🐐', name: 'Kambing', sound: 'mbeeek' },
  { emoji: '🐸', name: 'Katak', sound: 'kwok kwok' },
  { emoji: '🦁', name: 'Singa', sound: 'aum' },
  { emoji: '🐘', name: 'Gajah', sound: 'ngoeeek' },
  { emoji: '🐵', name: 'Monyet', sound: 'uu aa aa' },
  { emoji: '🐴', name: 'Kuda', sound: 'hiiiihiii' },
  { emoji: '🐝', name: 'Lebah', sound: 'nguuung' },
  { emoji: '🐰', name: 'Kelinci', sound: 'hop hop' },
  { emoji: '🐟', name: 'Ikan', sound: 'blub blub' }
];

const PLANET_LIST = [
  { name: 'Merkurius', color: '#b0a7a0', size: 14 },
  { name: 'Venus', color: '#e8c07a', size: 20 },
  { name: 'Bumi', color: '#4b8bf5', size: 22 },
  { name: 'Mars', color: '#e2583e', size: 18 },
  { name: 'Yupiter', color: '#d9a066', size: 38 },
  { name: 'Saturnus', color: '#e9d18b', size: 32, ring: true },
  { name: 'Uranus', color: '#7fe0e0', size: 26 },
  { name: 'Neptunus', color: '#4a64e8', size: 25 }
];
