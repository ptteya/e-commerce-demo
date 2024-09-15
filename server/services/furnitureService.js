const Furniture = require('../models/Furniture');

const getFurniture = (filter) => Furniture.find(filter).lean();

const getById = (id) => Furniture.findById(id);

const edit = (id, newData) => Furniture.findByIdAndUpdate(id, newData, { new: true, runValidators: true });

const deleteFurniture = (id) => Furniture.findByIdAndDelete(id);

module.exports = {
    getFurniture,
    getById,
    edit,
    deleteFurniture,
};