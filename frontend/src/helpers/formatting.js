export const currencyFormatter = (value, useDecimals = true, separateCurrency = false) => {
    if (!value) {
        value = 0;
    }
    // convert string that is number to number
    value = value * 1;

    let currencyLabel = '$';
    if (separateCurrency === true) {
        currencyLabel = '<span>$</span>';
    }
    let currency = `${currencyLabel}${typeof value === 'number' ? value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : value}`;

    if (!useDecimals) {
        currency = currency.substr(0, currency.indexOf('.'));
    }

    return currency;
};
