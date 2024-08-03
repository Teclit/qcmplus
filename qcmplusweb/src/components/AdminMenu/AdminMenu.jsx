import React from 'react';
import {
    FaBook,
    FaChalkboardTeacher,
    FaCommentAlt,
    FaFileAlt,
    FaHome,
    FaQuestionCircle,
    FaRegStar, FaUser,
    FaUserGraduate
} from 'react-icons/fa';
import {getLoggedInUser} from "../../services/AuthService";

const AdminMenu =({renderAdminItem}) =>{
    const getUser = getLoggedInUser();
    return (
        <>
            {renderAdminItem('UserProfile', FaUser, getUser)}
            {renderAdminItem('Dashboard', FaHome, 'Dashboard')}
            {renderAdminItem('Admin', FaChalkboardTeacher, 'Admin')}
            {renderAdminItem('Trainee', FaUserGraduate, 'Trainee')}
            {renderAdminItem('Exams', FaBook, 'Exams')}
            {renderAdminItem('Quizzes', FaFileAlt, 'Quizzes')}
            {renderAdminItem('Questions', FaQuestionCircle, 'Questions')}
            {renderAdminItem('Answers', FaCommentAlt, 'Answers')}
            {renderAdminItem('Features', FaRegStar, 'Features')}
        </>
    );
};

export default AdminMenu;