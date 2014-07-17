package com.mangelovski.feedme.demo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mangelovski.feedme.demo.domain.Restaurant;
import com.mangelovski.feedme.demo.domain.menu.Menu;
import com.mangelovski.feedme.demo.repository.MenuRepository;
import com.mangelovski.feedme.demo.repository.RestaurantRepository;
import com.mangelovski.feedme.demo.security.AuthoritiesConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * REST controller for managing users.
 */
@RestController
@RequestMapping("/app")
public class MenuResource {

    private final Logger log = LoggerFactory.getLogger(MenuResource.class);

    @Inject
    private MenuRepository menuRepository;

    /**
     * GET  /rest/menu/:menuId -> get the menu with the menu id.
     */
    @RequestMapping(value = "/rest/menu",
            method = RequestMethod.GET,
            produces = "application/json")
    @Timed
    public Menu getMenu(@RequestParam(value = "restaurantId") String restaurantId, HttpServletResponse response) {
        log.debug("REST request to get Menu with restaurantId : {}", restaurantId);
        Menu menu = null;
        List<Menu> menies=menuRepository.findAll();
        for(Menu testmenu:menies){
            if(testmenu.getRestaurantId().equals(restaurantId))
                menu=testmenu;
        }
        if (menu == null) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
        return menu;
    }
    /**
     * GET  /rest/allMenies -> get all the menies
     */
    @RequestMapping(value = "/rest/allMenies",
            method = RequestMethod.GET,
            produces = "application/json")
    @Timed
    @RolesAllowed(AuthoritiesConstants.ADMIN)
    public List<Menu> getAllMenies( HttpServletResponse response) {
        log.debug("REST request to get all menies");
        List<Menu> menies = menuRepository.findAll();
        if (menies == null||menies.size()<1) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
        return menies;
    }
}
