export const API_BASE_URL =  'https://cooliocoders.ddns.net'
// export const API_BASE_URL =  'http://localhost:8080'

// builds init for fetch call, pass in null if there is no body. 
// example; makeInit("GET", true, null), makeInit("POST", false, body)
export function makeInit(requestType, requiresAuthorization, body){
    const headers = new Headers();
    var init
    if(requiresAuthorization === true){ headers.append('Authorization', 'Bearer '+sessionStorage.getItem("token")) }

    switch(requestType) {
        case "GET":
            //don't add any other headers for GET request
            break;
        case "POST":
            headers.append('Content-Type', 'application/json');
            break;
        case "PUT":
            headers.append('Content-Type', 'application/json');
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
    getUserProfileDetails () {
        return fetch(API_BASE_URL+'/api/user/profile', makeInit("GET", true, null))
    },
    getStudentCourses(){
        return fetch(API_BASE_URL+'/api/course/student', makeInit("GET", true, null))
    },
    getInstructorCourses(){
        return fetch(API_BASE_URL+'/api/course/instructor', makeInit("GET", true, null))
    },
    getAllCourses(){
        return fetch(API_BASE_URL+'/api/course/all', makeInit("GET", true, null))
    },
    getCourseDetails(courseId){
        return fetch(API_BASE_URL+'/api/course/'+courseId, makeInit("GET", true, null))
    },
    getCurrentAccountBalance(){
        return fetch(API_BASE_URL+'/api/balance/amount', makeInit("GET", true, null))
    },
    getAllAssignments(){
        return fetch(API_BASE_URL+'/api/assignment/simplified/', makeInit("GET", true, null))
    },
    getCourseAssignments(courseId) {
        return fetch(API_BASE_URL+`/api/assignment/simplified/${courseId}`, makeInit("GET", true, null))
    },
    updateUserAvatar(body){
        return fetch(API_BASE_URL+'/api/user/profile/avatar', makeInit("PUT", true, body))
    },
    updateUserProfileDetails(body){
        return fetch(API_BASE_URL+'/api/user/profile', makeInit("PUT", true, body))
    },
    enrollForCourse(body){
        return fetch(API_BASE_URL+'/api/course/enroll', makeInit("POST", true, body))
    },
    createNewCourse(body){
        return fetch(API_BASE_URL+'/api/course/new', makeInit("POST", true, body))
    },
    createNewAssignment(body){
        return fetch(API_BASE_URL+'/api/assignment/new', makeInit("POST", true, body))
    },
    createNewUser (body) {
        return fetch(API_BASE_URL+"/api/auth/register", makeInit("POST", false, body) )
    },
    loginUser (body){
        return fetch(API_BASE_URL+"/api/auth/login", makeInit("POST", false, body))
    },
    validateToken(){
        return fetch(API_BASE_URL+'/api/user/validate', makeInit("GET", true, null))
    }
}