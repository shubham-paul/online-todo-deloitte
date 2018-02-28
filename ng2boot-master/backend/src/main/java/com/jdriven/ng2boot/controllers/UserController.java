package com.jdriven.ng2boot.controllers;


import com.jdriven.ng2boot.entities.User;
import com.jdriven.ng2boot.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by shubhampaul on 2/25/2018.
 */
@RestController
public class UserController {


    @Autowired
    private UserService userService;

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public ResponseEntity<Integer> login(@RequestBody User user)
    {
        try {
            Integer loginStatus = userService.getLoginStatus(user.getUserName(), user.getPassword());
                return new ResponseEntity<>(loginStatus, HttpStatus.OK);
        } catch(Exception ex) {
            System.out.println(ex.getMessage());
            return new ResponseEntity<>(-1, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/user/{userId}",method = RequestMethod.GET)
    @ResponseBody
    public User getUser(@PathVariable("userId") int userId ){
        return userService.getUser(userId);
    }


}
