import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js";


// FUCTION FOR ADD PRODUCT
const addProduct = async (req, res) => {
    try {

        // PRODUCT DETAILS
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // PRODUCT IMAGES
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        // FILTERING OUT UNDEFINED IMAGES
        const images = [image1, image2, image3, image4].filter((item) => item != undefined)

        // UPLOAD THE IMAGES TO CLOUDINARY AND TAKING URL IN IMAGE-URL TO STORE IN MONGODB
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
                return result.secure_url;
            })
        )

        // ADDING PRODUCT TO DB
        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesUrl,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            date: Date.now(),
        }

        const product = new productModel(productData);

        await product.save();

        res.json({ success: true, data: product, message: "Product added successfully" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// FUCTION FOR LIST PRODUCT
const listProducts = async (req, res) => {
    try {

        const products = await productModel.find({});
        res.json({ success: true, products })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// FUCTION FOR REMOVING PRODUCT
const removeProduct = async (req, res) => {
    try {

        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product removed successfully" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// FUNCTION FOR SINGLE PRODUCT INFO
const singleProduct = async (req, res) => {
    try {

        const { productId } = req.body;

        const product = await productModel.findById(productId);

        res.json({ success: true, product })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { addProduct, listProducts, removeProduct, singleProduct };