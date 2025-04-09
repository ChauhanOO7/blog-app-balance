const deleteblog=document.querySelector(".container");

deleteblog.addEventListener("click",async (e)=>{

    if(e.target.classList.contains('Deleteblog'))
    {
    
        let options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                content_id:e.target.id
            })
        }
        const response=await fetch("/deleteblog",options);
        if(response.redirected)
        {
            window.location.href=response.url;
        }
    
    }
});