# Ingeniería de Diseño (Emil Kowalski)

> Filosofía de UI de Emil Kowalski: los detalles invisibles que hacen que el software se sienta bien.
> Skill original: [animations.dev](https://animations.dev/)

---

## Respuesta inicial

Cuando se invoca el skill sin pregunta específica, responder solo con:

> Estoy listo para ayudarte a construir interfaces que se sientan bien. Mi conocimiento viene de la filosofía de diseño de Emil Kowalski. Si quieres profundizar, revisa su curso: [animations.dev](https://animations.dev/).

---

## Filosofía central

### El buen gusto se entrena, no nace

El buen gusto no es preferencia personal. Es un instinto entrenado: la capacidad de ver más allá de lo obvio y reconocer qué eleva. Se desarrolla rodeándose de trabajo excelente, pensando profundamente en por qué algo se siente bien, y practicando sin parar.

Al construir UI, no te limites a que funcione. Estudia por qué las mejores interfaces se sienten como se sienten. Desmonta animaciones. Inspecciona interacciones. Sé curioso.

### Los detalles invisibles se acumulan

La mayoría de los detalles los usuarios nunca los notan conscientemente. Ese es el punto. Cuando una función opera exactamente como alguien asume que debería, avanzan sin pensarlo dos veces. Ese es el objetivo.

> "Todos esos detalles invisibles se combinan para producir algo que es simplemente impresionante, como mil voces apenas audibles cantando en sintonía." — Paul Graham

### La belleza es apalancamiento

Las personas eligen herramientas basándose en la experiencia general, no solo en la funcionalidad. Los buenos defaults y las buenas animaciones son diferenciadores reales. La belleza está subutilizada en el software. Úsala como ventaja.

---

## Formato de revisión (obligatorio)

Cuando revises código de UI, DEBES usar una tabla markdown con columnas Antes/Después:

| Antes | Después | Por qué |
| --- | --- | --- |
| `transition: all 300ms` | `transition: transform 200ms ease-out` | Especifica propiedades exactas; evita `all` |
| `transform: scale(0)` | `transform: scale(0.95); opacity: 0` | Nada en el mundo real aparece de la nada |
| `ease-in` en dropdown | `ease-out` con curva custom | `ease-in` se siente lento; `ease-out` da feedback instantáneo |
| Sin estado `:active` en botón | `transform: scale(0.97)` en `:active` | Los botones deben responder al presionarlos |
| `transform-origin: center` en popover | `transform-origin: var(--radix-popover-content-transform-origin)` | Los popovers deben escalar desde su trigger (los modales se quedan centrados) |

---

## Framework de decisión de animaciones

### 1. ¿Debería animarse esto?

| Frecuencia | Decisión |
| --- | --- |
| +100 veces/día (atajos de teclado, command palette) | Sin animación. Nunca. |
| Decenas de veces/día (hover, navegación de listas) | Eliminar o reducir drásticamente |
| Ocasional (modales, drawers, toasts) | Animación estándar |
| Raro / primera vez (onboarding, formularios de feedback) | Puede agregar deleite |

**Nunca animes acciones iniciadas por teclado.** Estas acciones se repiten cientos de veces al día. La animación las hace sentir lentas y desconectadas.

Raycast no tiene animación de abrir/cerrar. Esa es la experiencia óptima para algo usado cientos de veces al día.

### 2. ¿Cuál es el propósito?

Cada animación debe tener una respuesta clara a "¿por qué anima esto?"

Propósitos válidos:
- **Consistencia espacial**: el toast entra y sale de la misma dirección
- **Indicación de estado**: un botón de feedback que morfea muestra el cambio de estado
- **Explicación**: una animación de marketing que muestra cómo funciona algo
- **Feedback**: un botón que escala al presionarse confirma que la interfaz escuchó al usuario
- **Evitar cambios abruptos**: elementos que aparecen o desaparecen sin transición se sienten rotos

### 3. ¿Qué easing usar?

```
¿El elemento entra o sale?
  Sí → ease-out (empieza rápido, se siente responsivo)
  No →
    ¿Se mueve/morfea en pantalla?
      Sí → ease-in-out (aceleración/desaceleración natural)
    ¿Es un hover/cambio de color?
      Sí → ease
    ¿Es movimiento constante (marquee, barra de progreso)?
      Sí → linear
    Default → ease-out
```

**Usa curvas de easing custom.** Los easings built-in de CSS son demasiado débiles:

```css
/* Ease-out fuerte para interacciones de UI */
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);

/* Ease-in-out fuerte para movimiento en pantalla */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);

/* Curva tipo cajón de iOS (de Ionic Framework) */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

**Nunca uses ease-in en animaciones de UI.** Empieza lento, hace que la interfaz se sienta torpe. Un dropdown con `ease-in` a 300ms se *siente* más lento que `ease-out` al mismo tiempo, porque ease-in retrasa el movimiento inicial — el momento exacto en que el usuario más está mirando.

### 4. ¿Qué tan rápido?

| Elemento | Duración |
| --- | --- |
| Feedback de presión de botón | 100–160ms |
| Tooltips, popovers pequeños | 125–200ms |
| Dropdowns, selects | 150–250ms |
| Modales, drawers | 200–500ms |
| Marketing / explicatorio | Puede ser más largo |

**Regla: las animaciones de UI deben quedarse bajo 300ms.**

---

## Animaciones de spring

Los springs se sienten más naturales que las animaciones basadas en duración porque simulan física real. No tienen duraciones fijas — se estabilizan según parámetros físicos.

### Cuándo usar springs
- Interacciones de arrastre con momentum
- Elementos que deben sentirse "vivos" (como el Dynamic Island de Apple)
- Gestos que pueden interrumpirse a mitad de la animación
- Interacciones decorativas de seguimiento de ratón

### Interacciones de ratón con spring

```jsx
import { useSpring } from 'framer-motion';

// Sin spring: se siente artificial, instantáneo
const rotation = mouseX * 0.1;

// Con spring: se siente natural, tiene momentum
const springRotation = useSpring(mouseX * 0.1, {
  stiffness: 100,
  damping: 10,
});
```

### Configuración

```js
// Enfoque de Apple (recomendado, más fácil de razonar)
{ type: "spring", duration: 0.5, bounce: 0.2 }

// Física tradicional (más control)
{ type: "spring", mass: 1, stiffness: 100, damping: 10 }
```

Mantén el bounce sutil (0.1–0.3). Evita bounce en la mayoría de contextos de UI.

---

## Principios de construcción de componentes

### Los botones deben sentirse responsivos

Agrega `transform: scale(0.97)` en `:active`. Esto da feedback instantáneo.

```css
.button {
  transition: transform 160ms ease-out;
}
.button:active {
  transform: scale(0.97);
}
```

### Nunca animes desde scale(0)

Nada en el mundo real desaparece y reaparece completamente. Empieza desde `scale(0.95)` con opacity.

```css
/* Mal */
.entering { transform: scale(0); }

/* Bien */
.entering { transform: scale(0.95); opacity: 0; }
```

### Haz que los popovers sean conscientes de su origen

Los popovers deben escalar desde su trigger, no desde el centro. **Excepción: los modales** — permanecen centrados porque no están anclados a un trigger específico.

```css
/* Radix UI */
.popover {
  transform-origin: var(--radix-popover-content-transform-origin);
}
```

### Tooltips: saltear el delay en hovers subsecuentes

Primer tooltip: delay antes de aparecer. Una vez que uno está abierto, los siguientes abren instantáneamente sin animación.

```css
.tooltip[data-instant] {
  transition-duration: 0ms;
}
```

### CSS transitions vs keyframes para UI interruptible

Las CSS transitions pueden interrumpirse y reorientarse a mitad de animación. Los keyframes reinician desde cero. Para interacciones que se pueden disparar rápidamente (toasts, toggles), usa transitions.

### Usa blur para enmascarar transiciones imperfectas

Cuando un crossfade entre dos estados se ve mal, agrega `filter: blur(2px)` durante la transición. El blur fusiona los dos estados visualmente, engañando al ojo para percibir una transformación suave.

Mantén el blur bajo 20px. El blur pesado es costoso, especialmente en Safari.

### Anima estados de entrada con @starting-style

```css
.toast {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 400ms ease, transform 400ms ease;

  @starting-style {
    opacity: 0;
    transform: translateY(100%);
  }
}
```

---

## clip-path para animaciones

`clip-path` es una de las herramientas de animación más poderosas en CSS.

### La forma inset

```css
/* Oculto desde la derecha */
.hidden { clip-path: inset(0 100% 0 0); }

/* Visible */
.visible { clip-path: inset(0 0 0 0); }
```

### Patrón hold-to-delete

- En reposo: `clip-path: inset(0 100% 0 0)`
- Al presionar (`:active`): transición a `inset(0 0 0 0)` en 2s linear
- Al soltar: vuelve con 200ms ease-out

**Timing asimétrico**: lento cuando el usuario decide (presionar), rápido cuando el sistema responde (soltar).

```css
/* Soltar: rápido */
.overlay { transition: clip-path 200ms ease-out; }

/* Presionar: lento y deliberado */
.button:active .overlay { transition: clip-path 2s linear; }
```

---

## Rendimiento

### Solo anima transform y opacity

Estas propiedades saltan layout y paint, corriendo en la GPU. Animar `padding`, `margin`, `height` o `width` dispara los tres pasos de rendering.

### Framer Motion: aceleración de hardware

Las propiedades shorthand de Framer Motion (`x`, `y`, `scale`) NO están aceleradas por hardware. Para acelerar por hardware, usa el string completo de `transform`:

```jsx
// NO acelerado por hardware
<motion.div animate={{ x: 100 }} />

// Acelerado por hardware
<motion.div animate={{ transform: "translateX(100px)" }} />
```

### CSS animations vs JS bajo carga

Las CSS animations corren fuera del main thread. Cuando el browser está ocupado cargando una página, las animaciones de Framer Motion (usando `requestAnimationFrame`) pierden frames. Las CSS animations se mantienen suaves.

---

## Accesibilidad

### prefers-reduced-motion

Las animaciones pueden causar mareo por movimiento. Reducir movimiento significa menos y más suaves animaciones, no cero. Mantén transiciones de opacity y color. Elimina movimiento y animaciones de posición.

```css
@media (prefers-reduced-motion: reduce) {
  .element {
    animation: fade 0.2s ease;
    /* Sin motion basado en transform */
  }
}
```

### Hover en dispositivos táctiles

```css
@media (hover: hover) and (pointer: fine) {
  .element:hover {
    transform: scale(1.05);
  }
}
```

Los dispositivos táctiles disparan hover en tap, causando falsos positivos. Encierra las animaciones de hover dentro de este media query.

---

## Animaciones stagger

Cuando múltiples elementos entran juntos, escalonar su aparición:

```css
.item {
  opacity: 0;
  transform: translateY(8px);
  animation: fadeIn 300ms ease-out forwards;
}

.item:nth-child(1) { animation-delay: 0ms; }
.item:nth-child(2) { animation-delay: 50ms; }
.item:nth-child(3) { animation-delay: 100ms; }

@keyframes fadeIn {
  to { opacity: 1; transform: translateY(0); }
}
```

Mantén los delays de stagger cortos (30–80ms entre items). Los delays largos hacen que la interfaz se sienta lenta. El stagger es decorativo — nunca bloquees la interacción mientras las animaciones de stagger están corriendo.

---

## Checklist de revisión

| Issue | Fix |
| --- | --- |
| `transition: all` | Especifica propiedades: `transition: transform 200ms ease-out` |
| Entrada desde `scale(0)` | Empieza desde `scale(0.95)` con `opacity: 0` |
| `ease-in` en elemento de UI | Cambia a `ease-out` o curva custom |
| `transform-origin: center` en popover | Apunta al trigger (los modales quedan exentos) |
| Animación en acción de teclado | Elimina la animación completamente |
| Duración > 300ms en elemento de UI | Reduce a 150–250ms |
| Hover sin media query | Agrega `@media (hover: hover) and (pointer: fine)` |
| Keyframes en elemento disparado rápidamente | Usa CSS transitions para interruptibilidad |
| Props `x`/`y` de Framer Motion bajo carga | Usa `transform: "translateX()"` para aceleración hardware |
| Misma velocidad de entrada y salida | Haz la salida más rápida (ej: entrada 2s, salida 200ms) |
| Todos los elementos aparecen a la vez | Agrega stagger delay (30–80ms entre items) |
