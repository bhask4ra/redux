import type { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "./store/store";
import {
  actualizarCompanero,
  actualizarFormulario,
  cancelarEdicion,
  crearCompanero,
  eliminarCompanero,
  iniciarEdicion,
} from "./store/companerosSlice";

export function App() {
  const dispatch = useAppDispatch();
  const { companeros, formulario, editandoId } = useAppSelector(
    (state) => state.companeros
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editandoId) {
      dispatch(actualizarCompanero());
    } else {
      dispatch(crearCompanero());
    }
  };

  return (
    <div>
      <h1>CRUD de Compañeros (Redux Toolkit)</h1>

      <h2>{editandoId ? "Editar Compañero" : "Agregar Compañero"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre:{" "}
            <input
              type="text"
              value={formulario.nombre}
              onChange={(e) =>
                dispatch(
                  actualizarFormulario({
                    campo: "nombre",
                    valor: e.target.value,
                  })
                )
              }
              placeholder="Ej. Juan Pérez"
              required
            />
          </label>
        </div>

        <div>
          <label>
            Rol:{" "}
            <input
              type="text"
              value={formulario.rol}
              onChange={(e) =>
                dispatch(
                  actualizarFormulario({
                    campo: "rol",
                    valor: e.target.value,
                  })
                )
              }
              placeholder="Ej. QA Engineer"
              required
            />
          </label>
        </div>

        <div>
          <label>
            Email:{" "}
            <input
              type="email"
              value={formulario.email}
              onChange={(e) =>
                dispatch(
                  actualizarFormulario({
                    campo: "email",
                    valor: e.target.value,
                  })
                )
              }
              placeholder="Ej. juan@equipo.com"
              required
            />
          </label>
        </div>

        <div>
          <button type="submit">
            {editandoId ? "Guardar Cambios" : "Crear Compañero"}
          </button>
          {editandoId && (
            <button
              type="button"
              onClick={() => dispatch(cancelarEdicion())}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <hr />

      <h2>Lista de Compañeros ({companeros.length})</h2>
      {companeros.length === 0 ? (
        <p>No hay compañeros registrados.</p>
      ) : (
        <table border={1} cellPadding={6}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {companeros.map((companero) => (
              <tr key={companero.id}>
                <td>{companero.id}</td>
                <td>{companero.nombre}</td>
                <td>{companero.rol}</td>
                <td>{companero.email}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => dispatch(iniciarEdicion(companero))}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => dispatch(eliminarCompanero(companero.id))}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
