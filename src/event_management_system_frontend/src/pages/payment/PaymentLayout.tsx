import { createPayout, getAccessToken } from "@/services/payPalService";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

const PaymentLayout = ({ amountValue = "1" }: { amountValue: string }) => {

    const [transactionId, setTransactionId] = useState(null);
    const handleApprove = async (data: any, actions: any) => {
        if (actions.order) {
            return actions.order.capture().then(async (details: any) => {
                if (details.id) {
                    setTransactionId(details.id);
                    console.log("Transaction completed by " + details.payer.name.given_name);

                    const accessToket = await getAccessToken();
                    const payoutData = {
                        sender_batch_header: {
                            sender_batch_id: `batch_${new Date().getTime()}`,
                            email_subject: "You have a payout!",
                            email_message: "You have received a payout! Thanks for using our service!"
                        },
                        items: [
                            {
                                recipient_type: "EMAIL",
                                amount: {
                                    value: amountValue,
                                    currency: "USD"
                                },
                                receiver: "madamskixv@gmail.com", // Zastąp prawidłowym emailem odbiorcy
                                note: "Thanks for your patronage!",
                                sender_item_id: `item_${new Date().getTime()}`
                            }
                        ]
                    }
                    const payoutResult = await createPayout(accessToket, payoutData);
                    console.log('Payout created successfully: ', payoutResult);
                } else {
                    console.log("Transaction completed, but payer details are missing.");
                }
            })
        }
        return Promise.reject(new Error("Order capture failed"));
    }

    return (
        <section className="w-[100vw] h-[100vh] bg-darkOpacity absolute top-0 left-0 z-10 flex items-center justify-center">
            <div className="w-[70%] flex justify-center items-center">
                <PayPalButtons
                    className="w-[500px]"
                    createOrder={(data, actions) => {
                        if (actions.order) {
                            return actions.order.create({
                                intent: "CAPTURE",
                                purchase_units: [{
                                    amount: {
                                        currency_code: "USD",
                                        value: amountValue
                                    }
                                }]
                            });
                        }
                        return Promise.reject(new Error("Order creation failed"));
                    }}
                    onApprove={handleApprove}
                    onError={(err) => {
                        console.error("Payment error: ", err);
                    }}
                />
            </div>
        </section>
    )
}

export default PaymentLayout
