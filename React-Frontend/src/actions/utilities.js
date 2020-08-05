import http from '../api/http'

export const API_BASE_URL =  'https://cooliocoders.ddns.net'
// export const API_BASE_URL =  'http://localhost:3000'

export default {

    formatDateTime(timestampString){
        if(timestampString === null || timestampString === "") return "";
        var date = new Date(timestampString);
        return  (new Intl.DateTimeFormat().format(date) + " | " +
                (new Intl.DateTimeFormat("Default", {
                    hour: 'numeric',
                    minute: 'numeric'
                } ).format(date)))
    },

    downloadFileSubmission(fileDownloadUrl, openOrSave, fileName){
        http.downloadFile(fileDownloadUrl)
            .then( async (response) => {
                if (response.status === 200) {
                  return response.blob()
                }
            })
            .then(blob =>{
              if(openOrSave === "save"){
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
    
                var url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
              }
              else if(openOrSave === "open"){
                var file = window.URL.createObjectURL(blob);
                window.open(file);
              }
            })
            .catch((e) => {
                console.warn("There was an error downloading this file: ", e);
            })
      },


    navigateToAssignment(courseId, assignmentId) {
        if(courseId !== null && assignmentId !== null) {
            window.location.href = API_BASE_URL+ `/course/${courseId}/course-assignments/${assignmentId}`
        }
        else {
            console.log("Navigate to assignment page failed")
            console.log(`CourseId: ${courseId}`)
            console.log((`AssignmentId: ${assignmentId}`))
        }
    },

    generateLinkToAssignment(courseId, assignmentId) {
        if(courseId !== null && assignmentId !== null) {
            return API_BASE_URL+ `/course/${courseId}/course-assignments/${assignmentId}`
        }
        else {
            console.log("Navigate to assignment page failed")
            console.log(`CourseId: ${courseId}`)
            console.log((`AssignmentId: ${assignmentId}`))
            return null
        }
    }

}