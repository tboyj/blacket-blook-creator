// ── Tab switching ──────────────────────────────────────────────
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    currentCat = btn.dataset.cat;
    renderPanel(currentCat);
  });
});

// ── Dropdown toggle ────────────────────────────────────────────
document.getElementById('save-btn').addEventListener('click', () => {
  document.getElementById('dropdown-menu').classList.toggle('open');
});

document.addEventListener('click', e => {
  if (!document.getElementById('export-dropdown').contains(e.target)) {
    document.getElementById('dropdown-menu').classList.remove('open');
  }
});

function closeDropdown() {
  document.getElementById('dropdown-menu').classList.remove('open');
}

// ── Save (download JSON) ───────────────────────────────────────
document.getElementById('btn-save').addEventListener('click', () => {
  const save = {
    version:   1,
    timestamp: new Date().toISOString(),
    state:     { ...state },
  };
  const blob = new Blob([JSON.stringify(save, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.download = `blook-save-${Date.now()}.json`;
  link.href = URL.createObjectURL(blob);
  link.click();
  closeDropdown();
});

// ── Load/Import JSON ───────────────────────────────────────────
document.getElementById('btn-load').addEventListener('click', () => {
  const input = document.createElement('input');
  input.type   = 'file';
  input.accept = '.json,application/json';
  input.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener('load', ev => {
      try {
        const save = JSON.parse(ev.target.result);
        if (!save.state) throw new Error();
        Object.assign(state, save.state);
        renderPanel(currentCat);
        renderBlook();
      } catch {
        alert('Invalid save file.');
      }
    });
    reader.readAsText(file);
  });
  input.click();
  closeDropdown();
});

// ── Export as PNG ──────────────────────────────────────────────
document.getElementById('btn-export-png').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'my-blook.png';
  link.href = document.getElementById('blook-canvas').toDataURL('image/png');
  link.click();
  closeDropdown();
});

// ── Background image upload ────────────────────────────────────
document.getElementById('bg-btn').addEventListener('click', () => {
  document.getElementById('file-input').click();
});
document.getElementById('file-input').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  document.getElementById('bg-layer').style.backgroundImage = `url(${URL.createObjectURL(file)})`;
});

// ── Init ───────────────────────────────────────────────────────
renderPanel('body');
renderBlook();