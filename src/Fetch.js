import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apis from './api';

function Fetch(url) {
    const [data, setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error, setError] =useState("");
    const [cards, setCard]=useState([]);

    useEffect(()=>{
        const fetchCard = async()=>{
            if(data.length !==0){
                setLoading(true);
                setCard([])
                try{
                    data.forEach(async(postId)=> {
                        const response = await axios.get(apis.easyview + `/${postId}`)
                        setCard(oldarray=>[...oldarray,response.data.data]);
                    })
                }
                catch(error){
                    setError(error)
                }
                setLoading(false);
            }
        }
        const fetchData = async()=>{
            setLoading(true);
            try{
                const response = await axios.get(url);
                setData(response.data.data);
            }
            catch(error){
                setError(error)
            }
            finally{
                setLoading(true)
            }
        }
        
        async function run(){
            await fetchData();
            fetchCard();
        }
        run()
    },[JSON.stringify(data), url])
    return [data, loading, error, cards]
}
export default Fetch

function Total(){
    const [pages, setPages] = useState(1)
    useEffect(()=>{
        const run = async()=>{
            try{
                const response = await axios.get(apis.postNum)
                setPages(Math.ceil(response.data.data / 12))
            }catch(error){
                console.log(error)
            }
        }
        run()
    },[pages])
    return pages
}export {Total}