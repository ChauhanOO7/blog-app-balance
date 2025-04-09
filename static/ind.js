const uploaded_file=document.querySelector("#uploaded");

uploaded_file.addEventListener("change",()=>{

    const fs=new FileReader();

    fs.readAsDataURL(uploaded_file.files[0]);

    fs.addEventListener("load",async ()=>{
        const url=fs.result;
        
        let options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                image_id:url
            })
        }
        const response=fetch("/valueimg",options);
    
    });
});