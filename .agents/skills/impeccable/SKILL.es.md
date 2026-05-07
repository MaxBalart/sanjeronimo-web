# Impeccable — Referencia en español

> Diseña e itera interfaces frontend de nivel producción. Código real, decisiones de diseño comprometidas, artesanía excepcional.

---

## Setup (no opcional)

Antes de cualquier trabajo de diseño o edición de archivos, pasar estas puertas. Saltárselas produce output genérico que ignora el proyecto.

| Puerta | Verificación | Si falla |
|---|---|---|
| Contexto | El resultado del loader de PRODUCT.md / DESIGN.md es conocido. | Ejecutar `node scripts/load-context.mjs` antes de continuar. |
| Producto | PRODUCT.md existe y no está vacío ni tiene placeholders (`[TODO]`, <200 chars). | Ejecutar `/impeccable teach`, refrescar contexto, luego continuar. |
| Comando | La referencia del sub-comando está cargada. | Cargar la referencia antes de continuar. |
| Craft | `/impeccable craft` tiene un brief de diseño confirmado por el usuario. PRODUCT.md nunca cuenta como shape. | Ejecutar `/impeccable shape` y esperar confirmación. |
| Imagen | Las probes visuales requeridas están generadas o saltadas con razón. | Resolver la puerta de imagen antes del código. |
| Mutación | Todas las puertas activas pasan. | No editar archivos del proyecto aún. |

---

## Registro: brand vs product

Toda tarea de diseño es **brand** o **product**:

- **Brand**: la web ES el producto (landing pages, marketing, campañas, portfolios). El diseño es lo que se está construyendo.
- **Product**: la web SIRVE al producto (app UI, admin, dashboards, tools). El diseño sirve a la funcionalidad.

---

## Leyes de diseño compartidas

### Color

- Usar OKLCH. Reducir chroma cuando lightness se acerca a 0 o 100.
- Nunca usar `#000` o `#fff`. Tintear cada neutral hacia el hue de marca (chroma 0.005–0.01 es suficiente).
- **Estrategias de color** (elegir una antes de elegir colores):
  - **Restrained**: neutrales tintados + un acento ≤10%. Default para product; minimalismo de marca.
  - **Committed**: un color saturado ocupa 30–60% de la superficie. Default para brand con identidad fuerte.
  - **Full palette**: 3–4 roles de color, cada uno deliberado. Campañas; data viz.
  - **Drenched**: la superficie ES el color. Heroes de marca, páginas de campaña.

### Tema (dark vs light)

No es un default. Antes de elegir, escribe una oración de escena física: quién usa esto, dónde, bajo qué luz ambiental, con qué estado de ánimo. Si la oración no fuerza la respuesta, no es suficientemente concreta.

### Tipografía

- Limitar el largo de línea del body a 65–75ch.
- Jerarquía a través de escala + contraste de peso (ratio ≥1.25 entre pasos). Evitar escalas planas.

### Layout

- Variar el spacing para ritmo. El mismo padding en todas partes es monotonía.
- Las cards son la respuesta lazy. Usarlas solo cuando son realmente el mejor affordance. Las cards anidadas son siempre incorrectas.
- No envolver todo en un contenedor. La mayoría de cosas no necesitan uno.

### Motion

- No animar propiedades de layout CSS.
- Ease out con curvas exponenciales (ease-out-quart / quint / expo). Sin bounce, sin elastic.

### Prohibiciones absolutas

- **Border-stripe lateral**: `border-left` o `border-right` > 1px como acento de color. Nunca. Reescribir con bordes completos, tintes de fondo, o nada.
- **Gradient text**: `background-clip: text` con gradiente. Nunca. Usar color sólido.
- **Glassmorphism como default**: blurs y glass cards decorativos. Raro y con propósito, o nada.
- **Hero-metric template**: número grande + label pequeño + stats de soporte + acento gradiente. Cliché de SaaS.
- **Grillas de cards idénticas**: mismas cards con ícono + heading + texto, repetidas sin fin.
- **Modal como primer pensamiento**: los modales son usualmente pereza. Agotar alternativas inline / progresivas primero.

### Copy

- Cada palabra gana su lugar. Sin headings repetidos, sin intros que repitan el título.
- **Sin em dashes**. Usar comas, dos puntos, punto y coma, paréntesis o puntos. Tampoco `--`.

---

## Comandos disponibles

| Comando | Categoría | Descripción |
|---|---|---|
| `craft [feature]` | Construir | Shape + build de un feature end-to-end |
| `shape [feature]` | Construir | Planificar UX/UI antes de escribir código |
| `teach` | Construir | Configurar PRODUCT.md y DESIGN.md |
| `document` | Construir | Generar DESIGN.md desde el código existente |
| `extract [target]` | Construir | Extraer tokens y componentes reutilizables |
| `critique [target]` | Evaluar | Revisión de diseño UX con scoring heurístico |
| `audit [target]` | Evaluar | Checks técnicos de calidad (a11y, perf, responsive) |
| `polish [target]` | Refinar | Pase final de calidad antes de shipear |
| `bolder [target]` | Refinar | Amplificar diseños seguros o aburridos |
| `quieter [target]` | Refinar | Bajar el tono de diseños agresivos |
| `distill [target]` | Refinar | Reducir a la esencia, eliminar complejidad |
| `harden [target]` | Refinar | Listo para producción: errores, i18n, edge cases |
| `onboard [target]` | Refinar | Diseñar flujos de primera vez y estados vacíos |
| `animate [target]` | Mejorar | Agregar animaciones propositivas |
| `colorize [target]` | Mejorar | Agregar color estratégico a UIs monocromáticas |
| `typeset [target]` | Mejorar | Mejorar jerarquía tipográfica y fuentes |
| `layout [target]` | Mejorar | Corregir spacing, ritmo y jerarquía visual |
| `delight [target]` | Mejorar | Agregar personalidad y toques memorables |
| `overdrive [target]` | Mejorar | Empujar más allá de los límites convencionales |
| `clarify [target]` | Corregir | Mejorar copy de UX, labels y mensajes de error |
| `adapt [target]` | Corregir | Adaptar para diferentes dispositivos |
| `optimize [target]` | Corregir | Diagnosticar y corregir rendimiento de UI |
| `live` | Iterar | Modo variantes visuales en el browser |

---

## Reglas de routing

1. **Sin argumento**: mostrar el menú de comandos. Preguntar qué quiere hacer el usuario.
2. **Primera palabra coincide con un comando**: cargar su referencia y seguir sus instrucciones. Todo lo que sigue es el target.
3. **Primera palabra no coincide**: invocación general de diseño. Aplicar setup, leyes y referencia de registro.

---

## Leyes del registro brand

### Test de slop de brand

Si alguien puede mirar esto y decir "esto lo hizo una IA" sin dudar, falló. El bar es la distintividad.

**Test de segunda orden de aesthetic lane**: antes de comprometerse con movidas, nombrar la referencia. Una página estilo Klim es un lane; Stripe-minimal es otro; Liquid-Death-acid-maximalism es otro. No derivar hacia estética editorial-magazine en un brief que no es editorial.

### Fuentes para brand

Procedimiento de selección:
1. Leer el brief. Escribir tres palabras concretas de voz de marca. No "moderno" o "elegante", sino "cálido y mecánico y opinado".
2. Listar las tres fuentes que sacarías por reflejo.
3. Si alguna está en la lista de rechazo, rechazarla — son defaults de training data que crean monocultura.

**Lista de rechazo**: Fraunces · Newsreader · Lora · Crimson · Playfair Display · Cormorant · Syne · IBM Plex · Space Mono · Space Grotesk · Inter · DM Sans · Instrument Sans · Instrument Serif

**Lanes estéticos saturados** (evitar sin razón de registro que lo requiera):
- **Editorial-tipográfico**: serif display (a menudo italic) + labels mono pequeños + separadores de regla + restricción monocromática. Influencia Klim, afectación de portada de revista.

### Layout para brand

- Las composiciones asimétricas son una opción. Romper la grilla intencionalmente para énfasis.
- No centrar todo por defecto. Left-aligned con layouts asimétricos se siente más diseñado.

### Imágenes para brand

Las superficies de brand se apoyan en imágenes. Una landing page de restaurante, hotel o producto sin imágenes se siente incompleta. **Cero imágenes es un bug, no una elección de diseño.**

### Motion para brand

Un reveal bien orquestado al cargar la página con entradas escalonadas puede ser más efectivo que micro-interacciones dispersas.

---

## Contexto para este proyecto

Para San Jerónimo, los archivos de contexto son:
- `PRODUCT.md` — estrategia, usuarios, personalidad de marca, principios
- `DESIGN.md` — tokens de color, tipografía, componentes, reglas visuales

Siempre cargar ambos antes de cualquier trabajo de diseño con:
```bash
node .claude/skills/impeccable/scripts/load-context.mjs
```
