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

@Document(collection = "T_COUNTER")
public class IdCounter implements Serializable {

    @NotNull
    @Size(min = 0, max = 50)
    @Id
    private String counterId;

    @Size(min = 0, max = 50)
    @Field("value")
    private String value;

    public String getCounterId() {
        return counterId;
    }

    public void setCounterId(String counterId) {
        this.counterId = counterId;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        IdCounter user = (IdCounter) o;

        if (!counterId.equals(user.counterId)) {
            return false;
        }

        return true;
    }

    @Override
    public int hashCode() {
        return counterId.hashCode();
    }

    @Override
    public String toString() {
        return "Counter{" +
                "counterId='" + counterId + '\'' +
                ", value='" + value + '\'' +
                "}";
    }
}
