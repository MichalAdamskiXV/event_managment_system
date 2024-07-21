import { PayPalButtons } from "@paypal/react-paypal-js";

const PaymentLayout = ({ amountValue }: { amountValue: string }) => {
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
                    onApprove={(data, actions) => {
                        if (actions.order) {
                            return actions.order.capture().then(details => {
                                if (details.payer && details.payer.name) {
                                    console.log("Transaction completed by " + details.payer.name.given_name);
                                    // Tutaj możesz zaktualizować stan zamówienia w bazie danych
                                } else {
                                    console.log("Transaction completed, but payer details are missing.");
                                }
                            });
                        }
                        return Promise.reject(new Error("Order capture failed"));
                    }}
                    onError={(err) => {
                        console.error("Payment error: ", err);
                    }}
                />
            </div>
        </section>
    )
}

export default PaymentLayout
