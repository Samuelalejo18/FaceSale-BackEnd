const mongoose = require('mongoose');

const AuctionSchema = new mongoose.Schema({

  // Referencia a la obra de arte subastada (relación uno a uno)
  artworkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
    required: true
  },

  // Estado de la subasta: programada, activa o finalizada
  status: {
    type: String,
    enum: ['scheduled', 'active', 'finished'],
    default: 'scheduled'
  },

  // Fecha y hora de inicio de la subasta
  startDate: {
    type: Date,
    required: true
  },

  // Fecha y hora de finalización de la subasta
  endDate: {
    type: Date,
    required: true
  },
/*
  // Participantes con sus pujas (muchos usuarios)
  participants: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    bidAmount: {
      type: Number,
      required: true
    },
    bidTime: {
      type: Date,
      default: Date.now
    }
  }],
/*

*/
/*
  // Ganador de la subasta (opcional, se asigna al finalizar)
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
*/
}, {
  timestamps: true // createdAt y updatedAt automáticos
});

module.exports = mongoose.model('Auction', AuctionSchema);
