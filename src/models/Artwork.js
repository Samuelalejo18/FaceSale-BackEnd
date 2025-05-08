const mongoose = require("mongoose");

// Definimos el esquema para una obra de arte que será subastada
const ArtworkSchema = new mongoose.Schema(
  {
    // Título de la obra de arte
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Pintura",
        "Escultura",
        "Fotografía",
        "Dibujo",
        "Grabado",
        "Arte digital",
        "Instalación",
        "Performance",
        "Arte textil",
        "Arte sonoro",
        "Arte conceptual",
      ],
      default: "pintura",
    },
    // Nombre del artista que creó la obra
    artist: {
      type: String,
      required: true,
      trim: true,
    },

    // Año en que fue creada la obra
    yearCreated: {
      type: Date,
      required: true,
    },

    // Descripción breve de la obra o su historia
    description: {
      type: String,
      trim: true,
    },

    // Técnica o medio utilizado (ej: óleo sobre lienzo, escultura, etc.)
    technique: {
      type: String,
      trim: true,
    },

    // Dimensiones de la obra en centímetros
    dimensions: {
      // Altura de la obra
      height_cm: {
        type: Number,
        required: true,
      },
      // Ancho de la obra
      width_cm: {
        type: Number,
        required: true,
      },
      // Profundidad de la obra (opcional, útil para esculturas)
      depth_cm: {
        type: Number,
        default: 0,
        required: false
      },
    },

  
    images: [
      {
        name: {
          type: String,
          required: true
        },
        image: {
          data: Buffer,
          contentType: String
        }
      }
    ],

    // Precio inicial para comenzar la subasta
    startingPrice: {
      type: Number,
      required: true,
    },

    // Estado actual de la obra en el proceso de subasta
    // Puede ser: 'pendiente', 'en_subasta', o 'vendida'
    status: {
      type: String,
      enum: ["pending", "in_auction", "sold"],
      default: "pending",
    },

    /* // Lista de pujas realizadas por los usuarios
    bids: [
      {
        // ID del usuario que hizo la puja (referencia al modelo Usuario)
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        // Monto ofertado en la puja
        amount: Number,
        // Fecha y hora en que se hizo la puja
        date: Date,
      },
    ],
  },*/
  },

  {
    // Agrega automáticamente los campos createdAt y updatedAt
    timestamps: true,
  }
);

// Exportamos el modelo para usarlo en otras partes del proyecto
module.exports = mongoose.model("Artwork", ArtworkSchema);
