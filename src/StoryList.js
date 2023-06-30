import React from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

function StoryList (props){
    function handleSelectionOne(storyId, uri){
        console.log('Selected ID is ' + storyId);
        props.onClick(storyId, navigator, uri);
    };

    console.log('props storyList', props);
    const navigator = useNavigate();
    const stories = props.storyList.map((story) =>{
        return(
            <Card
                key={story.id}
                storyId={story.id}
                storyTitle={story.title}
                storyAuthor={story.author}
                storyChapter={story.chapter}
                storyContent={story.content}
                storyPublishDate={story.publishDate}
                buttonText="OK"
                onClick={handleSelectionOne}
            />
        );
    });
    return <div className='container'>{stories}</div>

}

export default StoryList;