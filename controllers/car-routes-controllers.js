const CarSchema = require('../models/cars-model');
const mongoose = require('mongoose');
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
  console.log(!!ShopID);
  if (!!ShopID) {
    if (!mongoose.isValidObjectId(ShopID)) {
      res.json({ error: 'ShopID is not valid' });
    }
    try {
      const city = await CarSchema.find({ ShopID: ShopID });
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
  } else {
    res.json({ error: "veuillez entrez l'ID de la voiture" });
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
const UpdateCar = (req, res) => {};
const DeleteCar = async (req, res) => {
  const id = req.params.CarID;
  try {
    if (!id) {
      res.status(404).json({ error: 'id not found' });
    }
    const resultat = await CarSchema.findByIdAndDelete(id);
    res.json(resultat);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

module.exports = { GetCar, GetCarByShopID, GetCarById, AddCar, UpdateCar, DeleteCar };
