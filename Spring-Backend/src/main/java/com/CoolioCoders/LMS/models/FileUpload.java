package com.CoolioCoders.LMS.models;

import org.springframework.core.io.Resource;

public class FileUpload {
    private String fileName;
    private Resource fileDownloadUrl;
    private String fileType;
    private long fileSize;

    public FileUpload() {}

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Resource getFileDownloadUrl() {
        return fileDownloadUrl;
    }

    public void setFileDownloadUrl(Resource fileDownloadUrl) {
        this.fileDownloadUrl = fileDownloadUrl;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public long getFileSize() {
        return fileSize;
    }

    public void setFileSize(long fileSize) {
        this.fileSize = fileSize;
    }
}
