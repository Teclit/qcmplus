import React from 'react';
import { Button, Card } from 'react-bootstrap';

const QuizCard = ({ title, description, quizId, onTakeQuiz }) => {
    const Img = ({ title = 'QCMPlus', link = `Images/${title}.jpg` }) => {
        return <div className="img-container"><img src={link} alt={title} className="img-fluid" /></div>;
    };

    return (
        <Card style={{ width: '18rem' }} className="quiz-card me-3">
            <Img title={title} />
            <Card.Body>
                <Card.Title className="text-bold">{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Button className="defaultBtn text-center" onClick={() => onTakeQuiz(quizId)}>Take Quiz</Button>
            </Card.Body>
        </Card>
    );
};

export default QuizCard;
