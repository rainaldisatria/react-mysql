export const moneyFormat = (price) => {
    return price?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
}