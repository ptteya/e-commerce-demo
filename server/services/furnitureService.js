const Furniture = require('../models/Furniture');

const getByCategory = (category) => Furniture.find({ category });

const getAll = () => Furniture.find().lean();

const getById = (id) => Furniture.findById(id);

module.exports = {
    getByCategory,
    getAll,
    getById
};