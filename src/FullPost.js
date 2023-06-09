import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apis from './api';
import { useParams } from 'react-router-dom';

function Fetch() {
    const [data, setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error, setError] =useState("");
    const [comments, setComments]=useState([]);
    const param = useParams();

    useEffect(()=>{
        const fetchData = async()=>{
            setLoading(true);
            try{
                const response = await axios.get(`${apis.posts}/${param.id}`);
                setData(response.data.data);
            }
            catch(error){
                setError(error)
            }
            finally{
                setLoading(true)
            }
        }
        const fetchCard = async()=>{
            if(data.length !==0){
                setLoading(true);
                setComments([])
                try{
                    data.forEach(async(postId)=> {
                        const response = await axios.get(apis.easyview + `/${postId}`)
                        setComments(oldarray=>[...oldarray,response.data.data]);
                    })
                }
                catch(error){
                    setError(error)
                }
                setLoading(false);
            }
        }
        
        async function run(){
            await fetchData();
            fetchCard();
        }
        run()
    },[JSON.stringify(data), param])
    return [data, loading, error, comments]
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
    const [post, loading, error, comments] = Fetch()
    console.log(post)
    return(
        <div>

        </div>
    );
}
export default Post