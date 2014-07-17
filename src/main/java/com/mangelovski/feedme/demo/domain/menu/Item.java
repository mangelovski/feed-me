package com.mangelovski.feedme.demo.domain.menu;

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
public class Item implements Serializable {

    @NotNull
    @Size(min = 0, max = 50)
    @Id
    private String itemId;

    @Size(min = 0, max = 50)
    @Field("name")
    private String name;


    @Size(min = 0, max = 50)
    @Field("price")
    private String price;

    @Size(min = 0, max = 50)
    @Field("desc")
    private String desc;

    @Size(min = 0, max = 50)
    @Field("quantity")
    private String quantity;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Item user = (Item) o;

        if (!itemId.equals(user.itemId)) {
            return false;
        }

        return true;
    }

    @Override
    public int hashCode() {
        return itemId.hashCode();
    }

    @Override
    public String toString() {
        return "Item{" +
                "itemId='" + itemId + '\'' +
                ", name='" + name + '\'' +
                ", price='" + price + '\'' +
                ", description='" + desc + '\'' +
                ", quantity='" + quantity + '\'' +
                "}";
    }
}
