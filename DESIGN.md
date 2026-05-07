---
name: Sour San Jerónimo
description: Pisco sour artesanal premium — directo a tu copa, directo a tu carrito
colors:
  primary: "#162B45"
  accent: "#128708"
  warm-cream: "#FAF3DE"
  surface: "#ffffff"
  surface-border: "#f3f4f6"
  surface-border-hover: "#e5e7eb"
  text-muted: "#6b7280"
  text-inactive: "#9ca3af"
  amber-accent: "#F5A300"
  sky-accent: "#38BDF8"
typography:
  display:
    fontFamily: "'Phosphate Inline', Phosphate, sans-serif"
    fontSize: "clamp(4rem, 8vw, 6rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.05em"
  script:
    fontFamily: "'SignPainter HouseScript', cursive"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
  headline:
    fontFamily: "'Geist Sans', system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'Geist Sans', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "'Geist Sans', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.2em"
rounded:
  pill: "9999px"
  card: "16px"
  dropdown: "12px"
spacing:
  section-y: "80px"
  card: "32px"
  gap: "24px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
  button-sabor-pill:
    backgroundColor: "transparent"
    textColor: "{colors.text-inactive}"
    rounded: "{rounded.pill}"
    padding: "6px 16px"
  button-sabor-pill-active:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "6px 16px"
  card-flavor:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "{spacing.card}"
  cart-button:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
---

# Design System: Sour San Jerónimo

## 1. Overview

**Creative North Star: "El Encuentro Premium"**

Este sistema de diseño existe para convertir la visita en un momento de deseo. No es un catálogo, es una invitación. Cada pantalla debe evocar el mismo sentimiento que produce abrir una botella buena con alguien importante: anticipación, confianza, placer. El diseño no explica el producto, lo hace irresistible.

La paleta azul noche + crema + verde vivo no es una combinación decorativa: azul es la autoridad, crema es la calidez, verde es la acción. Juntos comunican "esto es serio y vale la pena" sin necesidad de una sola línea de copy explicativo. La tipografía Phosphate en display y SignPainter en el tagline son el carné de identidad de la marca: una voz única que ninguna otra bebida tiene.

Lo que este sistema rechaza explícitamente: paletas genéricas de supermercado (rojos-amarillos de bebidas masivas), estética de startup SaaS (gradientes azul-morado, hero con mockup), y sobrecarga decorativa (glassmorphism, gradient text, border-left stripes). La elegancia aquí viene de la sobriedad, no de los efectos.

**Key Characteristics:**
- Fondo beige cálido como lienzo principal en secciones de marca, blanco en secciones de producto
- Tipografía de impacto en display (Phosphate), funcional en cuerpo (Geist)
- Verde exclusivo para acciones de compra; nunca decorativo
- Movimiento suave y continuo en elementos de producto (float, fade); nunca mecánico
- Composición asimétrica en secciones editoriales; grids limpios en catálogo de sabores

## 2. Colors: La Paleta del Encuentro

Una paleta de tres roles con carácter definido: cada color sabe exactamente para qué existe.

### Primary
- **Azul Noche Andina** (`#162B45`): El color de la marca. Fondos de autoridad (navbar, footer, slide hero), texto de mayor jerarquía, y cualquier elemento que deba decir "esta marca sabe lo que hace". Nunca diluido ni sustituido por navy genérico.

### Secondary
- **Verde Pisco** (`#128708`): El color de la compra. Reservado exclusivamente para CTAs ("Agregar al carrito", "Lo quiero", "Comprar ahora"), badges de estado activo, y highlights de interacción. Su rareza en pantalla es su poder.
- **Crema de Temporada** (`#FAF3DE`): El color de la calidez. Fondo de secciones de marca (Hero slide 1, Benefits, Flavors). Nunca como fondo de UI funcional (formularios, cards de producto).

### Tertiary
- **Ámbar Maracuyá** (`#F5A300`): Acento del sabor Maracuyá. Solo en contexto de ese producto (pills, líneas de color, CTA dinámico). Nunca como color general de la marca.
- **Celeste Sin Azúcar** (`#38BDF8`): Acento del sabor Sin Azúcar. Misma regla que el ámbar.

### Neutral
- **Blanco Limpio** (`#ffffff`): Superficie de cards de producto, fondo de FeatureProduct y Checkout. Base neutra que hace resaltar los colores de sabor.
- **Borde Suave** (`#f3f4f6`): Borde en reposo de cards de sabor. Presencia mínima, suficiente para definir.
- **Borde Hover** (`#e5e7eb`): Borde al hacer hover. El único feedback visual en cards; sin sombra.
- **Texto Secundario** (`#6b7280`): Descripción de productos, texto de apoyo. Contraste WCAG AA garantizado sobre blanco.
- **Texto Inactivo** (`#9ca3af`): Pills de sabor no seleccionadas. Nunca para texto de contenido importante.

### Named Rules
**La Regla del Verde Único.** Verde Pisco solo aparece en CTAs de compra y estados activos. Si un elemento verde no invita directamente a comprar o no indica estado seleccionado, no debe ser verde. Su escasez es la señal.

**La Regla de las Dos Temperaturas.** Beige cálido para las secciones de historia y marca. Blanco limpio para las secciones de producto y conversión. Nunca mezclar ambos fondos en la misma sección.

**La Identidad de Sabor.** Cada sabor tiene un color propio que lo identifica en cualquier contexto donde aparezca individualmente: Clásico → Verde `#128708`, Maracuyá → Ámbar `#F5A300`, Sin Azúcar → Celeste `#38BDF8`. En componentes con múltiples sabores (carrito, checkout, resumen de pedido), el nombre del producto, el badge de cantidad y los controles de ajuste de cantidad deben usar el color del sabor correspondiente. El color genérico `#162B45` no reemplaza al color de sabor en estos contextos.

## 3. Typography

**Display Font:** Phosphate Inline / Phosphate (sans-serif de impacto, solo disponible via CSS/sistema)
**Script Font:** SignPainter HouseScript (cargada localmente via @font-face)
**UI Font:** Geist Sans (variable, cargada via next/font)

**Character:** Tres voces distintas con un rol cada una. Phosphate grita la identidad, SignPainter susurra la historia, Geist Sans informa. La mezcla es deliberada y nunca debe homogeneizarse.

### Hierarchy
- **Display** (Phosphate, ~6rem mobile 4rem, weight normal, line-height 1, letter-spacing 0.05em): Solo para el nombre de la marca en el hero. Uppercase siempre. Nunca en secciones secundarias.
- **Script** (SignPainter, ~3.5rem, weight normal, line-height 1.2): Solo para el tagline "Un Sour con historia" y frases evocadoras en contexto de marca. Nunca para información funcional.
- **Headline** (Geist Sans bold, clamp(2.25rem, 5vw, 3rem), line-height 1.15, letter-spacing -0.02em): Títulos de sección ("Elige el tuyo", "Hecho como debe ser", "El equilibrio perfecto"). Tracking tight siempre.
- **Body** (Geist Sans 400, 1rem/16px, line-height 1.6): Descripciones de producto, texto de soporte. Máximo 65ch de ancho. Color: text-muted sobre fondos claros.
- **Label** (Geist Sans 500, 0.75rem, letter-spacing 0.2em, uppercase): Subtítulos de navegación internos ("SOUR SAN JERÓNIMO" debajo de CTA en hero), etiquetas de categoría, separadores de sección.

### Named Rules
**La Regla de las Tres Voces.** Phosphate, SignPainter y Geist tienen territorios exclusivos. Phosphate nunca en cuerpo. SignPainter nunca en UI. Mezclarlas fuera de su contexto rompe el sistema de identidad.

## 4. Elevation

El sistema es plano por defecto. Las superficies de UI (navbar, cards, formularios) no tienen sombra. La profundidad se construye con color de fondo, borde y contraste tipográfico, no con z-axis.

La única excepción son las imágenes de botella en FeatureProduct y Flavors, que usan `drop-shadow` doble (sombra de contacto + sombra ambiental animada). Esta elevación es decorativa y narrativa, no estructural: dice "este objeto existe en el mundo real".

### Shadow Vocabulary
- **Sombra de producto** (`drop-shadow(0 8px 16px rgba(0,0,0,0.15))`): Botella en cards de sabor. Sensación de objeto físico.
- **Sombra de contacto animada** (`0 0 blur-2xl, w-[140-180px], h-[22px], bg-black, rounded-full`): Sombra en el suelo bajo la botella flotante en FeatureProduct. Se anima con `shadow-pulse` sincronizado.
- **Sombra de navbar** (`shadow-sm`): La más discreta. Solo define separación del navbar del contenido, sin protagonismo.

### Named Rules
**La Regla Plana por Defecto.** Si no es una botella de producto, no tiene sombra. Cards, modales, dropdowns usan borde o fondo diferenciado en lugar de `box-shadow`. La sombra es privilegio del producto, no del UI.

## 5. Components

### Buttons
El CTA es directo y no pide permiso. La elegancia está en la ejecución, no en la contención.

- **Shape:** Completamente redondeado (pill, `border-radius: 9999px`). Nunca cuadrado ni con esquinas apenas redondeadas.
- **Primary (Comprar / Agregar al carrito):** Verde Pisco `#128708`, texto blanco, padding `14px 28px`. El único botón verde de toda la interfaz.
- **Hover:** `opacity: 0.85` + `scale(1.02)`, transición 300ms ease-out. El botón "cede" ligeramente al tacto, sensación de calidad.
- **Sabor pill (selector de variante):** Fondo transparente o tinte 10% del color del sabor, texto en color del sabor. Al seleccionar: fondo tinte 10%, color sólido del sabor. Border-radius: pill.
- **Ghost (navegación):** Sin fondo, texto Azul Noche Andina o blanco según contexto, hover con underline.

### Chips / Pills
Usadas en FeatureProduct para selección de variante de sabor. Color dinámico según el sabor activo.

- **Inactivo:** Fondo transparente, texto `#9ca3af`. 
- **Activo:** Fondo tinte 10% del color del sabor (`{color}18`), texto en color del sabor.
- **Tamaño:** `px-4 py-1.5`, texto sm, font-medium, tracking-wide.

### Cards / Containers
- **Corner Style:** Gently curved (16px radius, `rounded-2xl`)
- **Background:** Blanco `#ffffff`
- **Shadow Strategy:** Sin sombra. Profundidad vía borde.
- **Border:** `1px solid #f3f4f6` en reposo; `1px solid #e5e7eb` en hover. Transición 300ms.
- **Internal Padding:** 32px (`p-8`). Nunca menos de 24px.

### Inputs / Fields
- **Style:** Borde `1px solid #d1d5db` (gray-300), fondo blanco, radius `rounded-lg` (8px).
- **Focus:** Ring Azul Noche Andina (`ring-2 ring-[#162B45]`), transición suave.
- **Error:** Borde rojo, mensaje de error en texto pequeño debajo.
- **Disabled:** Fondo gray-50, texto gray-400, cursor not-allowed.

### Navigation
- **Estilo:** Fondo blanco, `shadow-sm`, posición fixed top-0, altura 80px.
- **Logo:** A la izquierda, enlaza al inicio.
- **Links:** Texto `#162B45`, font-medium, hover con underline. Dropdown con animación opacity + scale suave.
- **Cart button:** Ícono circular con badge de cantidad en Verde Pisco. A la derecha.
- **Mobile:** Links de navegación ocultos en mobile (solo carrito visible). Menú hamburguesa no implementado aún.

### Carrusel de Sabores (Signature Component)
El corazón de la landing. La botella flotante con animación, pills de selección y transición fade+translateY definen la identidad de producto.

- Cambio de sabor: `opacity: 0 + translateY(12px)` → 300ms → `opacity: 1 + translateY(0)`.
- La línea de color superior e inferior del wrapper cambia al color del sabor activo con `transition-colors 500ms`.
- El botón CTA toma el color del sabor activo dinámicamente.
- Autoplay cada 6 segundos. El usuario puede interrumpir con click en pill.

## 6. Do's and Don'ts

### Do:
- **Do** usar Verde Pisco (`#128708`) exclusivamente en CTAs de compra. Nunca como color decorativo o de sección.
- **Do** usar Crema de Temporada (`#FAF3DE`) como fondo de secciones de historia y marca (Hero, Benefits, Flavors).
- **Do** aplicar `letter-spacing: -0.02em` en headlines de Geist Sans para sensación premium y tight.
- **Do** usar pill radius (`border-radius: 9999px`) en todos los botones primarios y chips de selección.
- **Do** animar el producto (botella, imagen) con movimiento suave y continuo. Es lo que hace sentir que el sour es real.
- **Do** construir profundidad con borde + color de fondo. Sombra solo en imágenes de producto.
- **Do** mantener el copy corto y en primera persona del producto: "Lo quiero", "Elige el tuyo", "Sin atajos."
- **Do** usar `drop-shadow` en las botellas para darles presencia física. Es la sombra más importante del sistema.

### Don't:
- **Don't** usar look de góndola de supermercado: paletas rojo-amarillo, tipografías redondeadas genéricas, descuentos prominentes como principal hook visual.
- **Don't** usar estética de startup SaaS: gradientes azul-morado, hero con mockup de app, métricas en cards flotantes.
- **Don't** usar `background-clip: text` con gradiente. Nunca gradient text. El nombre de la marca va en color sólido.
- **Don't** usar `border-left` grueso como acento de color en cards, callouts o separadores. Reescribir con fondo o borde completo.
- **Don't** usar glassmorphism. Sin blur decorativo ni fondo con `backdrop-filter`. No corresponde al universo de la marca.
- **Don't** repetir el mismo card idéntico más de 3 veces en fila. Las cards de sabor ya son 3; si se agregan más, revisar layout.
- **Don't** usar Verde Pisco en iconografía, separadores, ilustraciones o cualquier elemento que no sea acción de compra.
- **Don't** mezclar Phosphate o SignPainter en elementos de UI funcional (formularios, labels, estados de error). Esas fuentes son de marca, no de interfaz.
- **Don't** animar con `bounce` ni `elastic`. Solo `ease-out` con curvas exponenciales o `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Don't** añadir sombra a cards de UI. La sombra es privilegio del producto físico, no de los contenedores de interfaz.
