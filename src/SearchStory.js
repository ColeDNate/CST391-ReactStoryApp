import React from 'react';
import SearchForm from './SearchForm';
import StoryList from './StoryList';

function SearchStory(props){
    console.log('props with update single story ', props);
    return (
        <div>
            <div className='container'>
                <SearchForm onSubmit={props.updateSearchResults}/>
                
                <StoryList storyList={props.storyList} onClick={props.updateSingleStory}/>
            </div>
        </div>
    );
};

export default SearchStory;