const jwt= require("jsonwebtoken");
const secret = "SUPERSECRETDONTTELLANYONE";


function setUser(result){
    //console.log("The type of result is: ",typeof(result));
   return jwt.sign({
    _id: result._id,
    email: result.email,
    role : result.role,
   },
secret);
}

function getUser(token){

    if(!token) return null;
    try{
        return jwt.verify(token,secret);

    }catch(error){
        console.log("Error in verifying jwt: ",error.message);
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
};