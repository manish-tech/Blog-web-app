import React ,{useEffect}from 'react';
import styled from "styled-components";
import MainCard from "../Card/MainCard";

const StyledMain = styled.main`
    width : 100%;
`

function renderList(list){
    return(
        list.map((value)=>{
            return <MainCard  key = {value.post_id} item = {value}/>;
        })
    );
}



function Main(props) {
 
    const [list,setList] = React.useState([]);
    useEffect(() => {
        let categoryName = props.categoryName;
        let categoryId = props.categoryId;
        let url ; 
        if(categoryId === "" || categoryId === "0"){
            categoryName = "all";
            url = `http://localhost:8080/category/${categoryName}`;
        }
        else{
            url = `http://localhost:8080/category/${categoryName}/?categoryId=${categoryId}`;
        }
        fetch(url,{
            method : "GET",
            credentials: "same-origin"
        })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            if(data.status)
                setList([...data.data]);
            else{
                throw Error("couldn't get posts");
            }
        })
        .catch((err)=>{
            console.log(err);
        })
        
    }, [props.categoryId]);


    
    return (
        <StyledMain>
        {renderList(list)}
        </StyledMain>
    )
}

export default Main;
