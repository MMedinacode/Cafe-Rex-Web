/* ============================================================
   FOTOS Y LOGO — PENDIENTES (placeholder temporal)
   ============================================================
   El usuario aún no ha dejado fotos reales en fotos/. Mientras tanto
   se usan fotos de stock de Unsplash (nunca fotos reales de otra
   cafetería del portafolio) para que el sitio no se vea vacío.
   Reemplazar por las reales apenas lleguen (logo real + fotos del
   local) — ver instrucciones en la bitácora del proyecto. */
const LOGO_SRC = 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&h=200&fit=crop&q=80';
const HERO_SRC = 'https://images.unsplash.com/photo-1481833761820-0509d3217039?w=1600&q=80';
const GAL_UNO_SRC = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80';
const GAL_DOS_SRC = 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80';
const GAL_TRES_SRC = 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80';

document.getElementById('logoNav').src = LOGO_SRC;
document.getElementById('logoHero').src = LOGO_SRC;
document.getElementById('logoFooter').src = LOGO_SRC;
document.getElementById('heroPhoto').src = HERO_SRC;
document.getElementById('galUno').src = GAL_UNO_SRC;
document.getElementById('galDos').src = GAL_DOS_SRC;
document.getElementById('galTres').src = GAL_TRES_SRC;

/* ============================================================
   CARTA — productos reales (nombres reales de la carta fotografiada
   en Google Maps, foto de agosto-2019). Precios NO vigentes por la
   antigüedad de la foto — todo se muestra como "Consultar".
   ============================================================ */
const MENU = {
  'Café y bebidas': [
    { n: 'Café frío', d: 'Preparación fría de la carta clásica del local.' },
    { n: 'Cortado sin lactosa', d: 'Opción sin lactosa disponible.' },
    { n: 'Leche sola', d: '' },
    { n: 'Frappe', d: 'Café frappé clásico.' },
    { n: 'Frappe crema', d: 'Versión con crema.' },
    { n: 'Jarabes', d: 'Saborizantes a elección para tu café.' },
    { n: 'Agua mineral', d: '' },
    { n: 'Red Bull', d: '' },
  ],
  'Para acompañar': [
    { n: 'Medialunas', d: 'Medialunas argentinas, mencionadas también en su Instagram.' },
    { n: 'Sándwich artesanal', d: 'Sándwich de la carta del local.' },
    { n: 'Sándwich ave palta', d: 'Ave con palta.' },
    { n: 'Tortas', d: 'Pastelería variada — consultar disponibilidad del día.' },
  ],
};

const menuTabsEl = document.getElementById('menuTabs');
const menuPanelsEl = document.getElementById('menuPanels');
const categorias = Object.keys(MENU);

categorias.forEach((cat, i) => {
  const tabBtn = document.createElement('button');
  tabBtn.className = 'menu-tab-btn' + (i === 0 ? ' active' : '');
  tabBtn.textContent = cat;
  tabBtn.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
    tabBtn.classList.add('active');
    document.getElementById('panel-' + i).classList.add('active');
  });
  menuTabsEl.appendChild(tabBtn);

  const panel = document.createElement('div');
  panel.className = 'menu-panel' + (i === 0 ? ' active' : '');
  panel.id = 'panel-' + i;
  const grid = document.createElement('div');
  grid.className = 'menu-grid';
  MENU[cat].forEach(item => {
    const row = document.createElement('div');
    row.className = 'menu-item';
    row.innerHTML = `
      <div class="menu-item-text">
        <p class="menu-item-name">${item.n}</p>
        ${item.d ? `<p class="menu-item-desc">${item.d}</p>` : ''}
      </div>
      <span class="menu-item-price">Consultar</span>
    `;
    grid.appendChild(row);
  });
  panel.appendChild(grid);
  menuPanelsEl.appendChild(panel);
});

/* ============================================================
   HORARIO EN VIVO — real, verificado en Google Maps
   Lunes a viernes 8:00–15:00, sábado y domingo cerrado.
   ============================================================ */
(function () {
  const now = new Date();
  const day = now.getDay(); // 0=domingo
  const minutes = now.getHours() * 60 + now.getMinutes();
  const openMin = 8 * 60;
  const closeMin = 15 * 60;
  const isWeekday = day >= 1 && day <= 5;
  const isOpen = isWeekday && minutes >= openMin && minutes < closeMin;

  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const visitStatus = document.getElementById('visit-status');

  if (isOpen) {
    statusDot.classList.remove('closed');
    statusText.textContent = 'Abierto ahora · cierra 15:00';
    visitStatus.textContent = 'Abierto ahora — cierra a las 15:00';
  } else {
    statusDot.classList.add('closed');
    statusText.textContent = isWeekday ? 'Cerrado ahora · abre 8:00' : 'Cerrado · abre el lunes 8:00';
    visitStatus.textContent = isWeekday ? 'Cerrado ahora — abre a las 8:00' : 'Cerrado hoy — abre el lunes a las 8:00';
  }
})();

/* ============================================================
   NAVEGACIÓN SPA POR PESTAÑAS
   ============================================================ */
function goToTab(tabName) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
  const panel = document.querySelector(`[data-tab-panel="${tabName}"]`);
  const link = document.querySelector(`.nav-link[data-tab="${tabName}"]`);
  if (panel) panel.classList.add('active');
  if (link) link.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  runReveal();
}

document.querySelectorAll('[data-tab]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    goToTab(el.getAttribute('data-tab'));
    navLinks.classList.remove('open');
  });
});

/* ---------- Menú hamburguesa ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

/* ---------- Header sólido siempre (fondo con foto solo en hero) ---------- */
const siteHeader = document.getElementById('siteHeader');

/* ---------- Scroll reveal ---------- */
function runReveal() {
  const els = document.querySelectorAll('.reveal:not(.in)');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}
runReveal();

/* ---------- Loader breve ---------- */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 350);
});
