export default function imageUploadCallback(file){
    return new Promise(
        (resolve, reject) => {
            const data = new FormData();
            data.append('image', file);
            fetch('/post/postImage',{
                method : 'POST',
                body : data
            })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                const { src } = data; 
                resolve({
                    data : {link : src}
                })
            })
            .catch((error)=>{
                reject(error);
            })
         }
      );
}