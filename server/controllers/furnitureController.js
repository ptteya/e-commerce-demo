const furnitureService = require('../services/furnitureService');
const { handleErrorResponse } = require('../utils/errorUtil');

exports.getCatalogItems = async (req, res) => {
    const { category } = req.params;

    try {
        const furniture = await furnitureService.getByCategory(category).lean();
        res.status(200).json({ furniture });
    } catch (error) {
        handleErrorResponse(res, 500);
    }
};

exports.getAllItems = async (req, res) => {
    try {
        const furniture = await furnitureService.getAll();
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