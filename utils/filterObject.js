const filterObject = (obj, filter, filterValue) =>
    Object.keys(obj).reduce((acc, val) => {
        if(filterValue === undefined) {
            return obj[val].hasOwnProperty(filter) ? {
                ...acc,
                [val]: obj[val]
            } : acc
        } else {
            return obj[val][filter] === filterValue ? {
                ...acc,
                [val]: obj[val]
            } : acc
        }
    }, {});

export default filterObject;