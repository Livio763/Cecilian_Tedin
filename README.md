# CECILIA TEDIN — PROTOTIPO VISUAL E INTERACTIVO DE LA PROPUESTA INTEGRAL

Este proyecto implementa la demostración interactiva de alta fidelidad basada en el documento funcional `Propuesta_Integral_Ecommerce_Cecilia_Tedin.docx` y en el diseño visual de la carpeta `CECILIA TEDIN LIVE`.

---

## ¿Cómo abrir la demostración?
1. Haz doble clic o abre el archivo [index.html](file:///home/livi/Descargas/alan/Cecilia_Tedin_Demo_Frontend/index.html) en cualquier navegador moderno (Chrome, Brave, Edge o Firefox).
2. O ejecuta un servidor local rápido:
   ```bash
   python3 -m http.server 8080
   ```
   e ingresa a `http://localhost:8080`

---

## Estructura de Navegación y Vistas

### Encabezado Principal de la Tienda (Header Superior)
* **Tira de Anuncios**: Avisos de envíos prioritarios a Bolivia, horarios de Showroom Equipetrol, enlace directo a WhatsApp y moneda oficial en BOB (Bs.).
* **Navegación Completa**: Accesos a *Colección 2026*, *Quiénes Somos*, *Showrooms & Ubicaciones*, *Propuesta de Valor* y *TikTok LIVE*.
* **Buscador en Tiempo Real**: Filtra instantáneamente las prendas del catálogo por nombre, categoría o tejido al escribir.
* **Acciones de Usuario**: Botón de rastreo de pedidos y Bolsa de Compras con contador interactivo que abre el carrito drawer.

### Controles Flotantes Inferiores
* **Dock Flotante del Sistema**: Barra minimalista fija en la parte inferior central para conmutar entre las 3 partes de la propuesta (`[1] Tienda & Catálogo`, `[2] Cuestionario LIVE`, `[3] Panel Admin`) con botón de reinicio de demo y soporte de atajos de teclado `1`, `2` y `3`.
* **Botón Flotante TikTok LIVE**: Pastilla fija en la parte inferior con distintivo pulsante "EN VIVO" que abre directamente la experiencia de compra móvil.

---

## Detalle de las 3 Ventanas de la Demostración

### 1. Ventana 1: Experiencia del Cliente (Tienda & Landing)
* **Hero Editorial**: Siluetas de alta costura, identidad visual de Cecilia Tedin y llamados a la acción.
* **4 Pilares de la Propuesta**: 4 canales conectados, reserva temporal de stock, pagos QR sin duplicados y delivery con GPS.
* **Campaña LIVE Activa**: Acceso directo al cuestionario con el cupón `TIKTOK2X1`.
* **Catálogo Curado**: Filtros interactivos por categoría (*Vestidos de Gala, Conjuntos Sastreros, Blusas, Edición LIVE, Abrigos*), tarjetas con swatches de color y stock vendible en vivo.
* **Sección Quiénes Somos**: Manifiesto de diseño de autor, historia del atelier cruceño, pilares de confección artesanal y métricas de trayectoria.
* **Sección Ubicaciones & Showrooms**: Showroom Central Equipetrol (con mapa visual e información de retiro sin costo), Boutique Hotel Los Tajibos y red de despachos a toda Bolivia.
* **Footer de Lujo Editorial**: Enlaces directos, políticas, horarios de atención y datos de contacto.

### 2. Ventana 2: Cuestionario Rápido LIVE (Dispositivo Smartphone Nativo)
* **Maqueta Física de Celular**: Chasis con bordes curvos, Isla Dinámica con cámara frontal, barra de estado (hora, 5G, batería) y navegación por pasos.
* **Catálogo Rápido Multiselección**: Fichas compactas con selector de tallas (`S, M, L, XL`), swatches de color y contador de cantidad para añadir múltiples prendas a la orden.
* **Datos de Contacto**: Nombre, WhatsApp, correo y campo de mensaje/notas especiales para el pedido.
* **3 Modalidades de Entrega**:
  1. *Retiro en Showroom Local (0 Bs.)*: Muestra el mapa centrado en el local de Equipetrol.
  2. *Delivery Santa Cruz (25 Bs.)*: Mapa interactivo con pin GPS táctil y campos de dirección y detalle.
  3. *Nacional a Otro Departamento (40 Bs.)*: Selector de departamento y agencia de despacho.
* **Cierre y Sincronización**: Cupón `TIKTOK2X1`, generación de código `#LIVE-XXXX` y enlace directo a WhatsApp.

### 3. Ventana 3: Panel Administrativo Formal (Backoffice & POS)
* **Diseño Ejecutivo Formal**: Barra lateral corporativa, indicadores de rendimiento y métricas de cobro.
* **Dashboard de KPIs**: Ingresos efectivamente cobrados (sin sumar pendientes), pedidos totales y ventas de campaña LIVE.
* **Gestión de Pedidos (8 Estados)**: Inspección con detalles del comprador, dirección, GPS, notas especiales y botón de **Aprobación de Pago QR**.
* **Punto de Venta Presencial (POS)**: Caja registradora de mostrador con descuento inmediato de inventario físico y emisión de recibo.
* **Venta WhatsApp Directo**: Registro ágil de ventas acordadas por mensajería.
* **Inventario & Reservas**: Control estricto de la regla *Stock Vendible = Stock Físico - Reservas Temporales*.
* **Clientes, Cupones & Bitácora de Auditoría**: Trazabilidad completa e inmutable de eventos.
