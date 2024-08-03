import axiosInstance, {API_BASE_URL} from "./AxiosInstance";

const QUIZZES_REST_API_URL = `${API_BASE_URL}/api/quizzes`;
export const retrieveQuizzes = () => axiosInstance.get(QUIZZES_REST_API_URL);
