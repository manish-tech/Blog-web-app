import {
    ImageSideButton,
    Block,
    addNewBlock
  } from 'medium-draft';

export default class CustomImageSideButton extends ImageSideButton{
  
    /*
  We will only check for first file and also whether
  it is an image or not.
  */


  onChange(e) {
    
    const file = e.target.files[0];
    if (file.type.indexOf('image/') === 0) {
      // This is a post request to server endpoint with image as `image`
      const formData = new FormData();
      formData.append('image', file);
      fetch('http://localhost:8080/post/postImage', {
        method: 'POST',
        body: formData,
      }).then((response) => {
        if (response.status === 201) {
          return response.json().then(data => {
            if (data.url) {
              this.props.setEditorState(addNewBlock(
                this.props.getEditorState(),
                Block.IMAGE, {
                  src: 'http://localhost:8080/post/getImage/' + data.url,
                }
              ));
            }
          });
        }
      });
    }
    this.props.close();
  }

}
