package com.jdriven.ng2boot.persistence;



import com.jdriven.ng2boot.entities.User;
import org.springframework.stereotype.Repository;

/**
 * Created by shubhampaul on 2/25/2018.
 */
@Repository
public interface UserDAO extends GenericDAO {

    Integer getLoginStatus(String userName, String password);

     User getUser(int userId);

}
