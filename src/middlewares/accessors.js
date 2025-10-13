const accessors = (accessor) => {
    return (req, res, next) => {
        if(accessor.includes(req.user.role)){
            next();
        }else{
            res.status(403).send("access denied")
        }
    }
}
module.exports = accessors;