import { Outlet, useLocation } from "react-router-dom";
import { BarraNavegacion } from "@/components/navigation/BarraNavegacion";
import { AnimacionEntrada } from "@/components/ui/animacion-entrada";

export function PlantillaPrincipal() {
  const ubicacion = useLocation();

  return (
    <div className="app-shell">
      <BarraNavegacion />
      <main className="page-content">
        <AnimacionEntrada key={ubicacion.pathname} className="h-full">
          <Outlet />
        </AnimacionEntrada>
      </main>
    </div>
  );
}
