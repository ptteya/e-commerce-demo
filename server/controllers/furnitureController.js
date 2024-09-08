const furnitureService = require('../services/furnitureService');

exports.getCatalogItems = async (req, res) => {
    const { category } = req.params;

    try {
        const furniture = await furnitureService.getByCategory(category).lean();
        res.json({ furniture });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAllItems = async (req, res) => {
    try {
        const furniture = await furnitureService.getAll();
        res.json({ furniture });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}