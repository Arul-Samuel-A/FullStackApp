

function handleAuthReq(req, res){
    res.status(200).json({
        message: "Authorized",
        admin: req.admin
    });
}

export default handleAuthReq;