package com.jdriven.ng2boot.entities;

/**
 * Created by shubhampaul on 2/25/2018.
 */

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "Task_tbl")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Task implements java.io.Serializable {

    private int taskId;
    private User user;
    private String taskName;
    private String description;
    private Date lastUpdated;
    private Boolean taskStatus = false;


    public Task()
    {}

    public Task(int taskId, User user, String taskName, String description, Date lastUpdated) {
        this.taskId = taskId;
        this.user = user;
        this.taskName = taskName;
        this.description = description;
        this.lastUpdated = lastUpdated;
    }

    public Task(int taskId, User user, String taskName, String description, Boolean taskStatus) {
        this.taskId = taskId;
        this.user = user;
        this.taskName = taskName;
        this.description = description;
        this.taskStatus = taskStatus;
    }

    @Id
    @Column(name = "taskId", unique = true, nullable = false)
    @GenericGenerator(name = "generator", strategy = "increment")
    @GeneratedValue(generator = "generator")
    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = false)
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Column(name = "taskName", nullable = false, length = 100)
    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    @Column(name = "description", nullable = false, length = 500)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(name = "lastUpdated", nullable = true)
    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    @Column(name = "taskStatus", nullable = false)
    public Boolean getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(Boolean taskStatus) {
        this.taskStatus = taskStatus;
    }

    @Override
    public String toString() {
        return "Task{" +
                "taskId=" + taskId +
                ", user=" + user +
                ", taskName='" + taskName + '\'' +
                ", description='" + description + '\'' +
                ", lastUpdated=" + lastUpdated +
                ", taskStatus=" + taskStatus +
                '}';
    }
}
