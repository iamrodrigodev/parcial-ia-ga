import { createBrowserRouter } from "react-router-dom";
import { DisenoPrincipal } from "@/layouts/DisenoPrincipal";
import { PaginaInicio } from "@/pages/PaginaInicio";
import { PaginaNoEncontrada } from "@/pages/PaginaNoEncontrada";

export const enrutador = createBrowserRouter([
  {
    path: "/",
    element: <DisenoPrincipal />,
    errorElement: <PaginaNoEncontrada />,
    children: [
      {
        index: true,
        element: <PaginaInicio />,
      },
    ],
  },
]);
