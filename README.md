<div align="center">
  <table>
    <thead>
      <tr>
        <th>
          <img src="https://github.com/RodrigoStranger/imagenes-la-salle/blob/main/logo_secundario_color.png?raw=true" width="150" />
        </th>
        <th>
          <span style="font-weight:bold;">UNIVERSIDAD LA SALLE DE AREQUIPA</span><br />
          <span style="font-weight:bold;">FACULTAD DE INGENIERÍAS Y ARQUITECTURA</span><br />
          <span style="font-weight:bold;">DEPARTAMENTO ACADEMICO DE INGENIERÍA Y MATEMÁTICAS</span><br />
          <span style="font-weight:bold;">CARRERA PROFESIONAL DE INGENIERÍA DE SOFTWARE</span>
        </th>
      </tr>
    </thead>
  </table>
</div>

<div align="center">
  <h2 style="font-weight:bold;">PARCIAL</h2>
</div>

## Curso: Inteligencia Artificial

- Docente: Vicente Enrique Machaca Arceda
- Semestre: 9no semestre

## Integrantes

1. Rodrigo Emerson Infanzon Acosta
2. Carlos Daniel Aguilar Chirinos
3. Enyelbert Anderson Panta Huaracha
4. Piero Omar De La Cruz Mancilla
5. Iben Omar Flores Polanco

## Tecnologias utilizadas

[![React][React]][react-site]
[![TypeScript][TypeScript]][ts-site]
[![Vite][Vite]][vite-site]
[![React Router][ReactRouter]][rr-site]
[![Radix UI][RadixUI]][radix-site]
[![Framer Motion][FramerMotion]][framer-site]
[![Lucide][Lucide]][lucide-site]
[![Tailwind Merge][TailwindMerge]][twmerge-site]
[![CVA][CVA]][cva-site]
[![Sonner][Sonner]][sonner-site]
[![Git][Git]][git-site]
[![GitHub][GitHub]][github-site]

[React]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-site]: https://react.dev/
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[ts-site]: https://www.typescriptlang.org/
[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[vite-site]: https://vitejs.dev/
[ReactRouter]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white
[rr-site]: https://reactrouter.com/
[RadixUI]: https://img.shields.io/badge/Radix_UI-111827?style=for-the-badge
[radix-site]: https://www.radix-ui.com/
[FramerMotion]: https://img.shields.io/badge/Framer_Motion-000000?style=for-the-badge&logo=framer&logoColor=white
[framer-site]: https://www.framer.com/motion/
[Lucide]: https://img.shields.io/badge/Lucide-111827?style=for-the-badge
[lucide-site]: https://lucide.dev/
[TailwindMerge]: https://img.shields.io/badge/tailwind--merge-0EA5E9?style=for-the-badge
[twmerge-site]: https://github.com/dcastil/tailwind-merge
[CVA]: https://img.shields.io/badge/class--variance--authority-111827?style=for-the-badge
[cva-site]: https://cva.style/docs
[Sonner]: https://img.shields.io/badge/Sonner-111827?style=for-the-badge
[sonner-site]: https://sonner.emilkowal.ski/
[Git]: https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white
[git-site]: https://git-scm.com/
[GitHub]: https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white
[github-site]: https://github.com/

## Descripcion del proyecto

Aplicacion web interactiva que demuestra el uso de **Algoritmos Geneticos (AG)** para resolver laberintos. Se debe encontrar el camino desde un punto de inicio (S) hasta una meta (E) en una cuadricula, evitando paredes y minimizando pasos. El algoritmo evoluciona poblaciones de individuos que codifican secuencias de movimientos hasta encontrar una solucion optima.

Ademas, incluye un modulo educativo que visualiza de forma independiente los operadores geneticos (seleccion, mutacion y cruce).

---

## Como funciona el Algoritmo Genetico

### Representacion del individuo (Cromosoma)

Cada individuo representa una posible solucion al laberinto. Su cromosoma es un arreglo de numeros enteros donde cada gen codifica un movimiento:

| Gen | Accion    | Descripcion    |
| --- | --------- | -------------- |
| 0   | Quedarse  | No se mueve    |
| 1   | Derecha   | Se mueve en +X |
| 2   | Izquierda | Se mueve en -X |
| 3   | Abajo     | Se mueve en +Y |
| 4   | Arriba    | Se mueve en -Y |

El cromosoma tiene una longitud igual al **limite de pasos** (por defecto 60), lo que significa que cada individuo ejecuta hasta 60 movimientos en el laberinto.

---

### Funcion de Fitness (Aptitud)

La funcion de fitness evalua que tan buena es una solucion. Se calcula como:

```
fitness = -distanciaFinal + (colisiones × penalizacionMuro) + (pasosDados × penalizacionPaso) + recompensaMeta
```

| Componente           | Valor por defecto | Proposito                                                                           |
| -------------------- | ----------------- | ----------------------------------------------------------------------------------- |
| `distanciaFinal`   | (euclidiana)      | Penaliza terminar lejos de la meta. Cuanto mas lejos, peor fitness.                 |
| `penalizacionMuro` | -12 por colision  | Penaliza chocar contra paredes. Castigo alto para desincentivar caminos imposibles. |
| `penalizacionPaso` | -1 por paso       | Penaliza recorridos largos. Incentiva eficiencia.                                   |
| `recompensaMeta`   | +600              | Recompensa grande por alcanzar la meta. Es el objetivo principal.                   |

**Por que estos valores:**

- La recompensa de meta (+600) es deliberadamente alta para que cualquier individuo que llegue a la meta tenga un fitness drasticamente superior.
- La penalizacion por muro (-12) es mucho mayor que la de paso (-1) porque chocar contra una pared es un movimiento completamente inutil, mientras que dar pasos extras al menos explora el espacio.
- La distancia euclidiana como penalizacion continua permite al algoritmo "guiar" a la poblacion progresivamente hacia la meta.

---

### Seleccion: Torneo (Tournament Selection)

Se utiliza **seleccion por torneo** con un tamaño de torneo de **5 individuos** por defecto.

**Funcionamiento:**

1. Se eligen K individuos al azar de la poblacion.
2. El individuo con mejor fitness entre los K seleccionados gana el torneo.
3. El ganador se convierte en padre para producir descendencia.
4. Se repite el proceso para seleccionar el segundo padre.

**Por que torneo con K=5:**

- **Presion selectiva controlada:** Con K=5, hay suficiente competencia para favorecer a los mejores, pero sin ser tan agresivo como para eliminar toda la diversidad (como seria K=50).
- **Balance diversidad/convergencia:** Un torneo pequeño (K=2-3) converge muy lentamente. Uno muy grande (K=10+) converge demasiado rapido y puede quedar atrapado en optimos locales.
- **Simplicidad:** No requiere calcular probabilidades complejas como la ruleta, ni ordenar toda la poblacion como el ranking.
- **Independencia de escala:** Funciona correctamente sin importar si los valores de fitness son positivos, negativos, o su magnitud.

---

### Cruce: Un Punto (Single-Point Crossover)

Se utiliza **cruce de un punto** para combinar los cromosomas de dos padres.

**Funcionamiento:**

1. Se selecciona un punto de corte aleatorio entre la posicion 1 y la longitud-1 del cromosoma.
2. El hijo recibe los genes del Padre A desde el inicio hasta el punto de corte.
3. Los genes restantes vienen del Padre B (desde el punto de corte hasta el final).

```
Padre A: [1, 3, 2, 0, 4, 1, 3, 2]
Padre B: [4, 0, 1, 3, 2, 4, 0, 1]
Punto de corte: 4
                    ↓
Hijo:    [1, 3, 2, 0, | 2, 4, 0, 1]
          ← Padre A →   ← Padre B →
```

**Por que cruce de un punto:**

- **Preserva secuencias contiguas:** En un laberinto, los movimientos consecutivos forman sub-rutas coherentes. El cruce de un punto preserva estas secuencias intactas de ambos padres.
- **Simplicidad computacional:** Es el operador de cruce mas simple y eficiente.
- **Efectividad demostrada:** Para problemas de navegacion con cromosomas lineales, es suficientemente efectivo sin la complejidad adicional del cruce uniforme o de dos puntos.

---

### Mutacion: Ciclica (Cyclic Mutation)

Se utiliza **mutacion ciclica** con una tasa de mutacion del **15%** por gen.

**Funcionamiento:**

- Para cada gen del cromosoma, con probabilidad del 15%, se incrementa su valor en 1 (modulo 5).
- Esto significa: 0→1, 1→2, 2→3, 3→4, 4→0.

```
Cromosoma original: [1, 3, 0, 4, 2, 1]
Genes mutados (pos 1 y 4):
Cromosoma mutado:   [1, 4, 0, 4, 3, 1]
                        ↑           ↑
```

**Por que mutacion ciclica:**

- **Cobertura completa:** Dado que hay exactamente 5 valores posibles (0-4), con suficientes generaciones cualquier gen puede alcanzar cualquier valor. Despues de como maximo 4 mutaciones sucesivas, un gen habra recorrido todos los estados posibles.
- **Cambio minimo:** Cada mutacion solo cambia el movimiento "un paso" en el ciclo, produciendo variaciones suaves en vez de saltos aleatorios drasticos.
- **Determinismo local:** A diferencia de una mutacion aleatoria pura, el operador ciclico es predecible en su efecto, facilitando la exploracion sistematica del espacio de busqueda.

**Por que 15% de tasa de mutacion:**

- Un cromosoma de 60 genes con 15% de mutacion cambia en promedio ~9 genes por generacion. Esto proporciona suficiente exploracion sin destruir las buenas soluciones heredadas de los padres.
- Tasas muy bajas (1-5%) hacen que el algoritmo se estanque en optimos locales.
- Tasas muy altas (30%+) destruyen la informacion genetica util y convierten la busqueda en algo casi aleatorio.

---

### Poblacion y Elitismo

**Tamaño de poblacion:** 100 individuos por defecto.

**Por que 100:**

- Suficientemente grande para mantener diversidad genetica y explorar multiples caminos simultaneamente.
- Suficientemente pequeño para que la evaluacion sea rapida y la visualizacion en tiempo real sea fluida.
- Es un estandar comun en AG para problemas de complejidad media.

**Elitismo:** Se preservan los **2 mejores individuos** de cada generacion sin modificacion.

**Por que elitismo:**

- **Garantia de no regresion:** El mejor individuo encontrado nunca se pierde. Sin elitismo, el cruce y la mutacion podrian destruir la mejor solucion accidentalmente.
- **Solo 2 individuos:** Se preservan pocos para no reducir la diversidad. Si se preservaran muchos, la poblacion convergeria demasiado rapido.

---

### Flujo completo de una generacion

```
┌─────────────────────────────────────────────────┐
│  1. Ordenar poblacion por fitness (descendente) │
└─────────────────────────┬───────────────────────┘
                          │
┌─────────────────────────▼───────────────────────┐
│  2. Copiar los 2 mejores (elitismo)             │
└─────────────────────────┬───────────────────────┘
                          │
┌─────────────────────────▼───────────────────────┐
│  3. Para los 98 individuos restantes:           │
│     a) Seleccionar Padre A (torneo K=5)         │
│     b) Seleccionar Padre B (torneo K=5)         │
│     c) Cruce de un punto → hijo                 │
│     d) Mutacion ciclica (15%) → hijo mutado     │
└─────────────────────────┬───────────────────────┘
                          │
┌─────────────────────────▼───────────────────────┐
│  4. Simular todos los individuos en el mapa     │
│     (ejecutar cromosoma como secuencia de       │
│      movimientos)                               │
└─────────────────────────┬───────────────────────┘
                          │
┌─────────────────────────▼───────────────────────┐
│  5. Calcular fitness de cada individuo          │
└─────────────────────────┬───────────────────────┘
                          │
┌─────────────────────────▼───────────────────────┐
│  6. Ordenar nuevamente y repetir                │
└─────────────────────────────────────────────────┘
```

---

### Simulacion del movimiento

Cada individuo se simula en el laberinto ejecutando sus genes en orden:

1. El agente empieza en la posicion de inicio (S).
2. Por cada gen del cromosoma, intenta moverse en la direccion indicada.
3. Si el movimiento lleva a una pared o fuera del mapa, se cuenta como **colision** y el agente no se mueve.
4. Si alcanza la meta (E), se detiene inmediatamente.
5. Al finalizar, se registra: posicion final, colisiones, pasos dados, si alcanzo la meta, y la distancia euclidiana a la meta.

---

## Parametros configurables

Todos los parametros son ajustables en tiempo real desde la interfaz:

| Parametro             | Valor por defecto | Rango     | Descripcion                                  |
| --------------------- | ----------------- | --------- | -------------------------------------------- |
| Poblacion             | 100               | Ajustable | Cantidad de individuos por generacion        |
| Limite de pasos       | 60                | Ajustable | Longitud del cromosoma (movimientos maximos) |
| Tasa de mutacion      | 0.15 (15%)        | 0 - 1     | Probabilidad de mutar cada gen               |
| Tamaño de torneo     | 5                 | 2 - N     | Individuos por torneo de seleccion           |
| Penalizacion por paso | -1                | Negativo  | Costo por cada movimiento realizado          |
| Penalizacion por muro | -12               | Negativo  | Costo por cada colision con pared            |
| Recompensa por meta   | 600               | Positivo  | Bonus por alcanzar el destino                |

---

## Mapas disponibles

| Dificultad | Tamaño | Descripcion                                         |
| ---------- | ------- | --------------------------------------------------- |
| Facil      | 8×8    | Laberinto simple con pocas paredes                  |
| Medio      | 12×12  | Laberinto con multiples caminos                     |
| Dificil    | 16×16  | Laberinto complejo con muchos callejones sin salida |

---

## Modulo educativo: Operadores Geneticos

La aplicacion incluye una seccion educativa que visualiza los operadores geneticos de forma independiente:

### Metodos de seleccion demostrados:

- **Torneo:** K individuos compiten, gana el mejor.
- **Ruleta:** Probabilidad proporcional al fitness.
- **Ranking:** Probabilidad basada en posicion, no en valor absoluto de fitness.
- **Elitismo:** Se preservan los N mejores directamente.
- **Steady-State:** Solo se reemplazan los peores individuos.

### Tipos de mutacion demostrados:

- **Bit Flip:** Invierte un bit del cromosoma.
- **Intercambio (Swap):** Intercambia dos genes de posicion.
- **Inversion:** Invierte una subsecuencia del cromosoma.

### Tipos de cruce demostrados:

- **Un punto:** Corte en una posicion, combinacion de ambos padres.
- **Dos puntos:** Dos cortes, segmento central del otro padre.
- **Uniforme:** Cada gen se toma aleatoriamente de uno u otro padre.

---

## Interfaz de usuario

La interfaz se divide en:

**Panel izquierdo (25%):**

- Panel de configuracion (ajustar parametros del AG)
- Panel de metricas (fitness, colisiones, distancia del mejor individuo)
- Panel de notas

**Panel derecho (75%):**

- Barra de control (generacion actual, botones de play/pausa/reset/avanzar)
- Visualizacion del laberinto (cuadricula con agentes, paredes, camino del mejor)
- Panel del cromosoma (genes del mejor individuo con colores por direccion)

### Visualizacion del laberinto:

- **Celdas oscuras:** Paredes
- **Celdas claras:** Espacios libres
- **Borde verde:** Inicio (S)
- **Borde ambar:** Meta (E)
- **Puntos azules:** Trayectoria del mejor individuo
- **Circulo azul grande:** Mejor individuo actual
- **Circulos verdes:** Individuos que alcanzaron la meta
- **Circulos grises:** Resto de la poblacion

### Visualizacion del cromosoma:

Cada gen se muestra como un bloque de color segun la direccion:

- Gris (•) → Quedarse
- Azul (→) → Derecha
- Morado (←) → Izquierda
- Verde (↓) → Abajo
- Rojo (↑) → Arriba

---

## Ejecucion del proyecto

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para produccion
npm run build
```

---

## Estructura del proyecto

```
src/
├── features/
│   ├── laberinto/          # Algoritmo Genetico para resolver laberintos
│   │   ├── lib/
│   │   │   ├── config.ts       # Configuracion y mapas
│   │   │   ├── tipos.ts        # Tipos del individuo
│   │   │   ├── agentes.ts      # Creacion de individuos aleatorios
│   │   │   ├── algoritmo.ts    # Logica principal del AG
│   │   │   ├── fitness.ts      # Funcion de fitness
│   │   │   ├── seleccion.ts    # Seleccion por torneo
│   │   │   ├── mutacion.ts     # Mutacion ciclica
│   │   │   ├── cruce.ts        # Cruce de un punto
│   │   │   └── simulacion.ts   # Simulacion de movimiento
│   │   ├── hooks/
│   │   │   └── useLaberintoGA.ts   # Hook principal de estado
│   │   └── components/             # Componentes de UI del laberinto
│   └── geneticos/          # Modulo educativo de operadores geneticos
│       ├── lib/
│       │   ├── seleccion.ts    # Implementacion de metodos de seleccion
│       │   ├── tipos.ts        # Tipos compartidos
│       │   └── datos.ts        # Datos de ejemplo
│       └── components/
│           ├── seleccion/      # Visualizadores de seleccion
│           ├── mutacion/       # Visualizadores de mutacion
│           └── cruce/          # Visualizadores de cruce
├── components/ui/          # Componentes reutilizables de interfaz
├── pages/                  # Paginas principales
├── routes/                 # Configuracion de rutas
└── layouts/                # Plantillas de layout
```

[React]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-site]: https://react.dev/
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[ts-site]: https://www.typescriptlang.org/
[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[vite-site]: https://vitejs.dev/
[ReactRouter]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white
[rr-site]: https://reactrouter.com/
[RadixUI]: https://img.shields.io/badge/Radix_UI-111827?style=for-the-badge
[radix-site]: https://www.radix-ui.com/
[FramerMotion]: https://img.shields.io/badge/Framer_Motion-000000?style=for-the-badge&logo=framer&logoColor=white
[framer-site]: https://www.framer.com/motion/
[Lucide]: https://img.shields.io/badge/Lucide-111827?style=for-the-badge
[lucide-site]: https://lucide.dev/
[TailwindMerge]: https://img.shields.io/badge/tailwind--merge-0EA5E9?style=for-the-badge
[twmerge-site]: https://github.com/dcastil/tailwind-merge
[CVA]: https://img.shields.io/badge/class--variance--authority-111827?style=for-the-badge
[cva-site]: https://cva.style/docs
[Sonner]: https://img.shields.io/badge/Sonner-111827?style=for-the-badge
[sonner-site]: https://sonner.emilkowal.ski/
[Git]: https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white
[git-site]: https://git-scm.com/
[GitHub]: https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white
[github-site]: https://github.com/
