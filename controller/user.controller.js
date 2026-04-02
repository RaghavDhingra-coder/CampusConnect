import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req,res)=>
{
    try
    {
        const {USN,password} = req.body

        if(!USN || !password)
        {
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }

        const existingUser = await User.findOne({USN})

        if(existingUser)
        {
            return res.status(400).json({
                message:"User already exists with this email",
                success:false
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        await User.create({
            USN,
            password:hashedPassword
        })

        return res.status(201).json({
            message:"Account Created Successfully",
            success:true
        })
    }
    catch(err)
    {
        console.log(err)
    }
}

export const login = async (req,res)=>
{
    try
    {
        const {USN,password} = req.body

        if(!USN || !password)
        {
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }

        const user = await User.findOne({USN})

        if(!user)
        {
            return res.status(404).json({
                message:"Incorrect Credentials",
                success:false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password)

        if(!isPasswordMatch)
        {
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
        }

        const token = jwt.sign({userId:user._id,role:user.role},process.env.SECRET_KEY,{expiresIn:"1d"})

        const userData = {
            _id:user._id,
            USN:user.USN,
            role:user.role,
            profile:user.profile
        }

        
        return res.status(200).cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",                    // ✅ ADD THIS
    maxAge: 24 * 60 * 60 * 1000
}).json({
    message: `Welcome Back ${user.USN}`,
    user: userData,
    success: true
});
    }

    catch(err)
    {
        console.log(err)
    }
}

export const logout = async (req,res)=>
{
    try
    {
        return res
            .status(200)
            .cookie("token", "", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 0
            })
            .json({
                message: "Logged out successfully",
                success: true
            });
    }
    catch(err)
    {
        console.log(err)
    }
}

export const updateProfile = async (req,res)=>
{
    try
    {

        const {Name,year,Branch} = req.body

        const userId = req.id

        let user = await User.findOne({_id:userId})

        if(!user)
        {
            return res.status(400).json({
                message:"User not found",
                success:false
            })
        }

        if(Name)
        {
            user.profile.Name = Name
        }
        if(year)
        {
            user.profile.year = year
        }
        if(Branch)
        {
            user.profile.Branch = Branch
        }

        await user.save()

        const updatedUser = {
            _id:user._id,
            USN:user.USN,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).json({
            message:"Profile Updated Successfully",
            user:updatedUser,
            success:true
        })
    }
    catch(err)
    {
        console.log(err)
    }
}