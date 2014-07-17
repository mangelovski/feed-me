package com.mangelovski.feedme.demo.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * A restaurant.
 */

@Document(collection = "T_RESTAURANTS")
public class Restaurant implements Serializable {

    @NotNull
    @Size(min = 0, max = 50)
    @Id
    private String restaurantId;

    @Size(min = 0, max = 50)
    @Field("name")
    private String name;

    @Size(min = 0, max = 50)
    @Field("area")
    private String area;

    @Size(min = 0, max = 50)
    @Field("shortDesc")
    private String shortDesc;

    @Size(min = 0, max = 50)
    @Field("comments")
    private String comments;

    @Size(min = 0, max = 50)
    @Field("type")
    private String type;

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getShortDesc() {
        return shortDesc;
    }

    public void setShortDesc(String shortDesc) {
        this.shortDesc = shortDesc;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Restaurant user = (Restaurant) o;

        if (!restaurantId.equals(user.restaurantId)) {
            return false;
        }

        return true;
    }

    @Override
    public int hashCode() {
        return restaurantId.hashCode();
    }

    @Override
    public String toString() {
        return "Restaurant{" +
                "restaurantId='" + restaurantId + '\'' +
                ", name='" + name + '\'' +
                ", area='" + area + '\'' +
                ", shortDescription='" + shortDesc + '\'' +
                ", comments='" + comments + '\'' +
                ", type='" + type + '\'' +
                "}";
    }
}
