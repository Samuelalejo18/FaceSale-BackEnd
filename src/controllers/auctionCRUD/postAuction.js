// Import the auction model
const auction = require("../../models/Auction.js");


// Create a new auction
const createAuction = async (req, res) => {

    try {

        const {artworkId, startDate, endDate, status} = req.body;
        

        if(!artworkId) {
            return res.status(400).json({message: "Se requiere ID de la obra de arte"});
        }

        if (!startDate || !endDate) {
            return res.status(400).json({message: "Se requieren fechas de inicio y fin"});
        }


        const newAuction = new auction({
            artworkId,
            startDate, 
            endDate, 
            status: status || "Scheduled",
            participants: [],
            winner: null
        });


        const savedAuction = await newAuction.save();

        res.status(201).json(savedAuction);
    } catch (error) {
        console.error("Error creating function", error);
        res.status(500).json({
            message: "Error al crear la subasta",
            error: error.message
        });
    }
};

module.exports = {createAuction};