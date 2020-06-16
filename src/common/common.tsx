const ENV = 'DEV';

export const measure = {
    MAIN_WIDTH: 1200,
    WIDTH: window.innerWidth,
    SERVER_URL: ENV==='DEV'? 'http://127.0.0.1:8000': 'https://1eastar.com/',
};