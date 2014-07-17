package com.mangelovski.feedme.demo.repository;

import com.mangelovski.feedme.demo.domain.menu.Menu;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the User entity.
 */
public interface MenuRepository extends MongoRepository<Menu, String> {

}
