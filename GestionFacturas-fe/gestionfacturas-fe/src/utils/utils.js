function formatDate(date){
    return date != null ?  date.split('T')[0].split('-').reverse().join('/') : '';
}

function formatAmount(amount){
    return amount != null ? new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    }).format(amount) : '';
}

export { formatDate, formatAmount };