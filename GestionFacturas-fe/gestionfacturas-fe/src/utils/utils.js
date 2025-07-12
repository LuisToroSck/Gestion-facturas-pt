function formatDate(date) {
    if (!date) return '';

    const parsed = typeof date === 'string' ? new Date(date) : date;

    const day = String(parsed.getDate()).padStart(2, '0');
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const year = parsed.getFullYear();

    return `${day}/${month}/${year}`;
}

function formatAmount(amount) {
    return amount != null ? new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    }).format(amount) : '';
}

export { formatDate, formatAmount };