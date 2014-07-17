package com.mangelovski.feedme.demo.service;

import com.mangelovski.feedme.demo.domain.User;
import com.mangelovski.feedme.demo.domain.Restaurant;
import com.mangelovski.feedme.demo.repository.RestaurantRepository;
import com.mangelovski.feedme.demo.security.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.List;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class RestaurantService {

    private final Logger log = LoggerFactory.getLogger(RestaurantService.class);

    @Inject
    private RestaurantRepository restaurantRepository;

    /*public void updateUserInformation(String firstName, String lastName, String email) {
        User currentUser = userRepository.findOne(SecurityUtils.getCurrentLogin());
        currentUser.setFirstName(firstName);
        currentUser.setLastName(lastName);
        currentUser.setEmail(email);
        userRepository.save(currentUser);
        log.debug("Changed Information for User: {}", currentUser);
    }

    public void changePassword(String password) {
        User currentUser = userRepository.findOne(SecurityUtils.getCurrentLogin());
        String encryptedPassword = passwordEncoder.encode(password);
        currentUser.setPassword(encryptedPassword);
        userRepository.save(currentUser);
        log.debug("Changed password for User: {}", currentUser);
    }*/

    @Transactional(readOnly = true)
    public List<Restaurant> getAllRestaurants() {
        List<Restaurant> restaurants = restaurantRepository.findAll();
        return restaurants;
    }
    @Transactional(readOnly = true)
    public Restaurant getRestaurantById(String restaurantId) {
        Restaurant currentRestaurant = restaurantRepository.findOne("{'restaurantId':'"+restaurantId+"'}");
        return currentRestaurant;
    }
}
