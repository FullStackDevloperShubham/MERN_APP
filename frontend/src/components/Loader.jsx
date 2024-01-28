import { Spinner } from "react-bootstrap";

import React from 'react'

function Loader() {
    return (
        <Spinner>
            animation="border"
            role="staus"
            style={{
                width: "100px",
                height: "100px",
                margin: 'auto',
                display: "block",
            }}
        </Spinner>
    )
}

export default Loader