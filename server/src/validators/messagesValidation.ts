export const claimErrors = {
  fullName: {
    required: "El nombre completo es obligatorio",
  },
  email: {
    required: "El correo eletrónico es obligatorio",
    isEmail: "El correo eletrónico no es validó",
  },
  address: {
    required: "La dirección es obligatorio",
  },
  department: {
    required: "El departamento es obligatorio",
  },
  province: {
    required: "La provincia es obligatoria",
  },
  district: {
    required: "El distrito es obligatorio",
  },
  phone: {
    required: "El celular o teléfono es obligatorio",
  },
  type: {
    required: "El tipo es obligatorio",
  },
  detail: {
    required: "El detalle es obligatorio",
  },
  order: {
    required: "La orden es obligatoria",
  },
  file: {
    required: "El archivo es obligatorio",
    isDocument: "El archivo debe de ser un documento",
  },
};

export const userErrors = {
  email: {
    hasExit: "El correo eletrónico ya ha sido tomado",
    wrongCredentials: "Las credenciales no coinciden con nuestros registros",
  },
};
