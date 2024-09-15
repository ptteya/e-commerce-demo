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
        handleErrorResponse(res, 500);
    }
}

exports.getDetails = async (req, res) => {
    try {
        const furnitureId = req.params.furnitureId;
        const furniture = await furnitureService.getById(furnitureId).lean();
        res.status(200).json({ furniture });
    } catch (error) {
        handleErrorResponse(res, 500);
    }
}

exports.edit = async (req, res) => {
    const furnitureId = req.params.furnitureId;
    const newData = req.body;

    try {
        const furniture = await furnitureService.edit(furnitureId, newData).lean();
        res.status(200).json({ furniture })
    } catch (error) {
        handleErrorResponse(res, 500, null, error);
    }
}