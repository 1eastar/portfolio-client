import axios from 'axios';
import Cookies from 'universal-cookie';

import { get } from '../index';

// export const getPhotoTextList = () => {
//     return get('experience/phototext/');
// }

// export const getPhotoTextDetail = (id: number) => {
//     return get(`experience/phototext/${id}/`);
// }

export const getPhototextInPost = (experience_id: number) => {
    return get(`experience/phototexts?experience_id=${experience_id}`);
}