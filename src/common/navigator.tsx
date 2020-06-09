export const navigator = (
    history: any, url: string, data?: any
) => {
    history.push(`${url}`, data);
    window.scrollTo(0, 0);
}