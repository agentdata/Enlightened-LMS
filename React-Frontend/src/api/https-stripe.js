export const API_BASE_URL =  'https://api.stripe.com';
export const API_KEY = 'pk_test_51H4HWYCI6wJm5zzTHFNrK4VpjX1W3YGJn79GiwAjW8aibKekAMwraEXJsmtPmOrrDZCKf2fmzaDmKQz2OOgfQcoL00EkxWGwHQ';

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
    createNewPaymentIntent (body) {
        return fetch(API_BASE_URL+"/v1/payment_intents", makeInit("POST", true, body) )
    },
    createNewPaymentMethod (body) {
        return fetch(API_BASE_URL+"/v1/payment_methods", makeInit("POST", true, body) )
    }
}