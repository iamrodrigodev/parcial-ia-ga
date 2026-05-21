import { Boton } from "@/components/ui/boton";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { Play } from "lucide-react";

export function PaginaInicio() {
  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <Tarjeta>
        <EncabezadoTarjeta>
          <TituloTarjeta>Bienvenido al Proyecto Limpio</TituloTarjeta>
          <DescripcionTarjeta>
            Toda la lógica de algoritmos ha sido removida. Solo quedan los componentes UI y la estructura base.
          </DescripcionTarjeta>
        </EncabezadoTarjeta>
        <ContenidoTarjeta>
          <p style={{ marginBottom: '1rem' }}>
            Aquí tienes un ejemplo de los componentes rescatados.
          </p>
          <Boton>
            <Play size={14} className="mr-2" style={{ display: 'inline-block' }} />
            Componente Botón
          </Boton>
        </ContenidoTarjeta>
      </Tarjeta>
    </div>
  );
}
