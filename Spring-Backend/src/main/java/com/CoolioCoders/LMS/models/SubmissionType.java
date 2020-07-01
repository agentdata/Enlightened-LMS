package com.CoolioCoders.LMS.models;

public enum SubmissionType {
    TEXTBOX("textbox"),
    FILE_UPLOAD("fileUpload");

    private String type;
    private SubmissionType(String type){
        this.type = type;
    }

    @Override
    public String toString() {
        return type;
    }

    public static SubmissionType getSubmissionTypeFromString(String stringType){
        switch (stringType.toLowerCase().trim()){
            case "textbox":
                return TEXTBOX;
            case "fileupload":
                return FILE_UPLOAD;
            default:
                return null;
        }
    }
}
