import { Svix, Webhook } from "svix";
import User from './User.js';

// API Controller Function to manage Clerk Users in the database
export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const { data, type } = req.body;

        switch (type) {
            case 'user.created': {
                const email = data.email_addresses[0].email_address;
                const userData = {
                    _id: data.id,
                    email,
                    name: `${data.first_name} ${data.last_name}`,
                    imageUrl: data.image_url,
                };

                await User.create(userData);
                res.json({});
                break;
            }

            case 'user.updated': {
                const email = data.email_addresses[0].email_address;
                const userData = {
                    email,
                    name: `${data.first_name} ${data.last_name}`,
                    imageUrl: data.image_url,
                };

                await User.findByIdAndUpdate(data.id, userData);
                res.json({});
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                res.json({});
                break;
            }

            default:
                res.status(400).json({ success: false, message: "Unhandled event type" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
