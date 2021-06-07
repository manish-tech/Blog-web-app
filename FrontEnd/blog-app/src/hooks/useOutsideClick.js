import {useEffect} from 'react';

export default function useOutsideClick(operation,ref){
    useEffect(()=>{
        function handleClick(e){
            if(ref.current && (!ref.current.contains(e.target))){
                operation();
            }
        }
        document.addEventListener("click",handleClick,true);
        return ()=> document.removeEventListener("click",handleClick,true);
    },[])
}
