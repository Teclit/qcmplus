import React, { useEffect, useState } from 'react';
import './QuizList.css';
import QuizCard from './QuizCard';
import { retrieveQuizzes } from '../../services/QuizService';
import { Carousel, Container } from 'react-bootstrap';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await retrieveQuizzes();
                setQuizzes(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    const handleTakeQuiz = (id) => {
        console.log('Selected quiz ID: ' + id);
        // Navigate to quiz taking page or perform other actions
    };

    const chunkArray = (array, size) => {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    };

    const chunkedQuizzes = chunkArray(quizzes, 4);

    return (
        <Container>
            <Carousel className="quiz-list" indicators={false}>
                {chunkedQuizzes.map((quizChunk, index) => (
                    <Carousel.Item key={index}>
                        <div className="d-flex justify-content-center">
                            {quizChunk.map((quiz) => (
                                <QuizCard
                                    key={quiz.id}
                                    title={quiz.title}
                                    description={quiz.description}
                                    onTakeQuiz={() => handleTakeQuiz(quiz.id)}
                                />
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
};

export default QuizList;
