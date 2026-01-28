module.exports =  (fn) => {
    return (req,res,next) =>{
        fn(req,res,next).catch(next);
    }
}

// D:\Web_Dev\backends\airbnb-clone backend\utils\wrapAsync.js