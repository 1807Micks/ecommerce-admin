import User from "../models/user.model.js"

export const signup = async(req, res)=> {
    const {email, password, name} = req.body
   try {
     const userExists = await User.findOne({email})

    if(userExists){
        return res.status(400).json({message: 'User already exists'})
    }
    const user = await User.create({email, name, password})
    
    res.status(201).json({user, message: "User created successfully"})
   } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({message: 'Internal server error'})
   }
}
export const logout = async(req, res)=> {
    res.send('Logout in route called')
}
export const login = async(req, res)=> {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json({message: 'Invalid credentials'})
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        return res.status(400).json({message: 'Invalid credentials'})
    }

    res.json({message: 'Login successful'})
}