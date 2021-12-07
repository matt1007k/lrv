export const claimErrors = {
  notFound: "El reclamo o queja no existe",
  fullName: {
    required: "El nombre completo es obligatorio",
  },
  email: {
    required: "El correo eletrónico es obligatorio",
    isEmail: "El correo eletrónico no es validó",
  },
  address: {
    required: "La dirección es obligatoria",
  },
  reference: {
    required: "La referencia es obligatoria",
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
    required: "El número de celular es obligatorio",
    isNumeric: "El número de celular debe ser un número",
    isPhone: "El número de celular no es validó",
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
  notFound: "El usuario no existe",
  tokenExpired: "El token ha expirado",
  name: {
    required: "El nombre es obligatorio",
  },
  email: {
    required: "El correo eletrónico es obligatorio",
    isEmail: "El correo eletrónico no es validó",
    hasExit: "El correo eletrónico ya ha sido tomado",
    wrongCredentials: "Las credenciales no coinciden con nuestros registros",
  },
  password: {
    required: "La contraseña es obligatoria",
    notEquals: "Las contraseñas no coinciden",
    notCurrentPassword: "La contraseña actual no es correcta",
  },
  confirmPassword: {
    required: "Es necesario repetir la contraseña",
  },
  newPassword: {
    required: "La nueva contraseña es obligatoria",
  },
};

export const answerErrors = {
  notFount: "La respuesta no existe",
  text: {
    required: "El texto es obligatorio",
  },
  claimId: {
    required: "El id del reclamo es obligatorio",
  },
  trackingCode: {
    required: "El código de seguimiento es necesario",
  },
};

export const uploadMessage = {
  wasRemoved: "El archivo ha sido eliminado",
  notFound: "El archivo no existe",
};
