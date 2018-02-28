package com.jdriven.ng2boot.persistence.DAOImpl;


import com.jdriven.ng2boot.entities.Task;
import com.jdriven.ng2boot.persistence.TasksDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import java.util.List;

/**
 * Created by shubhampaul on 2/25/2018.
 */
@Component
public class TasksDAOImpl extends GenericDAOImpl implements TasksDAO {

    private EntityManager entityManager;

    @Autowired
    public TasksDAOImpl(EntityManagerFactory entityManagerFactory) {
        super(entityManagerFactory);
        this.entityManager = entityManagerFactory.createEntityManager();
    }

    public List<Task> getTasksForUser(int userId){
        List<Task> tasks = this.entityManager.createQuery(
                " select t from Task t" +
                        " where t.user.userId =:userId")
                .setParameter("userId", userId)
                .getResultList();

        return tasks;
    }

    public Integer saveTask (Task task){
        try {
            if(!this.entityManager.getTransaction().isActive())
                this.entityManager.getTransaction().begin();
            Task taskSaved = this.entityManager.merge(task);
            this.entityManager.flush();
            this.entityManager.getTransaction().commit();
            return taskSaved.getTaskId();
        } catch (Exception ex) {
            ex.printStackTrace();
            this.entityManager.getTransaction().rollback();
            return null;
        }
    }

    public void deleteTask(Task task){
        try {
            Task taskToBedeleted = this.entityManager.find(Task.class, task.getTaskId());
            if(!this.entityManager.getTransaction().isActive())
                this.entityManager.getTransaction().begin();
            this.entityManager.remove(taskToBedeleted);
            this.entityManager.flush();
            this.entityManager.getTransaction().commit();
        } catch (Exception ex) {
            ex.printStackTrace();
            this.entityManager.getTransaction().rollback();
        }
    }

    public Task getTask(int taskId){
        Task task;
        try {
            task = this.entityManager.createQuery(
                    " select t from Task t" +
                            " where t.taskId = :taskId", Task.class)
                    .setParameter("taskId", taskId)
                    .getSingleResult();
        } catch(NoResultException ex) {
            task = new Task();
        }
        return task;
    }

}
