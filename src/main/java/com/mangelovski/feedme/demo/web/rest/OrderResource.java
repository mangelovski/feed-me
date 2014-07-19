package com.mangelovski.feedme.demo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.google.gson.Gson;
import com.mangelovski.feedme.demo.domain.order.Order;
import com.mangelovski.feedme.demo.security.AuthoritiesConstants;
import com.mangelovski.feedme.demo.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * REST controller for managing users.
 */
@RestController
@RequestMapping("/app")
public class OrderResource {

    private final Logger log = LoggerFactory.getLogger(OrderResource.class);

    @Inject
    private OrderService orderService;

    /**
     * PUT  /rest/restaurants/updateOrder ->
     */
    @RequestMapping(value = "/rest/updateOrder",
            method = RequestMethod.PUT,
            produces = "application/json")
    @Timed
    public boolean updateOrder(@RequestBody String body ,HttpServletResponse response) {

        try {
            Gson gson = new Gson();
            Order order=gson.fromJson(body,Order.class);
            orderService.updateOrder(order);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * GET  /rest/allOrders -> get the restaurant with the restaurant id.
     */
    @RequestMapping(value = "/rest/allOrders",
            method = RequestMethod.GET,
            produces = "application/json")
    @Timed
    @RolesAllowed(AuthoritiesConstants.ADMIN)
    public List<Order> getAllOrders(HttpServletResponse response) {

        return orderService.getAllOrders();
    }

    /**
     * GET  /rest/restaurants/:restaurantId -> get the restaurant with the restaurant id.
     */
    @RequestMapping(value = "/rest/getLastOrderOrCrateNew",
            method = RequestMethod.GET,
            produces = "application/json")
    @Timed
    public Order getLastOrderOrCreateNew(
            @RequestParam(value = "restaurantId") String restaurantId,
            @RequestParam(value = "userId") String userId,
            HttpServletResponse response) {
        Order order=orderService.getActiveOrderByRestaurantIdAndClientIdorCreateNew(restaurantId,userId);
        if (order == null) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
        return order;
    }

}
