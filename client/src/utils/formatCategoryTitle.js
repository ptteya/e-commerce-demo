export const formatCategoryTitle = (category) => {
    return category ? category[0].toUpperCase() + category.substring(1) : 'All Items';
};