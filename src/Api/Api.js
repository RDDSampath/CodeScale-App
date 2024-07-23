import axios from 'axios';

const api = axios.create({
    baseURL: 'https://thronesapi.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});

const getCharacters = async () => {
    try {
        const response = await api.get('api/v2/Characters');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const postCharacter = async (character) => {
    try {
        const response = await api.post('api/v2/Characters', character);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const getOneCharacter = async (id) => {
    try {
        const response = await api.get(`api/v2/Characters/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};





export default {
    getCharacters,
    postCharacter,
    getOneCharacter,
};



