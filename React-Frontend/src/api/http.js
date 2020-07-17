export const API_BASE_URL =  'https://cooliocoders.ddns.net'
// export const API_BASE_URL =  'http://localhost:8080'

// builds init for fetch call, pass in null if there is no body, pass in null if no additional headers are needed.
// example; makeInit("GET", true, null), makeInit("POST", false, body)
export function makeInit(requestType, requiresAuthorization, body, headers) {

    if (!headers) {
        headers = new Headers();

        switch (requestType) {
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
    }

    var init
    if(requiresAuthorization === true){ headers.append('Authorization', 'Bearer '+sessionStorage.getItem("token")) }

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
        return fetch(API_BASE_URL+'/api/user/profile', makeInit("GET", true, null, null))
    },
    getStudentCourses(){
        return fetch(API_BASE_URL+'/api/course/student', makeInit("GET", true, null, null))
    },
    getInstructorCourses(){
        return fetch(API_BASE_URL+'/api/course/instructor', makeInit("GET", true, null, null))
    },
    getAllCourses(){
        return fetch(API_BASE_URL+'/api/course/all', makeInit("GET", true, null, null))
    },
    getCourseDetails(courseId){
        return fetch(API_BASE_URL+'/api/course/details/'+courseId, makeInit("GET", true, null, null))
    },
    getCurrentAccountBalance(){
        return fetch(API_BASE_URL+'/api/balance/amount', makeInit("GET", true, null, null))
    },
    getAllAssignments(){
        return fetch(API_BASE_URL+'/api/assignment/simplified/', makeInit("GET", true, null, null))
    },
    getCourseAssignmentsWithDetails(courseId) {
        return fetch(API_BASE_URL+`/api/assignment/bycourse/${courseId}`, makeInit("GET", true, null, null))
    },
    getCourseAssignments(courseId) {
        return fetch(API_BASE_URL+`/api/assignment/simplified/${courseId}`, makeInit("GET", true, null, null))
    },
    updateUserAvatar(body){
        return fetch(API_BASE_URL+'/api/user/profile/avatar', makeInit("PUT", true, body, null))
    },
    updateUserProfileDetails(body){
        return fetch(API_BASE_URL+'/api/user/profile', makeInit("PUT", true, body, null))
    },
    enrollForCourse(body){
        return fetch(API_BASE_URL+'/api/course/enroll', makeInit("POST", true, body, null))
    },
    createNewCourse(body){
        return fetch(API_BASE_URL+'/api/course/new', makeInit("POST", true, body, null))
    },
    createNewAssignment(body){
        return fetch(API_BASE_URL+'/api/assignment/new', makeInit("POST", true, body, null))
    },
    submitAssignment(body) {
        return fetch(API_BASE_URL+`/api/assignment/submit`, makeInit("POST", true, body, null))
    },
    // submitFileAssignment(body) {
    //     return fetch(API_BASE_URL+`/api/assignment/submit/${body.assignmentId}/uploadFile`, makeInit("POST", true, body))
    // },
    submitFileAssignment(assignmentId, body) {
        return fetch(API_BASE_URL+`/api/assignment/submit/${assignmentId}/uploadFile`,
            makeInit("POST", true, body, new Headers().append('Content-Type', 'multipart/form-data')))
    },
    // Don't need to explicitly call this API. Just call fetch and pass in the downloadURL with the token in the header.
    // getFileAssignment(body) {
    //     return fetch(API_BASE_URL+`/downloadFile/${body.courseId}/${body.studentId}/${body.fileName}`)
    // },
    createNewUser (body) {
        return fetch(API_BASE_URL+"/api/auth/register", makeInit("POST", false, body, null) )
    },
    loginUser (body){
        return fetch(API_BASE_URL+"/api/auth/login", makeInit("POST", false, body, null))
    },
    validateToken(){
        return fetch(API_BASE_URL+'/api/user/validate', makeInit("GET", true, null, null))
    }
}