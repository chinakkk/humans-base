export const isImage = (url) => {
  try{
    const img = new Image();
    img.src = url;
    return img.complete && img.naturalWidth !== 0;
  }
  catch(error){
    console.log('isIMG')
  }

}