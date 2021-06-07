import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Post from './post'
import Pagination from './Pagination'

const Pag = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading]  = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [PostsPerPage] = useState(10);


    useEffect(() => {
        const fecthPosts = async () =>{
            setLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
            setPosts(res.data);
            setLoading(false);            
        }
        fecthPosts();
    },[]);

    //Get current posts
    const indexOfLastPost = currentPage * PostsPerPage;
    const indexOfFirstPost = indexOfLastPost - PostsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost);

    //Change Page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return(
        <div className='container mt-5'>
            <h1 className='text-primary mb-3'>My Blog</h1>
            <Post posts={currentPosts} loading={loading}/>
            <Pagination postsPerPage={PostsPerPage} totalPosts={posts.length} paginate={paginate}/>
        </div> 
    );
}

export default Pag;