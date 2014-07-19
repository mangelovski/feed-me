package com.mangelovski.feedme.demo.repository;

import com.mangelovski.feedme.demo.domain.IdCounter;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Id Counters entity.
 */
public interface IdCounterRepository extends MongoRepository<IdCounter, String> {
}
