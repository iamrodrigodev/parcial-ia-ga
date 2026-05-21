import { RouterProvider } from "react-router-dom";
import { enrutador } from "@/routes/enrutador";

export function Aplicacion() {
  return <RouterProvider router={enrutador} />;
}
