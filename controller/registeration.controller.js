import Event from "../models/event.model.js";
import Registration from "../models/Registeration.model.js";


import QRCode from "qrcode";
import PDFDocument from "pdfkit";

export const ApplyEvent = async (req, res) => {
    try {

        const userId = req.id;
        const EventId = req.params.id;
    //     const {isPaid} = req.body

    //         if (!isPaid) {
    //     return res.status(400).json({
    //         message: "Payment required",
    //         success: false
    //     });
    // }

        if (!EventId) {
            return res.status(400).json({
                message: "Event Id is required",
                success: false
            });
        }

        // 1. Check already registered
        const existingRegisteration = await Registration.findOne({
            user: userId,
            event: EventId
        });

        if (existingRegisteration) {
            return res.status(400).json({
                message: "You have already applied for this Event",
                success: false
            });
        }

        // 2. Check event exists
        const event = await Event.findById(EventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found",
                success: false
            });
        }

        
        // 3. Generate ticketId
        const ticketId = "EVT" + Date.now();

        // 4. Generate QR
        const qrCode = await QRCode.toDataURL(ticketId);

        // 5. Create registration
        const newRegisteration = await Registration.create({
            user: userId,
            event: EventId,
            ticketId,
            qrCode
        });

        event.RegisteredUsers.push(newRegisteration._id)

        await event.save()


        return res.status(201).json({
            message: "Event Registered Successfully",
            registration: newRegisteration,
            success: true
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export const getAppliedEvents = async (req,res)=>
{
    try
    {
        const userId = req.id

        const registerations = await Registration.find({user:userId}).sort({createdAt:-1}).populate({


                path:"event",
                populate:{
                    path:"club"
                }
        })

        return res.status(200).json({
            registerations,
            success:true
        })
    }
    catch(err)
    {
        console.log(err)
    }
}


export const getRegisterations = async(req,res)=>
{
    try
    {
        
        const eventId = req.params.id

        const event = await Event.findById(eventId).populate({
            path:"RegisteredUsers",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"user"
            }
        })

        if(!event)
        {
            return res.status(404).json({
                message:"Event not found",
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
        console.log(err)
    }
}

export const updateStatus = async (req, res) => {
    try {

        const ticketId = req.params.id; // ✅ FIXED

        if (!ticketId) {
            return res.status(400).json({
                message: "Ticket ID required",
                success: false
            });
        }

        if (req.role !== "clubHead") {
            return res.status(403).json({
                message: "Only club head allowed",
                success: false
            });
        }

        const registration = await Registration.findOne({ ticketId });

        if (!registration) {
            return res.status(404).json({
                message: "Invalid ticket",
                success: false
            });
        }

        if (registration.status === "attended") {
            return res.status(400).json({
                message: "Already scanned",
                success: false
            });
        }

        registration.status = "attended";
        await registration.save();

        return res.status(200).json({
            message: "Entry allowed",
            success: true
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export const downloadTicket = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;

    const registration = await Registration.findOne({ ticketId });

    if (!registration) {
      return res.send("Ticket not found");
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${ticketId}.pdf`
    );

    doc.pipe(res);

    // Title
    doc.fontSize(20).text("Campus Connect Ticket", { align: "center" });

    doc.moveDown();

    // Basic info
    doc.fontSize(14).text("Ticket ID: " + ticketId);
    doc.text("Status: " + registration.status);

    doc.moveDown();

    // ✅ Add QR Code
    if (registration.qrCode) {
      const qrImage = registration.qrCode.replace(
        /^data:image\/png;base64,/,
        ""
      );

      doc.image(Buffer.from(qrImage, "base64"), {
        fit: [150, 150],
        align: "center"
      });
    }

    doc.end();

  } catch (err) {
    console.log(err);
    res.send("Error generating ticket");
  }
};


export const checkRegistration = async (req, res) => {
  try {
    const userId = req.id;
    const eventId = req.params.id;

    const existing = await Registration.findOne({
      user: userId,
      event: eventId
    });

    if (existing) {
      return res.status(200).json({
        registered: true,
        ticketId: existing.ticketId
      });
    }

    return res.status(200).json({
      registered: false
    });

  } catch (err) {
    console.log(err);
  }
};

{/* <button onClick={() => window.open(`http://localhost:8000/api/ticket/${ticketId}`)}>
  Download Ticket
</button> */}