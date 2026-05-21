import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Network, X } from "lucide-react";
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
            <Network size={14} />
          </span>
          <span className="font-bold">Proyecto Limpio</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2 flex-1">
          {elementos.map((elemento) => (
            <NavLink
              key={elemento.ruta}
              to={elemento.ruta}
              className={({ isActive }) =>
                concatenarClases(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )
              }
            >
              {elemento.etiqueta}
            </NavLink>
          ))}
        </nav>

        <Boton
          variante="fantasma"
          tamano="pequeno"
          className="md:hidden"
          onClick={() => setAbierto((valor) => !valor)}
        >
          {abierto ? <X size={16} /> : <Menu size={16} />}
        </Boton>
      </div>

      {abierto ? (
        <div className="md:hidden border-t">
          <div className="container mx-auto max-w-[1220px] px-4 py-2 grid gap-1">
            {elementos.map((elemento) => (
              <NavLink
                key={elemento.ruta}
                to={elemento.ruta}
                className={({ isActive }) =>
                  concatenarClases(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  )
                }
                onClick={() => setAbierto(false)}
              >
                {elemento.etiqueta}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
