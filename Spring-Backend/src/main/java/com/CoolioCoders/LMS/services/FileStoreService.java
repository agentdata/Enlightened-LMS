package com.CoolioCoders.LMS.services;

import com.CoolioCoders.LMS.models.FileUpload;
import com.CoolioCoders.LMS.models.User;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.lang.reflect.MalformedParameterizedTypeException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStoreService {

    private Path fileStoreLocation; //TODO: figure out fileserver

    public String storeFile(MultipartFile file, User user) throws Exception {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        if(fileName.contains("..")){
            throw new Exception("Error: Filename contains invalid character sequence.");
        }

        //i.e.  /{userId}/filename
        Path storageTarget = fileStoreLocation.resolve(user.getId()).resolve(fileName);
        Files.copy(file.getInputStream(), storageTarget, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }

    public Resource getFileAsResource(String relativeFilePath) throws Exception {

        // relativeFilePath:    /{userId}/filename
        Path filePath = fileStoreLocation.resolve(relativeFilePath).normalize();
        Resource urlResource = new UrlResource(filePath.toUri());
        if(urlResource.exists()){
            return urlResource;
        }
        else {
            throw new Exception("Error: File not found");
        }
    }
}
