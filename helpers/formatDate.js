export default function formatDate(date) {
    // Obtiene el día, el mes y el año del objeto Date
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    // Añade un cero al inicio si el día o el mes son menores que 10
    if (day < 10) {
    day = "0" + day;
    }
    if (month < 10) {
    month = "0" + month;
    }
    
    // Retorna la cadena con el formato DDMMAAAA
    return `${day}/${month}/${year}`;
}