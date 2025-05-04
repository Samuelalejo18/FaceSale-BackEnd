const mongoose = require("mongoose");

const AuctionSchema = new mongoose.Schema(
  {
    // Referencia a la obra de arte subastada (relación uno a uno)
    artworkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
      required: true,
    },

    // Estado de la subasta: programada, activa o finalizada
    status: {
      type: String,
      enum: ["scheduled", "active", "finished"],
      default: "scheduled",
    },

    // Fecha y hora de inicio de la subasta
    startDate: {
      type: Date,
      required: true,
    },

    // Fecha y hora de finalización de la subasta
    endDate: {
      type: Date,
      required: true,
    },

    participants: [ // Arreglo que contiene los participantes de la subasta
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId, // Identificador único del usuario (relación con el modelo User)
          ref: "User",                          // Hace referencia al modelo 'User' para hacer populate si se desea
          required: true,                      // Este campo es obligatorio
        },
        bidAmount: {
          type: Number,                         // Monto de la puja realizada por el usuario
          required: true,                       // Este campo también es obligatorio
        },
        bidTime: {
          type: Date,                           // Fecha y hora en que se realizó la puja
          default: Date.now,                    // Por defecto se asigna la fecha y hora actual al crear el documento
        },
      },
    ],
    
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true, // createdAt y updatedAt automáticos
  }
);

module.exports = mongoose.model("Auction", AuctionSchema);
