export default function formatDate(date, isTime) {
    const newDate = new Date(+date);
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const day = newDate.getDate().toString().padStart(2, '0');
    if (isTime) {
        const hour = newDate.getHours().toString().padStart(2, '0');
        const minute = newDate.getMinutes().toString().padStart(2, '0');
        const second = newDate.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
    return `${year}-${month}-${day}`
}