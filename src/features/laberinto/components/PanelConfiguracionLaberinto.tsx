import { useEffect, useState } from "react";
import { Sliders } from "lucide-react";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { Entrada } from "@/components/ui/entrada";
import { ConfigLaberinto, MAPAS_PREDEFINIDOS } from "@/features/laberinto/lib/config";

interface Props {
  config: ConfigLaberinto;
  mapaId: string;
  setMapaId: (id: string) => void;
  cambiarConfiguracion: (campo: keyof ConfigLaberinto, valor: number) => void;
  cambiarAplicarOptimizacionPrefijo: (valor: boolean) => void;
}

type DraftInputs = {
  cantidadIndividuos: string;
  limitePasos: string;
  tasaMutacionPct: string;
  tamanoTorneo: string;
  penalizacionPaso: string;
  penalizacionMuro: string;
  recompensaMeta: string;
  recompensaCasilleroCorrecto: string;
};

function clamp(valor: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, valor));
}

export function PanelConfiguracionLaberinto({ config, mapaId, setMapaId, cambiarConfiguracion, cambiarAplicarOptimizacionPrefijo }: Props) {
  const [draft, setDraft] = useState<DraftInputs>({
    cantidadIndividuos: String(config.cantidadIndividuos),
    limitePasos: String(config.limitePasos),
    tasaMutacionPct: String(Math.round(config.tasaMutacion * 100)),
    tamanoTorneo: String(config.tamanoTorneo),
    penalizacionPaso: String(config.penalizacionPaso),
    penalizacionMuro: String(config.penalizacionMuro),
    recompensaMeta: String(config.recompensaMeta),
    recompensaCasilleroCorrecto: String(config.recompensaCasilleroCorrecto),
  });

  useEffect(() => {
    setDraft({
      cantidadIndividuos: String(config.cantidadIndividuos),
      limitePasos: String(config.limitePasos),
      tasaMutacionPct: String(Math.round(config.tasaMutacion * 100)),
      tamanoTorneo: String(config.tamanoTorneo),
      penalizacionPaso: String(config.penalizacionPaso),
      penalizacionMuro: String(config.penalizacionMuro),
      recompensaMeta: String(config.recompensaMeta),
      recompensaCasilleroCorrecto: String(config.recompensaCasilleroCorrecto),
    });
  }, [config]);

  const confirmarEntero = (
    draftKey: keyof DraftInputs,
    campo: keyof ConfigLaberinto,
    min: number,
    max: number,
    fallback: number
  ) => {
    const parsed = parseInt(draft[draftKey], 10);
    const siguiente = Number.isNaN(parsed) ? fallback : clamp(parsed, min, max);
    setDraft((d) => ({ ...d, [draftKey]: String(siguiente) }));
    if (siguiente !== config[campo]) cambiarConfiguracion(campo, siguiente);
  };

  const confirmarTasaMutacion = () => {
    const parsed = parseFloat(draft.tasaMutacionPct);
    const pct = Number.isNaN(parsed) ? Math.round(config.tasaMutacion * 100) : clamp(parsed, 0, 100);
    const normalizada = pct / 100;
    setDraft((d) => ({ ...d, tasaMutacionPct: String(Math.round(pct)) }));
    if (normalizada !== config.tasaMutacion) cambiarConfiguracion("tasaMutacion", normalizada);
  };

  return (
    <Tarjeta className="border shadow-sm">
      <EncabezadoTarjeta className="pb-4">
        <div className="flex items-center gap-2">
          <Sliders className="text-zinc-700" size={18} />
          <TituloTarjeta className="text-lg font-bold">Parámetros del Algoritmo</TituloTarjeta>
        </div>
        <DescripcionTarjeta className="text-xs">Ajusta en tiempo real los hiperparámetros evolutivos.</DescripcionTarjeta>
      </EncabezadoTarjeta>
      <ContenidoTarjeta className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-700">Seleccionar Mapa</label>
          <select
            value={mapaId}
            onChange={(e) => setMapaId(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {MAPAS_PREDEFINIDOS.map((m) => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-700">Población</label>
            <Entrada
              type="number"
              min={10}
              max={500}
              value={draft.cantidadIndividuos}
              onChange={(e) => setDraft((d) => ({ ...d, cantidadIndividuos: e.target.value }))}
              onBlur={() => confirmarEntero("cantidadIndividuos", "cantidadIndividuos", 10, 500, config.cantidadIndividuos)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-700">Límite Pasos (N)</label>
            <Entrada
              type="number"
              min={5}
              value={draft.limitePasos}
              onChange={(e) => setDraft((d) => ({ ...d, limitePasos: e.target.value }))}
              onBlur={() => confirmarEntero("limitePasos", "limitePasos", 5, Number.MAX_SAFE_INTEGER, config.limitePasos)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-700">Tasa Mutación</label>
            <div className="flex items-center gap-2">
              <Entrada
                type="number"
                step={1}
                min={0}
                max={100}
                value={draft.tasaMutacionPct}
                onChange={(e) => setDraft((d) => ({ ...d, tasaMutacionPct: e.target.value }))}
                onBlur={confirmarTasaMutacion}
              />
              <span className="text-sm font-semibold text-muted-foreground select-none">%</span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-700">Torneo (K)</label>
            <Entrada
              type="number"
              min={2}
              max={config.cantidadIndividuos}
              value={draft.tamanoTorneo}
              onChange={(e) => setDraft((d) => ({ ...d, tamanoTorneo: e.target.value }))}
              onBlur={() => confirmarEntero("tamanoTorneo", "tamanoTorneo", 2, config.cantidadIndividuos, config.tamanoTorneo)}
            />
          </div>
        </div>

        <div className="border-t my-3 pt-3">
          <h4 className="text-xs font-bold text-zinc-800 mb-2.5">Penalizaciones y Recompensas</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700">Costo Paso</label>
              <Entrada
                type="number"
                max={0}
                value={draft.penalizacionPaso}
                onChange={(e) => setDraft((d) => ({ ...d, penalizacionPaso: e.target.value }))}
                onBlur={() => confirmarEntero("penalizacionPaso", "penalizacionPaso", -1000, 0, config.penalizacionPaso)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700">Costo Colisión</label>
              <Entrada
                type="number"
                max={0}
                value={draft.penalizacionMuro}
                onChange={(e) => setDraft((d) => ({ ...d, penalizacionMuro: e.target.value }))}
                onBlur={() => confirmarEntero("penalizacionMuro", "penalizacionMuro", -5000, 0, config.penalizacionMuro)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mt-3">
            <label className="text-xs font-semibold text-zinc-700">Recompensa Meta</label>
            <Entrada
              type="number"
              min={0}
              value={draft.recompensaMeta}
              onChange={(e) => setDraft((d) => ({ ...d, recompensaMeta: e.target.value }))}
              onBlur={() => confirmarEntero("recompensaMeta", "recompensaMeta", 0, 100000, config.recompensaMeta)}
            />
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <label className="text-xs font-semibold text-zinc-700">Premio por Casillero Correcto</label>
            <Entrada
              type="number"
              min={0}
              max={1000}
              value={draft.recompensaCasilleroCorrecto}
              onChange={(e) => setDraft((d) => ({ ...d, recompensaCasilleroCorrecto: e.target.value }))}
              onBlur={() =>
                confirmarEntero(
                  "recompensaCasilleroCorrecto",
                  "recompensaCasilleroCorrecto",
                  0,
                  1000,
                  config.recompensaCasilleroCorrecto
                )
              }
            />
            <span className="text-[11px] text-muted-foreground">Solo aplica en laberintos 16x16 y 30x30.</span>
            <label className="flex items-center gap-2 rounded-md border border-dashed border-zinc-300 px-3 py-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={config.aplicarOptimizacionPrefijo}
                onChange={(e) => cambiarAplicarOptimizacionPrefijo(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
              />
              <span className="font-medium">Aplicar optimización</span>
            </label>
            <span className="text-[11px] text-muted-foreground">
              Si está activa, protege el prefijo correcto del cromosoma para evitar perder progreso por mutación.
            </span>
          </div>
        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}
