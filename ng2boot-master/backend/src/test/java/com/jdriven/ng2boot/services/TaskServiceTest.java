package com.jdriven.ng2boot.services;


import com.jdriven.ng2boot.config.JpaConfigurationTest;
import com.jdriven.ng2boot.entities.Task;
import com.jdriven.ng2boot.entities.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;
import java.util.List;

import static org.junit.Assert.assertTrue;

/**
 * Created by shubhampaul on 2/28/2018.
 */
@SuppressWarnings("MagicNumber")
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {JpaConfigurationTest.class})
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@Transactional
public class TaskServiceTest {

    @Autowired
    private TaskService taskService;

    @Test
    @Transactional
    public void getTasksForUserTest(){
        List<Task> taskList = this.taskService.getTasksForUser(1);
        assertTrue(taskList.size() == 2);
    }

    @Test
    @Transactional
    public void saveTaskTest(){
        Task task = new Task(-1,new User(1,"John", "John123"),"New Task", "New Task Description", false);
        Integer taskId = this.taskService.saveTask(task);
        assertTrue(taskId == 3);

        List<Task> taskList = this.taskService.getTasksForUser(1);
        assertTrue(taskList.size() == 3);
    }



}
