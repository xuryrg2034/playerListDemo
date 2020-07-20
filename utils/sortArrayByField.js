function sortArrayByField(field) {
    return (a, b) => a[field] > b[field] ? 1 : -1;
}

export default sortArrayByField;;