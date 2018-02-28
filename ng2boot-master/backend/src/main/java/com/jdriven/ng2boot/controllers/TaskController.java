package com.jdriven.ng2boot.controllers;


import com.jdriven.ng2boot.entities.Task;
import com.jdriven.ng2boot.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by shubhampaul on 2/25/2018.
 */
@RestController
public class TaskController {

    @Autowired
    private TaskService taskService;

    @RequestMapping(value = "/tasks/{userId}",method = RequestMethod.GET)
    @ResponseBody
    public List<Task> getTasksForUser(@PathVariable("userId") int userId){
        return taskService.getTasksForUser(userId);
    }

    @RequestMapping(value = "/task/{taskId}",method = RequestMethod.GET)
    @ResponseBody
    public Task getTask( @PathVariable("taskId") int taskId ){
        return taskService.getTask(taskId);
    }

    @RequestMapping(value = "/saveTask",method = RequestMethod.POST)
    public ResponseEntity<Integer> saveTask(@RequestBody Task task )
    {
        try {
            Integer taskId = taskService.saveTask(task);
            return new ResponseEntity<>(taskId, HttpStatus.OK);
        } catch(Exception ex) {
            System.out.println(ex.getMessage());
            return new ResponseEntity<>(-1, HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/deleteTask",method = RequestMethod.POST)
    public ResponseEntity<Integer> deleteTask(@RequestBody Task task )
    {
        try {
                taskService.deleteTask(task);
                return new ResponseEntity<>(1, HttpStatus.OK);
        } catch(Exception ex) {
            System.out.println(ex.getMessage());
            return new ResponseEntity<>(-1, HttpStatus.BAD_REQUEST);
        }
    }


}
