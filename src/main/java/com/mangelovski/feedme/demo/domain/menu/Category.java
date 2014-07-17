package com.mangelovski.feedme.demo.domain.menu;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Set;

/**
 * A restaurant.
 */

@Document(collection = "T_RESTAURANTS")
public class Category implements Serializable {

    @Size(min = 0, max = 50)
    @Field("name")
    private String name;


    @DBRef
    private Set<Item> availableItems;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Item> getAvailableItems() {
        return availableItems;
    }

    public void setAvailableItems(Set<Item> availableItems) {
        this.availableItems = availableItems;
    }
}
