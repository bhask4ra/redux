import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Companero {
  id: string;
  nombre: string;
  rol: string;
  email: string;
}

interface CompanerosState {
  companeros: Companero[];
  formulario: {
    nombre: string;
    rol: string;
    email: string;
  };
  editandoId: string | null;
}

const initialState: CompanerosState = {
  companeros: [
    { id: "1", nombre: "Ana García", rol: "Frontend Developer", email: "ana@equipo.com" },
    { id: "2", nombre: "Carlos López", rol: "Backend Developer", email: "carlos@equipo.com" },
  ],
  formulario: {
    nombre: "",
    rol: "",
    email: "",
  },
  editandoId: null,
};

export const companerosSlice = createSlice({
  name: "companeros",
  initialState,
  reducers: {
    // Actualiza cualquier campo del formulario dentro de Redux
    actualizarFormulario: (
      state,
      action: PayloadAction<{ campo: "nombre" | "rol" | "email"; valor: string }>
    ) => {
      state.formulario[action.payload.campo] = action.payload.valor;
    },

    // CREATE: Agrega un nuevo compañero usando los datos del formulario en Redux
    crearCompanero: (state) => {
      const { nombre, rol, email } = state.formulario;
      if (!nombre.trim() || !rol.trim() || !email.trim()) return;

      state.companeros.push({
        id: crypto.randomUUID(),
        nombre: nombre.trim(),
        rol: rol.trim(),
        email: email.trim(),
      });

      state.formulario = { nombre: "", rol: "", email: "" };
    },

    // Selecciona un compañero para editarlo y rellena el formulario
    iniciarEdicion: (state, action: PayloadAction<Companero>) => {
      state.editandoId = action.payload.id;
      state.formulario = {
        nombre: action.payload.nombre,
        rol: action.payload.rol,
        email: action.payload.email,
      };
    },

    // Cancela la edición y limpia el formulario
    cancelarEdicion: (state) => {
      state.editandoId = null;
      state.formulario = { nombre: "", rol: "", email: "" };
    },

    // UPDATE: Actualiza el compañero que se está editando
    actualizarCompanero: (state) => {
      if (!state.editandoId) return;
      const { nombre, rol, email } = state.formulario;
      if (!nombre.trim() || !rol.trim() || !email.trim()) return;

      const index = state.companeros.findIndex((c) => c.id === state.editandoId);
      if (index !== -1) {
        state.companeros[index] = {
          id: state.editandoId,
          nombre: nombre.trim(),
          rol: rol.trim(),
          email: email.trim(),
        };
      }

      state.editandoId = null;
      state.formulario = { nombre: "", rol: "", email: "" };
    },

    // DELETE: Elimina un compañero por su ID
    eliminarCompanero: (state, action: PayloadAction<string>) => {
      state.companeros = state.companeros.filter((c) => c.id !== action.payload);
      if (state.editandoId === action.payload) {
        state.editandoId = null;
        state.formulario = { nombre: "", rol: "", email: "" };
      }
    },
  },
});

export const {
  actualizarFormulario,
  crearCompanero,
  iniciarEdicion,
  cancelarEdicion,
  actualizarCompanero,
  eliminarCompanero,
} = companerosSlice.actions;

export default companerosSlice.reducer;
