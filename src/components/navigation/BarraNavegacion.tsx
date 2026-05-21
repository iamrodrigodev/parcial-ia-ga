import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Dna, X, Home } from "lucide-react";
import { Boton } from "@/components/ui/boton";
import { concatenarClases } from "@/lib/utiles";

const elementos = [
  { ruta: "/", etiqueta: "Inicio" },
];

export function BarraNavegacion() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-[1220px] px-4 flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 mr-4">
          <span className="w-8 h-8 rounded-lg border flex items-center justify-center bg-gradient-to-br from-neutral-100 to-white text-primary">
            <Dna size={14} />
          </span>
          <span className="font-bold">Algoritmos Genéticos</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2 flex-1 justify-end">
          {elementos.map((elemento) => (
            <Boton key={elemento.ruta} comoHijo icono={Home}>
              <Link to={elemento.ruta}>
                {elemento.etiqueta}
              </Link>
            </Boton>
          ))}
        </nav>

        <Boton
          variante="fantasma"
          tamano="pequeno"
          className="md:hidden"
          onClick={() => setAbierto((valor) => !valor)}
          icono={abierto ? X : Menu}
        />
      </div>

      {abierto ? (
        <div className="md:hidden border-t">
          <div className="container mx-auto max-w-[1220px] px-4 py-2 grid gap-1">
            {elementos.map((elemento) => (
              <Boton key={elemento.ruta} comoHijo className="w-full justify-start" icono={Home}>
                <Link to={elemento.ruta} onClick={() => setAbierto(false)}>
                  {elemento.etiqueta}
                </Link>
              </Boton>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
