import React, { useState } from 'react';
import dataSource from './dataSource';
import { useNavigate } from 'react-router-dom';

function EditStory(props){

    //assume new story by setting up an empty story and setting the flag newStoryCreation
    let story ={
        author: '',
        title:'',
        chapter:'',
        content: '',
        publishDate:''
    };

    let newStoryCreation = true;

    // if an story is provided in 'props', then we are editing an story.
    //set story to the provided story and set newStoryCreation to false.
    if(props.story){
        story = props.story;
        newStoryCreation = false;
    }

    //story is now setup as an edited or new story
    const [author, setAuthor] = useState(story.author);
    const [title, setTitle] = useState(story.title);
    const [chapter, setChapter] = useState(story.chapter);
    const [content, setContent] = useState(story.content);
    const [publishDate, setPublishDate] = useState(story.publishDate);
    const navigate = useNavigate();

    
    function handleFormSubmit(event){
        event.preventDefault();

        console.log("submit");
        const editedStory ={
            storyId: story.storyId,
            author: author,
            title: title,
            chapter: chapter,
            content: content,
            publishDate: publishDate,
        };
        console.log(editedStory);

        saveStory(editedStory);
    };

    //need to change the way that stories are saved to the api
    const saveStory = async (story) =>{
        let response;
        if(newStoryCreation){
            response = await dataSource.post('/stories/create', story);
        } else{
            //this section needs to take in the id
            //Attmpted appending {props.storyId} in various forms
            response = await dataSource.post('/stories/update/', story);
        }
        console.log(response);
        console.log(response.data);
        props.onEditStory(navigate);
    };

    function handleCancel(){
        navigate("/");
    };

    function updateAuthor(event){
        setAuthor(event.target.value);
    };
    function updateTitle(event){
        setTitle(event.target.value);
    };
    function updateChapter(event){
        setChapter(event.target.value);
    };
    function updateContent(event){
        setContent(event.target.value);
    };
    function updatePublishDate(event){
        setPublishDate(event.target.value);
    };
    
    return (
        <div className='container'>
            <form onSubmit={handleFormSubmit}>
                <h1>{newStoryCreation ? "Create new" : "Edit"} Story</h1>
                <div className="form-group">
                    <label htmlFor="storyAuthor">Author</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="author" 
                        placeholder='Enter Story Author'
                        onChange={updateAuthor}
                    />
                    <label htmlFor="storyTitle">Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title" 
                        placeholder='Enter Story title'
                        onChange={updateTitle}
                    />
                    <label htmlFor="storyChapter">Chapter</label>
                    <input 
                        style={{width: "50%"}}
                        type="number" 
                        className="form-control" 
                        id="chapter" 
                        placeholder='Chapter'
                        onChange={updateChapter}
                    />
                    <label htmlFor="storyContent">Content</label>
                    <textarea 
                        //type="textarea" 
                        style={{width: "300%", height:"200px"}}
                        className="form-control" 
                        id="content" 
                        placeholder='Enter Story content'
                        onChange={updateContent}
                        cols={10}
                    />
                    <label htmlFor="storyPublishDate">Publish Date</label>
                    <input 
                        style={{width: "75%"}}
                        type="date" 
                        className="form-control" 
                        id="publishDate" 
                        placeholder='Enter publish date'
                        onChange={updatePublishDate}
                    />
                </div>
                <br/>
                <div align='left'>
                    <button type="button" className="btn btn-light" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditStory;