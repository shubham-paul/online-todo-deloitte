package com.jdriven.ng2boot.persistence.DAOImpl;


import com.jdriven.ng2boot.entities.User;
import com.jdriven.ng2boot.persistence.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;

/**
 * Created by shubhampaul on 2/25/2018.
 */
@Component
public class UserDAOImpl extends GenericDAOImpl implements UserDAO {

    private EntityManager entityManager;

    @Autowired
    public UserDAOImpl(EntityManagerFactory entityManagerFactory) {
        super(entityManagerFactory);
        this.entityManager = entityManagerFactory.createEntityManager();
    }

    public Integer getLoginStatus(String userName, String password){

        User user;
        try {
            user = this.entityManager.createQuery(
                    " select u from User u" +
                            " where u.userName = :userName and u.password = :password", User.class)
                    .setParameter("userName", userName)
                    .setParameter("password", password)
                    .getSingleResult();
        } catch(NoResultException ex) {
            user = new User();
        }

        if(user.getUserId() != null){
            return user.getUserId();
        }

        return -1;
    }

    public User getUser(int userId){
        User user;
        try {
            user = this.entityManager.createQuery(
                    " select u from User u" +
                            " where u.userId = :userId", User.class)
                    .setParameter("userId", userId)
                    .getSingleResult();
        } catch(NoResultException ex) {
            user = new User();
        }
        return user;
    }

}
