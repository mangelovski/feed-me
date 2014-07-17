package com.mangelovski.feedme.demo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mangelovski.feedme.demo.domain.Restaurant;
import com.mangelovski.feedme.demo.repository.RestaurantRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * REST controller for managing users.
 */
@RestController
@RequestMapping("/app")
public class RestaurantResource {

    private final Logger log = LoggerFactory.getLogger(RestaurantResource.class);

    @Inject
    private RestaurantRepository restaurantRepository;

    /**
     * GET  /rest/restaurants/:restaurantId -> get the restaurant with the restaurant id.
     */
    @RequestMapping(value = "/rest/restaurant",
            method = RequestMethod.GET,
            produces = "application/json")
    @Timed
    public Restaurant getRestaurant(@RequestParam(value = "restaurantId") String restaurantId, HttpServletResponse response) {
        log.debug("REST request to get Restaurant with id : {}", restaurantId);
        Restaurant restaurant = restaurantRepository.findOne(restaurantId);
        if (restaurant == null) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
        return restaurant;
    }
    /**
     * GET  /rest/allRestaurants -> get all the restaurants
     */
    @RequestMapping(value = "/rest/allRestaurants",
            method = RequestMethod.GET,
            produces = "application/json")
    @Timed
    public List<Restaurant> getRestaurant( HttpServletResponse response) {
        log.debug("REST request to get all Restaurants");
        List<Restaurant> restaurants = restaurantRepository.findAll();
        if (restaurants == null||restaurants.size()<1) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
        return restaurants;
    }
}
