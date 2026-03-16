# skill-licitaciones

```
██╗      ██╗  ██████╗ ██╗ ████████╗  █████╗   ██████╗ ██╗  ██████╗  ███╗   ██╗ ███████╗ ███████╗
██║      ██║ ██╔════╝ ██║ ╚══██╔══╝ ██╔══██╗ ██╔════╝ ██║ ██╔═══██╗ ████╗  ██║ ██╔════╝ ██╔════╝
██║      ██║ ██║      ██║    ██║    ███████║ ██║      ██║ ██║   ██║ ██╔██╗ ██║ █████╗   ███████╗
██║      ██║ ██║      ██║    ██║    ██╔══██║ ██║      ██║ ██║   ██║ ██║╚██╗██║ ██╔══╝   ╚════██║
███████╗ ██║ ╚██████╗ ██║    ██║    ██║  ██║ ╚██████╗ ██║ ╚██████╔╝ ██║ ╚████║ ███████╗ ███████║
╚══════╝ ╚═╝  ╚═════╝ ╚═╝    ╚═╝    ╚═╝  ╚═╝  ╚═════╝ ╚═╝  ╚═════╝  ╚═╝  ╚═══╝ ╚══════╝ ╚══════╝

███████╗ ██╗  ██╗ ██╗ ██╗      ██╗      ███████╗
██╔════╝ ██║ ██╔╝ ██║ ██║      ██║      ██╔════╝
███████╗ █████╔╝  ██║ ██║      ██║      ███████╗
╚════██║ ██╔═██╗  ██║ ██║      ██║      ╚════██║
███████║ ██║  ██╗ ██║ ███████╗ ███████╗ ███████║
╚══════╝ ╚═╝  ╚═╝ ╚═╝ ╚══════╝ ╚══════╝ ╚══════╝   
```

Skills de Claude para buscar, evaluar y licitar en contrataciones públicas de **México** y **Argentina** usando la API de [LicitaYa](https://www.licitaya.com.mx).

> Pensado para equipos comerciales, consultoras y pymes que quieran automatizar la prospección de licitaciones gubernamentales y armar propuestas completas sin salir de Claude.

---

## Instalación rápida

```bash
npx github:dylanszejnblum/skill-licitaciones
```

El instalador copia los skills a `~/.claude/skills/` y te guía paso a paso con la configuración.

---

## Qué incluye

Se instalan dos skills complementarios:

### `licitaya-mx` — Wrapper de la API

Skill enfocado en la interacción directa con la API de LicitaYa. Usalo cuando necesitás buscar, ver o gestionar licitaciones rápidamente sin el flujo guiado completo.

**Se activa con frases como:**
- "buscar licitaciones"
- "search tenders"
- "encontrar contratos del gobierno"
- "ver licitación [ID]"
- "marcar licitación como favorita"

**Qué puede hacer:**
- Buscar licitaciones con filtros por palabra clave, ubicación, rango de monto y fecha
- Búsqueda inteligente con IA (`smartsearch=1`)
- Ver el detalle completo de una licitación por ID
- Dar like / quitar like (guardar en favoritos)
- Agregar notas privadas a una licitación
- Excluir licitaciones irrelevantes de tu lista

---

### `tender-manager` — Gestor de ciclo completo

Un socio estratégico que te guía por todo el proceso de licitación pública, desde encontrar oportunidades hasta armar y presentar la propuesta completa.

**Se activa con frases como:**
- "gestionar mis licitaciones"
- "buscar licitaciones para mi empresa"
- "ayudame a licitar un contrato"
- "cotizar licitación"
- "me conviene participar en esta?"
- "escribir una propuesta"
- "quiero participar en una licitación"

**Fases del flujo de trabajo:**

| Fase | Qué hace |
|---|---|
| **0 — Perfil de empresa** | Setup inicial (una sola vez): sector, capacidades, palabras clave, rango de montos |
| **1 — Escaneo** | Búsquedas múltiples ajustadas a tu perfil, resultados rankeados por puntaje de fit |
| **2 — Go/No-Go** | Scorecard de 6 dimensiones: capacidad, timeline, margen, competencia, riesgo, valor estratégico |
| **3 — Cotización** | Desglose de costos estructurado (mano de obra, materiales, overhead, margen, IVA) con benchmarks de mercado |
| **4 — Propuesta** | *Propuesta técnica* + *propuesta económica* completas en español formal gubernamental |
| **5 — Seguimiento** | Checklist de presentación, vista de pipeline, historial guardado como comentarios en la licitación |

**Biblioteca de referencia incluida:**
- `cotizacion-guide.md` — Tarifas y márgenes de referencia por sector (IT, construcción, servicios, insumos)
- `proposal-templates.md` — Secciones de propuesta listas para completar (carta de presentación, metodología, equipo, tabla de precios, condiciones comerciales)
- `evaluation-framework.md` — Rúbricas de scoring go/no-go por tipo de contrato, red flags y trampas comunes
- `licitaya-api.md` — Referencia rápida de la API

---

## Requisitos

### API key de LicitaYa

Los dos skills necesitan una API key de LicitaYa. Podés obtener una en [licitaya.com.mx](https://www.licitaya.com.mx) (México) o [licitaya.com.ar](https://www.licitaya.com.ar) (Argentina).

Configurala como variable de entorno:

```bash
# Agregá esto a tu ~/.zshrc o ~/.bashrc para que persista
export LICITAYA_API_KEY=tu_api_key_acá
```

O configurala por sesión antes de abrir Claude Code:

```bash
LICITAYA_API_KEY=tu_api_key_acá claude
```

### Claude Code o Claude.ai

Los skills funcionan en ambos:
- **Claude Code** — los skills van en `~/.claude/skills/` (el instalador lo hace automáticamente)
- **Claude.ai** — andá a Settings > Capabilities > Skills > Upload skill (subí cada carpeta como zip por separado)

---

## Ejemplos de uso

### Búsqueda rápida de licitaciones

```
busca licitaciones de tecnología en Jalisco con presupuesto entre 500k y 5M pesos
```

### Flujo completo de licitación

```
quiero participar en licitaciones — ayudame a configurar mi empresa y encontrar oportunidades
```

Claude va a:
1. Preguntarte sobre tu empresa (una sola vez por sesión)
2. Correr varias búsquedas ajustadas a tu perfil
3. Puntuar cada oportunidad y recomendarte las mejores
4. Para cada decisión GO: armar la cotización y después escribir la propuesta completa

### Solo cotización

```
cotiza esta licitación: [pegá la descripción o el ID del tender]
```

### Consultar una licitación específica

```
dame los detalles de la licitación [ID] y decime si vale la pena participar
```

---

## Estructura de archivos

```
skill-licitaciones/
├── .gitignore
├── package.json                    # Metadata del paquete y script de instalación
├── bin/
│   └── install.js                  # Instalador interactivo (npx)
├── licitaya-mx/
│   ├── SKILL.md                    # Instrucciones del skill + frontmatter
│   └── references/
│       └── api-reference.md        # Referencia completa de parámetros de la API
│
└── tender-manager/
    ├── SKILL.md                    # Instrucciones del flujo de ciclo completo
    └── references/
        ├── cotizacion-guide.md     # Benchmarks de costos por sector
        ├── proposal-templates.md   # Templates de propuesta gubernamental en español
        ├── evaluation-framework.md # Rúbricas de scoring go/no-go
        └── licitaya-api.md         # Referencia rápida de la API
```

---

## Instalación manual

Si preferís no usar npx:

```bash
# Cloná el repo
git clone https://github.com/dylanszejnblum/skill-licitaciones.git

# Copiá los skills al directorio de Claude
cp -r skill-licitaciones/licitaya-mx ~/.claude/skills/
cp -r skill-licitaciones/tender-manager ~/.claude/skills/
```

---

## Actualización

Para obtener la última versión:

```bash
npx github:dylanszejnblum/skill-licitaciones@latest
```

El instalador te pregunta antes de sobreescribir skills existentes.

---

## Cobertura de la API

| Endpoint | Método | Skill |
|---|---|---|
| `/tender/search` | GET | Ambos |
| `/tender/{tenderId}` | GET | Ambos |
| `/tender/like` | POST | Ambos |
| `/tender/newcomment` | POST | Ambos |
| `/tender/erase` | POST | Ambos |

Soporta los endpoints de México (`licitaya.com.mx`) y Argentina (`licitaya.com.ar`).

---

## Contribuir

Si te sirvió, dejá una star en el repo. Si encontrás un bug o querés sugerir algo, abrí un [issue](https://github.com/dylanszejnblum/skill-licitaciones/issues) o mandá un PR.

---

## Licencia

MIT
