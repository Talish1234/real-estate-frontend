import apiRequest from './apiRequest';
import { defer } from 'react-router-dom';

export const singlePageLoader = async ({request,params}) => {
    const res = await apiRequest("/posts/"+params.id);
    return res.data.post;
}


export const listPageLoader = async ({request,params}) => {
    const query = request.url.split("?")[1];
    const url = "/posts"+((query)?'?'+query:'');
    console.log(url)
    const res = await apiRequest(url);
    console.log(res.data.posts)
    return res.data.posts;
}

export const profilePageLoader = async ({request,params}) => {
 const res = await apiRequest('users/profile/post');
 const chat  = await apiRequest('/chats');
 return defer({response:res,chatResponse:chat});
}

