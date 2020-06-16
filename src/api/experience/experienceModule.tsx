import axios from 'axios';
import Cookies from 'universal-cookie';

import { get } from '../index';

export const getExperienceList = () => {
    return get('experience/posts/');
}

export const getExperienceDetail = (id: number) => {
    return get(`experience/posts/${id}/`);
}