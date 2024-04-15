import p1_img from "./tv.jpg";
import p2_img from "./phone.jpg";
import p3_img from "./headphones.jpg";
import p4_img from "./laptop.jpg";
import p5_img from "./apple watch.jpg";
import p6_img from "./Mens Jacket.jpg";
import p7_img from "./Mens Jeans.jpg";
import p8_img from "./HD Shoes.jpg";
import p9_img from "./Womens Jeans.jpg";
import p10_img from "./Crocs.jpg";
import p11_img from "./Shampoo.jpg";
import p12_img from "./Paulas Choice Exfoliant.jpg";
import p13_img from "./Dr. Squatch Soap.jpg";
import p14_img from "./Old Spice.jpg";
import p15_img from "./Sunscreen.jpg";
import p16_img from "./Arched Mirror.jpg";
import p17_img from "./Rug.jpg";
import p18_img from "./Frame Art.jpg";
import p19_img from "./Vase Set.jpg";
import p20_img from "./Candle.jpg";
import p21_img from "./Recliner.jpg";
import p22_img from "./Bar Stools.jpg";
import p23_img from "./Dresser.jpg";
import p24_img from "./Coffee Table.jpg";
import p25_img from "./Office Chair.jpg";

let all_product = [
  {
    id: 1,
    name: "Insignia Smart TV",
         description: "INSIGNIA 32-inch Class F20 Series Smart HD 720p Fire TV with Alexa Voice Remote (NS-32F201NA23, 2022 Model)",          
         category: "Electronics",
         inventory: "25",
         price: "$130",
    image: p1_img
  },
  {
    id: 2,
    name: "Samsung Smart Phone",
         description: "SAMSUNG Galaxy S24 Cell Phone, 128GB AI Smartphone, Unlocked Android, 50MP Camera, Fastest Processor, Long Battery Life, US Version, 2024, Onyx Black, SM-S921UZKAXAA)",          
         category: "Electronics",
         inventory: "50",
         price: "$800",
    image: p2_img
  },
  {
    id: 3,
    name: "Bose Headphones",
         description: "Bose QuietComfort Ultra Wireless Noise Cancelling Headphones with Spatial Audio, Over-the-Ear Headphones with Mic, Up to 24 Hours of Battery Life, Black",          
         category: "Electronics",
         inventory: "40",
         price: "$430",
    image: p3_img
  },
  {
    id: 4,
    name: "Hp Laptop",
         description: "HP 17 Inch Laptop Computer, 17.3 FHD Business Laptop, Intel Core i3-N305(8-Core), 32GB RAM, 1TB SSD, Intel UHD Graphics, Fingerprint, WiFi 6, Thin and Light Laptop, Win 11 Home, with Stand",                   
         category: "Electronics",
         inventory: "15",
         price: "$680",
    image: p4_img
  },
  {
    id: 5,
    name: "Apple Watch",
    description: "Apple Watch Series 9 [GPS 45mm] Smartwatch with Midnight Aluminum Case with Midnight Sport Band S/M. Fitness Tracker, ECG Apps, Always-On Retina Display, Water Resistant",          
    category: "Electronics",
    inventory: "45",
    price: "$350",
    image: p5_img
  },
  {
    id: 6,
    name: "Levi's Men's Jacket",
    description: "Levi's Men's Washed Cotton Hooded Military Jacket (Regular & Big & Tall Sizes)",          
    category: "Shoes and Apparel",
    inventory: "45",
    price: "$72",
    image: p6_img
  },
  {
    id: 7,
    name: "Wrangler Jeans",
         description: "Wrangler Authentics Men's Regular Fit Comfort Flex Waist Jean",          
         category: "Shoes and Apparel",
         inventory: "100",
         price: "$35",
    image: p7_img
  },
  {
    id: 8,
    name: "Hey Dude Shoes",
    description: "Hey Dude Mens Wally L Stretch Shoes",          
    category: "Shoes and Apparel",
    inventory: "35",
    price: "$60",
    image: p8_img
  },
  {
    id: 9,
    name: "Levi's Women's Jeans",
    description: "Levi's Women's Low Pro Jeans",          
    category: "Shoes and Apparel",
    inventory: "30",
    price: "$75",
    image: p9_img
  },
  {
    id: 10,
    name: "Crocs",
    description: "Crocs Womens Brooklyn Low Wedges, Platform Sandals",          
    category: "Shoes and Apparel",
    inventory: "20",
    price: "$50",
    image: p10_img
  },
  {
    id: 11,
    name: "Olaplex Shampoo",
    description: "Olaplex No. 4 Bond Maintenance Shampoo",          
    category: "Health & Beauty",
    inventory: "100",
    price: "$30",
    image: p11_img
  },
  {
    id: 12,
    name: "Paulas Choice Exfoliant",
    description: "Paulas Choice--SKIN PERFECTING 2% BHA Liquid Salicylic Acid Exfoliant--Facial Exfoliant for Blackheads, Enlarged Pores, Wrinkles & Fine Lines, 4 oz Bottle",          
    category: "Health & Beauty",
    inventory: "80",
    price: "$35",
    image: p12_img
  },
  {
    id: 13,
    name: "Dr. Squatch Men's Bar Soap",
    description: "Dr. Squatch Men's Bar Soap Gift Set (10 Bars) – Men's Natural Bar Soap - Birchwood Breeze, Fresh Falls, Wood Barrel Bourbon, Coconut Castaway, Cedar Citrus, Bay Rum Soap, and more",          
    category: "Health & Beauty",
    inventory: "75",
    price: "$63",
    image: p13_img
  },
  {
    id: 14,
    name: "Old Spice Deodorant",
    description: "Old Spice Antiperspirant Deodorant for Men, Harbor Scent, 48 Hr Odor Protection, 2.6 oz (Pack of 3)",          
    category: "Health & Beauty",
    inventory: "60",
    price: "$25",
    image: p14_img
  },
  {
    id: 15,
    name: "Clinique Sunscreen",
    description: "Clinique SPF 50 Mineral Sunscreen Fluid For Face",          
    category: "Health & Beauty",
    inventory: "90",
    price: "$35",
    image: p15_img
  },
  {
    id: 16,
    name: "Sweetcrispy Arched Mirror",
    description: "Sweetcrispy Arched Full Length Mirror 64x21 Full Body Mirror Floor Mirror Standing Hanging or Leaning Wall, Large Arch Wall Mirror with Stand Aluminum Alloy Thin Frame",          
    category: "Home Decor",
    inventory: "20",
    price: "$50",
    image: p16_img
  },
  {
    id: 17,
    name: "Jonathan Y Rug",
    description: "JONATHAN Y MOH101B-8 Moroccan Hype Boho Vintage Diamond 8 ft. x 10 ft. Area-Rug, Bohemian, Southwestern, Casual, Transitional, Pet Friendly, Non Shedding, Stain Resistant, Easy-Cleaning, Cream/Gray",
    category: "Home Decor",
    inventory: "10",
    price: "$100",
    image: p17_img
  },
  {
    id: 18,
    name: "InSimSea Frame",
    description: "InSimSea Framed Vintage Landscape Canvas Wall Art | Wild Field Oil Painting Prints | Cottagecore Bedroom Bathroom Office Decor 24x36inch",          
    category: "Home Decor",
    inventory: "20",
    price: "$65",
    image: p18_img
  },
  {
    id: 19,
    name: "Kamjuntar Glass Bud Vase Set",
    description: "Glass Bud Vase Set of 22, Small Vases for Flowers, Clear Centerpieces, Mini in Bulk Rustic Wedding Decorations, Vintage Look Home Table Flower Decor",          
    category: "Home Decor",
    inventory: "15",
    price: "$40",
    image: p19_img
  },
  {
    id: 20,
    name: "Kohler Candle",
    description: "Sprig by Kohler Recharge Aromatherapy Candle with Bergamot and Lemongrass, 100% Natural Soy-Coconut Wax, Uplifting and Invigorating Scent, Gift for Holidays, 8 oz",          
    category: "Home Decor",
    inventory: "50",
    price: "$38",
    image: p20_img
  },
  {
    id: 21,
    name: "Yaheetech Recliner Chair",
    description: "Yaheetech Modern Fabric Recliner Chair Sofa Adjustable Single Sofa with Thicker Seat Cushion and Backrest for Living Room Home Theater, Beige",          
    category: "Furniture",
    inventory: "20",
    price: "$70",
    image: p21_img
  },
  {
    id: 22,
    name: "Homall Bar Stools",
    description: "Homall Bar Stools Modern PU Leather Adjustable Swivel Barstools, Armless Hydraulic Kitchen Counter Bar Stool Synthetic Leather Extra Height Square Island Barstool with Back Set of 2(Black)",          
    category: "Furniture",
    inventory: "25",
    price: "$75",
    image: p22_img
  },
  {
    id: 23,
    name: "HPWLYO Dresser",
    description: "9 Drawer Dresser with LED Light, Tall Fabric Chest of Drawers for Closet, Storage Tower with 3 Shelves, Wide Drawer Organizer Cabinet with Power Outlets for Bedroom, Living Room (Rustic Brown)",          
    category: "Furniture",
    inventory: "10",
    price: "$90",
    image: p23_img
  },
  {
    id: 24,
    name: "Wlive Coffee Table",
    description: "WLIVE Wood Lift Top Coffee Table with Hidden Compartment and Adjustable Storage Shelf, Lift Tabletop Dining Table for Home Living Room, Office, Rustic Oak",          
    category: "Furniture",
    inventory: "35",
    price: "$90" ,
    image: p24_img
  },
  {
    id: 25,
    name: "BestOffice Chair",
    description: "Home Office Chair Ergonomic Desk Chair Mesh Computer Chair with Lumbar Support Armrest Executive Rolling Swivel Adjustable Mid Back Task Chair for Women Adults, Black",          
    category: "Furniture",
    inventory: "35",
    price: "$35",
    image: p25_img
  },
  
];

export default all_product;
