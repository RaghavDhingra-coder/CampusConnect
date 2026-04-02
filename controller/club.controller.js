import Club from "../models/club.model.js";

export const RegisterClub = async (req,res)=>
{
    try
    {
        const {name} = req.body

        if(!name)
        {
            return res.status(400).json({
                message:"Club name is required",
                success:false
            })
        }

        let club = await Club.findOne({name})

        if(club)
        {
            return res.status(400).json({
                message:"Club already exists with this name",
                success:false
            })
        }

        club = await Club.create({
            name:name,
            userId:req.id
        })

        return res.status(201).json({
            message:"Club Registered successfully",
            club,
            success:true
        })
    }
    catch(err)
    {
        console.log(err)
    }
}


export const getClubs = async (req,res)=>
{
    try
    {
        const userId = req.id

        const clubs = await Club.find({userId})

        return res.status(200).json({
            clubs,
            success:true
        })
    }
    catch(err)
    {
        console.log(err)
    }
}


export const getClubById = async (req,res)=>
{
    try
    {
        const clubId = req.params.id

        const club = await Club.findById(clubId)

        if(!club)
        {
            return res.status(404).json({
                message:"Club not found",
                success:false
            })
        }

        return res.status(200).json({
            club,
            success:true
        })
    }
    catch(err)
    {
        console.log(err)
    }
}

export const updateClub = async (req,res)=>
{
    try
   { const {name,description,website} = req.body

   

    const updatedData = {name,description,website}

   

    const club = await Club.findByIdAndUpdate(req.params.id,updatedData,{new:true})

    if(!club)
    {
        return res.status(404).json({
            message:"Club not found",
            success:false
        })
    }

    return res.status(200).json({
        message:"Club Information Updated",
        success:true
    })}

    catch(err)
    {
        console.log(err.message)
    }
}