export const API_BASE_URL =  'https://api.stripe.com';
export const API_KEY = 'pk_test_BkU5GWvqVFsOMAUM5xQn7Cid00JcpHeqty';   // public test key

/*
    To process a payment, call the following methods in this order:
        1.createNewPaymentMethod (frontend to stripe)
        2.createNewPaymentIntent including the paymentMethodId (frontend to backend to stripe)
        The payment is processed immediately when sent from backend
*/

// builds init for fetch call, pass in null if there is no body.
// example; makeInit("GET", true, null), makeInit("POST", false, body)
export function makeInit(requestType, requiresAuthorization, body){
    const headers = new Headers();
    var init
    if(requiresAuthorization === true){ headers.append('Authorization', 'Bearer '+API_KEY)}

    switch(requestType) {
        case "GET":
            //don't add any other headers for GET request
            break;
        case "POST":
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            break;
        case "PUT":
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            break;
        case "DELETE":
            //don't add any other headers for delete request
            break;
        default:
            throw 'Parameter is not a valid request type!';
    }

    if(body === null){
        init = {
            method: requestType,
            headers
        }
    }
    else{
        init = {
            method: requestType,
            headers,
            body
        }
    }
    return init
}

export default {
    // Requires amount, and currency.
    // amount = 10000 <- this is actually $100.00
    // currency = usd
    createNewPaymentIntent (body) {
        return fetch(API_BASE_URL+"/v1/payment_intents", makeInit("POST", true, body) )
    },
    // Requires type, card[number], card[exp_month], card[exp_year], and card[cvc].
    // type = card, card[number] = 4242424242424242, card[exp_month] = 7, card[exp_year] = 2021, card[cvc] = 314
    createNewPaymentMethod (body) {
        return fetch(API_BASE_URL+"/v1/payment_methods", makeInit("POST", true, body) )
    },
    // Requires payment_method
    // payment_method = pm_card_visa
    confirmPayment (body, paymentIntentId) {

        return fetch(API_BASE_URL+"/v1/payment_intents/" + paymentIntentId + "/confirm", makeInit("POST", true, body) )
    }
}