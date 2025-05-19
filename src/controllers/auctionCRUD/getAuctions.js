const Auction = require("../../models/Auction.js"); // Importar el modelo de subasta

//get para obtener los datos de la subasta

const getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find();

    res.json(auctions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error a traer las subastas", error: error.message });
  }
};

//get para obtener los datos de la subasta por id
const getAuctionByID = async (req, res) => {
  try {
    const { id } = req.params;
    const auctionByID = await Auction.findById(id);

    if (!auctionByID) {
      return res.status(404).json({ message: "Subasta no encontrada" });
    }
    res.json(auctionByID);
  } catch (error) {
    res.status(500).json({
      message: "Error a traer  la subasta por ID",
    });
  }
};


//get para obtener los datos de la subasta por id
const getAuctionByIDArt = async (req, res) => {
  try {
    const { artworkId } = req.params;

    const auctionByID = await Auction.findOne({ artworkId });

    if (!auctionByID) {
      return res.status(404).json({ message: "Subasta no encontrada" });
    }
    res.json(auctionByID);
  } catch (error) {
    res.status(500).json({
      message: "Error a traer  la subasta por ID",
    });
  }
};

module.exports = { getAuctions, getAuctionByID, getAuctionByIDArt };
