package com.jdriven.ng2boot.services;


import com.jdriven.ng2boot.entities.User;
import com.jdriven.ng2boot.persistence.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

/**
 * Created by shubhampaul on 2/25/2018.
 */
@Service
@Repository
public class UserService {

    @Autowired
    private UserDAO userDAO;

    public Integer getLoginStatus(String userName, String password){
        return this.userDAO.getLoginStatus(userName,password);
    }

    public User getUser(int userId){
        return this.userDAO.getUser(userId);
    }

}
