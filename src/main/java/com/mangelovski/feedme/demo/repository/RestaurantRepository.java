package com.mangelovski.feedme.demo.repository;

import com.mangelovski.feedme.demo.domain.Restaurant;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the User entity.
 */
public interface RestaurantRepository extends MongoRepository<Restaurant, String> {

}
