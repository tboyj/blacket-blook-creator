const imageCache = {};

function loadImage(src) {
  if (imageCache[src]) return Promise.resolve(imageCache[src]);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload  = () => { imageCache[src] = img; resolve(img); };
    img.onerror = reject;
    img.src = src;
  });
}

function getItem(cat, id) {
  return ITEMS[cat].find(i => i.id === id);
}

function renderPanel(cat) {
  const panel = document.getElementById('items-panel');
  panel.innerHTML = '';

  ITEMS[cat].forEach(item => {
    const isNone     = item.id === 'none';
    const isSelected = state[cat] === item.id;

    const card = document.createElement('div');
    card.className = 'item-card'
      + (isNone     ? ' none-card' : '')
      + (isSelected ? ' selected'  : '');

    card.innerHTML = isNone
      ? `<span class="item-none-x">✕</span>
         <span class="item-name">None</span>`
      : `<img src="${item.src}" class="item-preview-img" alt="${item.label}"
             style="width:50px;height:50px;object-fit:contain;object-position:center;">
         <span class="item-name">${item.label}</span>`;

    card.addEventListener('click', () => {
      state[cat] = item.id;
      renderPanel(cat);
      renderBlook();
    });

    panel.appendChild(card);
  });
}

async function renderBlook() {
  const canvas = document.getElementById('blook-canvas');
  const ctx    = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const layers = ['body', 'face', 'clothes', 'hat', 'accessory'];

  for (const cat of layers) {
    const item = getItem(cat, state[cat]);
    if (item && item.src) {
      const img = await loadImage(item.src);
      ctx.drawImage(img, 0, 0, W, H);
    }
  }
}