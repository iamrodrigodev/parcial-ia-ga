import { Link } from "react-router-dom";
import { Boton } from "@/components/ui/boton";
import { ArrowLeft } from "lucide-react";

export function PaginaNoEncontrada() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-muted-foreground mb-8">La página que buscas no existe.</p>
      <Boton comoHijo icono={ArrowLeft}>
        <Link to="/">Volver al inicio</Link>
      </Boton>
    </div>
  );
}
