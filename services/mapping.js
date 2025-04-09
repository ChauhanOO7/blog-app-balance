const uidanduser=new Map();

function setUser(uid,user)
{
    uidanduser.set(uid,user);
}

function getUser(uid)
{
    return uidanduser.get(uid);
}


module.exports={setUser,getUser};