const Furniture = require('../models/Furniture');

const furnitureData = [
    {
        name: "Sofa Oakland",
        price: 520,
        description: "The Sofa Oakland is a sophisticated addition to any living space. Crafted from premium beige leather, it offers a luxurious feel and a timeless look, perfect for both classic and contemporary interiors.",
        category: "couches",
        material: "Leather",
        color: "beige",
        size: {
            width: 190,
            height: 72,
            length: 100
        },
        images: {
            mainImage: "/images/couches/couch2.png",
            extraImage1: "/images/couches/couch2-img1.png",
            extraImage2: "/images/couches/couch2-img2.png",
            extraImage3: "/images/couches/couch2-img3.png"
        },
        rating: 4
    },
    {
        name: "Table Madrid",
        price: 120,
        description: "Clean lines and organic shapes come together in a floating design to make the Madrid coffee table a sensory, vibrant piece for your interior. Designed by Morten Georgsen, this classic yet contemporary coffee table makes modern statement in any space.",
        category: "tables",
        material: "Ash ceramic",
        color: "white",
        size: {
            "width": 99,
            "height": 44,
            "length": 99
        },
        images: {
            mainImage: "/images/tables/table1.png",
            extraImage1: "/images/tables/table1-img1.png",
            extraImage2: "/images/tables/table1-img2.png",
        },
        rating: 5,
    },
    {
        name: "Bed Brinkley",
        price: 740,
        description: "This bed features dramatic lines and striking angular wings that come together to create a bold and modern silhouette. The carefully chosen upholstery adds a touch of elegance, making this piece not only a focal point in the bedroom but also a sophisticated statement of style and comfort. ",
        category: "beds",
        material: "90% Pl, 10% Li, Solid Parawood",
        color: "beige",
        size: {
            width: 208,
            height: 154,
            length: 223
        },
        images: {
            mainImage: "/images/beds/bed2.png",
            extraImage1: "/images/beds/bed2-img1.png",
            extraImage2: "/images/beds/bed2-img2.png",
            extraImage3: "/images/beds/bed2-img3.png"
        },
        rating: 4
    },
    {
        name: "Chair Oakland",
        price: 180,
        description: "This modern armchair features a sleek design with a durable wood veneer frame and metal legs. Upholstered in black and light gray, it offers comfort with a spacious seat and sturdy armrests. It supports up to 110 kg.",
        category: "chairs",
        material: "Fabric cover, Metal legs",
        color: "white",
        size: {
            "width": 72,
            "height": 76,
            "length": 67
        },
        images: {
            mainImage: "/images/chairs/chair1.png",
            extraImage1: "/images/chairs/chair1-img1.png",
            extraImage2: "/images/chairs/chair1-img2.png",
            extraImage3: "/images/chairs/chair1-img3.png"
        },
        rating: 5,
    },
    {
        name: "Lamp Lucina",
        price: 65,
        description: "For anyone in search of a stylish design lamp, the LUCINA is an excellent choice. With its beautifully gathered linen shade, it not only looks stunning but also provides pleasant lighting. When illuminated, it casts a beautiful pattern on the wall, adding a touch of ambiance to any room.",
        category: "lamps",
        material: "Linen, Metal",
        color: "beige",
        size: {
            width: 32,
            height: 46,
            length: 32
        },
        images: {
            mainImage: "/images/lamps/lamp2.png",
            extraImage1: "/images/lamps/lamp2-img1.png",
            extraImage2: "/images/lamps/lamp2-img2.png",
            extraImage3: "/images/lamps/lamp2-img3.png"
        },
        rating: 4.5
    },
    {
        name: "Sofa Miramar",
        price: 420,
        description: "The Sofa Miramar blends modern aesthetics with everyday comfort. Its durable textile polyester material in gray makes it a versatile choice for any living room, offering both style and functionality.",
        category: "couches",
        material: "Textile Polyester",
        color: "gray",
        size: {
            width: 220,
            height: 75,
            length: 95
        },
        images: {
            mainImage: "/images/couches/couch1.png",
            extraImage1: "/images/couches/couch1-img1.png",
            extraImage2: "/images/couches/couch1-img2.png",
            extraImage3: "/images/couches/couch1-img3.png"
        },
        rating: 4.5
    },
    {
        name: "Table Fera",
        price: 110,
        description: "Elegant, minimalist, and modern, these nesting tables embody the signature style of Blomus, where design meets functionality. Side Table 1 Dimensions: Width 40 cm, Height 40 cm, Depth 40 cm. Side Table 2 Dimensions: Width 35 cm, Height 35 cm, Depth 35 cm.",
        category: "tables",
        material: "Powder-coated steel",
        color: "beige",
        size: {
            "width": 40,
            "height": 40,
            "length": 40
        },
        images: {
            mainImage: "/images/tables/table2.png",
            extraImage1: "/images/tables/table2-img1.png",
            extraImage2: "/images/tables/table2-img2.png",
            extraImage3: "/images/tables/table2-img3.png"
        },
        rating: 4.5,
    },
    {
        name: "Bed Wesley",
        price: 550,
        description: "Complete bed, Includes upholstered headboard, upholstered side rails, and standard metal bed frame, Individually applied nailheads, Handcrafted in Illinois, Easy assembly required, Mattress and box spring not included.",
        category: "beds",
        material: "Textured Linen",
        color: "gray",
        size: {
            "width": 142,
            "height": 129,
            "length": 198
        },
        images: {
            mainImage: "/images/beds/bed1.png",
            extraImage1: "/images/beds/bed1-img1.png",
            extraImage2: "/images/beds/bed1-img2.png",
            extraImage3: "/images/beds/bed1-img3.png"
        },
        rating: 4.5,
    },
    {
        name: "Chair Fluente",
        price: 240,
        description: "With its timeless appearance, clean lines, this chair effortlessly complements any style. Additionally, when paired with the separately available ottoman, it easily transforms into a stylish lounge space.",
        category: "chairs",
        material: "polyester",
        color: "beige",
        size: {
            width: 74,
            height: 79,
            length: 85
        },
        images: {
            mainImage: "/images/chairs/chair2.png",
            extraImage1: "/images/chairs/chair2-img1.png",
            extraImage2: "/images/chairs/chair2-img2.png",
            extraImage3: "/images/chairs/chair2-img3.png"
        },
        rating: 4.5
    },
    {
        name: "Lamp Maple",
        price: 75,
        description: "Brighten up any room to create a warming atmosphere for you and your guests with this chic table lamp. Make a statement with this unique lamp on mantle, console table or in any living space. This table lamp provides a beautiful light source for your room. With its sleek design and finish this accent table lamp is the ideal addition to any setting. ",
        category: "lamps",
        material: "Metal base, Fabric drum",
        color: "gray",
        size: {
            "width": 35,
            "height": 55,
            "length": 35
        },
        images: {
            mainImage: "/images/lamps/lamp1.png",
            extraImage1: "/images/lamps/lamp1-img1.png",
            extraImage2: "/images/lamps/lamp1-img2.png",
            extraImage3: "/images/lamps/lamp1-img3.png"
        },
        rating: 4.5,
    },
];

async function seedFurnitureData() {
    try {
        const existingProducts = await Furniture.find({});
        if (existingProducts.length === 0) {
            await Furniture.insertMany(furnitureData);
            console.log('Furniture data seeded successfully!');
        }
    } catch (error) {
        console.error('Error seeding database: ', error);
    }
}

module.exports = seedFurnitureData;