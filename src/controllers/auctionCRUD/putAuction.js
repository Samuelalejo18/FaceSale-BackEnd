const Auction = require("../../models/Auction");

// Update auction

const updateAuction = async (req, res) => {


    try {

        const { id } = req.params;
        const { artworkId, startDate, endDate, status, participants, winner } = req.body;

        const auction = await Auction.findById(id);

        if (!auction) {
            return res.status(404).json({ message: "Subasta no encontrada" });
        }



        if (artworkId) auction.artworkId = artworkId;
        if (startDate) auction.startDate = startDate;
        if (endDate) auction.endDate = endDate;
        if (status) auction.status = status;
        if (participants) auction.participants = participants;
        if (winner != undefined) auction.winner = winner;


        const updateAuction = await auction.save();

        res.status(200).json(updateAuction);
    } catch (error) {
        console.error("Error updating auction:", error);
        res.status(400).json({
            message: "Error al actualizar la subasta",
            error: error.message
        });
    }
};

module.exports = { updateAuction };