package com.mangelovski.feedme.demo.domain.menu;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Set;

/**
 * A menu.
 */

@Document(collection = "T_MENIES")
public class Menu implements Serializable {

    @NotNull
    @Size(min = 0, max = 50)
    @Id
    private String menuId;

    @Size(min = 0, max = 50)
    @Field("name")
    private String name;

    @Size(min = 0, max = 50)
    @Field("restaurantId")
    private String restaurantId;

    private Set<Category> availableCategories;

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

    public String getMenuId() {
        return menuId;
    }

    public void setMenuId(String menuId) {
        this.menuId = menuId;
    }

    public Set<Category> getAvailableCategories() {
        return availableCategories;
    }

    public void setAvailableCategories(Set<Category> availableCategories) {
        this.availableCategories = availableCategories;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Menu user = (Menu) o;

        if (!menuId.equals(user.menuId)) {
            return false;
        }

        return true;
    }

    @Override
    public int hashCode() {
        return menuId.hashCode();
    }

    @Override
    public String toString() {
        return "Restaurant{" +
                "restaurantId='" + restaurantId + '\'' +
                ", name='" + name + '\'' +
                ", menuId='" + menuId + '\'' +
                "}";
    }
}
