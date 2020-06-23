package com.CoolioCoders.LMS.models;

public class MeetingDays {
    private boolean Sunday = false;
    private boolean Monday = false;
    private boolean Tuesday = false;
    private boolean Wednesday = false;
    private boolean Thursday = false;
    private boolean Friday = false;
    private boolean Saturday = false;

    public MeetingDays(boolean monday, boolean tuesday, boolean wednesday, boolean thursday, boolean friday, boolean saturday, boolean sunday) {
        Monday = monday;
        Tuesday = tuesday;
        Wednesday = wednesday;
        Thursday = thursday;
        Friday = friday;
        Saturday = saturday;
        Sunday = sunday;
    }

    public MeetingDays(){
        Monday = false;
        Tuesday = false;
        Wednesday = false;
        Thursday = false;
        Friday = false;
        Saturday = false;
        Sunday = false;
    }

    /**
     *
     * @param days which is a json formatted string starting with monday such that { mon:false, tues:false...}etc
     */
    public void parseMeetingDays(String days) throws Exception {
        //remove outer curly braces
        days = days.replace("{","");
        days = days.replace("}","");

        //split by key value pair, ie day of week and boolean
        String[] splitByDay = days.split(",");
        int dayCount = 0;

        if(splitByDay.length==7) {
            //loop over each
            for (String day : splitByDay) {
                //separate key value pair, this assumes input only has 7 days, and are in order mon-sun
                String[] dayValue = day.split("=");
                switch (dayCount) {
                    case 0:
                        Monday = Boolean.parseBoolean(dayValue[1]);
                        break;
                    case 1:
                        Tuesday = Boolean.parseBoolean(dayValue[1]);
                        break;
                    case 2:
                        Wednesday = Boolean.parseBoolean(dayValue[1]);
                        break;
                    case 3:
                        Thursday = Boolean.parseBoolean(dayValue[1]);
                        break;
                    case 4:
                        Friday = Boolean.parseBoolean(dayValue[1]);
                        break;
                    case 5:
                        Saturday = Boolean.parseBoolean(dayValue[1]);
                        break;
                    case 6:
                        Sunday = Boolean.parseBoolean(dayValue[1]);
                        break;
                }
                dayCount++;
            }
        }
        else{
            throw new Exception();
        }
    }

    public boolean isSunday() {
        return Sunday;
    }

    public void setSunday(boolean sunday) {
        Sunday = sunday;
    }

    public boolean isMonday() {
        return Monday;
    }

    public void setMonday(boolean monday) {
        Monday = monday;
    }

    public boolean isTuesday() {
        return Tuesday;
    }

    public void setTuesday(boolean tuesday) {
        Tuesday = tuesday;
    }

    public boolean isWednesday() {
        return Wednesday;
    }

    public void setWednesday(boolean wednesday) {
        Wednesday = wednesday;
    }

    public boolean isThursday() {
        return Thursday;
    }

    public void setThursday(boolean thursday) {
        Thursday = thursday;
    }

    public boolean isFriday() {
        return Friday;
    }

    public void setFriday(boolean friday) {
        Friday = friday;
    }

    public boolean isSaturday() {
        return Saturday;
    }

    public void setSaturday(boolean saturday) {
        Saturday = saturday;
    }
}
