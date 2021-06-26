import React from 'react';

const ErorText = (props) => {
    return (
        <div className='error'>
            {props.children}
        </div>
    );
};

export default ErorText;