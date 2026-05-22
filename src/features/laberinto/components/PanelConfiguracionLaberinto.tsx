import { Sliders } from "lucide-react";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { Entrada } from "@/components/ui/entrada";
import { ConfigLaberinto, MAPAS_PREDEFINIDOS } from "@/features/laberinto/lib/config";

interface Props {
  config: ConfigLaberinto;
  mapaId: string;
  setMapaId: (id: string) => void;
  cambiarConfiguracion: (campo: keyof ConfigLaberinto, valor: number) => void;
}

export function PanelConfiguracionLaberinto({ config, mapaId, setMapaId, cambiarConfiguracion }: Props) {
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
            <Entrada type="number" min={10} max={500} value={config.cantidadIndividuos} onChange={(e) => cambiarConfiguracion("cantidadIndividuos", Math.max(10, parseInt(e.target.value) || 10))} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-700">Límite Pasos (N)</label>
            <Entrada
              type="number"
              min={5}
              max={150}
              value={config.limitePasos}
              onChange={(e) => cambiarConfiguracion("limitePasos", Math.max(5, Math.min(150, parseInt(e.target.value) || 5)))}
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
                value={Math.round(config.tasaMutacion * 100)}
                onChange={(e) =>
                  cambiarConfiguracion(
                    "tasaMutacion",
                    Math.max(0, Math.min(1, (parseFloat(e.target.value) || 0) / 100))
                  )
                }
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
              value={config.tamanoTorneo}
              onChange={(e) =>
                cambiarConfiguracion(
                  "tamanoTorneo",
                  Math.max(2, Math.min(config.cantidadIndividuos, parseInt(e.target.value) || 2))
                )
              }
            />
          </div>
        </div>

        <div className="border-t my-3 pt-3">
          <h4 className="text-xs font-bold text-zinc-800 mb-2.5">Penalizaciones y Recompensas</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700">Costo Paso</label>
              <Entrada type="number" max={0} value={config.penalizacionPaso} onChange={(e) => cambiarConfiguracion("penalizacionPaso", Math.min(0, parseInt(e.target.value) || 0))} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-700">Costo Colisión</label>
              <Entrada type="number" max={0} value={config.penalizacionMuro} onChange={(e) => cambiarConfiguracion("penalizacionMuro", Math.min(0, parseInt(e.target.value) || 0))} />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mt-3">
            <label className="text-xs font-semibold text-zinc-700">Recompensa Meta</label>
            <Entrada type="number" min={0} value={config.recompensaMeta} onChange={(e) => cambiarConfiguracion("recompensaMeta", Math.max(0, parseInt(e.target.value) || 0))} />
          </div>
        </div>
      </ContenidoTarjeta>
    </Tarjeta>
  );
}


