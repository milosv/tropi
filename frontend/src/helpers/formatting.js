export const currencyFormatter = (value) => {
    if (!value) {
        value = 0;
    }

    return `$${typeof value === 'number' ? value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : value}`;
};

