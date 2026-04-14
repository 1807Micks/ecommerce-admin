export const addToCart = async(req, res) => {
    try {
        const {productId} = req.body
        const user = req.user

        const existingItem = user.cartItems.find(item => item.id === productId)
        if(existingItem) {
            existingItem.quantity += 1
        } else{
            user.cartItems.push({id: productId, quantity: 1})
        }
        await user.save()
        res.status(200).json({message: "Item added to cart"})
    } catch (error) {
        console.error("Error addToCart controller:", error)
        res.status(500).json({message: "Error adding item to cart"})
    }
}

export const removeAllFromCart = async(req, res) => {
    try {
        const {productId} = req.body
        const user = req.user
        if(!productId){
            user.cartItems = []
        }else{
            user.cartItems = user.cartItems.filter((item) => item.id !== productId)
        }
        await user.save()
        res.json(user.cartItems)
    } catch (error) {
        console.log("Error removeAllFromCart controller:", error)
        res.status(500).json({message: "Error removing item(s) from cart"})
    }
}