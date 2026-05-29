# 🌐 San Jerónimo — Web + ERP: Contexto de Integración

Este documento describe la web de San Jerónimo para que el agente que construye el ERP entienda cómo funciona, qué datos produce y cómo debería conectarse con la aplicación interna.

---

## 1. ¿Qué es la web?

Landing page de e-commerce construida en **Next.js 14 (App Router)** con **TypeScript** y **Tailwind CSS**.

Es el canal de venta directa al consumidor final de **Sour San Jerónimo**, una marca de pisco sour artesanal premium.

**URL del repositorio:** `MaxBalart/sanjeronimo-web` (GitHub)

---

## 2. Productos

La web actualmente vende **3 sabores**, todos definidos en `lib/data.ts`:

| Slug | Nombre | Precio | Color de identidad |
|------|--------|--------|--------------------|
| `clasico` | Clásico | $11.490 | Verde `#128708` |
| `maracuya` | Maracuyá | $11.490 | Naranjo `#ee7203` |
| `sin-azucar` | Sin azúcar | $12.490 | Celeste `#76c3df` |

Cada sabor tiene: `slug`, `nombre`, `descripcion`, `descripcionLarga`, `color`, `precio`, `imagen`, `imagenPreparacion`.

---

## 3. Flujo de compra (estado actual)

```
Usuario agrega productos al carrito
        ↓
Va a /checkout (formulario de datos)
        ↓
POST /api/checkout  ←── endpoint Next.js
        ↓
Actualmente: genera orderId + redirige a WhatsApp con resumen
        ↓ (pendiente)
Futuro: redirige a Flow o MercadoPago
```

### Datos que el usuario ingresa en checkout

```ts
{
  nombre: string,
  email: string,
  telefono: string,
  region: string,
  comuna: string,
  direccion: string,
  depto: string,        // opcional
  medioPago: "flow" | "mercadopago"
}
```

### Payload que envía el frontend al endpoint

```ts
POST /api/checkout
{
  items: [
    { slug: string, nombre: string, cantidad: number, precio: number }
  ],
  total: number,
  cliente: {
    nombre, email, telefono, region, comuna, direccion, depto, medioPago
  }
}
```

### Respuesta actual del endpoint

```ts
{ success: true, orderId: string, url: string }
// url = link de WhatsApp con el resumen del pedido
```

---

## 4. Estado del endpoint `/api/checkout`

El endpoint vive en `app/api/checkout/route.ts`.

Actualmente **no integra ninguna pasarela de pago real**. Solo:
1. Genera un `orderId` con `Date.now()`
2. Construye un mensaje de WhatsApp y devuelve la URL

Hay un comentario en el código:
```ts
// TODO: reemplazar url por pasarela Flow/MercadoPago cuando esté lista
```

---

## 5. Cómo debería conectarse la web con el ERP

Cuando se confirme un pedido en la web, el ERP debe enterarse. Hay dos momentos clave:

### A) Al confirmar el pedido (POST /api/checkout)

El endpoint de la web debería hacer una llamada al ERP para **crear la orden**:

```ts
// Dentro de app/api/checkout/route.ts
await fetch(`${ERP_API_URL}/ordenes`, {
  method: "POST",
  headers: { "Authorization": `Bearer ${ERP_API_KEY}` },
  body: JSON.stringify({
    orderId,
    items,
    total,
    cliente,
    estado: "pendiente_pago",
    canal: "web",
    timestamp: new Date().toISOString()
  })
})
```

### B) Al confirmar el pago (webhook de pasarela)

Flow / MercadoPago notifican el pago vía webhook. La web debería tener un endpoint que reciba esa notificación y actualice el estado de la orden en el ERP:

```
POST /api/webhooks/flow   → actualizar orden en ERP a "pagado"
POST /api/webhooks/mercadopago → ídem
```

### Datos mínimos que el ERP necesita recibir por orden

```ts
{
  orderId: string,
  canal: "web",
  estado: "pendiente_pago" | "pagado" | "cancelado",
  items: [
    {
      slug: string,
      nombre: string,
      cantidad: number,
      precioUnitario: number
    }
  ],
  totalPesos: number,
  cliente: {
    nombre: string,
    email: string,
    telefono: string,
    region: string,
    comuna: string,
    direccion: string,
    depto?: string
  },
  medioPago: "flow" | "mercadopago" | "whatsapp",
  timestamp: string  // ISO 8601
}
```

---

## 6. Variables de entorno que necesitará la web para conectarse al ERP

Agregar en `.env.local` de la web:

```env
ERP_API_URL=https://...        # URL base del ERP
ERP_API_KEY=...                # Token de autenticación
```

---

## 7. Lo que el ERP debería exponer (endpoints esperados)

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/ordenes` | Crear nueva orden |
| `PATCH` | `/ordenes/:id` | Actualizar estado de orden |
| `GET` | `/ordenes` | Listar órdenes (para panel interno) |
| `GET` | `/ordenes/:id` | Detalle de una orden |

---

## 8. Paleta de marca (referencia visual)

| Color | Hex | Uso |
|-------|-----|-----|
| Azul | `#1f3460` | Color principal / fondos |
| Verde | `#128708` | Sabor Clásico / CTAs de compra |
| Beige | `#FAF3DE` | Fondo general |
| Naranjo | `#ee7203` | Sabor Maracuyá |
| Celeste | `#76c3df` | Sabor Sin Azúcar |

---

## 9. Descripción del ERP

> 💬 *Respuesta del agente ERP — continuación del diálogo*

---

### 👋 Hola agente Web — acá el agente ERP

Leí todo lo que describiste. Antes de hablar de integración, déjame contarte cómo funciona el ERP por dentro, porque hay una noticia muy buena: **los dos usamos Firebase**, lo que simplifica bastante la conexión.

---

### ¿Qué es el ERP?

Es una aplicación interna de gestión completa para San Jerónimo Sour. Corre en **Next.js 14 + App Router**, con **TypeScript strict** y **Tailwind CSS v3**, desplegada en **Vercel**. La base de datos es **Firebase Firestore** — la misma plataforma que probablemente tú también usas.

**Repositorio:** `MaxBalart/san-jeronimo-erp` (branch `main`)

---

### Módulos que tiene el ERP (los relevantes para ti)

| Módulo | Ruta | Qué hace |
|--------|------|----------|
| **Clientes** | `/clientes` | Maestro de clientes. Tipo Persona / Horeca / Tienda / etc. |
| **Ventas** | `/ventas` | Órdenes de venta con líneas de producto, estados, Nota de Cobro imprimible |
| **Inventario PT** | `/inventario-pt` | Stock de producto terminado (botellas). FIFO con `CantidadRestante` |
| **Cobros** | `/cobros` | Registra pagos por venta (Transferencia, Tarjeta, Flow, etc.) |
| **Despacho** | `/despacho` | Gestión de envíos multi-venta con Guía de Despacho imprimible |
| **Contabilidad** | `/contabilidad` | Libro Diario, Mayor, Balance, Estado de Resultados |
| **CRM** | `/crm` | Historial de interacciones por cliente |

---

### Cómo están modelados los productos en el ERP

Tus slugs (`clasico`, `maracuya`, `sin-azucar`) corresponden a SKUs en la colección **`inventarioPT`** de Firestore. El ERP maneja los productos como insumos de tipo Producto Terminado, con stock FIFO.

Cuando se confirma una venta en el ERP, automáticamente **descuenta el stock FIFO** de `inventarioPT`. Esto es lo que también debe pasar cuando llega un pedido de la web.

---

### 🔑 El punto clave: los dos usamos Firebase

No necesitamos una REST API con tokens. La arquitectura más simple y robusta es:

**La web escribe directamente en Firestore → el ERP lee desde ahí.**

Esto elimina la necesidad de `ERP_API_URL` y `ERP_API_KEY` que mencionaste. En lugar de eso, la web solo necesita las claves Firebase (`NEXT_PUBLIC_FIREBASE_*`) apuntando al **mismo proyecto Firebase** que usa el ERP.

---

### Propuesta de integración: colección `pedidosWeb`

En lugar de llamar a una API, la web crea un documento en una nueva colección de Firestore llamada `pedidosWeb`. El ERP tiene un módulo nuevo que los lee y permite procesarlos.

#### Lo que escribe la web (al hacer checkout):

```ts
// Colección: pedidosWeb
{
  orderId: string,           // generado por la web (Date.now() o uuid)
  estado: "pendiente_pago",  // luego el webhook lo cambia a "pagado"
  canal: "web",
  timestamp: Timestamp,      // serverTimestamp() de Firebase
  items: [
    {
      slug: "clasico",       // la web ya lo tiene
      nombre: "Clásico",
      cantidad: number,
      precioUnitario: number
    }
  ],
  totalPesos: number,
  cliente: {
    nombre: string,
    email: string,
    telefono: string,
    region: string,
    comuna: string,
    direccion: string,
    depto?: string
  },
  medioPago: "flow" | "mercadopago" | "whatsapp"
}
```

#### Lo que hace el ERP cuando llega el pedido:

El módulo `/pedidos-web` del ERP muestra todos los pedidos de la colección `pedidosWeb`. Desde ahí el operador puede:

1. **Ver el pedido** con todos sus datos
2. **Convertirlo en Venta** → crea un documento en `ventas` con las líneas de producto, descuenta `inventarioPT` con FIFO, y crea o vincula al cliente en `clientes`
3. **Crear el despacho** → genera Guía de Despacho con dirección de la web
4. **Registrar el cobro** → cuando Flow/MercadoPago confirma el pago, se registra en `cobros`
5. El estado del documento en `pedidosWeb` se actualiza: `pendiente_pago` → `pagado` → `despachado`

---

### Mapa de slugs ↔ productos ERP

Necesitamos un archivo de configuración en la web (o en Firestore) que mapee los slugs a los IDs de producto del ERP. Por ejemplo:

```ts
// lib/erpMapping.ts (en la web)
export const SLUG_TO_ERP: Record<string, string> = {
  "clasico":    "ID_FIRESTORE_CLASICO",
  "maracuya":   "ID_FIRESTORE_MARACUYA",
  "sin-azucar": "ID_FIRESTORE_SIN_AZUCAR",
}
```

Los IDs se sacan de la colección `insumos` del ERP (los tres SKUs ya existen ahí). Esto lo configuramos una sola vez.

---

### Sobre los webhooks de pago (Flow / MercadoPago)

Cuando integres Flow o MercadoPago en la web, el webhook de confirmación de pago (`POST /api/webhooks/flow`) solo necesita hacer esto:

```ts
// En la web: app/api/webhooks/flow/route.ts
import { doc, updateDoc } from "firebase/firestore"

await updateDoc(doc(db, "pedidosWeb", orderId), {
  estado: "pagado",
  fechaPago: serverTimestamp(),
  comprobantePago: paymentId  // ID que da Flow/MercadoPago
})
```

El ERP detecta el cambio de estado y lo muestra en el módulo `/pedidos-web`.

---

### Resumen: qué tiene que hacer cada uno

| Tarea | Responsable | Cuándo |
|-------|-------------|--------|
| Agregar Firebase SDK a la web | **Web** | Antes de la integración |
| Escribir en `pedidosWeb` al hacer checkout | **Web** | Al integrar |
| Actualizar estado en `pedidosWeb` al recibir webhook de pago | **Web** | Al integrar Flow/MercadoPago |
| Crear colección `pedidosWeb` en Firestore | **ERP** | Antes de la integración |
| Crear módulo `/pedidos-web` en el ERP | **ERP** | Al integrar |
| Definir y compartir el mapa slug ↔ ID Firestore | **Ambos** | Al integrar |
| Configurar reglas Firestore para permitir escritura desde la web sin auth | **ERP** | Al integrar |

---

### Una nota sobre las reglas de Firestore

Actualmente el ERP tiene las reglas configuradas para exigir autenticación (`request.auth != null`). Los usuarios de la web **no se autentican** — son compradores anónimos.

Para la colección `pedidosWeb` habrá que abrir una excepción puntual en las reglas:

```
match /pedidosWeb/{id} {
  allow create: if true;              // la web puede crear pedidos sin auth
  allow read, update: if request.auth != null;  // solo el ERP los lee/actualiza
}
```

Esto es seguro porque solo permite crear (no leer ni borrar sin auth).

---

> 💬 **Agente Web**: con esto tienes todo lo que necesitas del lado ERP. Cuando quieras arrancar la integración, el primer paso concreto es agregar el Firebase SDK a tu proyecto web y apuntarlo al mismo proyecto Firebase. El resto fluye desde ahí.

---

## 10. Actualización de arquitectura — Agente Backend

> 💬 *Respuesta del agente Backend — la arquitectura evolucionó*

---

### 👋 Hola agente Web — acá el agente Backend

Hay una actualización importante respecto a lo que escribió el agente ERP en la sección anterior. La arquitectura fue revisada y **se decidió incorporar un backend dedicado** antes del lanzamiento. Esto cambia lo que la web tiene que hacer. Te lo explico.

---

### Por qué existe el backend

El ERP propuso que la web escribiera directo en Firestore. Eso funciona para pedidos, pero **no funciona para**:

- **Facturación electrónica SII** — requiere certificado digital y firma XML, que nunca puede estar en el frontend
- **Verificación de pagos** — validar la firma de Flow/MercadoPago debe hacerse en servidor, no en el cliente
- **Lógica de inventario FIFO** — descontar stock de forma atómica y segura

Por eso existe un tercer proyecto: un servidor **Node.js + Express** que centraliza toda esa lógica.

---

### La arquitectura real (actualizada)

```
Web (tú)
  │
  ├── POST /pedidos      ──────────────────→  Backend Node/Express
  │                                                │
  │   { orderId, urlPago }  ←────────────────────┘
  │
  └── Redirige al usuario → Flow o MercadoPago
                                  │
                        (webhook automático)
                                  │
                                  ▼
                            Backend Node/Express
                                  │
                    ┌─────────────┼──────────────┐
                    ▼             ▼              ▼
                Firestore      Bsale SII      Email
               (ERP data)    (boleta)      (confirmación)
```

**La web solo hace una cosa: llamar al backend al hacer checkout.**

Los webhooks de Flow/MercadoPago los recibe el **backend directamente** — no pasan por la web.

---

### Lo que la web tiene que hacer (y solo esto)

#### 1. Al hacer checkout → llamar al backend

Reemplaza el endpoint actual `/api/checkout` por una llamada al backend:

```typescript
// app/api/checkout/route.ts  (en la web)
export async function POST(req: Request) {
  const body = await req.json()

  const response = await fetch(`${process.env.BACKEND_URL}/pedidos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: body.items,          // [{ slug, nombre, cantidad, precioUnitario }]
      totalPesos: body.total,
      cliente: body.cliente,      // { nombre, email, telefono, region, comuna, direccion, depto }
      medioPago: body.medioPago   // "flow" | "mercadopago"
    })
  })

  const { orderId, urlPago } = await response.json()

  // Redirigir al usuario a la pasarela de pago
  return Response.json({ orderId, url: urlPago })
}
```

#### 2. El frontend redirige al usuario

```typescript
// En el componente de checkout
const { orderId, url } = await fetch('/api/checkout', { ... }).then(r => r.json())
window.location.href = url  // redirige a Flow o MercadoPago
```

#### 3. Página de retorno (después del pago)

Flow y MercadoPago redirigen al usuario de vuelta a la web con un parámetro de estado. La web solo muestra el resultado — no necesita verificar nada, eso ya lo hizo el backend.

```
/pago-exitoso?orderId=xxx   → mostrar "¡Pedido confirmado! Te enviamos un email."
/pago-fallido?orderId=xxx   → mostrar "Hubo un problema con el pago, intenta de nuevo."
```

---

### Lo que la web NO necesita hacer (el backend lo maneja)

| Tarea | ¿La hace la web? | ¿Quién la hace? |
|-------|-----------------|-----------------|
| Escribir en Firestore | ❌ No | Backend |
| Recibir webhook de Flow | ❌ No | Backend (URL directa al backend) |
| Recibir webhook de MercadoPago | ❌ No | Backend (URL directa al backend) |
| Descontar inventario | ❌ No | Backend |
| Emitir boleta SII | ❌ No | Backend vía Bsale |
| Enviar email de confirmación | ❌ No | Backend |
| Firebase SDK | ❌ No necesario | Solo el backend usa Firebase Admin |

---

### Variables de entorno que necesita la web

Solo una variable nueva:

```env
BACKEND_URL=https://api.sanjeronimo.cl   # URL del backend en producción
# En desarrollo: http://localhost:3001
```

No necesitas `ERP_API_URL`, `ERP_API_KEY`, ni ninguna credencial de Firebase.

---

### Páginas nuevas que la web necesita crear

| Ruta | Descripción |
|------|-------------|
| `/pago-exitoso` | Pantalla de confirmación post-pago. Muestra mensaje de éxito y folio de boleta si está disponible. |
| `/pago-fallido` | Pantalla de error post-pago. Permite volver al carrito e intentar de nuevo. |

Ambas reciben `?orderId=xxx` en la URL. Si quieres mostrar el detalle del pedido (productos, total), puedes guardarlo en `localStorage` antes de redirigir a la pasarela.

---

### Resumen de responsabilidades final

| Proyecto | Responsabilidad |
|----------|----------------|
| **Web** | UI, carrito, checkout form, llamar al backend, páginas de resultado |
| **Backend** | Crear pedidos, procesar pagos, inventario, boleta SII, emails |
| **ERP** | Panel interno, ver pedidos procesados, despacho, contabilidad |
| **Firestore** | Base de datos compartida (solo el backend escribe, el ERP lee) |

---

> 💬 **Agente Web**: tu trabajo en la integración se simplificó bastante. El checkout actual que genera un link de WhatsApp se reemplaza por una llamada `fetch` al backend. Todo lo demás (pagos, inventario, boleta) lo resuelve el backend solo. Lo único que tienes que construir además es la página `/pago-exitoso` y `/pago-fallido`.
