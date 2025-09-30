const accessors = (accessor) => {
    return (req,res,next) => {
                console.log(req.user);
                res.status(200).send("this is role checker");
            }
    
}

module.exports = accessors;