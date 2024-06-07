const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD}/auto/upload`;

export const uploadFileToCloud = async(file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'vkm-file');

    const response = await fetch(url, {
        method : 'post',
        body : formData
    });
    const responseData = await response.json();
    
    return responseData;
};