import Stripe from "stripe";
import userModel from "../models/userModel.js";
import generateToken from "../middlewares/utils.js";




const stripePayment = async (request, response) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const {price, name, userId} = request.body;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        product_data: { name: name },
                        unit_amount: price,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `http://localhost:2020/verify?success=true&userId=${userId}`,
            cancel_url: `http://localhost:2020/verify?success=false&userId=${userId}`,
        });

        response.json({ success:true,url:session.url})
    } catch (error) {
        response.json({success:false, message:error.message})
    }
}

const verifyStripe = async (request, response) => {
    const {userId, success, name} = request.body
    try {
        if (success === "true") {
            await userModel.findByIdAndUpdate(userId, {isPremium:true,premiumTariff:name })

            response.json({success:true})
        } {
            response.json({success:false})
        }

    } catch (error) {
        response.json({success:false, message:error.message})
    }

}

export {stripePayment, verifyStripe}