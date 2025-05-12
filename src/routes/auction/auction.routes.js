const { Router } = require("express");
const router = Router();

// Import middleware
const authRequired = require("../../middlewares/validateToken.js");

const { addBid } = require("../../controllers/auctionCRUD/addBid.js");
const { deleteAuction } = require("../../controllers/auctionCRUD/deleteAuction.js");
const { finalizeAuction } = require("../../controllers/auctionCRUD/finalizeAuction.js");
const { getAuctions, getAuctionByID } = require("../../controllers/auctionCRUD/getAuctions.js");
const { createAuction } = require("../../controllers/auctionCRUD/postAuction.js");
const { updateAuction } = require("../../controllers/auctionCRUD/putAuction.js");

// Get routes
router.get("/", getAuctions);
router.get("/:id", getAuctionByID);


// Post route - Create new auction
router.post("/", authRequired, createAuction);

// Put routes
router.put("/:id", authRequired, updateAuction);
router.put("/:id/bid", authRequired, addBid);
router.put("/:id/finalize", authRequired, finalizeAuction);

// Delete route
router.put("/:id", authRequired, updateAuction);
router.put("/:id/bid", authRequired, addBid);
router.put("/:id/finalize", authRequired, finalizeAuction);

// Delete route
router.delete("/:id", authRequired, deleteAuction);

module.exports = router;