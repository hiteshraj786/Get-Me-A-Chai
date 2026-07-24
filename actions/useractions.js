"use server"
import Razorpay from "razorpay"
import connectDB from "@/db/connectDB"
import User from "@/models/User"
import Payment from "@/models/Payment"



export const initiate = async (amount, to_username, paymentform) => {
    await connectDB();

    // fetch the secret of the user who is getting the payment 
    let user = await User.findOne({ username: to_username })
    const secret = user.razorpaySecret

    var instance = new Razorpay({ key_id: user.razorpayId, key_secret: secret });




    let options = {
        amount: Number.parseInt(amount) * 100,
        currency: "INR",
    }
    let x = await instance.orders.create(options);

    // create a payment object which shows a pending payment in the database
    await Payment.create({
        oid: x.id,
        amount: amount,
        to_user: to_username,
        name: paymentform.name,
        message: paymentform.message,

    })

    return x;
}

export const fetchuser = async (username) => {
    await connectDB();
    let u = await User.findOne({ username: username })
    if (!u) {
        return null;
    }
    let user = u.toObject({ flattenObjectIds: true })
    return user;
}

// export const fetchpayments = async (username)=>{
//     await connectDB() ; 
//     // find all payments sorted by decreasing order of amount  and  flatten object ids 
//     let p = await Payment.find({to_user:username}).sort({amount:-1}).lean({flattenObjectIds:true})
//     return p ;

// }

export const fetchpayments = async (username) => {
    await connectDB();
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(10).lean()
    return p.map(doc => ({
        ...doc,
        _id: doc._id.toString(),
    }));
}



export const updateProfile = async (data, oldusername) => {
    await connectDB();
    // let ndata = Object.fromEntries(data)
    let ndata = data



    let checkUser = await User.findOne({ username: oldusername })


    // Saare users ke exact usernames dekho
    let allUsers = await User.find({}, "username email")




    // If the username is being updated , check if username is available 
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }
    }

    // await User.updateOne({email:ndata.email}, ndata)
    const { _id, createdAt, updatedAt, __v, ...updateData } = ndata;

    let result = await User.updateOne(
        { username: oldusername },
        { $set: updateData }
    );



    if (oldusername !== ndata.username && result.modifiedCount > 0) {
        await Payment.updateMany(
            { to_user: oldusername },
            { $set: { to_user: ndata.username } }
        );
    }

    return result;

}