const Auction = require("../../models/Auction");

const finalizeAuction = async (req, res) => {

    try {
        const { id } = req.params;


        const auction = await Auction.findById(id);


        if (!auction) {
            return res.status(404).json({ message: "Subasta no encontrada" });
        }

        if (auction.status === "finished") {
            return res.status(400).json({ message: "La subasta ya esta finalizada" });
        }

        // Determine winner (highest bidder)
        if (auction.participants.length > 0) {
            // Sort participants by bid amount (descending)
            const sortedParticipants = [...auction.participants].sort((a, b) => b.bidAmount - a.bidAmount);
            auction.winner = sortedParticipants[0].userId;

        }


        auction.status = "finished";

        const finalizedAuction = await auction.save();

        res.status(200).json({ message: " Subasta finalizada", auction: finalizedAuction });
    } catch (error) {
        console.error("Error finalizing auction: ", error);
        res.status(400).json({
            message: "Error al finalizar la subasta",
            error: error.message
        });
    }
};


module.exports = { finalizeAuction };