# Design — ChullaVoz

<!-- impeccable:design-schema 1 -->

## Visual World

**Cuaderno de cuentas del tendero** — Operate surface. El dashboard es un libro contable de mercado, no un reporte gris. Mundo presta solo tipo, paleta, densidad y gesto manuscrito; layout, nav y controles son estándar web. Inspiración: kraft de papel estraza, papel encalado de cuaderno, reglas sepia, tinta grafito, acentos arcilla y ledger blue. Densidad alta, todo a la vista en primera vista.

## Palette

* `kraft` #F5EFE6 — ground página
* `paper` #FFFCF8 — cards, inputs
* `ink` #1A1A18 — texto primario
* `ink-60` #5C5C59 — secundario
* `ink-40` #9A9A96 — terciario / placeholder
* `sepia` #8B6F4E — reglas, labels small-caps, bordes
* `sepia-20` #E8DDD0 — hairline, dividers
* `sepia-10` #F0E8DC — hover
* `clay` #C84B31 — acción primaria, negativos, subrayado manuscrito
* `ledger` #2B5A83 — links, datos, foco
* `success` #1B7A4D — positivos
* Uso: `clay` solo para acción/negativo, `ledger` para estado/data, `success` para positivo. Fondo nunca blanco puro sobre kraft; siempre `paper`.

## Type

* Display: **Instrument Serif** 400, -0.02 a -0.03em, 28–52px para títulos de negocio. Self-hosted via `@fontsource/instrument-serif`.
* Body/UI: **Inter** 400/500/600, 12–14px, 65–75ch, tracking normal.
* Numerals: **JetBrains Mono** 400/500 tabular-nums para KPIs, ratings, IDs, porcentajes. Clase `.tabular`.

## Density & Spacing

* 4/8 grid. Gaps 12–16px entre cards, 24px entre secciones. Más espacio arriba del heading que debajo. Border radius 12–16px cards, 999px para pills/botones. Bordes 1px `sepia-20`, sin sombras soft. Dividers 1–2px sepia. Densidad ledger: información primero, aire después.

## Signature Move

**Línea manuscrita** — subrayado a mano alzada bajo "de cuentas" (svg path `M2 6 Q 60 1 100 4 T 198 3`, stroke clay 1.8) y transición `asentando` al agregar review. Es el único gesto del mundo; no hay textura de papel ni ilustración.

## Components

* **Top bar** kraft sticky, 64px, border sepia-20, inner nav con logo serif + pill businessId mono + actions. Manuscript underline 3px repeating sepia.
* **Metric tira** 3 cards `paper` con top rule 2px (sepia / ledger / clay|success según semántica), numeral mono 36px, label 10px small-caps sepia.
* **Panel** `paper` border sepia-20, radius 16, header con label 10px sepia + title serif 18px, content con grid sepia.
* **Form ledger** header con `Nuevo asiento`, inputs 40px height, radius 10–12, border sepia-20, focus ledger. Range accent ink.
* **Recommendation note** `paper` card con número ledger en círculo + texto 13px ink-60.
* **Charts** Recharts sobre `paper`: grid sepia dashed 2 4, bars ledger degradado, pie con innerRadius 62, stroke paper 2, tooltip radius 12.

## Motion

Un solo momento: `in` 0.25s ease (opacity 0→1 + translateY 4→0) al abrir form. Spin ledger para loading. Sin entradas por sección.

## Browser Surfaces

* `::selection` clay / white, `::-moz-selection` igual
* `scrollbar` thin sepia-20, caret clay, `focus-visible` 2px ledger offset 2, placeholder ink-40

## Responsive

* Desktop 1280 max, 3-col tira → stack en md. Dos paneles 50/50 → stack lg. Charts 240px height fixed. Mobile: top bar actions colapsan, title 40px, gaps 12px, inputs full width.

## Accessibility

* Contraste ink sobre kraft/paper ≥4.5:1, sepia labels tinted, no gray sobre color. Focus visible ledger. Tablas no usadas como layout; charts con Tooltip legible. Reduce-motion respeta `prefers-reduced-motion` (sin strobing, solo `in`).

