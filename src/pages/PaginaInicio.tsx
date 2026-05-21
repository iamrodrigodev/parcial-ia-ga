import { Boton } from "@/components/ui/boton";
import { Tarjeta, ContenidoTarjeta, DescripcionTarjeta, EncabezadoTarjeta, TituloTarjeta } from "@/components/ui/tarjeta";
import { Play } from "lucide-react";

export function PaginaInicio() {
  return (
    <div className="container">
      <Tarjeta>
        <EncabezadoTarjeta>
          <TituloTarjeta>Bienvenido a Algoritmos Genéticos</TituloTarjeta>
          <DescripcionTarjeta>
            Toda la lógica de algoritmos ha sido removida. Solo quedan los componentes UI y la estructura base.
          </DescripcionTarjeta>
        </EncabezadoTarjeta>
        <ContenidoTarjeta>
          <p className="text-sm text-muted-foreground" style={{ marginBottom: '1rem' }}>
            Aquí tienes un ejemplo de los componentes rescatados.
          </p>
          <Boton icono={Play}>
            Componente Botón
          </Boton>
        </ContenidoTarjeta>
      </Tarjeta>
    </div>
  );
}
