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
import java.util.logging.Level;

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
     * GET  /rest/getAllOrdersByUserId -> get the orders with the userId;
     */
    @RequestMapping(value = "/rest/getAllOrdersByUserId",
            method = RequestMethod.GET,
            produces = "application/json")
    @Timed
    public List<Order> getAllOrdersByUserId(
            @RequestParam(value = "userId") String userId,
            HttpServletResponse response) {

        return orderService.getOrdersByUserId(userId);
    }

    /**
     * GET  /rest/getLastOrderOrCrateNew -> get the last unfinished order with the restaurant and user id.
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

    /**
     * GET  /rest/getOrdersByStatus -> get the orders last unfinished order with the restaurant and user id.
     */
    @RequestMapping(value = "/rest/getOrdersByStatusAndIds",
            method = RequestMethod.GET,
            produces = "application/json")
    @Timed
    public List<Order> getOrdersByStatus(
            @RequestParam(value = "restaurantId") String restaurantId,
            @RequestParam(value = "userId") String userId,
            @RequestParam(value = "orderStatus") String orderStatus,
            HttpServletResponse response) {
        List<Order> orders = orderService.getOrdersByRestaurantIdClientIdandOrderStatus(restaurantId, userId, orderStatus);
        if (orders == null||orders.size()<1) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
        return orders;
    }

    /**
     * GET  /rest/cleanOrdersByStatusAndIds -> clean the orders last unfinished order with the restaurant and user id.
     * removes the older orders
     */
    @RequestMapping(value = "/rest/cleanOrdersByStatusAndIds",
            method = RequestMethod.GET,
            produces = "application/json")
    @Timed String cleanOrdersByStatusAndIds(
            @RequestParam(value = "restaurantId") String restaurantId,
            @RequestParam(value = "userId") String userId,
            @RequestParam(value = "orderStatus") String orderStatus,
            HttpServletResponse response) {
        int numberOfRemovedOrders=0;
        List<Order> orders = orderService.getOrdersByRestaurantIdClientIdandOrderStatus(restaurantId, userId, orderStatus);
        if (orders.size()>1) {
          String idNotToDelete=findNewestOrderId(orders);
          for(Order o : orders){
              if(o.getOrderId()!=idNotToDelete){
                  o.setOrderStatus("toBeDeleted");
                  orderService.updateOrder(o);
                  numberOfRemovedOrders++;
              }

          }
        }
        return "Removed "+numberOfRemovedOrders+" orders.";
    }

    private String findNewestOrderId(List<Order> orders) {
        long time=0;
        String id="";
        for(Order o : orders){
            try {
                if (Long.parseLong(o.getTimestampCreated()) > time) {
                    id = o.getOrderId();
                    time = Long.parseLong(o.getTimestampCreated());
                }
            }catch (Exception e)
            {
                java.util.logging.Logger.getAnonymousLogger().log(Level.SEVERE,e.getLocalizedMessage());
            }
        }
        return id;
    }

}

