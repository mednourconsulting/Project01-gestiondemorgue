/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_PERSONAL / LICENSE_COMMERCIAL in the project root for license information on type of purchased license.
 */

package com.akveo.bundlejava.user;

import com.akveo.bundlejava.authentication.SignUpDTO;
import com.akveo.bundlejava.user.exception.UserAlreadyExistsException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.ResponseEntity.ok;

/**
 * Controller for managing users
 */
@Controller
@RequestMapping("api/users")
public class UserController {

    private UserService userService;
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private ModelMapper modelMapper;


    @Autowired
    public UserController(UserService userService,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                           ModelMapper modelMapper) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
    }

    /**
     * Get user. Allowed only for Admin
     * @param id user id
     * @return user
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity getUser(@PathVariable Long id) {
        return ok(userService.getUserById(id));
    }

    /**
     * Update user. Allowed only for Admin
     * @param id user id
     * @param userDTO updated user data
     * @return updated user data
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.updateUserById(id, userDTO);
        return ok(updatedUser);
    }

    /**
     * Delete user
     * @param id user id
     * @return boolean result
     */
    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable Long id) {
        return ok(userService.deleteUser(id));
    }

    /**
     * Get current user
     * @return current user data
     */
    @GetMapping("/current")
    public ResponseEntity getCurrentUser() {
        return ok(userService.getCurrentUser());
    }

    /**
     * Get all users
     * @return all users data
     */
    @GetMapping("/")
    public ResponseEntity<List<UserDTO>> findAll() {
        return ok(userService.findAll());
    }

    /**
     * Update current user
     * @param userDTO updated user data
     * @return updated user data
     */
    @PutMapping("/current")
    public ResponseEntity updateCurrentUser(@Valid @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.updateCurrentUser(userDTO);
        return ok(updatedUser);
    }

    /**
     * Create user. Allowed only for Admin
     * @param userDTO new user data
     * @return created user
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("")
    public ResponseEntity createUser(@Valid @RequestBody UserDTO userDTO) {
        return ok(userService.createUser(userDTO));
    }
    /**
     * Create user. Allowed only for Admin
     * @param userDTO new user data
     * @return created user
     */
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/addUser")
    public ResponseEntity addUser(@Valid @RequestBody SignUpDTO userDTO) throws UserAlreadyExistsException {
        return ok(userService.register(userDTO));
    }

    @PutMapping("/updatePassword/{id}")
    public ResponseEntity updateUser(@PathVariable Long id, @RequestBody User user) {
        Optional<User> userFromDb = this.userRepository.findById(id);
        if(userFromDb.isPresent()) {userFromDb.get().setPasswordHash(this.passwordEncoder.encode(user.getPasswordHash()));
            User updatedUser =  this.userRepository.save(userFromDb.get());
            UserDTO updatedUserDto = modelMapper.map(updatedUser, UserDTO.class);
            return ok(updatedUserDto);
        }
        return null;
    }


}
