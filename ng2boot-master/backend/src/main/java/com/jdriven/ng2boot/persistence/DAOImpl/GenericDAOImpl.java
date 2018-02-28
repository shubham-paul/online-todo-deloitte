package com.jdriven.ng2boot.persistence.DAOImpl;





import com.jdriven.ng2boot.persistence.GenericDAO;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManagerFactory;
import java.io.Serializable;
import java.util.List;

/**
 * Created by shubhampaul on 2/25/2018.
 */
@Component
public class GenericDAOImpl implements GenericDAO {
    private SessionFactory sessionFactory;

    public GenericDAOImpl(EntityManagerFactory entityManagerFactory) {
        this.sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);
    }

    /**
     * Gets the List of the specified type.
     *
     * @param type The type
     * @return List of objects
     */
    @Override
    public <T> List<T> getList(Class<T> type) {
        Session session = sessionFactory.getCurrentSession();
        Query query = session.createQuery("from " + type.getSimpleName());
        return (List<T>) query.list();
    }

    /**
     * Gets an object of the specified type with the specified id.
     *
     * @param type The type
     * @param id The id
     * @return the object
     */
    @Override
    public <T> T get(Class<T> type, Integer id) {
        Session session = sessionFactory.getCurrentSession();
        return (T) session.get(type, id);
    }

    /**
     * Gets an object of the specified type with the specified id.
     *
     * @param type The type
     * @param id The id
     * @return the object
     */
    @Override
    public <T> T get(Class<T> type, short id) {
        Session session = sessionFactory.getCurrentSession();
        return (T) session.get(type, id);
    }

    /**
     * Gets an object of the specified type with the specified id.
     *
     * @param type The type
     * @param id The id
     * @return the object
     */
    @Override
    public <T> T get(Class<T> type, byte id) {
        Session session = sessionFactory.getCurrentSession();
        return (T) session.get(type, id);
    }

    /**
     * Given an object, it is saved or updated.
     * The session is flushed after the operation.
     * @param object The object to be saved or updated
     */
    @Override
    public void saveOrUpdate(Object object) {
        Session session = sessionFactory.getCurrentSession();
        session.getTransaction().begin();
        session.saveOrUpdate(object);
        session.getTransaction().commit();
        session.flush();
    }

    /**
     * Given an object, it is deleted.
     * The session is flushed after the operation.
     * @param object The object to be deleted
     */
    @Override
    public void delete(Object object) throws Exception {
        Session session = sessionFactory.getCurrentSession();
        session.delete(object);
        session.flush();
    }

    /**
     * Gives an object of the specified type.
     * The session is flushed after the operation.
     * @param type The type of the object
     * @param object The object to be retrieved
     */
    @Override
    public <T> T get(Class<T> type, Object object) {
        Session session = sessionFactory.getCurrentSession();
        return (T) session.get(type, (Serializable) object);
    }

    /**
     * Flushes the session.
     */
    @Override
    public void flush() {
        Session session = sessionFactory.getCurrentSession();
        session.flush();
    }

    @Override
    public void evict(Object object) {
        Session session = sessionFactory.getCurrentSession();
        session.evict(object);
    }
}

