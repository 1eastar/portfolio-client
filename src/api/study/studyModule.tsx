import axios from 'axios';
import Cookies from 'universal-cookie';

import { get } from '../index';

export const getStudyList = (search: string, page: number, type: number, order: number, pagination: number) => {
    return get(`study/post?search=${search}&page=${page}&category=${type}&order=${order}&pagiantenum=${pagination}`);
}