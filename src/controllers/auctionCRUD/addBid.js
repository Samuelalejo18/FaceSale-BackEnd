const Auction = require("../../models/Auction");

const addBid = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, bidAmount } = req.body;


        if(!userId || !bidAmount) {
            return res.status(400).json({ message: "Se require usuario y monto de puja" });
        }

        const auction = await Auction.findById(id);

        if(!auction) {
            return res.status(404).json({ message: "Subasta no encontrada" });
        }

        if(auction.status !== "active") {
            return res.status(400).json({ message: "La subasta no esta activa" });
        }

        if(new Date() > new Date(auction.endDate)) {
            return res.status(400).json({ message: "La subasta no ha finalizado" });
        }

        const highestBid = auction.participants.length > 0
            ? Math.max(...auction.participants.map(p => p.bidAmount))
            : 0;


        if(bidAmount <= highestBid) {
            return res.status(400).json({
                message: "La puja debe ser mayor que la puja mas alta actual",
                currentHighest: highestBid
            });
        }

        auction.participants.push({
            userId, 
            bidAmount,
            bidTime: new Date()
        });


        const updateAuction = await auction.save();

        res.status(200).json(updateAuction);
    } catch (error) {
        console.error("Error adding bid: ", error);
        res.status(400).json({
            message: "Error al añadir la puja",
            error: error.message
        });
    }
};