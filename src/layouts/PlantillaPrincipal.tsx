import { Outlet, useLocation } from "react-router-dom";
import { BarraNavegacion } from "@/components/navigation/BarraNavegacion";
import { motion } from "framer-motion";

export function PlantillaPrincipal() {
  const ubicacion = useLocation();

  return (
    <div className="app-shell">
      <BarraNavegacion />
      <main className="page-content">
        <motion.div
          key={ubicacion.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
