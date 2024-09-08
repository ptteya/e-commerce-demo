const Furniture = require('../models/Furniture');

const getByCategory = (category) => Furniture.find({ category });

const getAll = () => Furniture.find().lean();

module.exports = {
    getByCategory,
    getAll
};