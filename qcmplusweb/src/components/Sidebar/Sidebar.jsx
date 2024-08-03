import React from 'react';
import './Sidebar.css';
import ImgLogo from "../ImgLogo/ImgLogo";
import {ListGroup, Row} from "react-bootstrap";
import {isAdminUser} from "../../services/AuthService";
import Logout from "../LogOut/Logout";
import AdminMenu from "../AdminMenu/AdminMenu";
import UserMenu from "../UserMenu/UserMenu";

const Sidebar = ({onItemClick, selectedItem}) => {
    const isAdmin = isAdminUser();

    const renderAdminItem = (item, Icon, label) => {
        return isAdmin ? <ListGroup.Item
            className={`sidebar-item ${selectedItem === item ? 'active' : ''}`}
            onClick={() => onItemClick(item)}
        >
            <Icon className="sidebar-icon"/>
            <span>{label}</span>
        </ListGroup.Item> : null;
    };

    const renderUserItem = (item, Icon, label) => {
        return !isAdmin ? <ListGroup.Item
            className={`sidebar-item ${selectedItem === item ? 'active' : ''}`}
            onClick={() => onItemClick(item)}
        >
            <Icon className="sidebar-icon"/>
            <span>{label}</span>
        </ListGroup.Item> : null;
    };

    return (
        <>
            <Row className="mt-2 mb-5 text-center">
                <ImgLogo link="/"/>
            </Row>
            {isAdmin ? (
                <AdminMenu renderAdminItem={renderAdminItem}/>
            ) : (
                <UserMenu renderUserItem={renderUserItem}/>
            )}
            <Logout/>
        </>
    );
};
export default Sidebar;