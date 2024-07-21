import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_PAYPAL_CLIENT_SECRET;

export const getAccessToken = async () => {
    try {
        const auth = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
        const response = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token',
            'grant_type=client_credentials', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${auth}`
            }
        }
        );
        return response.data.access_token;
    } catch (error) {
        // console.error('Error getting access token:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const createPayout = async (accessToken: any, payoutData: any) => {
    try {
        const response = await axios.post('https://api-m.sandbox.paypal.com/v1/payments/payouts', payoutData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        // console.error('Error creating payout:', error.response ? error.response.data : error.message);
        throw error;
    }
}