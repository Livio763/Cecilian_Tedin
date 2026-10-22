# CECILIA TEDIN — PLATAFORMA INTEGRAL E-COMMERCE MULTICANAL

Demostracion interactiva de alta fidelidad basada en el documento funcional `Propuesta_Integral_Ecommerce_Cecilia_Tedin.docx` y en el diseno visual de la marca `CECILIA TEDIN`.

---

## Acceso en Linea (GitHub Pages)

La plataforma completa se encuentra desplegada y lista para su presentacion formal en:

* **Tienda Principal & Catalogo**: [https://livio763.github.io/Cecilian_Tedin/](https://livio763.github.io/Cecilian_Tedin/)
* **Venta Movil TikTok LIVE**: [https://livio763.github.io/Cecilian_Tedin/live.html](https://livio763.github.io/Cecilian_Tedin/live.html)
* **Panel Administrativo & POS**: [https://livio763.github.io/Cecilian_Tedin/admin.html](https://livio763.github.io/Cecilian_Tedin/admin.html)

---

## Ejecucion Local
1. Abre [index.html](file:///home/livi/Descargas/alan/Cecilia_Tedin_Demo_Frontend/index.html) en cualquier navegador moderno.
2. O inicia un servidor local rapido:
   ```bash
   python3 -m http.server 8080
   ```
   e ingresa a `http://localhost:8080`

---

## Arquitectura de Paginas Independientes (Multi-Page)

### 1. `index.html` — Experiencia de la Tienda de Lujo & Catalogo
* **Hero Editorial**: Imagen de autor, tipografia contemporanea y llamados a la accion.
* **4 Pilares de la Propuesta**: 4 canales conectados, reserva temporal de stock (45 min), pagos QR con salida definitiva y delivery con GPS.
* **Catalogo Curado**: Filtros interactivos por categoria, variantes de talla y color, busqueda instantanea y stock vendible en tiempo real.
* **Bolsa de Compras / Carrito Lateral**: Formulario de cliente integrado (Nombre, WhatsApp, direccion), calculo de cupones, selector de despacho (Showroom o Delivery) y envio estructurado a WhatsApp con persistencia en `localStorage`.
* **Secciones Institucionales**: *Quienes Somos* (historia del atelier cruceño y manifiesto), *Showrooms & Ubicaciones* (Equipetrol y Los Tajibos) y footer editorial.

### 2. `live.html` — Cuestionario Movil Nativo (TikTok LIVE)
* **Chasis de Smartphone Fisico**: Marco de celular con isla dinamica, bocina, hora y senal 5G.
* **Catalogo Multiseleccion**: Prendas compactas con seleccion individual de tallas, colores y cantidades.
* **Cero Friccion**: Formulario de cliente sin registro previo obligatorio.
* **3 Modalidades de Entrega**:
  1. *Retiro en Showroom Local (Gratis)*: Mapa del showroom en Equipetrol.
  2. *Delivery Santa Cruz (25 Bs.)*: Mapa interactivo tactil con pin GPS y coordenadas.
  3. *Envio Nacional (40 Bs.)*: Selector de departamentos y agencias de encomienda.
* **Cupon TIKTOK2X1 & WhatsApp**: Descuento automatico de campana y pedido enviado directo a WhatsApp con numero de orden.

### 3. `admin.html` — Panel Administrativo Formal & Punto de Venta (POS)
* **Dashboard Ejecutivo**: Indicadores financieros de ingresos cobrados (sin sumar pendientes), pedidos totales y ventas LIVE.
* **Graficas SVG Reactivas**:
  - *Tendencia Financiera*: Comparativa visual entre Ingresos Cobrados, En Validacion y Proyeccion Total.
  - *Volumen por Canal*: Participacion de TikTok LIVE, Tienda Web, WhatsApp y POS Mostrador.
  - *Embudo Operativo*: Visualizacion de los 8 estados oficiales del flujo del documento.
* **Gestion de Pedidos (8 Estados)**: Filtro por canales, inspeccion integral, liberacion automatica de reservas y aprobacion de pago QR con salida definitiva de inventario.
* **Modulo POS (Tienda Fisica)**: Buscador de prendas, filtros por categoria, caja mostrador, calculadora automatica de cambio en efectivo y comprobante termico con codigo de barras.
* **Inventario & Reservas**: Cumplimiento de la regla `Stock Vendible = Stock Fisico - Reservas Temporales`.
* **Bitacora de Auditoria**: Registro inmutable de cada cobro, transicion de estado y ajuste de stock.

---

## Caracteristicas Tecnicas
* **Zero Emojis**: Diseno institucional formal 100% libre de emojis.
* **Persistencia Completa**: Sincronizacion bidireccional entre la tienda, el movil y el panel mediante `localStorage`.
* **Diseno Responsive**: Adaptado tanto a pantallas de escritorio como a dispositivos moviles.

