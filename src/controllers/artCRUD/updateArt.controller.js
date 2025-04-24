const Artwork = require("../../models/Artwork"); // Ajusta la ruta si está en otro lado

// PUT: Actualizar una obra de arte por ID
const updateArtwork = async (req, res) => {
  try {
    const {
      title,
      category,
      artist,
      yearCreated,
      description,
      technique,
      dimensions,
      images,
      startingPrice,
      status,
    } = req.body;

    // Verificar si el título ya existe con otro ID (opcional, si quieres evitar duplicados)
    const artworkFound = await Artwork.findOne({
      title,
      _id: { $ne: req.params.id },
    });

    if (artworkFound) {
      return res.status(400).json({ message: "La obra ya está registrada con ese título" });
    }

    // Crear objeto de actualización con los datos recibidos
    const updateData = {
      title,
      category,
      artist,
      yearCreated,
      description,
      technique,
      dimensions,
      images,
      startingPrice,
      status,
    };

    // Actualizar la obra en la base de datos
    const updatedArtwork = await Artwork.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedArtwork) {
      return res.status(404).json({ message: "Obra de arte no encontrada" });
    }

    res.json({
      message: "Obra de arte actualizada con éxito",
      updatedArtwork,
    });

  } catch (error) {
    res.status(400).json({
      message: "Error actualizando la obra de arte",
      error: error.message,
    });
  }
};

module.exports = { updateArtwork };
