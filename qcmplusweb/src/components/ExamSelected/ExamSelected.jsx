import React, {useEffect, useState} from 'react';
import {Button, Card, Container} from 'react-bootstrap';
import {retrieveQuizze} from '../../services/QuizService';
import './ExamSelected.css';

const ExamSelected = ({quizId}) => {
    const [quizze, setQuizze] = useState({});

    const Img = ({title = 'QCMPlus', link = `Images/${quizze.title}.jpg`}) => {
        return (
            <div className="img-container">
                <img src={link} alt={title} className="img-fluid"/>
            </div>
        );
    };

    useEffect(() => {
        const fetchQuizze = async () => {
            try {
                const response = await retrieveQuizze(quizId);
                setQuizze(response.data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };

        fetchQuizze();
    }, [quizId]);

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Card style={{width: '60rem'}} className="quiz-card">
                <Img title={quizze.title}/>
                <Card.Body className="text-center">
                    <Card.Title className="text-bold">{quizze.title}</Card.Title>
                    <Card.Text>{quizze.description}</Card.Text>
                    <Button className="defaultBtn text-center">Start Exam</Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ExamSelected;
