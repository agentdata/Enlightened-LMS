package com.CoolioCoders.LMS.services;

import com.CoolioCoders.LMS.configuration.FileStoreProperties;
import com.CoolioCoders.LMS.models.Assignment;
import com.CoolioCoders.LMS.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStoreService {

    private final Path fileStoreLocation;

    @Autowired
    public FileStoreService(FileStoreProperties fileStoreProperties) throws IOException {
        fileStoreLocation = Paths.get(fileStoreProperties.getUploadDirectory()).toAbsolutePath().normalize();
        Files.createDirectories(this.fileStoreLocation);
    }

    public String storeFile(MultipartFile file, User user, Assignment assignment) throws Exception {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        if(fileName.contains("..")){
            throw new Exception("Error: Filename contains invalid character sequence.");
        }

        //i.e.  /{courseId/{userId}/{assignmentId}/filename
        Path submissionDirectory = fileStoreLocation.resolve(assignment.getCourseId()).resolve(user.getId()).resolve(assignment.getId());
        Files.createDirectories(submissionDirectory);

        Path storageTarget = submissionDirectory.resolve(fileName);
        Files.copy(file.getInputStream(), storageTarget, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }

    public Resource getFileAsResource(String courseId, String studentId, String assignmentId, String fileName) throws Exception {

        //i.e.  /{courseId/{userId}/{assignmentId}/filename
        Path filePath = fileStoreLocation.resolve(courseId).resolve(studentId).resolve(assignmentId).resolve(fileName).normalize();

        Resource urlResource = new UrlResource(filePath.toUri());
        if(urlResource.exists()){
            return urlResource;
        }
        else {
            throw new Exception("Error: File not found");
        }
    }
}
