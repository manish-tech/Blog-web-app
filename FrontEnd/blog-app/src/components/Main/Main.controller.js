import React from 'react'
// import {useDispatch , useSelector} from "react-redux";
import {useParams ,Switch, Route} from "react-router-dom";
import useQuery from "./useQuery";
import Main from "./Main";
function Maincontroller() {
    const categoryName = useParams().category;
    const query = useQuery();
    const categoryId = query.get("categoryId") || ""; 
   

    // const data = useSelector((state)=>{
    //     return state.mainList;
    // })
    // console.log(data);
    // const dispatch = useDispatch();
    // const reff = React.useRef();


    // const handleShowMore = ()=>{
    //     dispatch();    
    // }
    return (
        <div style = {{ width : "65%"}}>
            <Main 
                categoryName={categoryName}
                categoryId={categoryId}
            />
        </div>
    )
}

export default Maincontroller
