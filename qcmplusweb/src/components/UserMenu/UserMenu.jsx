import React from 'react';
import {FaBook, FaPoll, FaUser} from 'react-icons/fa';
import {ListGroup} from 'react-bootstrap';
import {getLoggedInUser} from "../../services/AuthService";

const UserMenu = ({renderUserItem}) => {
    const getUser = getLoggedInUser();
    return (
        <ListGroup>
            <>
                {renderUserItem('UserProfile', FaUser, getUser)}
                {renderUserItem('TakeExams', FaBook, 'Take Exams')}
                {renderUserItem('Result', FaPoll  , 'Result')}
            </>
        </ListGroup>
    );
};

export default UserMenu;
