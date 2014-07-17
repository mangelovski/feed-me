package com.mangelovski.feedme.demo.web.rest.dto;


public class RestaurantDTO {

    private String restaurantId;

    private String name;

    private String area;

    private String shortDesc;

    private String comments;

    private String type;

    public RestaurantDTO() {
    }

    public RestaurantDTO(String restaurantId, String name, String area, String shortDesc, String comments, String type) {
        this.restaurantId = restaurantId;
        this.name = name;
        this.area = area;
        this.shortDesc = shortDesc;
        this.comments = comments;
        this.type = type;
    }

    public String getRestaurantId() {
        return restaurantId;
    }

    public String getName() {
        return name;
    }

    public String getArea() {
        return area;
    }

    public String getShortDesc() {
        return shortDesc;
    }

    public String getComments() {
        return comments;
    }

    public String getType() {
        return type;
    }
    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("RestaurantDTO{");
        sb.append("restaurantId='").append(restaurantId).append('\'');
        sb.append(", name='").append(name).append('\'');
        sb.append(", area='").append(area).append('\'');
        sb.append(", shortDesc='").append(shortDesc).append('\'');
        sb.append(", comments='").append(comments).append('\'');
        sb.append(", type=").append(type);
        sb.append('}');
        return sb.toString();
    }
}
