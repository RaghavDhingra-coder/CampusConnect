import Event from "../models/event.model.js";



export const postEvent = async (req,res)=>
{
    try
    {
        const {title,description,date,time,fee,club,venue} = req.body

        const userId = req.id

        if(!title || !description || !date || !time || !fee || !club || !venue)
        {
            return res.status(400).json({
                message:"Somethings is missing",
                success:false
            })
        }

        const event = await Event.create({
            title,
            description,
            date,
            time,
            fee,
            venue,
            club,
            created_by:userId
            
        })

        return res.status(201).json({
            message:"New Event Created Successfully",
            success:true
        })
    }
    catch(err)
    {
        console.log(err)
    }
}


export const getEventById = async (req,res)=>
{
    try
    {
        const eventId = req.params.id

        const event = await Event.findById(eventId).populate("RegisteredUsers")

        if(!event)
        {
            return res.status(404).json({
                message:"Event Not found",
                success:false
            })
        }

        return res.status(200).json({
            event,
            success:true
        })
    }
    catch(err)
    {
        console.log(err.message)
    }
}

export const getAdminEvents = async(req,res)=>
{
    try
    {
        const adminId = req.id
        const events = await Event.find({created_by:adminId}).populate("club").sort({createdAt:-1})

        return res.status(200).json({
            events,
            success:true
        })
    }
    catch(err)
    {
        console.log(err.message)
    }
}

export const getAllEvents = async(req,res)=>
{
    try
    {
        const keyword = req.query.keyword

        let query = {}

        if(keyword)
        {
            query = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } }
        ]
      }
        }

        const events = await Event.find(query).populate("club").sort({createdAt:-1})

        return res.status(200).json({
            events,
            success:true
        })
    }
    catch(err)
    {
        console.log(err.message)
    }
}