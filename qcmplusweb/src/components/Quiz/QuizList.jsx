import React, {useEffect, useState} from 'react';
import './QuizList.css';
import QuizCard from './QuizCard';
import {retrieveQuizzes} from '../../services/QuizService';
import {Carousel} from 'react-bootstrap';

const QuizList = ({ onTakeQuiz }) => {
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

    const chunkArray = (array, size) => {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    };

    const chunkedQuizzes = chunkArray(quizzes, 4);

    return (
        <>
            <h3 className="text-bold text-center p-4">Evaluate Your Skills: Take the Quiz</h3>
            <Carousel className="quiz-list" indicators={false}>
                {chunkedQuizzes.map((quizChunk, index) => (
                    <Carousel.Item key={index}>
                        <div className="d-flex justify-content-center">
                            {quizChunk.map((quiz) => (
                                <QuizCard
                                    key={quiz.quizId}
                                    title={quiz.title}
                                    description={quiz.description}
                                    quizId={quiz.quizId}
                                    onTakeQuiz={onTakeQuiz}
                                />
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
};

export default QuizList;
