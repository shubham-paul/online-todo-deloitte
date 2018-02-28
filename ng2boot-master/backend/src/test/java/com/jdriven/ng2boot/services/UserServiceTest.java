package com.jdriven.ng2boot.services;


import com.jdriven.ng2boot.config.JpaConfigurationTest;
import com.jdriven.ng2boot.entities.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;

import static org.junit.Assert.assertTrue;

/**
 * Created by shubhampaul on 2/28/2018.
 */
@SuppressWarnings("MagicNumber")
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {JpaConfigurationTest.class})
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@Transactional
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    @Transactional
    public void loginTest() {
        Integer userId = this.userService.getLoginStatus("John","John123");
        assertTrue(userId==1);
    }

    @Test
    @Transactional
    public void getUserTest(){
        User user = this.userService.getUser(1);
        assertTrue(user.getUserName().equals("John"));
        assertTrue(user.getPassword().equals("John123"));
    }

}
