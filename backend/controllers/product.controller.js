import Product from "../models/product.model.js"
import {redis} from "../lib/redis.js"

export const getAllProducts = async(req, res) => {
    try {
        const products = await Product.find({}) //find all products
        res.json({products})
    } catch (error) {
        console.log("Error in getAllProducts", error.message)
        res.status(500).json({message: "Server error", error: error.message})
        
    }
}

export const getFeaturedProducts = async(req, res) => {
    try {
      let featuredProducts = await redis.get("featuredProcuts")
      if(featuredProducts){
        return res.json({products: JSON.parse(featuredProducts)})
      }

      //if not in redis, fetch from mongodb
      //.lean() returns plain js objects instead of mongoose documents, improving performance
      featuredProducts = await Product.find({isFeatured: true}).lean()

      if(!featuredProducts){
        return res.status(404).json({message: "No featured products found"})
      }
      //Store in redis for future quisk access
      await redis.set("featuredProducts", JSON.stringify(featuredProducts)) //expire in 1 hour
    } catch (error) {
        console.log("Error in getFeaturedProducts", error.message)
        res.status(500).json({message: "Server error", error: error.message})
    }
}