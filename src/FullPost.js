import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';

import Placeholder from './placeholder';
import apis from './api';

import Shetland from "./img/dog-shetland-sheepdog-collie-sheltie-royalty-free-image-491206081-1565123992.jpg";
import Golden from "./img/golden-retriever-royalty-free-image-506756303-1560962726.jpg"
import Samoyed from "./img/samoyed-royalty-free-image-1581005065.jpg"


function Fetch() {
    const [post, setPost] = useState({});
    const [loading,setLoading]=useState(true);
    const [error, setError] =useState("");
    // const [comments, setComments]=useState([]);
    const param = useParams();

    useEffect(()=>{
        const fetchPost = async()=>{
            setLoading(true);
            try{
                const url = apis.posts + `/${param.id}`
                const response = await axios.get(url)
                setPost(response.data.data)
            }catch(error){
                setError(error)
            }finally{
                setLoading(false);
            }
        }
        // const fetchComment = async()=>{
        //     setLoading(true);
        //     try{
        //         const response = await axios.get(`${apis.posts}/${param.id}`);
        //         setData(response.data.data);
        //     }
        //     catch(error){
        //         setError(error)
        //     }
        //     finally{
        //         setLoading(true)
        //     }
        // }
        
        async function run(){
            await fetchPost();
        }
        run()
    },[JSON.stringify(post), param])
    return [post, loading, error]
}

// function Total(){
//     const [pages, setPages] = useState(1)
//     useEffect(()=>{
//         const run = async()=>{
//             try{
//                 const response = await axios.get(apis.postNum)
//                 setPages(Math.ceil(response.data.data / 12))
//             }catch(error){
//                 console.log(error)
//             }
//         }
//         run()
//     },[pages])
//     return pages
// }

function Post(){
    const [post, loading, error] = Fetch()
    return(
        <>
        <Container className='border shadow p-5'>
            {loading ? <h2>Loading...</h2>:
                <Container>
                    <Display imageArr={post.images}/>
                    <Placeholder/>
                    <h2>{post.title}</h2>
                    {post.urgent === 'true' ? <div className='text-danger fst-italic mb-3' style={{fontSize:"0.8rem"}}>*緊急</div>:<></>}
                    <div>{post.username}</div>
                    <div className='d-inline-flex mt-3 text-secondary fs-6'>
                        <div>{post.location}</div>
                        <div className='mx-3'>{post.updateDate}</div>
                    </div>
                    <hr/>
                    <div className='' style={{minHeight:'50vh'}}>{post.content}</div>
                </Container>
            }
            </Container>
            <Placeholder/>
        </>
    );
}
export default Post

function Display(props){
    const car = (array)=>{
        let arr = [];
        array.map((data,idx)=>{
        arr.push(
        <Carousel.Item>
        <img
            className="d-block w-100 caroimg"
            src={data['imageSrc']}
            alt={idx}
        />
        {data['description']
        ?
            <Carousel.Caption className='d-flex position-absolute bottom-0 start-50 translate-middle-x mb-5 d-block w-100 bg-dark text-light justify-content-center bg-opacity-50 align-items-center'>
                <p className='opacity-100'>{data['description']}</p>
            </Carousel.Caption>
        :<></>
        }
        </Carousel.Item>
        );
    })
        return arr
    }
    return (
        <>
        {props.imageArr.length === 0 
            ? <></>
            : <Carousel className='rounded border border-dark w-100 h-100 shadow-sm' variant='dark'>
                {car(props.imageArr)}
            </Carousel>
        }
        </>
      );
}