const isClubHead = (req, res, next) => {

  if (req.role !== "clubHead") {
    return res.status(403).json({
      message: "Only club head allowed",
      success: false
    });
  }

  next();
};

export default isClubHead;