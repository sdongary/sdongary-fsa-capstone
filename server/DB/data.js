const {createUser} = require('./users.js');
const { createProduct} = require('./products.js');
const { addCartProduct } = require('./carts.js');
const { client } = require('../client.js')

const fakeData = async () => {
  try{
    const users = await Promise.all([
      createUser({
        username: 'userOne',
        email: 'userOne@gmail.com', 
        password: 'onepwd', 
        address: 'Boston', 
        payment_info: 'Debit Card',
        is_admin: true
      }),
      createUser({
        username: 'userTwo',
        email: 'userTwo@gmail.com', 
        password: 'twopwd',  
        address: 'Philadelphia', 
        payment_info: 'Credit Card',
        is_admin: false
      }),
      createUser({
        username: 'userThree',
        email: 'userThree@gmail.com', 
        password: 'threepwd',  
        address: 'New Orleans', 
        payment_info: 'Debit Card',
        is_admin: false
      }),
      createUser({
        username: 'userFour',
        email: 'userFour@gmail.com', 
        password: 'onefour',  
        address: 'New York', 
        payment_info: 'Gift Card',
        is_admin: false
      }),
      createUser({
        username: 'userFive',
        email: 'userFive@gmail.com', 
        password: 'fivepwd',  
        address: 'California', 
        payment_info: 'Credit Card',
        is_admin: false
      }),

    ]);

    const products = await Promise.all([

       // Electronics
      createProduct({
       name: "Insignia Smart TV",
       description: "INSIGNIA 32-inch Class F20 Series Smart HD 720p Fire TV with Alexa Voice Remote (NS-32F201NA23, 2022 Model)",          
       category: "Electronics",
       inventory: 25,
       price: 130
      }),
      createProduct({
       name: "Samsung Smart Phone",
       description: "SAMSUNG Galaxy S24 Cell Phone, 128GB AI Smartphone, Unlocked Android, 50MP Camera, Fastest Processor, Long Battery Life, US Version, 2024, Onyx Black, SM-S921UZKAXAA)",          
       category: "Electronics",
       inventory: 50,
       price: 800
      }),
      createProduct({
       name: "Bose Headphones",
       description: "Bose QuietComfort Ultra Wireless Noise Cancelling Headphones with Spatial Audio, Over-the-Ear Headphones with Mic, Up to 24 Hours of Battery Life, Black",          
       category: "Electronics",
       inventory: 40,
       price: 430
      }),
      createProduct({
       name: "Hp Laptop",
       description: "HP 17 Inch Laptop Computer, 17.3 FHD Business Laptop, Intel Core i3-N305(8-Core), 32GB RAM, 1TB SSD, Intel UHD Graphics, Fingerprint, WiFi 6, Thin and Light Laptop, Win 11 Home, with Stand",                   
       category: "Electronics",
       inventory: 15,
       price: 680
      }),
      createProduct({
       name: "Apple Watch",
       description: "Apple Watch Series 9 [GPS 45mm] Smartwatch with Midnight Aluminum Case with Midnight Sport Band S/M. Fitness Tracker, ECG Apps, Always-On Retina Display, Water Resistant",          
       category: "Electronics",
       inventory: 45,
       price: 350
      }),
      // Shoes and Apparel
      createProduct({
       name: "Levi's Men's Jacket",
       description: "Levi's Men's Washed Cotton Hooded Military Jacket (Regular & Big & Tall Sizes)",          
       category: "Shoes and Apparel",
       inventory: 45,
       price: 72
      }),
      createProduct({
       name: "Wrangler Jeans",
       description: "Wrangler Authentics Men's Regular Fit Comfort Flex Waist Jean",          
       category: "Shoes and Apparel",
       inventory: 100,
       price: 35
      }),
      createProduct({
       name: "Hey Dude Shoes",
       description: "Hey Dude Mens Wally L Stretch Shoes",          
       category: "Shoes and Apparel",
       inventory: 35,
       price: 60
      }),
      createProduct({
       name: "Levi's Women's Jeans",
       description: "Levi's Women's Low Pro Jeans",          
       category: "Shoes and Apparel",
       inventory: 30,
       price: 75
      }),
      createProduct({
       name: "Crocs",
       description: "Crocs Womens Brooklyn Low Wedges, Platform Sandals",          
       category: "Shoes and Apparel",
       inventory: 20,
       price: 50
      }),
      // Health & Beauty
      createProduct({
        name: "Olaplex Shampoo",
        description: "Olaplex No. 4 Bond Maintenance Shampoo",          
        category: "Health & Beauty",
        inventory: 100,
        price: 30
       }),
      createProduct({
        name: "Paulas Choice Exfoliant",
        description: "Paulas Choice--SKIN PERFECTING 2% BHA Liquid Salicylic Acid Exfoliant--Facial Exfoliant for Blackheads, Enlarged Pores, Wrinkles & Fine Lines, 4 oz Bottle",          
        category: "Health & Beauty",
        inventory: 80,
        price: 35
       }),
      createProduct({
        name: "Dr. Squatch Men's Bar Soap",
        description: "Dr. Squatch Men's Bar Soap Gift Set (10 Bars) – Men's Natural Bar Soap - Birchwood Breeze, Fresh Falls, Wood Barrel Bourbon, Coconut Castaway, Cedar Citrus, Bay Rum Soap, and more",          
        category: "Health & Beauty",
        inventory: 75,
        price: 63
       }),
      createProduct({
        name: "Old Spice Deodorant",
        description: "Old Spice Antiperspirant Deodorant for Men, Harbor Scent, 48 Hr Odor Protection, 2.6 oz (Pack of 3)",          
        category: "Health & Beauty",
        inventory: 60,
        price: 25
       }),
      createProduct({
        name: "Clinique Sunscreen",
        description: "Clinique SPF 50 Mineral Sunscreen Fluid For Face",          
        category: "Health & Beauty",
        inventory: 90,
        price: 35
       }),
       // Home Decor 
       createProduct({
        name: "Sweetcrispy Arched Mirror",
        description: "Sweetcrispy Arched Full Length Mirror 64x21 Full Body Mirror Floor Mirror Standing Hanging or Leaning Wall, Large Arch Wall Mirror with Stand Aluminum Alloy Thin Frame",          
        category: "Home Decor",
        inventory: 20,
        price: 50
       }),
       createProduct({
        name: "Jonathan Y Rug",
        description: "JONATHAN Y MOH101B-8 Moroccan Hype Boho Vintage Diamond 8 ft. x 10 ft. Area-Rug, Bohemian, Southwestern, Casual, Transitional, Pet Friendly, Non Shedding, Stain Resistant, Easy-Cleaning, Cream/Gray",
        category: "Home Decor",
        inventory: 10,
        price: 100
       }),
       createProduct({
        name: "InSimSea Frame",
        description: "InSimSea Framed Vintage Landscape Canvas Wall Art | Wild Field Oil Painting Prints | Cottagecore Bedroom Bathroom Office Decor 24x36inch",          
        category: "Home Decor",
        inventory: 20,
        price: 65
       }),
       createProduct({
        name: "Kamjuntar Glass Bud Vase Set",
        description: "Glass Bud Vase Set of 22, Small Vases for Flowers, Clear Centerpieces, Mini in Bulk Rustic Wedding Decorations, Vintage Look Home Table Flower Decor",          
        category: "Home Decor",
        inventory: 15,
        price: 40
       }),
       createProduct({
        name: "Kohler Candle",
        description: "Sprig by Kohler Recharge Aromatherapy Candle with Bergamot and Lemongrass, 100% Natural Soy-Coconut Wax, Uplifting and Invigorating Scent, Gift for Holidays, 8 oz",          
        category: "Home Decor",
        inventory: 50,
        price: 38
       }),
       //Furniture
       createProduct({
        name: "Yaheetech Recliner Chair",
        description: "Yaheetech Modern Fabric Recliner Chair Sofa Adjustable Single Sofa with Thicker Seat Cushion and Backrest for Living Room Home Theater, Beige",          
        category: "Furniture",
        inventory: 20,
        price: 70
       }),
       createProduct({
        name: "Homall Bar Stools",
        description: "Homall Bar Stools Modern PU Leather Adjustable Swivel Barstools, Armless Hydraulic Kitchen Counter Bar Stool Synthetic Leather Extra Height Square Island Barstool with Back Set of 2(Black)",          
        category: "Furniture",
        inventory: 25,
        price: 75
       }),
       createProduct({
        name: "HPWLYO Dresser",
        description: "9 Drawer Dresser with LED Light, Tall Fabric Chest of Drawers for Closet, Storage Tower with 3 Shelves, Wide Drawer Organizer Cabinet with Power Outlets for Bedroom, Living Room (Rustic Brown)",          
        category: "Furniture",
        inventory: 10,
        price: 90
       }),
       createProduct({
        name: "Wlive Coffee Table",
        description: "WLIVE Wood Lift Top Coffee Table with Hidden Compartment and Adjustable Storage Shelf, Lift Tabletop Dining Table for Home Living Room, Office, Rustic Oak",          
        category: "Furniture",
        inventory: 35,
        price: 90
       }),
       createProduct({
        name: "BestOffice Chair",
        description: "Home Office Chair Ergonomic Desk Chair Mesh Computer Chair with Lumbar Support Armrest Executive Rolling Swivel Adjustable Mid Back Task Chair for Women Adults, Black",          
        category: "Furniture",
        inventory: 35,
        price: 35
       }),
    ]);

    // const createCarts = 
    
    // const cartedProducts = await Promise.all([
    //   addCartProduct({ user_id: users[0].id, product_id: products[0].id, quantity: 1 }),
    //   addCartProduct({ user_id: users[1].id, product_id: products[1].id, quantity: 5 }),
    //   addCartProduct({ user_id: users[2].id, product_id: products[2].id, quantity: 3 }),
    //   addCartProduct({ user_id: users[3].id, product_id: products[3].id, quantity: 2 })
    // ]);
    //   console.log(cartedProducts);

    return {users, products , addCartProduct};
  } catch(err){
    console.error(err);
  }    
};

module.exports = {fakeData}