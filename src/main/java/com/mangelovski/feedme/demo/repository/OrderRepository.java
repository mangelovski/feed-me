package com.mangelovski.feedme.demo.repository;

import com.mangelovski.feedme.demo.domain.order.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the User entity.
 */
public interface OrderRepository extends MongoRepository<Order, String> {

    List<Order> findByRestaurantIdAndUserId(String restaurantId,String userId);
    List<Order> findByRestaurantIdAndUserIdAndOrderStatus(String restaurantId,String userId,String orderStatus);
}
