package com.mangelovski.feedme.demo.service;

import com.mangelovski.feedme.demo.domain.IdCounter;
import com.mangelovski.feedme.demo.domain.order.Order;
import com.mangelovski.feedme.demo.domain.order.OrderItem;
import com.mangelovski.feedme.demo.repository.IdCounterRepository;
import com.mangelovski.feedme.demo.repository.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;

/**
 * Service class for managing orders.
 */
@Service
public class OrderService {

    private final Logger log = LoggerFactory.getLogger(OrderService.class);

    @Inject
    private OrderRepository orderRepository;
    @Inject
    private IdCounterRepository idCounterRepository;

    @Transactional("order")
    public  Order insertNewOrder(String restaurantId, String userId) {
        Order newOrder=new Order();
        newOrder.setItemsOrdered(new LinkedList<OrderItem>());
        IdCounter orderCounter=idCounterRepository.findOne("orderNumber");
        int orderId=Integer.parseInt(orderCounter.getValue());
        orderId++;
        orderCounter.setValue(Integer.toString(orderId));
        newOrder.setOrderId(Integer.toString(orderId));
        newOrder.setOrderStatus("makingCart");
        newOrder.setRestaurantId(restaurantId);
        newOrder.setUserId(userId);
        newOrder.setTimestampCreated(String.valueOf(System.currentTimeMillis()));
        newOrder.setTotalPrice("");
        orderRepository.save(newOrder);
        idCounterRepository.save(orderCounter);

        log.debug("Inserted new Order for User: {}", userId);
       return orderRepository.findOne(Integer.toString(orderId));
    }



    @Transactional("order")
    public void updateOrder(Order o) {

        if(o.getOrderStatus().equals("onCheckout")){
            //update the timestamp if the order is onCheckout
            o.setTimestampOrdered(String.valueOf(System.currentTimeMillis()));
        }
        orderRepository.save(o);

        log.debug("Updated Order with id {}", o.getOrderId());
    }

    @Transactional(readOnly = true)
    public List<Order> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders;
    }

    @Transactional(readOnly = true)
    public List<Order> getOrdersByRestaurantIdClientIdandOrderStatus(String restaurantId,String userId,String orderStatus) {
        List<Order> orders = orderRepository.findByRestaurantIdAndUserIdAndOrderStatus(restaurantId, userId, orderStatus);
        return orders;
    }
    @Transactional(readOnly = true)
    public Order getActiveOrderByRestaurantIdAndClientIdorCreateNew(String restaurantId,String userId) {
        List<Order> userOrders = orderRepository.findByRestaurantIdAndUserId(restaurantId,userId);

        for(Order order:userOrders){
            if(order.getOrderStatus().equals("makingCart"))
                return order;
        }
       return insertNewOrder(restaurantId,userId);
    }
    private boolean isInteger(String str) {
        if (str == null) {
            return false;
        }
        int length = str.length();
        if (length == 0) {
            return false;
        }
        int i = 0;
        if (str.charAt(0) == '-') {
            if (length == 1) {
                return false;
            }
            i = 1;
        }
        for (; i < length; i++) {
            char c = str.charAt(i);
            if (c <= '/' || c >= ':') {
                return false;
            }
        }
        return true;
    }
}
