import React, {useState} from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import Sidebar from "../../components/Sidebar/Sidebar";
import AddUser from "../../components/AddUser/AddUser";
import UserList from "../../components/UserList/UserList";
import "./Main.css";
import {AiFillWarning} from "react-icons/ai";
import {ROLE} from "../../utils/UtilLists";
import {isAdminUser} from "../../services/AuthService";
import QuizList from "../../components/Quiz/QuizList";

const Main = () => {
    const isAdmin = isAdminUser();
    const [showUserList, setShowUserList] = useState(true);
    const [selectedItem, setSelectedItem] = useState();

    const handleSidebarItemClick = (item) => {
        setSelectedItem(item);
        setShowUserList(true);
    };


    const renderContent = () => {
        if (!showUserList) {
            return <AddUser/>;
        }

        switch (selectedItem) {
            case 'Trainee':
                return <UserList title="Registered Trainee" userRole={ROLE.USER}/>;
            case 'Admin':
                return <UserList title="Registered Admin" userRole={ROLE.ADMIN}/>;
            case 'Exams':
                return <h1><AiFillWarning/>Exams</h1>;
            case 'Quizzes':
                return <h1><AiFillWarning/>Quizzes</h1>;
            case 'Questions':
                return <h1><AiFillWarning/>Questions</h1>;
            case 'Answers':
                return <h1><AiFillWarning/>Answers</h1>;
            case 'Features':
                return <h1><AiFillWarning/>Features</h1>;
            case 'TakeExams':
                return  <QuizList/>;
            case 'Result':
                return <h1><AiFillWarning/>Result</h1>;
            default:
                return <h1><AiFillWarning/>UserProfile</h1>;
        }
    };

    return (
        <Container fluid className="usersContainer">
            <Row>
                <Col xs={12} md={2} className="sidebar">
                    <Sidebar onItemClick={handleSidebarItemClick} selectedItem={selectedItem}/>
                </Col>
                <Col xs={12} md={10} className="main-content">
                    {isAdmin ? (
                        <div>
                            <div className="header d-flex justify-content-end m-3">
                                <Button className="ExportUserBtn me-2">Export CSV</Button>
                                <Button className="ToggleUserBtn" onClick={() => setShowUserList(!showUserList)}>
                                    {showUserList ? 'Add User' : 'List Users'}
                                </Button>
                            </div>
                            {renderContent()}
                        </div>
                    ) : (
                        <div className={"p-5"}>
                            <h3 className={"text-bold text-center p-4"}>Evaluate Your Skills : Take the Quiz</h3>
                            {renderContent()}
                        </div>
                    )
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default Main;
