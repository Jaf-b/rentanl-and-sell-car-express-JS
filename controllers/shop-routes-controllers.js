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
const UpdateShop = (req, res) => {
  if (!mongoose.isValidObjectId(ID)) {
    res.json({ error: 'Shop not found' });
  }
};
const DeleteShop = (req, res) => {
  if (!mongoose.isValidObjectId(ID)) {
    res.json({ error: 'Shop not found' });
  }
};

module.exports = { GetShopByUserID, AddShop, UpdateShop, DeleteShop };
