package com.jdriven.ng2boot.services;


import com.jdriven.ng2boot.entities.Task;
import com.jdriven.ng2boot.persistence.TasksDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by shubhampaul on 2/25/2018.
 */
@Service
@Repository
public class TaskService {

    @Autowired
    private TasksDAO tasksDAO;

    /**
     * Gets the Tasks for a particular user.
     * @param userId
     * @return
     */
    public List<Task> getTasksForUser(int userId){
        return this.tasksDAO.getTasksForUser(userId);
    }

    /**
     * Saves a task.
     * @param task
     * @return
     */
    public Integer saveTask (Task task){
        return this.tasksDAO.saveTask(task);
    }

    /**
     * Deletes a task
     * @param task
     */
    public void deleteTask(Task task){
        this.tasksDAO.deleteTask(task);
    }

    /**
     * Gets a single task.
     * @param taskId
     * @return
     */
    public Task getTask(int taskId){
        return this.tasksDAO.getTask(taskId);
    }

}
