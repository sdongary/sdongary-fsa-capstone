const { client } = require('../client.js');
const { addCartProduct, createCart, fetchCarts } = require('./carts.js');
const { createProduct, fetchProducts, createCategory, fetchCategories } = require('./products.js');
const { fetchAllUsers, createUser } = require('./users.js');


const createTables = async () => {
  const SQL = `
  DROP TABLE IF EXISTS carted_products;
  DROP TABLE IF EXISTS carts;  
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS categories;
  
  CREATE TABLE users(
    id UUID DEFAULT gen_random_uuid(),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    username VARCHAR(100),
    address VARCHAR(255),
    payment_type VARCHAR(16),
    is_admin BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id)
  );
  CREATE TABLE categories(
    id UUID PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
  );
  CREATE TABLE products(
    id UUID DEFAULT gen_random_uuid(),
    name VARCHAR(200) UNIQUE NOT NULL,
    inventory INTEGER DEFAULT 0,
    price NUMERIC NOT NULL,
    description TEXT NOT NULL,
    prod_category TEXT REFERENCES categories(name) NOT NULL,
    image TEXT,
    PRIMARY KEY (id)
  );  
  CREATE TABLE carts(
    id UUID DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    PRIMARY KEY (id)
  );
  CREATE TABLE carted_products(
    id UUID DEFAULT gen_random_uuid(), 
    cart_id UUID REFERENCES carts(id) NOT NULL,
    product_id UUID REFERENCES products(id) NOT NULL,
    quantity INTEGER DEFAULT 0,
    CONSTRAINT unique_cart_id_and_product_id UNIQUE (cart_id, product_id),
    PRIMARY KEY(id)
    );    
  `;
  await client.query(SQL);
};

const seedTable = async () => {
  const [ Electronics, Clothing, PersonalCare, HomeDecor, Furniture ] = await Promise.all([
    createCategory({ name: 'Electronics'}),
    createCategory({ name: 'Clothing'}),
    createCategory({ name: 'PersonalCare'}),
    createCategory({ name: 'HomeDecor'}),
    createCategory({ name: 'Furniture'}),    
  ]);
  const [ userOne, userTwo, userThree, userFour, userFive ] = await Promise.all([
    createUser({ email: 'userOne@gmail.com', password: "pwd_one", address: 'Austin', is_admin: false}),
    createUser({ email: 'userTwo@gmail.com', password: "pwd_two", address: 'Boston', is_admin: true}),
    createUser({ email: 'userThree@gmail.com', password: "pwd_three", address: 'Philadelphia', is_admin: false}),
    createUser({ email: 'userFour@gmail.com', password: "pwd_four", address: 'New Orleans', is_admin: false}),
    createUser({ email: 'userFive@gmail.com', password: "pwd_five", address: 'New York', is_admin: false}),

  ]);

  const allProducts = await Promise.all([
    
     // Electronics
     createProduct({
      name: "Insignia Smart TV",
      description: "INSIGNIA 32-inch Class F20 Series Smart HD 720p Fire TV with Alexa Voice Remote (NS-32F201NA23, 2022 Model)",          
      prod_category: "Electronics",
      inventory: 25,
      image: "https://m.media-amazon.com/images/I/815E5aShTqL._AC_SX450_.jpg",
      price: 130
     }),
     createProduct({
      name: "Samsung Smart Phone",
      description: "SAMSUNG Galaxy S24 Cell Phone, 128GB AI Smartphone, Unlocked Android, 50MP Camera, Fastest Processor, Long Battery Life, US Version, 2024, Onyx Black, SM-S921UZKAXAA)",          
      prod_category: "Electronics",
      inventory: 50,
     image:"https://m.media-amazon.com/images/I/71Ua9NgQgWL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      price: 800
     }),
     createProduct({
      name: "Bose Headphones",
      description: "Bose QuietComfort Ultra Wireless Noise Cancelling Headphones with Spatial Audio, Over-the-Ear Headphones with Mic, Up to 24 Hours of Battery Life, Black",          
      prod_category: "Electronics",
      inventory: 40,
     image:"https://m.media-amazon.com/images/I/51NC9ErIQtL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      price: 430
     }),
     createProduct({
      name: "Hp Laptop",
      description: "HP 17 Inch Laptop Computer, 17.3 FHD Business Laptop, Intel Core i3-N305(8-Core), 32GB RAM, 1TB SSD, Intel UHD Graphics, Fingerprint, WiFi 6, Thin and Light Laptop, Win 11 Home, with Stand",                   
      prod_category: "Electronics",
      inventory: 15,
     image: "https://m.media-amazon.com/images/I/71p5FKT9FQL.__AC_SY300_SX300_QL70_FMwebp_.jpg",
      price: 680
     }),
     createProduct({
      name: "Apple Watch",
      description: "Apple Watch Series 9 [GPS 45mm] Smartwatch with Midnight Aluminum Case with Midnight Sport Band S/M. Fitness Tracker, ECG Apps, Always-On Retina Display, Water Resistant",          
      prod_category: "Electronics",
      inventory: 45,
     image: "https://m.media-amazon.com/images/I/71OSc6IfGcL.__AC_SY445_SX342_QL70_FMwebp_.jpg",
      price: 350
     }),
     // Clothing
     createProduct({
      name: "Levi's Men's Jacket",
      description: "Levi's Men's Washed Cotton Hooded Military Jacket (Regular & Big & Tall Sizes)",          
      prod_category: "Clothing",
      inventory: 45,
     image: "https://m.media-amazon.com/images/I/71ZrUomEVsL._AC_UL480_FMwebp_QL65_.jpg",
      price: 72
     }),
     createProduct({
      name: "Wrangler Jeans",
      description: "Wrangler Authentics Men's Regular Fit Comfort Flex Waist Jean",          
      prod_category: "Clothing",
      inventory: 100,
     image: "https://m.media-amazon.com/images/I/71lqr18zk4L._AC_UL480_FMwebp_QL65_.jpg",
      price: 35
     }),
     createProduct({
      name: "Hey Dude Shoes",
      description: "Hey Dude Mens Wally L Stretch Shoes",          
      prod_category: "Clothing",
      inventory: 35,
     image: "https://m.media-amazon.com/images/I/71OaI6-qt3L._AC_UL480_FMwebp_QL65_.jpg",
      price: 60
     }),
     createProduct({
      name: "Levi's Women's Jeans",
      description: "Levi's Women's Low Pro Jeans",          
      prod_category: "Clothing",
      inventory: 30,
     image: "https://m.media-amazon.com/images/I/81mejcsxxbL._AC_UL480_FMwebp_QL65_.jpg",
      price: 75
     }),
     createProduct({
      name: "Crocs",
      description: "Crocs Womens Brooklyn Low Wedges, Platform Sandals",          
      prod_category: "Clothing",
      inventory: 20,
     image: "https://m.media-amazon.com/images/I/61W7eSVrqRL._AC_SX695_.jpg",
      price: 50
     }),
     // PersonalCare
     createProduct({
       name: "Olaplex Shampoo",
       description: "Olaplex No. 4 Bond Maintenance Shampoo",          
       prod_category: "PersonalCare",
       inventory: 100,
      image: "https://m.media-amazon.com/images/I/61W7eSVrqRL._AC_UL480_FMwebp_QL65_.jpg",
       price: 30
      }),
     createProduct({
       name: "Paulas Choice Exfoliant",
       description: "Paulas Choice--SKIN PERFECTING 2% BHA Liquid Salicylic Acid Exfoliant--Facial Exfoliant for Blackheads, Enlarged Pores, Wrinkles & Fine Lines, 4 oz Bottle",          
       prod_category: "PersonalCare",
       inventory: 80,
      image: "https://m.media-amazon.com/images/I/61bLRVPWH7L._AC_UL480_FMwebp_QL65_.jpg",
       price: 35
      }),
     createProduct({
       name: "Dr. Squatch Men's Bar Soap",
       description: "Dr. Squatch Men's Bar Soap Gift Set (10 Bars) Men's Natural Bar Soap - Birchwood Breeze, Fresh Falls, Wood Barrel Bourbon, Coconut Castaway, Cedar Citrus, Bay Rum Soap, and more",          
       prod_category: "PersonalCare",
       inventory: 75,
      image: "https://m.media-amazon.com/images/I/81CCqT8eJKL._AC_UL480_FMwebp_QL65_.jpg",
       price: 63
      }),
     createProduct({
       name: "Old Spice Deodorant",
       description: "Old Spice Antiperspirant Deodorant for Men, Harbor Scent, 48 Hr Odor Protection, 2.6 oz (Pack of 3)",          
       prod_category: "PersonalCare",
       inventory: 60,
      image: "https://m.media-amazon.com/images/I/71uOfpFBliL._AC_UL480_FMwebp_QL65_.jpg",
       price: 25
      }),
     createProduct({
       name: "Clinique Sunscreen",
       description: "Clinique SPF 50 Mineral Sunscreen Fluid For Face",          
       prod_category: "PersonalCare",
       inventory: 90,
      image: "https://m.media-amazon.com/images/I/31nJH1RZI3L._SY445_SX342_QL70_FMwebp_.jpg",
       price: 35
      }),
      // HomeDecor 
      createProduct({
       name: "Sweetcrispy Arched Mirror",
       description: "Sweetcrispy Arched Full Length Mirror 64x21 Full Body Mirror Floor Mirror Standing Hanging or Leaning Wall, Large Arch Wall Mirror with Stand Aluminum Alloy Thin Frame",          
       prod_category: "HomeDecor",
       inventory: 20,
      image: "https://m.media-amazon.com/images/I/81cf8NeCT7L.__AC_SX300_SY300_QL70_FMwebp_.jpg",
       price: 50
      }),
      createProduct({
       name: "Jonathan Y Rug",
       description: "JONATHAN Y MOH101B-8 Moroccan Hype Boho Vintage Diamond 8 ft. x 10 ft. Area-Rug, Bohemian, Southwestern, Casual, Transitional, Pet Friendly, Non Shedding, Stain Resistant, Easy-Cleaning, Cream/Gray",
       prod_category: "HomeDecor",
       inventory: 10,
      image: "https://m.media-amazon.com/images/I/81cf8NeCT7L._AC_UL480_FMwebp_QL65_.jpg",
       price: 100
      }),
      createProduct({
       name: "InSimSea Frame",
       description: "InSimSea Framed Vintage Landscape Canvas Wall Art | Wild Field Oil Painting Prints | Cottagecore Bedroom Bathroom Office Decor 24x36inch",          
       prod_category: "HomeDecor",
       inventory: 20,
      image: "https://m.media-amazon.com/images/I/81-iVFGABEL._AC_UL480_FMwebp_QL65_.jpg",
       price: 65
      }),
      createProduct({
       name: "Kamjuntar Glass Bud Vase Set",
       description: "Glass Bud Vase Set of 22, Small Vases for Flowers, Clear Centerpieces, Mini in Bulk Rustic Wedding Decorations, Vintage Look Home Table Flower Decor",          
       prod_category: "HomeDecor",
       inventory: 15,
      image: "https://m.media-amazon.com/images/I/71sx3UXbh7L._AC_UL480_FMwebp_QL65_.jpg",
       price: 40
      }),
      createProduct({
       name: "Kohler Candle",
       description: "Sprig by Kohler Recharge Aromatherapy Candle with Bergamot and Lemongrass, 100% Natural Soy-Coconut Wax, Uplifting and Invigorating Scent, Gift for Holidays, 8 oz",          
       prod_category: "HomeDecor",
       inventory: 50,
      image: "https://m.media-amazon.com/images/I/61ucZpkc6-L._AC_UL480_FMwebp_QL65_.jpg",
       price: 38
      }),
      //Furniture
      createProduct({
       name: "Yaheetech Recliner Chair",
       description: "Yaheetech Modern Fabric Recliner Chair Sofa Adjustable Single Sofa with Thicker Seat Cushion and Backrest for Living Room Home Theater, Beige",          
       prod_category: "Furniture",
       inventory: 20,
      image: "https://m.media-amazon.com/images/I/91WaKMv0pWL._AC_UL480_FMwebp_QL65_.jpg",
       price: 70
      }),
      createProduct({
       name: "Homall Bar Stools",
       description: "Homall Bar Stools Modern PU Leather Adjustable Swivel Barstools, Armless Hydraulic Kitchen Counter Bar Stool Synthetic Leather Extra Height Square Island Barstool with Back Set of 2(Black)",          
       prod_category: "Furniture",
       inventory: 25,
      image: "https://m.media-amazon.com/images/I/61vjgfkBi1L._AC_UL480_FMwebp_QL65_.jpg",
       price: 75
      }),
      createProduct({
       name: "HPWLYO Dresser",
       description: "9 Drawer Dresser with LED Light, Tall Fabric Chest of Drawers for Closet, Storage Tower with 3 Shelves, Wide Drawer Organizer Cabinet with Power Outlets for Bedroom, Living Room (Rustic Brown)",          
       prod_category: "Furniture",
       inventory: 10,
      image: "https://m.media-amazon.com/images/I/91VQiL0BzYL._AC_UL480_FMwebp_QL65_.jpg",
       price: 90
      }),
      createProduct({
       name: "Wlive Coffee Table",
       description: "WLIVE Wood Lift Top Coffee Table with Hidden Compartment and Adjustable Storage Shelf, Lift Tabletop Dining Table for Home Living Room, Office, Rustic Oak",          
       prod_category: "Furniture",
       inventory: 35,
      image: "https://m.media-amazon.com/images/I/81xhCy8yQ6L._AC_UL480_FMwebp_QL65_.jpg",
       price: 90
      }),
      createProduct({
       name: "BestOffice Chair",
       description: "Home Office Chair Ergonomic Desk Chair Mesh Computer Chair with Lumbar Support Armrest Executive Rolling Swivel Adjustable Mid Back Task Chair for Women Adults, Black",          
       prod_category: "Furniture",
       inventory: 35,
      image: "https://m.media-amazon.com/images/I/71Rhi0USPxL._AC_UL480_FMwebp_QL65_.jpg",
       price: 35
      }),
  ]);

  const users = await fetchAllUsers();
  console.log("List of Users: ", users);

  const prod_category = await fetchCategories();
  console.log("List of Categories: ", prod_category);

  const products = await fetchProducts();
  console.log("List of Products: ",products);

  const [ userOneCart, userTwoCart, userThreeCart, userFourCart, userFiveCart ] = await Promise.all([
    createCart({ user_id: userOne.id}),
    createCart({ user_id: userTwo.id}),
    createCart({ user_id: userThree.id}),
    createCart({ user_id: userFour.id}),
    createCart({ user_id: userFive.id}),
  ]);

  const carts = await fetchCarts();
  console.log("Carts: ", carts);
  
  const cartProducts = await Promise.all([
    addCartProduct({
      cart_id: userOneCart.id,
      product_id: allProducts[0].id,
      quantity: 3
    }),
    addCartProduct({
      cart_id: userTwoCart.id,
      product_id: allProducts[1].id,
      quantity: 4
    }),
    addCartProduct({
      cart_id: userThreeCart.id,
      product_id: allProducts[2].id,
      quantity: 2
    }),
    addCartProduct({
      cart_id: userFourCart.id,
      product_id: allProducts[3].id,
      quantity: 1
    }),
    addCartProduct({
      cart_id: userFiveCart.id,
      product_id: allProducts[4].id,
      quantity: 3
    }),
  ]);

  console.log("ProductsInCart: ", cartProducts);

}

module.exports = {
  createTables,
  seedTable, 
};
