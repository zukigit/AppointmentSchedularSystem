package com.ai.backEnd.controller;

import com.ai.backEnd.model.User;
import com.ai.backEnd.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/v1/")
public class UserUpdateController {

    @Autowired
    private UserService service;

    @PostMapping("/saveUpdateUser/{file1}" )
    public User saveUser(@PathVariable File file1, @RequestBody User user, HttpServletRequest request) {
        User dto = new User();
        MultipartFile file = user.getFile();
        if (file != null && !file.isEmpty()) {
            String photoName = saveImage(file,request);
            dto.setPhoto(user.getPhoto());
        }
        dto.setEmployee_id(user.getEmployee_id());
        dto.setName(user.getName());
        dto.setPassword(user.getPassword());
        dto.setPhone_number(user.getPhone_number());
        dto.setGender(user.getGender());
        dto.setPosition(user.getPosition());
        dto.setRole(user.getRole());
        dto.setTeam(user.getTeam());
        return service.saveUser(dto);
    }

    public String saveImage(MultipartFile file, HttpServletRequest request) {

        String imageName = System.currentTimeMillis() + ".png";

        String rootDirectory = request.getSession().getServletContext().getRealPath("/");
        Path path = Paths.get(rootDirectory + "/resources/Images/" + imageName);

        if (file != null && !file.isEmpty()) {
            try {
                file.transferTo(new File(path.toString()));
            } catch (IOException e) {
                throw new RuntimeException("Image Can't be upload!");
            }
        }
        return imageName;

    }


}
