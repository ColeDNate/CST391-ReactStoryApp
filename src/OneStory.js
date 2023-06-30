import React from "react";

function OneStory(props){
    return( 
        <div className='container'>
            <h2>{props.story.title}</h2>
            <div className='row'>
                <div className='col col-sm-3'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>{props.story.title}</h5>
                            <p className='card-text'>{props.story.content}</p>
                            <a href='/#' className='btn btn-primary'>
                                Edit
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OneStory;