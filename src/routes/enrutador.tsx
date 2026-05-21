import { createBrowserRouter } from "react-router-dom";
import { PlantillaPrincipal } from "@/layouts/PlantillaPrincipal";
import { PaginaInicio } from "@/pages/PaginaInicio";
import { PaginaNoEncontrada } from "@/pages/PaginaNoEncontrada";

export const enrutador = createBrowserRouter([
  {
    path: "/",
    element: <PlantillaPrincipal />,
    errorElement: <PaginaNoEncontrada />,
    children: [
      {
        index: true,
        element: <PaginaInicio />,
      },
    ],
  },
]);
