import React from 'react';

function Card (props){
    function handleButtonClick(event, uri){
        console.log('ID clicked is ' + props.storyId);
        props.onClick(props.storyId, uri);
    };

    //used to show the publish date in a pretty format
    const formattedDate = new Date(props.storyPublishDate).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });

    return (
        <div className="card border-primary" style={{width: '90%'}}>
            <div className="card-body">
                <h3 className="card-title">{ props.storyTitle}: Chapter {props.storyChapter}</h3>
                <h5 className="card-title">by { props.storyAuthor}</h5>
                <p className="card-text">{ props.storyContent }</p>
                <p className="card-text">Published: {formattedDate}</p>
                <button
                    onClick={() => handleButtonClick(props.storyId,'/show/')}
                    className='btn btn-primary'
                >
                    {props.buttonText}
                </button>
                <button
                    onClick={() => handleButtonClick(props.storyId,'/edit/')}
                    className='btn btn-secondary'
                >
                    Edit
                </button>
            </div>
        </div>
    );
}

export default Card;