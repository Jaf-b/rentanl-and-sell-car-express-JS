const mongoose = require('mongoose');
const ShopSchema = require('../models/Shop-model');

const GetShopByUserID = async (req, res) => {
  const ID = req.params.UserID;
  if (!mongoose.isValidObjectId(ID)) {
    res.json({ error: 'Shop not found' });
  }
  try {
    const shop = await ShopSchema.findOne({ UserID: ID });
    if (!shop) res.json({ error: 'Shop not found' });
    res.json(shop);
  } catch (e) {
    res.json({ error: 'an error occured' });
  }
};
const AddShop = async (req, res) => {
  const { UserID, ShopName, Description, employee } = req.body;
  try {
    const shop = await ShopSchema.create({
      UserID,
      ShopName,
      Description,
      employee,
    });
    res.json(shop);
  } catch (err) {
    res.json({ error: 'something went wrong' });
  }
};
const UpdateShop = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid shop ID' });
  }

  try {
    const updatedShop = await ShopSchema.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedShop) {
      return res.status(404).json({ message: 'Shop not found.' });
    }
    res.status(200).json(updatedShop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const DeleteShop = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid shop ID' });
  }

  try {
    const deletedShop = await ShopSchema.findByIdAndDelete(id);
    if (!deletedShop) {
      return res.status(404).json({ message: 'Shop not found.' });
    }
    res.status(200).json({ message: 'Shop deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { GetShopByUserID, AddShop, UpdateShop, DeleteShop };
