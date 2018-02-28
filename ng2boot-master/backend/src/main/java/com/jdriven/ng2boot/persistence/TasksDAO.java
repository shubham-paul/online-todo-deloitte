package com.jdriven.ng2boot.persistence;


import com.jdriven.ng2boot.entities.Task;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by shubhampaul on 2/25/2018.
 */
@Repository
public interface TasksDAO extends GenericDAO {

    List<Task> getTasksForUser(int userId);

    Integer saveTask(Task task);

    void deleteTask(Task task);

    Task getTask(int taskId);

}
