const uploadImage = async (e)=>{
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try{
        const response = await fetch('/profilePic',{
            method:'POST',
            body:formData
        });

        if(!(response.status >=200 && response.status < 400))
            return Promise.reject("failed to upload");
        const { src } = await response.json();
        return Promise.resolve({src});
    }
    catch(error){
        return Promise.reject(error);
    }
}

export default uploadImage;