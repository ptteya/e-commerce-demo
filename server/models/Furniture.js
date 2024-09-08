const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required!'] },
    price: { type: Number, required: [true, 'Price is required!'] },
    description: { type: String, required: [true, 'Description is required!'] },
    category: { type: String, required: [true, 'Category is required!'] },
    material: { type: String, required: [true, 'Material is required!'] },
    color: { type: String, required: [true, 'Color is required!'] },
    size: {
        width: { type: Number, required: [true, 'Width is required'] },
        height: { type: Number, required: [true, 'Height is required!'] },
        length: { type: Number, required: [true, 'Length is required!'] }
    },
    images: {
        mainImage: { type: String, required: [true, 'Main Image is required!'] },
        moreImages: [String]
    },
    rating: { type: Number, default: 0 }
});

furnitureSchema.pre('save', function (next) {
    if (this.isModified('color')) {
        this.color = this.color.toLowerCase();
    }
    if (this.isModified('category')) {
        this.category = this.category.toLowerCase();
    }
    next();
});

furnitureSchema.index({ name: 'text', description: 'text', color: 'text', material: 'text' });

const Furniture = mongoose.model('Furniture', furnitureSchema);

module.exports = Furniture;