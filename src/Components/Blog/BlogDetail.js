import React from "react";
import { useParams } from "react-router-dom";


const BlogDetail = () =>{
    const {slug} = useParams();
    

    return(
        <div>
            <p>Hello,{slug}</p>
        </div>
        
    );
}
export default BlogDetail;