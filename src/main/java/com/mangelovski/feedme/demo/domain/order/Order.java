package com.mangelovski.feedme.demo.domain.order;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

/**
 * an order.
 */

@Document(collection = "T_ORDERS")
public class Order implements Serializable {

    @NotNull
    @Size(min = 0, max = 50)
    @Id
    private String orderId;

    @Size(min = 0, max = 50)
    @Field("userId")
    private String userId;

    @Size(min = 0, max = 50)
    @Field("orderStatus")
    private String orderStatus;

    @Size(min = 0, max = 50)
    @Field("restaurantId")
    private String restaurantId;


    private List<OrderItem> itemsOrdered;

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public List<OrderItem> getItemsOrdered() {
        return itemsOrdered;
    }

    public void setItemsOrdered(List<OrderItem> itemsOrdered) {
        this.itemsOrdered = itemsOrdered;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Order user = (Order) o;

        if (!orderId.equals(user.orderId)) {
            return false;
        }

        return true;
    }

    @Override
    public int hashCode() {
        return orderId.hashCode();
    }

    @Override
    public String toString() {
        return "Restaurant{" +
                "restaurantId='" + restaurantId + '\'' +
                ", userId='" + userId + '\'' +
                ", orderId='" + orderId + '\'' +
                ", orderStatus='" + orderStatus + '\'' +
                "}";
    }
}
