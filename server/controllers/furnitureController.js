const furnitureService = require('../services/furnitureService');

exports.getCatalogItems = async (req, res) => {
    const { category } = req.params;

    try {
        const furniture = await furnitureService.getByCategory(category).lean();
        res.status(200).json({ furniture });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllItems = async (req, res) => {
    try {
        const furniture = await furnitureService.getAll();
        res.status(200).json({ furniture });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}