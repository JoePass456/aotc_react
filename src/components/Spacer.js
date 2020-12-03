import React from 'react'

function Spacer(props) {
    let numOfSpaces = [];
    for (let x = 0; x <= props.spaces; x++) {
        numOfSpaces.push(<br key={x}></br>)
    }

    return (
        <>
        {numOfSpaces}
        </>        
    )
}

export default Spacer
