import axios from 'axios';
import Cookies from 'universal-cookie';

import { postWithoutToken } from '../index';

export const postContact = (data: any) => {
    return postWithoutToken('common/contact/', data);
}