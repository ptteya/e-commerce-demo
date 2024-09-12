const Furniture = require('../models/Furniture');

const getFurniture = (filter) => Furniture.find(filter).lean();

const getById = (id) => Furniture.findById(id);

module.exports = {
    getFurniture,
    getById,
};