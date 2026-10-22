/* ==========================================================================
   CECILIA TEDIN - PROPUESTA INTEGRAL (FRONTEND INTERACTIVO CON MOCK DATA)
   Lógica reactiva para las 3 ventanas:
   1. Portal del Cliente (Landing & Catálogo Curado)
   2. Cuestionario Rápido para Vender (LIVE TikTok / Redes)
   3. Panel Administrativo Formal (Backoffice & POS)
   ========================================================================== */

(function () {
  'use strict';

  // Rutas de fotos auténticas de la marca
  const ASSETS = {
    logo: 'CECILIA TEDIN LIVE · Pedidos por WhatsApp_files/57936c4e7aa42d4fdf61e33615a19e2525ccbde2e2fb24cf69b07554b99a0174.jpg',
    hero: 'CECILIA TEDIN LIVE · Pedidos por WhatsApp_files/544a0b47c6b0a3c186eeda32c60626117b45296deead81df6f3b6f3815b29cbf.jpg',
    sirena: 'CECILIA TEDIN LIVE · Pedidos por WhatsApp_files/f4c0fe6a8f3e641aff2db9bd1064b3442eb94ddd417f36e74c9a98f65db6d969.jpg',
    blusa: 'CECILIA TEDIN LIVE · Pedidos por WhatsApp_files/c123aaf08708fcde4af84678ebd7915f05e5e96ee21de78330e85b6c45153a25.jpg',
    noir: 'CECILIA TEDIN LIVE · Pedidos por WhatsApp_files/ef42a0240a0854d562fb3b6ae86e91e14dc076273c2a5534e999609850b9209c.jpg',
    tapado: 'CECILIA TEDIN LIVE · Pedidos por WhatsApp_files/48207bd6d008c3f2eb29a2d7cb158cd8a3143b07f69ee2133d9d5ab921d43c55.jpg'
  };

  // Base de Datos en Memoria (Mock Data)
  const INITIAL_PRODUCTS = [
    {
      id: 1,
      sku: 'VES-SIR-BUR',
      name: 'Vestido Gala Sirena Burdeos',
      category: 'vestidos',
      categoryLabel: 'Vestidos de Gala',
      price: 420,
      image: ASSETS.sirena,
      description: 'Silueta entallada con caída fluida en terciopelo italiano. Acabado artesanal con escote estructurado y detalle drapeado en cintura.',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: [
        { name: 'Burdeos / Vino', hex: '#6a2939' },
        { name: 'Negro Azabache', hex: '#1c1f18' }
      ],
      stockFisico: 6,
      reservas: 1, // 1 reservada en pedido pendiente
      tag: 'Colección Gala',
      isLive: false
    },
    {
      id: 2,
      sku: 'CON-SAS-OLI',
      name: 'Conjunto Sastrero Lino Oliva',
      category: 'conjuntos',
      categoryLabel: 'Conjuntos Sastreros',
      price: 480,
      image: ASSETS.hero,
      description: 'Prenda insignia de la temporada. Blazer estructurado con hombreras suaves y pantalón palazzo de tiro alto confeccionado en puro lino.',
      sizes: ['S', 'M', 'L'],
      colors: [
        { name: 'Oliva Silvestre', hex: '#464d35' },
        { name: 'Arena Natural', hex: '#ded8cb' }
      ],
      stockFisico: 9,
      reservas: 2,
      tag: 'Prenda LIVE Estrella',
      isLive: true
    },
    {
      id: 3,
      sku: 'BLU-KIM-SAT',
      name: 'Blusa Kimono Satén Champán',
      category: 'blusas',
      categoryLabel: 'Blusas & Tops',
      price: 260,
      image: ASSETS.blusa,
      description: 'Caída ligera con tacto sedoso premium, mangas kimono acampanadas y lazo de ajuste que resalta la cintura con elegancia sutil.',
      sizes: ['S', 'M', 'L'],
      colors: [
        { name: 'Champán Dorado', hex: '#d9cbb2' },
        { name: 'Blanco Nácar', hex: '#f7f6f2' }
      ],
      stockFisico: 12,
      reservas: 3,
      tag: 'Best Seller',
      isLive: false
    },
    {
      id: 4,
      sku: 'VES-NOI-LIM',
      name: 'Vestido Drapeado Noche Noir',
      category: 'edicion-live',
      categoryLabel: 'Edición Limitada LIVE',
      price: 390,
      image: ASSETS.noir,
      description: 'Corte asimétrico con drapeado lateral. Diseñado exclusivamente para ventas relámpago durante las transmisiones en vivo.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Noir Profundo', hex: '#181b14' },
        { name: 'Merlot Intenso', hex: '#521d28' }
      ],
      stockFisico: 4,
      reservas: 2, // Stock vendible = 2 (Crítico!)
      tag: 'Últimas 2 Unidades',
      isLive: true
    },
    {
      id: 5,
      sku: 'TAP-CAS-LAN',
      name: 'Tapado Estructurado Cachemira',
      category: 'abrigos',
      categoryLabel: 'Abrigos & Capas',
      price: 550,
      image: ASSETS.tapado,
      description: 'Confección en mezcla noble de cachemira y lana virgen. Solapas anchas y forrería interior en viscosa satinada con botonadura oculta.',
      sizes: ['S', 'M'],
      colors: [
        { name: 'Camel Clásico', hex: '#b39572' },
        { name: 'Marfil Nórdico', hex: '#ece9e0' }
      ],
      stockFisico: 5,
      reservas: 1,
      tag: 'Alta Costura',
      isLive: false
    }
  ];

  const INITIAL_ORDERS = [
    {
      id: 'CT-8041',
      date: 'Hoy, 20:45',
      channel: 'Compra rápida LIVE',
      channelKey: 'live',
      customer: 'Valeria Montero',
      phone: '+591 76543210',
      items: 'Conjunto Sastrero Lino Oliva (Talla M, Oliva)',
      total: 480,
      coupon: 'TIKTOK2X1 (-50% 2ª pza aplicada)',
      deliveryType: 'Delivery a Domicilio',
      deliveryAddress: 'Equipetrol Norte, Calle 7 #45 (Santa Cruz)',
      coords: '-17.7654, -63.1952',
      status: 'Registrado / Pendiente de cotización',
      statusKey: 'registrado',
      qrVoucher: 'Voucher no recibido aún',
      responsible: 'Sistema LIVE'
    },
    {
      id: 'CT-8040',
      date: 'Hoy, 19:15',
      channel: 'Tienda web',
      channelKey: 'web',
      customer: 'Camila Rojas Méndez',
      phone: '+591 71239874',
      items: 'Vestido Gala Sirena Burdeos (Talla S)',
      total: 445, // 420 + 25 delivery
      coupon: 'Ninguno',
      deliveryType: 'Delivery a Domicilio (Cotizado Bs. 25)',
      deliveryAddress: 'Av. Las Américas, Condominio Sevilla Casa 12',
      coords: '-17.7812, -63.1804',
      notes: 'Por favor entregar después de las 16:00 horas.',
      status: 'Cotización enviada',
      statusKey: 'cotizado',
      qrVoucher: 'Pendiente de transferencia',
      responsible: 'Carlos M.'
    },
    {
      id: 'CT-8039',
      date: 'Hoy, 18:30',
      channel: 'WhatsApp directo',
      channelKey: 'whatsapp',
      customer: 'Lucía Fernández S.',
      phone: '+591 70012456',
      items: 'Blusa Kimono Satén Champán (Talla M)',
      total: 260,
      coupon: 'Ninguno',
      deliveryType: 'Retiro en Showroom Local',
      deliveryAddress: 'Showroom Central Cecilia Tedin',
      coords: 'N/A (Retiro en local)',
      notes: 'Paso a recoger antes del mediodía.',
      status: 'Pendiente de pago',
      statusKey: 'pendiente-pago',
      qrVoucher: 'QR de pago enviado por chat',
      responsible: 'Andrea P.'
    },
    {
      id: 'CT-8038',
      date: 'Hoy, 16:10',
      channel: 'Compra rápida LIVE',
      channelKey: 'live',
      customer: 'Mariana Paz Barba',
      phone: '+591 78945612',
      items: 'Vestido Drapeado Noche Noir (Talla L)',
      total: 390,
      coupon: 'TIKTOK2X1',
      deliveryType: 'Delivery a Domicilio',
      deliveryAddress: 'Barrio Sirari, C. Los Claveles 180',
      coords: '-17.7701, -63.1895',
      notes: 'Llamar al llegar a la reja de la privada.',
      status: 'Pago confirmado',
      statusKey: 'pago-confirmado',
      qrVoucher: 'Comprobante QR Verificado por Cajero (Banco Mercantil #99482)',
      responsible: 'Carlos M.'
    },
    {
      id: 'CT-8037',
      date: 'Ayer, 21:00',
      channel: 'Tienda web',
      channelKey: 'web',
      customer: 'Sofía Justiniano',
      phone: '+591 72345678',
      items: 'Tapado Cachemira & Lana (Talla S, Camel)',
      total: 550,
      coupon: 'Ninguno',
      deliveryType: 'Retiro en Showroom Local',
      deliveryAddress: 'Showroom Central',
      coords: 'N/A',
      status: 'Preparando',
      statusKey: 'preparando',
      qrVoucher: 'QR Verificado',
      responsible: 'Andrea P.'
    },
    {
      id: 'CT-8036',
      date: 'Ayer, 17:40',
      channel: 'WhatsApp directo',
      channelKey: 'whatsapp',
      customer: 'Andrea Hurtado V.',
      phone: '+591 76098712',
      items: 'Conjunto Sastrero Lino Oliva (Talla S)',
      total: 505, // 480 + 25 delivery
      coupon: 'Ninguno',
      deliveryType: 'Delivery a Domicilio',
      deliveryAddress: 'Av. Beni entre 4to y 5to anillo',
      coords: '-17.7521, -63.1698',
      status: 'Enviado / Listo para recoger',
      statusKey: 'enviado',
      qrVoucher: 'QR Verificado',
      responsible: 'Carlos M.'
    },
    {
      id: 'CT-8035',
      date: 'Ayer, 14:20',
      channel: 'Local físico (POS)',
      channelKey: 'pos',
      customer: 'Venta Mostrador #109',
      phone: '+591 70000000',
      items: 'Blusa Kimono Satén Champán (Talla S)',
      total: 260,
      coupon: 'Descuento Mostrador (-0 Bs)',
      deliveryType: 'Entrega Inmediata Mostrador',
      deliveryAddress: 'Local Físico',
      coords: 'N/A',
      status: 'Finalizado',
      statusKey: 'finalizado',
      qrVoucher: 'Efectivo en Caja',
      responsible: 'Cajero POS 1'
    }
  ];

  const INITIAL_AUDIT_LOGS = [
    {
      timestamp: 'Hoy, 16:12',
      user: 'Carlos M. (Cajero)',
      action: 'Aprobación de Pago QR',
      detail: 'Pedido #CT-8038 verificado contra extracto Bancario (Bs. 390). Se convirtió reserva en salida definitiva de inventario.',
      module: 'Pedidos'
    },
    {
      timestamp: 'Hoy, 20:45',
      user: 'Sistema Automático',
      action: 'Creación Pedido LIVE',
      detail: 'Pedido #CT-8041 registrado desde Cuestionario LIVE sin contraseña. Reserva temporal asignada por 45 minutos.',
      module: 'Venta LIVE'
    },
    {
      timestamp: 'Ayer, 11:30',
      user: 'Andrea P. (Encargada)',
      action: 'Ajuste Manual de Inventario',
      detail: 'SKU BLU-KIM-SAT: Aumento motivado (+5 uds). Motivo: Reposición de taller de confección.',
      module: 'Inventario'
    }
  ];

  // Estado reactivo de la aplicación
  let state = {
    products: JSON.parse(JSON.stringify(INITIAL_PRODUCTS)),
    orders: JSON.parse(JSON.stringify(INITIAL_ORDERS)),
    auditLogs: JSON.parse(JSON.stringify(INITIAL_AUDIT_LOGS)),
    cart: [],
    appliedCoupon: null,
    cartDeliveryType: 'pickup', // pickup | delivery
    currentCategory: 'all',
    activeWindow: 1, // 1: Cliente, 2: Quiz LIVE, 3: Admin
    activeAdminTab: 'dashboard',
    quiz: {
      step: 1,
      selectedItems: [
        {
          id: 2,
          sku: 'CON-SAS-OLI',
          name: 'Conjunto Sastrero Lino Oliva',
          image: ASSETS.hero,
          price: 480,
          size: 'M',
          color: 'Oliva Silvestre',
          quantity: 1
        }
      ],
      tempSelections: {},
      customerName: 'Valeria Montero',
      customerPhone: '+591 76543210',
      customerEmail: 'valeria.montero@gmail.com',
      customerNotes: 'Por favor coordinar entrega en la tarde.',
      deliveryMode: 'showroom', // 'showroom' | 'delivery_local' | 'national'
      department: 'La Paz',
      address: 'Equipetrol Norte, Calle 7 #45',
      addressDetail: 'Edificio Los Laureles, Apto 402',
      agency: 'Terminal Central / Encomienda Aérea',
      coords: '-17.7654, -63.1952',
      couponApplied: true // TIKTOK2X1 por defecto
    },
    pos: {
      cart: [],
      paymentMethod: 'qr',
      cashAmount: 0
    }
  };

  // Inicializar selecciones temporales por producto
  state.products.forEach(p => {
    state.quiz.tempSelections[p.id] = {
      size: p.sizes[0],
      color: p.colors[0].name,
      quantity: 1
    };
  });

  // ==========================================================================
  // NAVEGACIÓN GLOBAL (MODO DIAPOSITIVA / 3 VENTANAS)
  // ==========================================================================
  function switchWindow(windowNumber) {
    state.activeWindow = parseInt(windowNumber, 10);

    document.querySelectorAll('.proposal-window').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.switch-btn').forEach(btn => btn.classList.remove('active'));

    const targetWindow = document.getElementById(`window-${state.activeWindow}`);
    const targetBtn = document.querySelector(`.switch-btn[data-window="${state.activeWindow}"]`);

    if (targetWindow) targetWindow.classList.add('active');
    if (targetBtn) targetBtn.classList.add('active');

    // Control de visibilidad del botón flotante de TikTok LIVE
    const tiktokBtn = document.getElementById('floating-tiktok-btn');
    if (tiktokBtn) {
      tiktokBtn.style.display = state.activeWindow === 2 ? 'none' : 'flex';
    }

    // Scroll arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Renderizar contenidos según la vista
    if (state.activeWindow === 1) {
      renderProductsGrid();
    } else if (state.activeWindow === 2) {
      renderMobileCatalog();
      renderMobileStepPreview();
      updateMobileCartTray();
    } else if (state.activeWindow === 3) {
      renderAdminDashboard();
      renderAdminOrders();
    }

    showToast(`Cambiando a Ventana ${state.activeWindow}: ${targetBtn ? targetBtn.innerText.trim() : ''}`);
  }

  // Atajos de Teclado (1, 2, 3)
  window.addEventListener('keydown', (e) => {
    // Si no está escribiendo en un input
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
    if (e.key === '1') switchWindow(1);
    if (e.key === '2') switchWindow(2);
    if (e.key === '3') switchWindow(3);
  });

  // ==========================================================================
  // VENTANA 1: EXPERIENCIA DEL CLIENTE (CATÁLOGO & CARRITO)
  // ==========================================================================
  function renderProductCardHTML(prod) {
    const vendible = prod.stockFisico - prod.reservas;
    const stockBadge = vendible <= 2
      ? `<span class="card-stock-pill low">Solo ${vendible} en stock</span>`
      : `<span class="card-stock-pill">Disponibles: ${vendible}</span>`;

    return `
      <article class="product-card" data-product-id="${prod.id}">
        <div class="card-img-wrap" onclick="window.CTApp.openDetail(${prod.id})">
          <img src="${prod.image}" alt="${prod.name}" loading="lazy">
          <span class="card-tag-badge ${prod.isLive ? 'badge-live' : ''}">${prod.tag}</span>
        </div>
        <div class="card-content">
          <span class="card-category">${prod.categoryLabel}</span>
          <h4 class="card-name" onclick="window.CTApp.openDetail(${prod.id})" style="cursor:pointer">${prod.name}</h4>
          <div class="card-price-row">
            <span class="card-price">${prod.price} Bs.</span>
            ${stockBadge}
          </div>
          <div class="swatches-row">
            ${prod.colors.map((c, idx) => `
              <span class="swatch-circle ${idx === 0 ? 'active' : ''}" style="background:${c.hex}" title="${c.name}"></span>
            `).join('')}
          </div>
          <div class="card-actions">
            <button class="btn-card-detail" onclick="window.CTApp.openDetail(${prod.id})">Ver Prenda</button>
            <button class="btn-card-add" onclick="window.CTApp.quickAddToCart(${prod.id})">+ Bolsa</button>
          </div>
        </div>
      </article>
    `;
  }

  function renderProductsGrid() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    let filtered = state.products;
    if (state.currentCategory !== 'all') {
      filtered = state.products.filter(p => p.category === state.currentCategory);
    }

    grid.innerHTML = filtered.map(prod => renderProductCardHTML(prod)).join('');
  }

  let headerSearchTimeout = null;
  function onHeaderSearch(query) {
    clearTimeout(headerSearchTimeout);
    headerSearchTimeout = setTimeout(() => {
      const q = (query || '').toLowerCase().trim();
      if (state.activeWindow !== 1) {
        switchWindow(1);
      }
      const grid = document.getElementById('products-grid');
      if (!grid) return;

      if (!q) {
        renderProductsGrid();
        return;
      }

      const matched = state.products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );

      if (matched.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 48px 20px; color: var(--ct-muted); background: #fff; border-radius: 20px; border: 1px dashed var(--ct-line);">
            <h4 style="font-size: 16px; margin-bottom: 8px; color: var(--ct-ink);">No se encontraron prendas para "${query}"</h4>
            <p style="font-size: 13px;">Prueba buscando términos como "lino", "vestido", "satén" o restablece los filtros.</p>
            <button class="btn-primary-ct" style="margin-top: 14px;" onclick="window.CTApp.filterCategory('all')">Ver todo el catálogo</button>
          </div>
        `;
      } else {
        grid.innerHTML = matched.map(prod => renderProductCardHTML(prod)).join('');
      }

      const catSec = document.getElementById('catalogo');
      if (catSec && q.length >= 2) {
        catSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  }

  function filterCategory(cat, btn) {
    state.currentCategory = cat;
    document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderProductsGrid();
  }

  function openProductDetail(productId) {
    const prod = state.products.find(p => p.id === productId);
    if (!prod) return;

    const modal = document.getElementById('product-detail-modal');
    if (!modal) return;

    const vendible = prod.stockFisico - prod.reservas;

    modal.innerHTML = `
      <div class="modal-box">
        <button class="btn-close-modal" onclick="window.CTApp.closeDetail()">&times;</button>
        <div class="modal-grid">
          <div class="modal-media">
            <img src="${prod.image}" alt="${prod.name}">
          </div>
          <div class="modal-info">
            <span class="category">${prod.categoryLabel}</span>
            <h2>${prod.name}</h2>
            <div class="modal-price-box">
              <span class="modal-price">${prod.price} Bs.</span>
              <span class="modal-stock-status">Stock vendible: ${vendible} uds (Físico: ${prod.stockFisico}, Reservas: ${prod.reservas})</span>
            </div>
            <p class="modal-description">${prod.description}</p>
            
            <div class="size-selector-label">Seleccionar Talla:</div>
            <div class="sizes-grid">
              ${prod.sizes.map((s, idx) => `
                <button class="size-btn ${idx === 0 ? 'active' : ''}" onclick="window.CTApp.selectDetailSize(this, '${s}')">${s}</button>
              `).join('')}
            </div>

            <div class="size-selector-label" style="margin-top:10px;">Color:</div>
            <div class="swatches-row" style="margin-bottom:24px;">
              ${prod.colors.map((c, idx) => `
                <div style="display:flex;align-items:center;gap:6px;cursor:pointer;" onclick="window.CTApp.selectDetailColor(this, '${c.name}')">
                  <span class="swatch-circle ${idx === 0 ? 'active' : ''}" style="background:${c.hex}"></span>
                  <span style="font-size:12px;color:var(--ct-muted)">${c.name}</span>
                </div>
              `).join('')}
            </div>

            <div class="modal-actions">
              <button class="btn-primary-ct" style="flex:1;justify-content:center" onclick="window.CTApp.addDetailToCart(${prod.id})">
                Añadir a la Bolsa
              </button>
              <button class="btn-secondary-live" onclick="window.CTApp.buyNowQuiz(${prod.id})">
                Comprar en LIVE
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

  function closeProductDetail() {
    const modal = document.getElementById('product-detail-modal');
    if (modal) modal.classList.remove('active');
  }

  function selectDetailSize(btn, size) {
    btn.parentElement.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  function selectDetailColor(container, colorName) {
    const row = container.parentElement;
    row.querySelectorAll('.swatch-circle').forEach(s => s.classList.remove('active'));
    container.querySelector('.swatch-circle').classList.add('active');
  }

  function quickAddToCart(productId) {
    const prod = state.products.find(p => p.id === productId);
    if (!prod) return;
    addToCart(prod, prod.sizes[0], prod.colors[0].name);
    showToast(`"${prod.name}" añadida a la bolsa`);
  }

  function addDetailToCart(productId) {
    const prod = state.products.find(p => p.id === productId);
    if (!prod) return;
    const activeSize = document.querySelector('.size-btn.active')?.innerText || prod.sizes[0];
    addToCart(prod, activeSize, prod.colors[0].name);
    closeProductDetail();
    openCartDrawer();
  }

  function buyNowQuiz(productId) {
    const prod = state.products.find(p => p.id === productId);
    if (prod) {
      addMobileProductToOrder(prod.id);
    }
    closeProductDetail();
    switchWindow(2);
    setMobileStep(2);
    showToast(`Iniciando orden móvil para: ${prod ? prod.name : ''}`);
  }

  function addToCart(product, size, color) {
    const vendible = product.stockFisico - product.reservas;
    if (vendible <= 0) {
      showToast('Lo sentimos, esta prenda no tiene unidades disponibles.', 'warning');
      return;
    }

    const existingIndex = state.cart.findIndex(i => i.id === product.id && i.size === size && i.color === color);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += 1;
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: size,
        color: color,
        quantity: 1
      });
    }

    updateCartCount();
    renderCartDrawer();
  }

  function removeFromCart(index) {
    state.cart.splice(index, 1);
    updateCartCount();
    renderCartDrawer();
    showToast('Prenda removida de la bolsa');
  }

  function updateCartCount() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count-badge').forEach(badge => {
      badge.innerText = totalCount;
    });
  }

  function openCartDrawer() {
    renderCartDrawer();
    const drawer = document.getElementById('cart-drawer-overlay');
    if (drawer) drawer.classList.add('active');
  }

  function closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer-overlay');
    if (drawer) drawer.classList.remove('active');
  }

  function renderCartDrawer() {
    const listContainer = document.getElementById('cart-items-list');
    if (!listContainer) return;

    if (state.cart.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align:center;padding:50px 20px;color:var(--ct-muted);">
          <div style="font-size:16px;text-transform:uppercase;letter-spacing:0.1em;color:var(--ct-muted);margin-bottom:8px;">Bolsa vacía</div>
          <p>Tu bolsa de compras está vacía.</p>
          <button class="btn-primary-ct" style="margin-top:16px;padding:10px 24px;" onclick="window.CTApp.closeCart()">Explorar Catálogo</button>
        </div>
      `;
      document.getElementById('cart-totals-box').style.display = 'none';
      return;
    }

    document.getElementById('cart-totals-box').style.display = 'block';

    listContainer.innerHTML = state.cart.map((item, idx) => `
      <div class="cart-item-row">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p class="item-meta">Talla: <strong>${item.size}</strong> · Color: ${item.color}</p>
          <span class="item-price">${item.price} Bs. &times; ${item.quantity}</span>
        </div>
        <button class="btn-remove-item" onclick="window.CTApp.removeFromCart(${idx})" title="Eliminar">&times;</button>
      </div>
    `).join('');

    // Cálculo de Totales
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    if (state.appliedCoupon === 'TIKTOK2X1') {
      // 2x1 combinable o 50% en la 2da prenda
      if (state.cart.length >= 2 || state.cart[0].quantity >= 2) {
        discount = Math.min(...state.cart.map(i => i.price)); // Descuenta la prenda de menor precio según la propuesta
      } else {
        discount = state.cart[0].price * 0.2; // 20% si es una sola
      }
    } else if (state.appliedCoupon === 'BIENVENIDA10') {
      discount = subtotal * 0.10;
    }

    const deliveryCost = state.cartDeliveryType === 'delivery' ? 25 : 0;
    const finalTotal = Math.max(0, subtotal - discount + deliveryCost);

    document.getElementById('cart-subtotal-val').innerText = `${subtotal.toFixed(0)} Bs.`;
    document.getElementById('cart-discount-val').innerText = discount > 0 ? `-${discount.toFixed(0)} Bs.` : '0 Bs.';
    document.getElementById('cart-delivery-val').innerText = deliveryCost > 0 ? `${deliveryCost} Bs.` : 'Gratis (Showroom)';
    document.getElementById('cart-total-val').innerText = `${finalTotal.toFixed(0)} Bs.`;
  }

  function applyCouponCart() {
    const input = document.getElementById('cart-coupon-input');
    if (!input) return;
    const code = input.value.trim().toUpperCase();

    if (code === 'TIKTOK2X1' || code === 'BIENVENIDA10') {
      state.appliedCoupon = code;
      showToast(`Cupón ${code} aplicado exitosamente.`);
      renderCartDrawer();
    } else {
      showToast('Cupón inválido o caducado.', 'warning');
    }
  }

  function setCartDelivery(type) {
    state.cartDeliveryType = type;
    document.querySelectorAll('.delivery-pill-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.delivery-pill-btn[data-type="${type}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    renderCartDrawer();
  }

  function checkoutCartWhatsApp() {
    if (state.cart.length === 0) return;

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    if (state.appliedCoupon === 'TIKTOK2X1') {
      discount = Math.min(...state.cart.map(i => i.price));
    }
    const deliveryCost = state.cartDeliveryType === 'delivery' ? 25 : 0;
    const finalTotal = subtotal - discount + deliveryCost;

    // Crear pedido en la lista central de pedidos
    const orderId = `CT-${Math.floor(1000 + Math.random() * 9000)}`;
    const itemsSummary = state.cart.map(i => `${i.name} (Talla ${i.size}, ${i.color}) x${i.quantity}`).join(' + ');

    const newOrder = {
      id: orderId,
      date: 'Recién creado',
      channel: 'Tienda web',
      channelKey: 'web',
      customer: 'Cliente Tienda Web',
      phone: '+591 7XXXXXXX',
      items: itemsSummary,
      total: finalTotal,
      coupon: state.appliedCoupon || 'Ninguno',
      deliveryType: state.cartDeliveryType === 'delivery' ? 'Delivery a Domicilio' : 'Retiro en Showroom',
      deliveryAddress: state.cartDeliveryType === 'delivery' ? 'Coordenadas GPS / Dirección a confirmar por WhatsApp' : 'Showroom Central',
      coords: state.cartDeliveryType === 'delivery' ? '-17.7833, -63.1821' : 'N/A',
      status: 'Registrado / Pendiente de cotización',
      statusKey: 'registrado',
      qrVoucher: 'Pendiente de cotización y QR',
      responsible: 'Sistema Web'
    };

    // Añadir al inicio de pedidos
    state.orders.unshift(newOrder);

    // Asignar reservas temporales a los productos
    state.cart.forEach(item => {
      const prod = state.products.find(p => p.id === item.id);
      if (prod) {
        prod.reservas += item.quantity;
      }
    });

    // Registrar en auditoría
    state.auditLogs.unshift({
      timestamp: 'Ahora mismo',
      user: 'Cliente (Tienda Web)',
      action: 'Creación de Pedido Web',
      detail: `Pedido #${orderId} registrado. Subtotal: ${subtotal} Bs., Total: ${finalTotal} Bs. Reserva temporal activa.`,
      module: 'Pedidos Web'
    });

    // Generar texto para WhatsApp
    const whatsappMsg = `¡Hola Cecilia Tedin! Quiero confirmar mi pedido desde la tienda web:%0A%0A`
      + `*Pedido:* %23${orderId}%0A`
      + `*Prendas:* ${encodeURIComponent(itemsSummary)}%0A`
      + `*Modalidad:* ${state.cartDeliveryType === 'delivery' ? 'Delivery a Domicilio' : 'Retiro en Showroom'}%0A`
      + `*Total estimado:* ${finalTotal} Bs.%0A%0A`
      + `Quedo a la espera de la cotización final y datos de QR para el pago.`;

    closeCartDrawer();
    state.cart = [];
    updateCartCount();

    // Notificar y mostrar modal de éxito
    showToast(`Pedido #${orderId} registrado. Reflejado en Panel Administrativo.`);
    
    // Abrir modal explicativo
    openOrderSuccessModal(orderId, whatsappMsg, newOrder);
  }

  // ==========================================================================
  // VENTANA 2: CUESTIONARIO MÓVIL EN DISPOSITIVO SMARTPHONE (TIKTOK LIVE)
  // ==========================================================================
  function renderMobileCatalog() {
    const list = document.getElementById('mobile-products-list');
    if (!list) return;

    list.innerHTML = state.products.map(prod => {
      const temp = state.quiz.tempSelections[prod.id] || { size: prod.sizes[0], color: prod.colors[0].name, quantity: 1 };
      const countInOrder = state.quiz.selectedItems
        .filter(i => i.id === prod.id)
        .reduce((sum, i) => sum + i.quantity, 0);

      return `
        <div class="mobile-product-card" data-product-id="${prod.id}">
          <div class="mobile-product-thumb">
            <img src="${prod.image}" alt="${prod.name}">
            ${countInOrder > 0 ? `<span style="position:absolute;top:4px;right:4px;background:var(--ct-olive);color:#fff;font-size:8.5px;font-weight:700;padding:2px 5px;border-radius:10px;">En orden (${countInOrder})</span>` : ''}
          </div>
          <div class="mobile-product-info">
            <div>
              <div class="mobile-product-title">${prod.name}</div>
              <div class="mobile-product-price">${prod.price} Bs.</div>
            </div>

            <div class="mobile-variant-controls">
              <!-- Tallas -->
              <div class="mobile-size-row">
                <label>Talla</label>
                <div style="display:flex;gap:3px;flex-wrap:wrap;">
                  ${prod.sizes.map(s => `
                    <button type="button" class="mobile-chip ${temp.size === s ? 'active' : ''}" onclick="window.CTApp.selectMobileProductSize(${prod.id}, '${s}', this)">${s}</button>
                  `).join('')}
                </div>
              </div>

              <!-- Colores -->
              <div class="mobile-color-row">
                <label>Color</label>
                <div style="display:flex;gap:3px;flex-wrap:wrap;">
                  ${prod.colors.map(c => `
                    <button type="button" class="mobile-chip ${temp.color === c.name ? 'active' : ''}" onclick="window.CTApp.selectMobileProductColor(${prod.id}, '${c.name}', this)">${c.name}</button>
                  `).join('')}
                </div>
              </div>
            </div>

            <div class="mobile-add-row">
              <div class="mobile-qty-stepper">
                <button type="button" class="btn-qty-step" onclick="window.CTApp.changeMobileProductQty(${prod.id}, -1)">-</button>
                <span class="qty-val-display" id="mobile-qty-${prod.id}">${temp.quantity}</span>
                <button type="button" class="btn-qty-step" onclick="window.CTApp.changeMobileProductQty(${prod.id}, 1)">+</button>
              </div>

              <button type="button" class="btn-mobile-add-item" onclick="window.CTApp.addMobileProductToOrder(${prod.id})">
                + Agregar
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    updateMobileCartTray();
  }

  function changeMobileProductQty(productId, delta) {
    if (!state.quiz.tempSelections[productId]) {
      const prod = state.products.find(p => p.id === productId);
      state.quiz.tempSelections[productId] = { size: prod.sizes[0], color: prod.colors[0].name, quantity: 1 };
    }
    const current = state.quiz.tempSelections[productId].quantity;
    const next = Math.max(1, Math.min(10, current + delta));
    state.quiz.tempSelections[productId].quantity = next;
    const el = document.getElementById(`mobile-qty-${productId}`);
    if (el) el.innerText = next;
  }

  function selectMobileProductSize(productId, size, btn) {
    if (!state.quiz.tempSelections[productId]) {
      const prod = state.products.find(p => p.id === productId);
      state.quiz.tempSelections[productId] = { size: size, color: prod.colors[0].name, quantity: 1 };
    } else {
      state.quiz.tempSelections[productId].size = size;
    }
    btn.parentElement.querySelectorAll('.mobile-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  function selectMobileProductColor(productId, color, btn) {
    if (!state.quiz.tempSelections[productId]) {
      const prod = state.products.find(p => p.id === productId);
      state.quiz.tempSelections[productId] = { size: prod.sizes[0], color: color, quantity: 1 };
    } else {
      state.quiz.tempSelections[productId].color = color;
    }
    btn.parentElement.querySelectorAll('.mobile-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  function addMobileProductToOrder(productId) {
    const prod = state.products.find(p => p.id === productId);
    if (!prod) return;

    const temp = state.quiz.tempSelections[productId] || { size: prod.sizes[0], color: prod.colors[0].name, quantity: 1 };
    
    // Buscar si ya existe en la orden con misma talla y color
    const existing = state.quiz.selectedItems.find(i => i.id === prod.id && i.size === temp.size && i.color === temp.color);
    if (existing) {
      existing.quantity += temp.quantity;
    } else {
      state.quiz.selectedItems.push({
        id: prod.id,
        sku: prod.sku,
        name: prod.name,
        image: prod.image,
        price: prod.price,
        size: temp.size,
        color: temp.color,
        quantity: temp.quantity
      });
    }

    renderMobileCatalog();
    updateMobileCartTray();
    showToast(`"${prod.name} (${temp.size}, ${temp.color})" agregada a tu orden móvil.`);
  }

  function removeMobileSelectedItem(index) {
    state.quiz.selectedItems.splice(index, 1);
    renderMobileCatalog();
    renderMobileStepPreview();
    updateMobileCartTray();
    showToast('Prenda eliminada de la orden móvil.');
  }

  function updateMobileCartTray() {
    const totalCount = state.quiz.selectedItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.quiz.selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const countEl = document.getElementById('tray-count-text');
    const totalEl = document.getElementById('tray-total-text');
    const tray = document.getElementById('mobile-cart-tray');

    if (countEl) countEl.innerText = `${totalCount} ${totalCount === 1 ? 'prenda' : 'prendas'} seleccionadas`;
    if (totalEl) totalEl.innerText = `${subtotal.toLocaleString()} Bs.`;

    if (tray) {
      tray.style.display = (state.quiz.step === 4) ? 'none' : 'flex';
    }
  }

  function setMobileStep(stepNumber) {
    stepNumber = parseInt(stepNumber, 10);

    // Si avanza del paso 1 al 2 y no tiene prendas, agregamos automáticamente la destacada
    if (stepNumber > 1 && state.quiz.selectedItems.length === 0) {
      const featured = state.products[1];
      state.quiz.selectedItems.push({
        id: featured.id,
        sku: featured.sku,
        name: featured.name,
        image: featured.image,
        price: featured.price,
        size: 'M',
        color: 'Oliva Silvestre',
        quantity: 1
      });
      showToast(`Se incluyó automáticamente la prenda estrella: ${featured.name}`);
    }

    state.quiz.step = stepNumber;

    // Actualizar stepper buttons
    document.querySelectorAll('.phone-step-btn').forEach((btn, idx) => {
      btn.classList.remove('active', 'done');
      if (idx + 1 === state.quiz.step) btn.classList.add('active');
      if (idx + 1 < state.quiz.step) btn.classList.add('done');
    });

    // Actualizar vistas
    document.querySelectorAll('.phone-step-view').forEach(v => v.classList.remove('active'));
    const targetView = document.getElementById(`mobile-step-${state.quiz.step}`);
    if (targetView) targetView.classList.add('active');

    // Scroll pantalla móvil arriba
    const screen = document.getElementById('phone-screen-container');
    if (screen) screen.scrollTo({ top: 0, behavior: 'smooth' });

    renderMobileStepPreview();
    updateMobileCartTray();
  }

  function onMobileTrayNext() {
    if (state.quiz.step < 4) {
      setMobileStep(state.quiz.step + 1);
    }
  }

  function renderMobileStepPreview() {
    // Si estamos en el paso 2: Renderizar lista de prendas añadidas
    const previewContainer = document.getElementById('mobile-selected-items-preview');
    if (previewContainer) {
      if (state.quiz.selectedItems.length === 0) {
        previewContainer.innerHTML = '<div style="color:var(--ct-muted);font-size:11px;text-align:center;padding:12px;">No has seleccionado prendas aún.</div>';
      } else {
        previewContainer.innerHTML = state.quiz.selectedItems.map((item, idx) => `
          <div class="mobile-selected-row">
            <div>
              <strong>${item.name}</strong><br>
              <span style="font-size:10px;color:var(--ct-muted)">Talla ${item.size} · ${item.color} · Cant: ${item.quantity}</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              <strong>${item.price * item.quantity} Bs.</strong>
              <button type="button" style="border:none;background:none;color:var(--ct-wine);cursor:pointer;font-size:13px;" onclick="window.CTApp.removeMobileSelectedItem(${idx})" title="Quitar">&times;</button>
            </div>
          </div>
        `).join('');
      }
    }

    // Si estamos en el paso 4: Renderizar resumen final
    const finalContainer = document.getElementById('mobile-final-items-list');
    if (finalContainer) {
      finalContainer.innerHTML = state.quiz.selectedItems.map(item => `
        <div class="mobile-selected-row">
          <div>
            <strong>${item.name}</strong> &times; ${item.quantity}<br>
            <span style="font-size:10px;color:var(--ct-muted)">Talla ${item.size} · ${item.color}</span>
          </div>
          <strong>${item.price * item.quantity} Bs.</strong>
        </div>
      `).join('');

      // Calcular montos
      const subtotal = state.quiz.selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      let discount = 0;
      if (state.quiz.couponApplied) {
        const allPrices = [];
        state.quiz.selectedItems.forEach(i => {
          for (let q = 0; q < i.quantity; q++) allPrices.push(i.price);
        });
        if (allPrices.length >= 2) {
          discount = Math.min(...allPrices);
        } else if (allPrices.length === 1) {
          discount = allPrices[0] * 0.20;
        }
      }

      let deliveryFee = 0;
      let deliveryLabel = 'Retiro en Showroom (Gratis)';
      let addressLabel = 'Showroom Central Cecilia Tedin (Equipetrol)';

      if (state.quiz.deliveryMode === 'delivery_local') {
        deliveryFee = 25;
        deliveryLabel = 'Delivery Santa Cruz (+25 Bs.)';
        const street = document.getElementById('mobile-address-street')?.value || state.quiz.address;
        const detail = document.getElementById('mobile-address-detail')?.value || '';
        addressLabel = `${street} (${detail})`;
      } else if (state.quiz.deliveryMode === 'national') {
        deliveryFee = 40;
        const dept = document.getElementById('mobile-national-dept')?.value || 'La Paz';
        const city = document.getElementById('mobile-national-city')?.value || '';
        const agency = document.getElementById('mobile-national-agency')?.value || '';
        deliveryLabel = `Envío Nacional a ${dept} (+40 Bs.)`;
        addressLabel = `${city} - Agencia: ${agency}`;
      }

      const finalTotal = Math.max(0, subtotal - discount + deliveryFee);

      document.getElementById('mobile-subtotal-val').innerText = `${subtotal.toLocaleString()} Bs.`;
      document.getElementById('mobile-discount-val').innerText = discount > 0 ? `-${discount.toLocaleString()} Bs.` : '0 Bs.';
      document.getElementById('mobile-delivery-cost-val').innerText = deliveryFee > 0 ? `${deliveryFee} Bs.` : '0 Bs. (Gratis)';
      document.getElementById('mobile-final-total-val').innerText = `${finalTotal.toLocaleString()} Bs.`;

      const custName = document.getElementById('mobile-customer-name')?.value || 'Valeria Montero';
      const custPhone = document.getElementById('mobile-customer-phone')?.value || '+591 76543210';
      const custNotes = document.getElementById('mobile-customer-notes')?.value || 'Ninguno';

      document.getElementById('mobile-summary-customer').innerText = `${custName} (${custPhone})`;
      document.getElementById('mobile-summary-delivery').innerText = deliveryLabel;
      document.getElementById('mobile-summary-address').innerText = addressLabel;
      document.getElementById('mobile-summary-notes').innerText = custNotes || 'Ninguno';
    }
  }

  function setMobileDeliveryMode(mode, btn) {
    state.quiz.deliveryMode = mode;
    document.querySelectorAll('.btn-mode-tab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    document.querySelectorAll('.delivery-subpanel').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`delivery-panel-${mode}`);
    if (target) target.classList.add('active');

    renderMobileStepPreview();
    updateMobileCartTray();
  }

  function onMobileMapClick(event) {
    const container = event.currentTarget;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const pin = document.getElementById('mobile-map-pin');
    if (pin) {
      pin.style.left = `${x}px`;
      pin.style.top = `${y}px`;
    }

    const lat = (-17.7600 - (y / rect.height) * 0.04).toFixed(4);
    const lng = (-63.1700 - (x / rect.width) * 0.04).toFixed(4);
    state.quiz.coords = `${lat}, ${lng}`;

    const display = document.getElementById('mobile-coords-val');
    if (display) display.innerText = state.quiz.coords;

    showToast(`Ubicación GPS fijada: ${state.quiz.coords}`);
  }

  function finishMobileOrder() {
    const custName = document.getElementById('mobile-customer-name')?.value.trim() || 'Comprador LIVE';
    const custPhone = document.getElementById('mobile-customer-phone')?.value.trim() || '+591 7XXXXXXX';
    const custEmail = document.getElementById('mobile-customer-email')?.value.trim() || '';
    const custNotes = document.getElementById('mobile-customer-notes')?.value.trim() || '';

    if (!custName || !custPhone) {
      showToast('Por favor completa tu nombre y número de WhatsApp.', 'warning');
      setMobileStep(2);
      return;
    }

    const subtotal = state.quiz.selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    const allPrices = [];
    state.quiz.selectedItems.forEach(i => {
      for (let q = 0; q < i.quantity; q++) allPrices.push(i.price);
    });
    if (allPrices.length >= 2) {
      discount = Math.min(...allPrices);
    } else if (allPrices.length === 1) {
      discount = allPrices[0] * 0.20;
    }

    let deliveryFee = 0;
    let deliveryLabel = 'Retiro en Showroom (Gratis)';
    let addressLabel = 'Showroom Central Cecilia Tedin (Equipetrol)';

    if (state.quiz.deliveryMode === 'delivery_local') {
      deliveryFee = 25;
      deliveryLabel = 'Delivery a Domicilio Santa Cruz';
      const street = document.getElementById('mobile-address-street')?.value || state.quiz.address;
      const detail = document.getElementById('mobile-address-detail')?.value || '';
      addressLabel = `${street} (${detail})`;
    } else if (state.quiz.deliveryMode === 'national') {
      deliveryFee = 40;
      const dept = document.getElementById('mobile-national-dept')?.value || 'La Paz';
      const city = document.getElementById('mobile-national-city')?.value || '';
      const agency = document.getElementById('mobile-national-agency')?.value || '';
      deliveryLabel = `Envío Nacional a ${dept}`;
      addressLabel = `${city} - Agencia: ${agency}`;
    }

    const finalTotal = Math.max(0, subtotal - discount + deliveryFee);
    const orderId = `LIVE-${Math.floor(1000 + Math.random() * 9000)}`;

    const itemsSummary = state.quiz.selectedItems.map(i => `${i.name} (${i.size}, ${i.color}) x${i.quantity}`).join(' + ');

    const newOrder = {
      id: orderId,
      date: 'Recién creado',
      channel: 'Compra rápida LIVE',
      channelKey: 'live',
      customer: custName,
      phone: custPhone,
      items: itemsSummary,
      total: finalTotal,
      coupon: 'TIKTOK2X1 (-' + discount + ' Bs.)',
      deliveryType: deliveryLabel,
      deliveryAddress: addressLabel,
      coords: state.quiz.deliveryMode === 'delivery_local' ? state.quiz.coords : 'N/A',
      notes: custNotes,
      status: 'Registrado / Pendiente de cotización',
      statusKey: 'registrado',
      qrVoucher: 'Pendiente de cotización y QR',
      responsible: 'Sistema Móvil LIVE'
    };

    // Añadir al inicio del panel central de pedidos
    state.orders.unshift(newOrder);

    // Asignar reservas de inventario para cada prenda seleccionada
    state.quiz.selectedItems.forEach(item => {
      const prod = state.products.find(p => p.id === item.id);
      if (prod) {
        prod.reservas += item.quantity;
      }
    });

    // Registrar en auditoría
    state.auditLogs.unshift({
      timestamp: 'Ahora mismo',
      user: 'Espectador Móvil LIVE',
      action: 'Orden Móvil LIVE',
      detail: `Pedido #${orderId} registrado desde teléfono por ${custName} (${custPhone}). Modalidad: ${deliveryLabel}. Nota: "${custNotes || 'Sin nota'}". Reserva de inventario activada.`,
      module: 'Venta LIVE'
    });

    // Mensaje estructurado de WhatsApp
    const whatsappText = `¡Hola Cecilia Tedin! Vi el live en TikTok y armé mi orden desde el celular:%0A%0A`
      + `*Pedido:* %23${orderId}%0A`
      + `*Prendas:* ${encodeURIComponent(itemsSummary)}%0A`
      + `*Comprador:* ${encodeURIComponent(custName)} (${custPhone})%0A`
      + `*Modalidad:* ${encodeURIComponent(deliveryLabel)}%0A`
      + `*Destino:* ${encodeURIComponent(addressLabel)}%0A`
      + (custNotes ? `*Mensaje:* ${encodeURIComponent(custNotes)}%0A` : '')
      + `*Cupón:* TIKTOK2X1 (-${discount} Bs.)%0A`
      + `*Total estimado:* ${finalTotal} Bs.%0A%0A`
      + `Quedo a la espera de la cotización final y datos de QR para pagar por favor.`;

    // Renderizar pantalla de éxito dentro del teléfono
    const step4 = document.getElementById('mobile-step-4');
    if (step4) {
      step4.innerHTML = `
        <div style="text-align:center;padding:24px 10px;">
          <div class="success-check-circle" style="width:58px;height:58px;font-size:28px;margin-bottom:12px;">&check;</div>
          <h4 style="font-family:var(--font-serif);font-size:20px;color:var(--ct-ink);margin-bottom:6px;">¡Orden Móvil Generada!</h4>
          <p style="font-size:11.5px;color:var(--ct-muted);line-height:1.5;">
            Tu reserva temporal está activa. Tu solicitud ya ingresó al panel central de Cecilia Tedin.
          </p>
          <div class="order-code-pill" style="font-size:15px;padding:4px 14px;margin:10px 0 14px;">#${orderId}</div>

          <div style="background:#eafaf1;border:1px solid #c2ebcf;padding:12px;border-radius:12px;text-align:left;font-size:11px;line-height:1.5;margin-bottom:16px;">
            <strong>Prendas:</strong> ${itemsSummary}<br>
            <strong>Total:</strong> ${finalTotal} Bs.<br>
            <strong>Destino:</strong> ${deliveryLabel}<br>
            ${custNotes ? `<strong>Nota:</strong> "${custNotes}"<br>` : ''}
          </div>

          <div style="display:flex;flex-direction:column;gap:8px;">
            <a href="https://api.whatsapp.com/send?phone=59170000000&text=${whatsappText}" target="_blank" class="btn-checkout-whatsapp" style="padding:10px;font-size:12px;width:100%;">
              Continuar en WhatsApp
            </a>
            <button type="button" class="btn-primary-ct" onclick="window.CTApp.switchWindow(3)" style="padding:10px;font-size:12px;justify-content:center;">
              Ver este pedido en Panel Admin
            </button>
            <button type="button" class="btn-card-detail" onclick="window.CTApp.setMobileStep(1)" style="padding:8px;font-size:11px;">
              Crear otra orden móvil
            </button>
          </div>
        </div>
      `;
    }

    // Actualizar Panel Administrativo
    renderAdminDashboard();
    renderAdminOrders();
    renderInventoryTable();

    showToast(`Pedido #${orderId} registrado. Aparece en el Panel Administrativo.`);
  }

  // ==========================================================================
  // VENTANA 3: PANEL ADMINISTRATIVO FORMAL (BACKOFFICE INTEGRAL)
  // ==========================================================================
  function switchAdminTab(tabKey, btn) {
    state.activeAdminTab = tabKey;

    document.querySelectorAll('.admin-nav-item').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    document.querySelectorAll('.admin-view-tab').forEach(tab => tab.classList.remove('active'));
    const target = document.getElementById(`admin-tab-${tabKey}`);
    if (target) target.classList.add('active');

    if (tabKey === 'dashboard') renderAdminDashboard();
    if (tabKey === 'orders') renderAdminOrders();
    if (tabKey === 'inventory') renderInventoryTable();
    if (tabKey === 'pos') renderPOS();
    if (tabKey === 'audit') renderAuditTable();
    if (tabKey === 'customers') renderCustomersTable();
  }

  function renderAdminDashboard() {
    // Regla del documento: No contabilizar pedidos pendientes como dinero recibido!
    // Solo sumar pedidos en 'Pago confirmado', 'Preparando', 'Enviado' o 'Finalizado'
    const confirmedOrders = state.orders.filter(o => ['pago-confirmado', 'preparando', 'enviado', 'finalizado'].includes(o.statusKey));
    const totalCollected = confirmedOrders.reduce((sum, o) => sum + o.total, 0);

    const pendingOrders = state.orders.filter(o => ['registrado', 'cotizado', 'pendiente-pago'].includes(o.statusKey));
    const totalPending = pendingOrders.reduce((sum, o) => sum + o.total, 0);

    const liveOrders = state.orders.filter(o => o.channelKey === 'live');
    const webOrders = state.orders.filter(o => o.channelKey === 'web');
    const waOrders = state.orders.filter(o => o.channelKey === 'whatsapp');
    const posOrders = state.orders.filter(o => o.channelKey === 'pos');

    // Actualizar KPIs
    const kpiCobrado = document.getElementById('kpi-ingresos-cobrados');
    const kpiPendiente = document.getElementById('kpi-ingresos-pendientes');
    const kpiTotalPedidos = document.getElementById('kpi-total-pedidos');
    const kpiLive = document.getElementById('kpi-ventas-live');

    if (kpiCobrado) kpiCobrado.innerText = `${totalCollected.toLocaleString()} Bs.`;
    if (kpiPendiente) kpiPendiente.innerText = `${totalPending.toLocaleString()} Bs.`;
    if (kpiTotalPedidos) kpiTotalPedidos.innerText = state.orders.length;
    if (kpiLive) kpiLive.innerText = `${liveOrders.length} pedidos`;

    // Renderizar últimos pedidos en dashboard
    const dashTableBody = document.getElementById('dashboard-recent-orders-tbody');
    if (dashTableBody) {
      dashTableBody.innerHTML = state.orders.slice(0, 5).map(o => `
        <tr>
          <td><strong>#${o.id}</strong><br><span style="font-size:10px;color:var(--ct-muted)">${o.date}</span></td>
          <td><span class="channel-pill channel-${o.channelKey}">${o.channel}</span></td>
          <td>${o.customer}</td>
          <td>${o.items}</td>
          <td><strong>${o.total} Bs.</strong></td>
          <td><span class="status-pill status-${o.statusKey}"><span class="status-dot"></span>${o.status}</span></td>
          <td>
            <button class="btn-tbl-action" onclick="window.CTApp.openOrderInspector('${o.id}')">Inspeccionar</button>
          </td>
        </tr>
      `).join('');
    }
  }

  function renderAdminOrders(filterChannel = 'all') {
    const tbody = document.getElementById('admin-orders-tbody');
    if (!tbody) return;

    let filtered = state.orders;
    if (filterChannel !== 'all') {
      filtered = state.orders.filter(o => o.channelKey === filterChannel);
    }

    tbody.innerHTML = filtered.map(o => `
      <tr>
        <td>
          <strong style="font-family:var(--font-mono);font-size:12px;">#${o.id}</strong><br>
          <span style="font-size:10.5px;color:var(--ct-muted)">${o.date}</span>
        </td>
        <td><span class="channel-pill channel-${o.channelKey}">${o.channel}</span></td>
        <td>
          <strong>${o.customer}</strong><br>
          <span style="font-size:11px;color:var(--ct-muted)">${o.phone}</span>
        </td>
        <td>
          <div style="max-width:240px;line-height:1.4;">${o.items}</div>
          <span style="font-size:10px;color:var(--ct-olive)">${o.deliveryType}</span>
          ${o.notes ? `<div style="font-size:9.5px;color:var(--ct-muted);margin-top:3px;font-style:italic;">Nota: "${o.notes}"</div>` : ''}
        </td>
        <td>
          <strong style="color:var(--ct-wine);font-size:13px;">${o.total} Bs.</strong><br>
          <span style="font-size:9.5px;color:var(--ct-muted)">${o.coupon}</span>
        </td>
        <td>
          <span class="status-pill status-${o.statusKey}"><span class="status-dot"></span>${o.status}</span>
        </td>
        <td>
          <div class="tbl-actions">
            <button class="btn-tbl-action" onclick="window.CTApp.openOrderInspector('${o.id}')" title="Ver Detalles">Gestionar</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function filterAdminOrders(channelKey, btn) {
    document.querySelectorAll('.tbl-tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderAdminOrders(channelKey);
  }

  // Modal Formal de Inspección y Transición de Estados de Pedido
  function openOrderInspector(orderId) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById('order-inspector-modal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="modal-box" style="max-width:760px;padding:32px;">
        <button class="btn-close-modal" onclick="window.CTApp.closeOrderInspector()">&times;</button>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;border-bottom:1px solid var(--ct-line);padding-bottom:16px;">
          <div>
            <span class="channel-pill channel-${order.channelKey}">${order.channel}</span>
            <h2 style="font-family:var(--font-serif);font-size:24px;margin-top:4px;">Gestionar Pedido #${order.id}</h2>
          </div>
          <span class="status-pill status-${order.statusKey}"><span class="status-dot"></span>${order.status}</span>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px;">
          <div style="background:var(--ct-cream);padding:16px;border-radius:16px;border:1px solid var(--ct-line);">
            <h4 style="font-size:12px;text-transform:uppercase;color:var(--ct-muted);margin-bottom:8px;">Datos del Cliente</h4>
            <p><strong>${order.customer}</strong></p>
            <p style="font-size:12px;color:var(--ct-muted)">Teléfono WhatsApp: ${order.phone}</p>
            <p style="font-size:12px;margin-top:6px;">Modalidad: <strong>${order.deliveryType}</strong></p>
            <p style="font-size:12px;color:var(--ct-muted)">Dirección: ${order.deliveryAddress}</p>
            <p style="font-size:11px;font-family:var(--font-mono);color:var(--ct-olive);margin-top:4px;">GPS: ${order.coords}</p>
            ${order.notes ? `<div style="margin-top:8px;padding:8px 10px;background:#fff;border-radius:8px;border:1px solid var(--ct-line);font-size:11.5px;color:#2c3a26;"><strong>Mensaje/Nota:</strong> <em>"${order.notes}"</em></div>` : ''}
          </div>

          <div style="background:var(--ct-cream);padding:16px;border-radius:16px;border:1px solid var(--ct-line);">
            <h4 style="font-size:12px;text-transform:uppercase;color:var(--ct-muted);margin-bottom:8px;">Importe & Verificación</h4>
            <p style="font-size:20px;font-weight:800;color:var(--ct-wine)">${order.total} Bs.</p>
            <p style="font-size:11.5px;color:var(--ct-muted)">Cupón: ${order.coupon}</p>
            <div style="margin-top:10px;background:#fff;padding:8px 12px;border-radius:10px;border:1px dashed #cbd1bf;font-size:11px;">
              <strong>Estado de Pago:</strong> ${order.qrVoucher}
            </div>
          </div>
        </div>

        <div style="background:#fff;border:1px solid var(--ct-line);border-radius:16px;padding:16px;margin-bottom:24px;">
          <h4 style="font-size:12px;text-transform:uppercase;color:var(--ct-muted);margin-bottom:8px;">Prendas del Pedido</h4>
          <p style="font-size:13.5px;font-weight:600;">${order.items}</p>
        </div>

        <div style="border-top:1px solid var(--ct-line);padding-top:18px;">
          <h4 style="font-size:12.5px;font-weight:700;margin-bottom:12px;">Transición de Estado (Flujo Oficial del Documento):</h4>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="btn-tbl-action" onclick="window.CTApp.setOrderStatus('${order.id}', 'cotizado', 'Cotización enviada')">
              1. Enviar Cotización
            </button>
            <button class="btn-tbl-action" onclick="window.CTApp.setOrderStatus('${order.id}', 'pendiente-pago', 'Pendiente de pago')">
              2. Facilitar QR
            </button>
            <button class="btn-tbl-action" style="background:#1d7d54;color:#fff;border-color:#1d7d54;" onclick="window.CTApp.approveQRPayment('${order.id}')">
              3. Aprobar Pago QR (Salida Definitiva)
            </button>
            <button class="btn-tbl-action" onclick="window.CTApp.setOrderStatus('${order.id}', 'preparando', 'Preparando')">
              4. A Preparación
            </button>
            <button class="btn-tbl-action" onclick="window.CTApp.setOrderStatus('${order.id}', 'enviado', 'Enviado / Listo para recoger')">
              5. Despachar / Listo
            </button>
            <button class="btn-tbl-action" style="background:#196b42;color:#fff;border-color:#196b42;" onclick="window.CTApp.setOrderStatus('${order.id}', 'finalizado', 'Finalizado')">
              6. Finalizar Pedido
            </button>
            <button class="btn-tbl-action" style="background:#faeef1;color:var(--ct-wine);border-color:#f5ccd4;" onclick="window.CTApp.setOrderStatus('${order.id}', 'cancelado', 'Cancelado / Devolución')">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

  function closeOrderInspector() {
    const modal = document.getElementById('order-inspector-modal');
    if (modal) modal.classList.remove('active');
  }

  function setOrderStatus(orderId, statusKey, statusLabel) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    order.statusKey = statusKey;
    order.status = statusLabel;

    // Si se cancela, liberar reservas
    if (statusKey === 'cancelado') {
      state.auditLogs.unshift({
        timestamp: 'Ahora mismo',
        user: 'Encargado de Pedidos',
        action: 'Cancelación de Pedido',
        detail: `Pedido #${orderId} cancelado. Reservas de inventario liberadas automáticamente.`,
        module: 'Pedidos'
      });
    } else {
      state.auditLogs.unshift({
        timestamp: 'Ahora mismo',
        user: 'Encargado de Pedidos',
        action: 'Cambio de Estado',
        detail: `Pedido #${orderId} actualizado a estado "${statusLabel}".`,
        module: 'Pedidos'
      });
    }

    renderAdminOrders();
    renderAdminDashboard();
    closeOrderInspector();
    showToast(`Pedido #${orderId} actualizado a: ${statusLabel}`);
  }

  function approveQRPayment(orderId) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    order.statusKey = 'pago-confirmado';
    order.status = 'Pago confirmado';
    order.qrVoucher = 'Verificado por Cajero (Salida Definitiva Registrada)';

    // Regla del documento: Convierte reserva temporal en salida definitiva de inventario una sola vez!
    state.products.forEach(p => {
      if (order.items.includes(p.name)) {
        if (p.reservas > 0) p.reservas -= 1;
        if (p.stockFisico > 0) p.stockFisico -= 1;
      }
    });

    state.auditLogs.unshift({
      timestamp: 'Ahora mismo',
      user: 'Carlos M. (Cajero)',
      action: 'Aprobación de Pago QR',
      detail: `Comprobante de #${orderId} verificado. Importe de ${order.total} Bs. contabilizado en caja. Salida definitiva de inventario efectuada.`,
      module: 'Cobranzas & Caja'
    });

    renderAdminOrders();
    renderAdminDashboard();
    renderInventoryTable();
    closeOrderInspector();
    showToast(`Pago verificado para #${orderId}. Inventario y caja actualizados.`);
  }

  // ==========================================================================
  // TABLA DE INVENTARIO MULTIVARIANTE (FÍSICO VS RESERVAS VS VENDIBLE)
  // ==========================================================================
  function renderInventoryTable() {
    const tbody = document.getElementById('inventory-table-tbody');
    if (!tbody) return;

    tbody.innerHTML = state.products.map(p => {
      const vendible = p.stockFisico - p.reservas;
      const isCritical = vendible <= 2;

      return `
        <tr>
          <td><strong style="font-family:var(--font-mono);">${p.sku}</strong></td>
          <td>
            <div style="display:flex;align-items:center;gap:10px;">
              <img src="${p.image}" alt="${p.name}" style="width:36px;height:45px;border-radius:6px;object-fit:cover;">
              <div>
                <strong>${p.name}</strong><br>
                <span style="font-size:11px;color:var(--ct-muted)">${p.categoryLabel}</span>
              </div>
            </div>
          </td>
          <td>${p.sizes.join(', ')}</td>
          <td>${p.price} Bs.</td>
          <td><strong style="font-size:14px;">${p.stockFisico}</strong> uds</td>
          <td><span style="color:var(--status-registrado);font-weight:700;">${p.reservas}</span> uds</td>
          <td>
            <strong style="font-size:15px;color:${isCritical ? 'var(--ct-wine)' : 'var(--ct-olive)'}">
              ${vendible} uds ${isCritical ? '(Stock Bajo)' : ''}
            </strong>
          </td>
          <td>
            <button class="btn-tbl-action" onclick="window.CTApp.adjustStockPrompt('${p.sku}')">+ Ajustar</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function adjustStockPrompt(sku) {
    const prod = state.products.find(p => p.sku === sku);
    if (!prod) return;

    const input = prompt(`Ajuste de inventario para ${prod.name} (${sku}).\nStock físico actual: ${prod.stockFisico}.\n\nIngresa la cantidad a SUMAR o RESTAR (ej. +5 o -2):`, '+5');
    if (!input) return;

    const delta = parseInt(input, 10);
    if (isNaN(delta)) {
      alert('Cantidad inválida.');
      return;
    }

    const motivo = prompt('Ingresa el motivo del ajuste (exigido por la Bitácora de Auditoría):', 'Reposición de confección taller');
    if (!motivo) return;

    prod.stockFisico = Math.max(0, prod.stockFisico + delta);

    state.auditLogs.unshift({
      timestamp: 'Ahora mismo',
      user: 'Encargado de Inventario',
      action: 'Ajuste Manual de Inventario',
      detail: `SKU ${sku}: Ajuste de ${delta > 0 ? '+' : ''}${delta} unidades (Nuevo total físico: ${prod.stockFisico}). Motivo: ${motivo}`,
      module: 'Inventario'
    });

    renderInventoryTable();
    renderProductsGrid();
    showToast(`Inventario de ${prod.name} actualizado.`);
  }

  // ==========================================================================
  // MÓDULO POS (TIENDA FÍSICA)
  // ==========================================================================
  function renderPOS() {
    const grid = document.getElementById('pos-grid-items');
    if (!grid) return;

    grid.innerHTML = state.products.map(p => `
      <div class="pos-item-card" onclick="window.CTApp.addToPOSCart(${p.id})">
        <div class="pos-item-thumb">
          <img src="${p.image}" alt="${p.name}">
        </div>
        <h5>${p.name}</h5>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto;">
          <span class="price">${p.price} Bs.</span>
          <span style="font-size:11px;color:var(--ct-muted)">Stock: ${p.stockFisico - p.reservas}</span>
        </div>
      </div>
    `).join('');

    renderPOSCart();
  }

  function addToPOSCart(productId) {
    const prod = state.products.find(p => p.id === productId);
    if (!prod) return;

    const existing = state.pos.cart.find(i => i.id === prod.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      state.pos.cart.push({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        size: prod.sizes[0],
        quantity: 1
      });
    }
    renderPOSCart();
  }

  function renderPOSCart() {
    const list = document.getElementById('pos-cart-list');
    if (!list) return;

    if (state.pos.cart.length === 0) {
      list.innerHTML = `<div style="text-align:center;padding:30px;color:var(--ct-muted);font-size:12px;">Caja lista. Selecciona prendas del mostrador.</div>`;
      document.getElementById('pos-total-val').innerText = '0 Bs.';
      return;
    }

    list.innerHTML = state.pos.cart.map((item, idx) => `
      <div style="display:flex;justify-content:space-between;align-items:center;background:var(--ct-cream);padding:8px 12px;border-radius:10px;font-size:12px;">
        <div>
          <strong>${item.name}</strong> (${item.size})<br>
          <span style="color:var(--ct-muted)">${item.price} Bs. &times; ${item.quantity}</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <strong>${item.price * item.quantity} Bs.</strong>
          <button style="border:none;background:none;color:var(--ct-wine);cursor:pointer;" onclick="window.CTApp.removePOSCart(${idx})">&times;</button>
        </div>
      </div>
    `).join('');

    const total = state.pos.cart.reduce((s, i) => s + (i.price * i.quantity), 0);
    document.getElementById('pos-total-val').innerText = `${total} Bs.`;
  }

  function removePOSCart(idx) {
    state.pos.cart.splice(idx, 1);
    renderPOSCart();
  }

  function setPOSPayment(method, btn) {
    state.pos.paymentMethod = method;
    btn.parentElement.querySelectorAll('.pos-pay-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  function chargePOS() {
    if (state.pos.cart.length === 0) {
      showToast('No hay prendas en la caja POS.', 'warning');
      return;
    }

    const total = state.pos.cart.reduce((s, i) => s + (i.price * i.quantity), 0);
    const orderId = `POS-${Math.floor(100 + Math.random() * 900)}`;
    const itemsSummary = state.pos.cart.map(i => `${i.name} (${i.size}) x${i.quantity}`).join(' + ');

    // Descontar inmediatamente del stock físico (venta presencial directa)
    state.pos.cart.forEach(item => {
      const prod = state.products.find(p => p.id === item.id);
      if (prod) {
        prod.stockFisico = Math.max(0, prod.stockFisico - item.quantity);
      }
    });

    const newOrder = {
      id: orderId,
      date: 'Recién cobrado',
      channel: 'Local físico (POS)',
      channelKey: 'pos',
      customer: 'Venta Presencial Mostrador',
      phone: 'Presencial',
      items: itemsSummary,
      total: total,
      coupon: 'Ninguno',
      deliveryType: 'Entrega Inmediata Mostrador',
      deliveryAddress: 'Showroom Central',
      coords: 'N/A',
      status: 'Finalizado',
      statusKey: 'finalizado',
      qrVoucher: `Cobrado vía ${state.pos.paymentMethod.toUpperCase()}`,
      responsible: 'Cajero POS'
    };

    state.orders.unshift(newOrder);

    state.auditLogs.unshift({
      timestamp: 'Ahora mismo',
      user: 'Cajero Mostrador',
      action: 'Venta Presencial POS',
      detail: `Ticket #${orderId} cobrado por ${total} Bs. (${state.pos.paymentMethod.toUpperCase()}). Salida inmediata de inventario.`,
      module: 'Punto de Venta POS'
    });

    state.pos.cart = [];
    renderPOSCart();
    renderProductsGrid();
    renderInventoryTable();
    renderAdminDashboard();
    renderAdminOrders();

    showToast(`Venta POS #${orderId} por ${total} Bs. completada.`);
    alert(`COMPROBANTE EMITIDO CON ÉXITO\n\nTicket #${orderId}\nTotal Cobrado: ${total} Bs.\nMedio de Pago: ${newOrder.qrVoucher}\nInventario descontado exitosamente.`);
  }

  // ==========================================================================
  // TABLA DE CLIENTES & BITÁCORA DE AUDITORÍA
  // ==========================================================================
  function renderCustomersTable() {
    const tbody = document.getElementById('customers-table-tbody');
    if (!tbody) return;

    const customers = [
      { name: 'Valeria Montero', phone: '+591 76543210', city: 'Santa Cruz', ordersCount: 3, totalSpent: 1240, status: 'Cuenta Activa' },
      { name: 'Camila Rojas Méndez', phone: '+591 71239874', city: 'Santa Cruz', ordersCount: 2, totalSpent: 865, status: 'Pendiente de Activación' },
      { name: 'Mariana Paz Barba', phone: '+591 78945612', city: 'Santa Cruz', ordersCount: 1, totalSpent: 390, status: 'Invitación Enviada' },
      { name: 'Lucía Fernández S.', phone: '+591 70012456', city: 'Santa Cruz', ordersCount: 4, totalSpent: 1580, status: 'Cuenta Activa' }
    ];

    tbody.innerHTML = customers.map(c => `
      <tr>
        <td><strong>${c.name}</strong></td>
        <td>${c.phone}</td>
        <td>${c.city}</td>
        <td>${c.ordersCount} pedidos</td>
        <td><strong style="color:var(--ct-wine)">${c.totalSpent} Bs.</strong></td>
        <td><span class="status-pill status-${c.status === 'Cuenta Activa' ? 'finalizado' : 'cotizado'}">${c.status}</span></td>
        <td>
          <button class="btn-tbl-action" onclick="alert('Se ha enviado un enlace seguro al correo de ${c.name} para activar su cuenta.')">
            Invitar por Correo
          </button>
        </td>
      </tr>
    `).join('');
  }

  function renderAuditTable() {
    const tbody = document.getElementById('audit-table-tbody');
    if (!tbody) return;

    tbody.innerHTML = state.auditLogs.map(log => `
      <tr>
        <td style="font-family:var(--font-mono);font-size:11px;">${log.timestamp}</td>
        <td><strong>${log.user}</strong></td>
        <td><span class="status-pill status-cotizado">${log.module}</span></td>
        <td><strong>${log.action}</strong></td>
        <td style="font-size:12px;color:var(--ct-muted);">${log.detail}</td>
      </tr>
    `).join('');
  }

  // ==========================================================================
  // PEDIDO MANUAL (CANAL WHATSAPP DIRECTO)
  // ==========================================================================
  function createManualWhatsAppOrder() {
    const customerInput = document.getElementById('manual-customer-name');
    const phoneInput = document.getElementById('manual-customer-phone');
    const productSelect = document.getElementById('manual-product-select');
    const deliveryTypeSelect = document.getElementById('manual-delivery-type');
    const addressInput = document.getElementById('manual-delivery-address');

    const customer = customerInput ? customerInput.value.trim() : 'Cliente WhatsApp';
    const phone = phoneInput ? phoneInput.value.trim() : '+591 7XXXXXXX';
    const prodId = productSelect ? parseInt(productSelect.value, 10) : 1;
    const prod = state.products.find(p => p.id === prodId) || state.products[0];
    const deliveryType = deliveryTypeSelect ? deliveryTypeSelect.value : 'Delivery a Domicilio';
    const address = addressInput ? addressInput.value.trim() : 'Santa Cruz de la Sierra';

    const orderId = `WA-${Math.floor(1000 + Math.random() * 9000)}`;
    const deliveryFee = deliveryType.includes('Delivery') ? 25 : 0;
    const total = prod.price + deliveryFee;

    const newOrder = {
      id: orderId,
      date: 'Recién creado',
      channel: 'WhatsApp directo',
      channelKey: 'whatsapp',
      customer: customer,
      phone: phone,
      items: `${prod.name} (Talla M)`,
      total: total,
      coupon: 'Ninguno',
      deliveryType: deliveryType,
      deliveryAddress: address,
      coords: '-17.7833, -63.1821',
      status: 'Cotización enviada',
      statusKey: 'cotizado',
      qrVoucher: 'Presupuesto y QR enviados por vendedor',
      responsible: 'Andrea P. (Vendedora)'
    };

    state.orders.unshift(newOrder);
    prod.reservas += 1;

    state.auditLogs.unshift({
      timestamp: 'Ahora mismo',
      user: 'Andrea P. (Ventas)',
      action: 'Creación Pedido Manual',
      detail: `Pedido #${orderId} creado para venta WhatsApp directo (${customer}). Total: ${total} Bs. Reserva asignada.`,
      module: 'WhatsApp Directo'
    });

    renderAdminOrders();
    renderAdminDashboard();
    renderInventoryTable();
    showToast(`Pedido Manual #${orderId} creado para WhatsApp.`);
    switchAdminTab('orders', document.querySelector('.admin-nav-item[data-tab="orders"]'));
  }

  // ==========================================================================
  // MODAL DE ÉXITO DE PEDIDO WEB
  // ==========================================================================
  function openOrderSuccessModal(orderId, whatsappMsg, order) {
    const modal = document.getElementById('order-success-modal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="modal-box" style="max-width:540px;padding:36px;text-align:center;">
        <button class="btn-close-modal" onclick="window.CTApp.closeOrderSuccessModal()">&times;</button>
        <div class="success-check-circle">&check;</div>
        <h3 style="font-family:var(--font-serif);font-size:26px;margin-bottom:8px;">¡Solicitud de Pedido Generada!</h3>
        <p style="font-size:13px;color:var(--ct-muted);line-height:1.6;">
          Tu pedido ha quedado registrado con estado <strong>Pendiente de Cotización</strong> y cuenta con reserva temporal activa.
        </p>
        <div class="order-code-pill">#${orderId}</div>

        <div style="background:#eafaf1;border:1px solid #c2ebcf;padding:14px;border-radius:14px;text-align:left;font-size:12px;margin-bottom:20px;">
          <strong>Total cotizado:</strong> ${order.total} Bs.<br>
          <strong>Modalidad:</strong> ${order.deliveryType}<br>
          <strong>Próximo paso:</strong> El encargado verifica la disponibilidad y te envía el QR oficial por WhatsApp para confirmar tu compra.
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          <a href="https://api.whatsapp.com/send?phone=59170000000&text=${whatsappMsg}" target="_blank" class="btn-checkout-whatsapp" style="justify-content:center;">
            Abrir WhatsApp para confirmar
          </a>
          <button class="btn-primary-ct" onclick="window.CTApp.switchWindow(3); window.CTApp.closeOrderSuccessModal();" style="justify-content:center;">
            Ir a ver el pedido en el Panel Administrativo
          </button>
        </div>
      </div>
    `;
    modal.classList.add('active');
  }

  function closeOrderSuccessModal() {
    const modal = document.getElementById('order-success-modal');
    if (modal) modal.classList.remove('active');
  }

  // Reiniciar datos de demostración a su estado original
  function resetDemoData() {
    if (!confirm('¿Deseas reiniciar todos los datos simulados a su estado inicial?')) return;
    state.products = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
    state.orders = JSON.parse(JSON.stringify(INITIAL_ORDERS));
    state.auditLogs = JSON.parse(JSON.stringify(INITIAL_AUDIT_LOGS));
    state.cart = [];
    state.appliedCoupon = null;
    updateCartCount();
    renderProductsGrid();
    renderAdminDashboard();
    renderAdminOrders();
    renderInventoryTable();
    showToast('Datos de demostración reiniciados exitosamente.');
  }

  // Sistema de Notificaciones Toast
  function showToast(message, type = 'info') {
    const shelf = document.getElementById('toast-shelf');
    if (!shelf) return;

    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerHTML = `
      <span>${message}</span>
    `;

    shelf.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Inicialización global
  window.addEventListener('DOMContentLoaded', () => {
    renderProductsGrid();
    renderMobileCatalog();
    renderMobileStepPreview();
    updateMobileCartTray();
    renderAdminDashboard();
    renderAdminOrders();
    renderInventoryTable();
    renderPOS();
    renderAuditTable();
    renderCustomersTable();
  });

  // Exponer API global
  window.CTApp = {
    switchWindow,
    filterCategory,
    onHeaderSearch,
    openDetail: openProductDetail,
    closeDetail: closeProductDetail,
    selectDetailSize,
    selectDetailColor,
    quickAddToCart,
    addDetailToCart,
    buyNowQuiz,
    openCart: openCartDrawer,
    closeCart: closeCartDrawer,
    removeFromCart,
    applyCouponCart,
    setCartDelivery,
    checkoutCartWhatsApp,
    // Funciones del Cuestionario Móvil (Smartphone)
    renderMobileCatalog,
    setMobileStep,
    onMobileTrayNext,
    selectMobileProductSize,
    selectMobileProductColor,
    changeMobileProductQty,
    addMobileProductToOrder,
    removeMobileSelectedItem,
    setMobileDeliveryMode,
    onMobileMapClick,
    finishMobileOrder,
    // Funciones del Panel Administrativo
    switchAdminTab,
    filterAdminOrders,
    openOrderInspector,
    closeOrderInspector,
    setOrderStatus,
    approveQRPayment,
    adjustStockPrompt,
    addToPOSCart,
    removePOSCart,
    setPOSPayment,
    chargePOS,
    createManualWhatsAppOrder,
    closeOrderSuccessModal,
    resetDemoData,
    showToast
  };

})();
