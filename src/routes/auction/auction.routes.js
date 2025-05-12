const { Router } = require("express");
const router = Router();

// Import middleware
const authRequired = require("../../middlewares/validateToken.js");

// Import controllers
const { addBid } = require("../../controllers/auctionCRUD/addBid.js");
const { deleteAuction } = require("../../controllers/auctionCRUD/deleteAuction.js");
const { finalizeAuction } = require("../../controllers/auctionCRUD/finalizeAuction.js");
const { getAuctions, getAuctionByID } = require("../../controllers/auctionCRUD/getAuctions.js");
const { createAuction } = require("../../controllers/auctionCRUD/postAuction.js");
const { updateAuction } = require("../../controllers/auctionCRUD/putAuction.js");

// ---------------------------------------------------------------------------------
// GET ROUTES
// ---------------------------------------------------------------------------------

// /api/auctions
// Obtiene todas las subastas disponibles
router.get("/", getAuctions);

// /api/auctions/:id
// Ejemplo: /api/auctions/6523ab4c8b32a1b4567890cd
// Obtiene una subasta específica por su ID
router.get("/:id", getAuctionByID);

// ---------------------------------------------------------------------------------
// POST ROUTES
// ---------------------------------------------------------------------------------

// /api/auctions
// Crea una nueva subasta - Requiere autenticación
// Body: { artworkId, startDate, endDate, status }
router.post("/", authRequired, createAuction);

// ---------------------------------------------------------------------------------
// PUT ROUTES
// ---------------------------------------------------------------------------------

// /api/auctions/:id
// Ejemplo: /api/auctions/6523ab4c8b32a1b4567890cd
// Actualiza una subasta existente - Requiere autenticación
// Body: { artworkId?, startDate?, endDate?, status?, participants?, winner? }
router.put("/:id", authRequired, updateAuction);

// /api/auctions/:id/bid
// Ejemplo: /api/auctions/6523ab4c8b32a1b4567890cd/bid
// Añade una nueva puja a la subasta - Requiere autenticación
// Body: {userId, bidAmount}
router.put("/:id/bid", authRequired, addBid);

// /api/auctions/:id/finalize
// Ejemplo: /api/auctions/6523ab4c8b32a1b4567890cd/finalize
// Finaliza una subasta y determina el ganador - Requiere autenticación
router.put("/:id/finalize", authRequired, finalizeAuction);

// ---------------------------------------------------------------------------------
// DELETE ROUTES
// ---------------------------------------------------------------------------------

// /api/auctions/:id
// Ejemplo: /api/auctions/6523ab4c8b32a1b4567890cd
// Elimina una subasta por su ID - Requiere autenticación
router.delete("/:id", authRequired, deleteAuction);

module.exports = router;


