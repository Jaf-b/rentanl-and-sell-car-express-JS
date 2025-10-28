const CarSchema = require('../models/cars-model');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const GetCar = async (req, res) => {
  try {
    const carList = await CarSchema.find({});
    res.json(carList);
    console.log(carList);
  } catch (e) {
    console.log(e);
    res.status(440).json(e);
  }
};
const GetCarByShopID = async (req, res) => {
  const { ShopID } = req.params;
  if (!!ShopID) {
    if (!mongoose.isValidObjectId(ShopID)) {
      res.json({ error: 'ShopID is not valid' });
    }
    try {
      const city = await CarSchema.find({ShopID})
      res.json(city);
    } catch (e) {
      console.log(e);
    }
  } else {
    res.json({ error: "veuillez entrez l'ID de la voiture" });
  }
};
const GetCarById = async (req, res) => {
  const { CarID } = req.params;
  console.log(!!CarID);
  if (!!CarID) {
    if (!mongoose.isValidObjectId(CarID)) {
      res.json({ error: 'CarID is not valid' });
    }
    try {
      const city = await CarSchema.findById(CarID);
      res.json(city);
    } catch (e) {
      console.log(e);
    }
  }
};
const AddCar = async (req, res) => {
  const body = req.body;
  let images = [];
  req.files.forEach(file => {
    images.push(file.filename);
  });

  try {
    //const UserID = GetCurrentUserID(JWT);
    const car = await CarSchema.create({
      ...body,
      images: images,
    });
    res.json(car);
  } catch (err) {
    res.status(401).json({ error: err.message });
    console.log(err);
  }
};
const UpdateCar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid car ID' });
  }

  try {
    const carToUpdate = await CarSchema.findById(id);
    if (!carToUpdate) {
      return res.status(404).json({ message: 'Car not found.' });
    }

    // Étape 1: Gérer la suppression des images existantes.
    let imagesToDelete = req.body.imagesToDelete || [];
    if (typeof imagesToDelete === 'string') {
      try {
        imagesToDelete = JSON.parse(imagesToDelete);
      } catch (e) {
        imagesToDelete = [imagesToDelete];
      }
    }

    if (Array.isArray(imagesToDelete) && imagesToDelete.length > 0) {
      imagesToDelete.forEach(filename => {
        const imagePath = path.join(__dirname, '..', 'uploads', 'img', 'cars', filename);
        if (fs.existsSync(imagePath)) {
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error(`Failed to delete stored image: ${imagePath}`, err);
            }
          });
        }
      });
    }

    // Étape 2: Conserver les images qui ne sont pas supprimées.
    const keptImages = carToUpdate.images.filter(img => !imagesToDelete.includes(img));

    // Étape 3: Ajouter les nouvelles images téléchargées.
    const newImages = req.files ? req.files.map(file => file.filename) : [];

    // Étape 4: Combiner les images conservées et les nouvelles images.
    const finalImages = [...keptImages, ...newImages];

    // Étape 5: Préparer les données pour la mise à jour.
    const updateData = {
      ...req.body,
      images: finalImages,
    };
    delete updateData.imagesToDelete; // Nettoyer le champ avant de sauvegarder.

    // Étape 6: Mettre à jour la voiture dans la base de données.
    const updatedCar = await CarSchema.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteCar = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid car ID' });
  }

  try {
    const carToDelete = await CarSchema.findById(id);

    if (!carToDelete) {
      return res.status(404).json({ message: 'Car not found.' });
    }

    if (carToDelete.images && carToDelete.images.length > 0) {
      carToDelete.images.forEach(filename => {
        const imagePath = path.join(__dirname, '..', 'uploads', 'img', 'cars', filename);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(`Failed to delete image: ${imagePath}`, err);
          }
        });
      });
    }

    await CarSchema.findByIdAndDelete(id);

    res.status(200).json({ message: 'Car and associated images deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { GetCar, GetCarByShopID, GetCarById, AddCar, UpdateCar, DeleteCar };
