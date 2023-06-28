import * as React from 'react';


function Space(props) {
    return (
        <React.Fragment>
            <div style={{height: props.size}}></div>
        </React.Fragment>
    );
}

export default Space;