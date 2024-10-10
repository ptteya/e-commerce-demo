const furnitureService = require('../services/furnitureService');
const { handleErrorResponse } = require('../utils/errorUtil');

exports.getFurniture = async (req, res) => {
    const { category, searchQuery, minPrice, maxPrice, color } = req.query;

    let filter = {};
    if (category) {
        filter.category = category;
    }

    if (searchQuery) {
        filter['$text'] = { $search: searchQuery };
    }

    if (minPrice && maxPrice) {
        filter.price = { $gte: minPrice, $lte: maxPrice };
    }

    if (color) {
        filter.color = color;
    }

    try {
        const furniture = await furnitureService.getFurniture(filter);
        res.status(200).json({ furniture });
    } catch (error) {
        handleErrorResponse({ res, statusCode: 500 });
    }
};

exports.getDetails = async (req, res) => {
    try {
        const furnitureId = req.params.furnitureId;
        const furniture = await furnitureService.getById(furnitureId).lean();
        res.status(200).json({ furniture });
    } catch (error) {
        handleErrorResponse({ res, statusCode: 500 });
    }
};

exports.edit = async (req, res) => {
    const furnitureId = req.params.furnitureId;
    const newData = req.body;

    try {
        const furniture = await furnitureService.edit(furnitureId, newData).lean();
        res.status(200).json({ furniture })
    } catch (error) {
        handleErrorResponse({ res, statusCode: 500, error });

    }
};

exports.create = async (req, res) => {
    const data = req.body;
    try {
        const furniture = await furnitureService.create(data);
        res.status(200).json({ furniture })
    } catch (error) {
        handleErrorResponse({ res, statusCode: 500, error });
    }
};

exports.deleteFurniture = async (req, res) => {
    const furnitureId = req.params.furnitureId;
    try {
        await furnitureService.deleteFurniture(furnitureId);
        res.status(200).json({ message: 'Furniture deleted successfully' });
    } catch (error) {
        handleErrorResponse({ res, statusCode: 500 });
    }
};