import React from 'react';




function newestFirst(array) {
    function compare(a, b) {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    }
    // console.log(array[0]);
    return array.sort(compare);
}

