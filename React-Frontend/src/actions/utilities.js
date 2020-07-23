export default {

    formatDateTime(timestampString){
        var date = new Date(timestampString);
        return  (new Intl.DateTimeFormat().format(date) + " | " +
                (new Intl.DateTimeFormat("Default", {
                    hour: 'numeric',
                    minute: 'numeric'
                } ).format(date)))
    }

}