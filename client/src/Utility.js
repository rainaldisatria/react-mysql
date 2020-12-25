export const moneyFormat = (price) => {
    return price?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
}

export const getCurrentDateToSQL = () => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
 
    return `${year}-${month}-${day}`;
}