package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.model.Role;
import com.pmn.qcmplus.model.User;
import com.pmn.qcmplus.repository.RoleRepository;
import com.pmn.qcmplus.repository.UserRepository;
import com.pmn.qcmplus.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public List<String> getAllRoles() {
        List<Role> roles = roleRepository.findAll();
        return roles.stream()
                .map(Role::getRoleName)
                .collect(Collectors.toList());
    }

    @Override
    public User createUser(User user) {
        setDefaultValues(user);
        if (user.getRole() != null) {
            Role role = roleRepository.findById(user.getRole().getId())
                    .orElseThrow(() -> new RuntimeException("Role not found"));
            user.setRole(role);
        }
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(Integer id, User user) {
        Optional<User> existingUserOpt = userRepository.findById(id);
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            existingUser.setLastName(user.getLastName());
            existingUser.setFirstName(user.getFirstName());
            existingUser.setGender(user.getGender());
            existingUser.setCompany(user.getCompany());
            existingUser.setJobTitle(user.getJobTitle());
            existingUser.setPhoneNumber(user.getPhoneNumber());
            existingUser.setIsActive(user.getIsActive());
            if (user.getCreatedDate() != null) {
                existingUser.setCreatedDate(user.getCreatedDate());
            }
            if (user.getRole() != null) {
                Role role = roleRepository.findById(user.getRole().getId())
                        .orElseThrow(() -> new RuntimeException("Role not found"));
                existingUser.setRole(role);
            }
            return userRepository.save(existingUser);
        } else {
            return null;
        }
    }

    @Override
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public User updateUserRole(Integer userId, Integer roleId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            Role role = roleRepository.findById(roleId).orElseThrow(() -> new RuntimeException("Role not found"));
            user.setRole(role);
            return userRepository.save(user);
        } else {
            return null;
        }
    }

    @Override
    public User getUserWithRole(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    private void setDefaultValues(User user) {
        if (user.getCompany() == null) {
            user.setCompany("Unknown");
        }
        if (user.getJobTitle() == null) {
            user.setJobTitle("Employee");
        }
        if (user.getPhoneNumber() == null) {
            user.setPhoneNumber("0000000000");
        }
        if (user.getIsActive() == null) {
            user.setIsActive(true);
        }
        if (user.getCreatedDate() == null) {
            user.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        }
    }
}
