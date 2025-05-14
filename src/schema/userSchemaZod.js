const { z } = require("zod");

// Schema de registro completo
const registerSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  lastName: z.string().min(1, "El apellido es obligatorio"),

  userName: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
/*
  identityDocument: z
    .number()
    .positive("El documento debe ser un número positivo"),

  age: z
    .number()
    .int("La edad debe ser un número entero")
    .min(18, "La edad mínima permitida es 13 años")
    .max(100, "La edad máxima permitida es 100 años"),*/
  email: z
    .string()
    .nonempty("El correo electrónico es obligatorio")
    .email("Correo electrónico no válido"),

  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial")
    .max(14, "La contraseña no puede ser mayor a 14 caracteres"),


  country: z.string().min(1, "El país es obligatorio"),
  city: z.string().min(1, "La ciudad es obligatoria"),
  address: z.string().min(1, "La dirección es obligatoria"),
/*
  faceDescriptor: z
    .array(z.number())
    .optional(),

  faceImage: z.string().optional(), */// Campo opcional
});

// Schema de login
const loginSchema = z.object({
  email: z
    .string()
    .nonempty("El correo electrónico es obligatorio")
    .email("Correo electrónico no válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, " La contraseña debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, " La contraseña debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "La contraseña debe contener al menos un carácter especial")
    .max(14, "La contraseña no puede ser mayor a 14 caracteres"),
});

module.exports = { registerSchema, loginSchema };
