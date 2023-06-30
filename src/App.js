
import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import SearchStory from './SearchStory';
import NavBar from './NavBar';
import EditStory from './EditStory';
import OneStory from './OneStory';
import './App.css';
import dataSource from './dataSource';

function App (){
    const [searchPhrase, setSearchPhrase] = useState('');
    const [storyList, setStoryList] = useState([]);
    const [currentlySelectedStoryId, setCurrentlySelectedStoryId] = useState(0);
    

    let refresh = false;

    //load stories
    //cause of the problem
    //Issue resolved: must run week 1 assignment
    //      MusicAPI: operating on express
    //see dataSource.js for more details
    const loadStories = async () => {
        const response = await dataSource.get('/stories');

        setStoryList(response.data);
    };

    //setup initialization callback
    useEffect(() =>{
        //update story list
        loadStories();
    }, [refresh]);

    function updateSearchResults (phrase){
        console.log('phrase is ' + phrase);
        setSearchPhrase(phrase);
    };

    //Having an issue here.
    //How to fix odd formatting when attempting edit
    //Tracing the issue may lead to EditStory.js file
    const updateSingleStory =async(id, navigate, uri) =>{

        console.log('Update Single Story = ', id);
        console.log('Update Single Story = ', navigate);
        var indexNumber = 0;
        for(var i = 0; i < storyList.length; i++){
            if(storyList[i].id === id){
                indexNumber = i;
            }
        }
        setCurrentlySelectedStoryId(id);
        let path = uri+indexNumber;
        console.log('path', path);
        navigate(path);
    };


    console.log('storyList', storyList);

    const renderedList = storyList.filter((story) => {
        if(
            story.title.toLowerCase().includes(searchPhrase.toLowerCase())||
            searchPhrase === ''
        ){
            return true;
        }
        return false;
    });

    
    

    console.log('renderedList', renderedList);

    function onNewStory(navigate){
        loadStories();
        navigate("/");
    }

    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route
                    exact
                    path='/'
                    element={
                        <SearchStory
                            updateSearchResults={updateSearchResults}
                            storyList={renderedList}
                            updateSingleStory={updateSingleStory}
                        />
                    }
                />
                <Route 
                    exact 
                    path='/new' 
                    element={ <EditStory onEditStory = {EditStory} /> } />
                <Route
                    exact
                    path='/edit/:storyId'
                    element={<EditStory 
                        onEditStory = {EditStory} 
                        story={storyList[currentlySelectedStoryId]} />}
                />
                <Route
                    exact
                    path='/show/:storyId'
                    element={<OneStory story={storyList[currentlySelectedStoryId]} />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;


