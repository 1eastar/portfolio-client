// let ENV = 'DEV';
let ENV = 'PROD';

export const measure = {
    MAIN_WIDTH: window.innerWidth*2/3,
    WIDTH: window.innerWidth,
    SERVER_URL: ENV==='DEV'? 'http://127.0.0.1:8000': 'https://api.1eastar.com/',
};