const Furniture = require('../models/Furniture');

const getFurniture = (filter) => Furniture.find(filter).lean();

const getById = (id) => Furniture.findById(id);

const edit = (id, newData) => Furniture.findByIdAndUpdate(id, newData, { new: true, runValidators: true });

const create = async (data) => {
    const furniture = await Furniture.create(data);
    return furniture.toObject();
};

const deleteFurniture = (id) => Furniture.findByIdAndDelete(id);

module.exports = {
    getFurniture,
    getById,
    edit,
    create,
    deleteFurniture,
};