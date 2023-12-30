module.exports = function(req,res,next){


    try{
        const {title,content,roomId} = req.body;

        io.to(roomId).emit("push", {title,content,id:new Date()})

        res.status(200).end();
    }catch(e){
        console.log(e.message);
        return res.status(500).end();
    }
}