import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Dna, X, Home, PenTool, Crown, Package, CalendarClock } from "lucide-react";
import { Boton } from "@/components/ui/boton";
import { concatenarClases } from "@/lib/utiles";

const elementos = [
  { ruta: "/", etiqueta: "Inicio", icono: Home },
];

export function BarraNavegacion() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-[1220px] px-4 flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 mr-4 text-primary">
          <Dna size={20} />
          <span className="font-bold text-lg">Algoritmos Genéticos</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2 flex-1 justify-end">
          {elementos.map((elemento) => (
            <NavLink key={elemento.ruta} to={elemento.ruta}>
              {({ isActive }) => (
                <Boton
                  variante={isActive ? "secundario" : "primario"}
                  icono={elemento.icono}
                  className={isActive ? "bg-[#737373] text-white hover:bg-[#525252]" : ""}
                  tamano="pequeno"
                >
                  {elemento.etiqueta}
                </Boton>
              )}
            </NavLink>
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
              <NavLink key={elemento.ruta} to={elemento.ruta} onClick={() => setAbierto(false)}>
                {({ isActive }) => (
                  <Boton
                    variante={isActive ? "secundario" : "primario"}
                    icono={elemento.icono}
                    className={concatenarClases("w-full justify-start", isActive ? "bg-[#737373] text-white hover:bg-[#525252]" : "")}
                  >
                    {elemento.etiqueta}
                  </Boton>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
