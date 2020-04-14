import React from 'react';

function Loading() {
    return(
        <div className="loading">
            <img src={require('./images/loading.gif')} alt="blue loading circle"/>
        </div>
    )
}

export default Loading;