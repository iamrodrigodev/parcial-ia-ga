import { Outlet } from "react-router-dom";
import { BarraNavegacion } from "@/components/navigation/BarraNavegacion";

export function DisenoPrincipal() {
  return (
    <div className="app-shell">
      <BarraNavegacion />
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}
