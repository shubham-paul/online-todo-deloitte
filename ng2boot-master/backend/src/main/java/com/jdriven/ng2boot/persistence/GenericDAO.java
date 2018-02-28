package com.jdriven.ng2boot.persistence;

import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by shubhampaul on 2/25/2018.
 */

@Repository
public interface GenericDAO {
    /**
     * Gets the List of the specified type.
     *
     * @param type The type
     * @return List of objects
     */
    public <T> List<T> getList(Class<T> type) ;

    /**
     * Gets an object of the specified type with the specified id.
     *
     * @param type The type
     * @param id The id
     * @return the object
     */
    <T> T get(Class<T> type, Integer id);

    /**
     * Gets an object of the specified type with the specified id.
     *
     * @param type The type
     * @param id The id
     * @return the object
     */
    <T> T get(Class<T> type, short id);

    /**
     * Gets an object of the specified type with the specified id.
     *
     * @param type The type
     * @param id The id
     * @return the object
     */
    <T> T get(Class<T> type, byte id);

    /**
     * Given an object, it is saved or updated.
     * The session is flushed after the operation.
     * @param object The object to be saved or updated
     */
    void saveOrUpdate(Object object);

    /**
     * Given an object, it is deleted.
     * The session is flushed after the operation.
     * @param object The object to be deleted
     */
    void delete(Object object) throws Exception;

    /**
     * Gives an object of the specified type.
     * The session is flushed after the operation.
     * @param type The type of the object
     * @param object The object to be retrieved
     */
    <T> T get(Class<T> type, Object object);

    /**
     * Flushes the session.
     */
    void flush();

    void evict(Object object);
}
