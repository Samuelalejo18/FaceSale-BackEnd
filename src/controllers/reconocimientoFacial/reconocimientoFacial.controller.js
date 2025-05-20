const { reconocimientoFacial } = require("./reconocimientoFacial")

const reconocimientoFacialController = async (req, res) => {
    try {
        const { email, descriptorFacial } = req.body;

        const userFoundEmail = await User.findOne({ email });
        if (!userFoundEmail) {
            return res.status(400).json({ message: "El correo no existe ❌" });
        }


        const storedDescriptor = userFoundEmail.faceDescriptor; // ya guardado correctamente
        // si quieres, validar storedDescriptor de forma análoga..

        const distance = reconocimientoFacial(descriptorFacial, storedDescriptor);

        if (distance < 0.6) {

            return res.status(200).json({
                message: "Reconocimiento facial exitoso",
                id: userFoundEmail._id,
                name: userFoundEmail.name,
                lastName: userFoundEmail.lastName,
                userName: userFoundEmail.userName,
                identityDocument: userFoundEmail.identityDocument,
                age: userFoundEmail.age,
                email: userFoundEmail.email,
                numberPhone: userFoundEmail.numberPhone,
                country: userFoundEmail.country,
                city: userFoundEmail.city,
                address: userFoundEmail.address,
                faceDescriptor: userFoundEmail.faceDescriptor,
                faceImage: userFoundEmail.faceImage,
            });
        } else {
            return res.status(401).json({ message: 'Reconocimiento facial fallido, no coincide el rostro' });
        }


    } catch (error) {
        console.error("Error en el reconocimiento facial: ", error);
        res.status(400).json({
            message: "Error en el reconocimiento facial",
            error: error.message
        });

    }
}

module.exports = { reconocimientoFacialController };

