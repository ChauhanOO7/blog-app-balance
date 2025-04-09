const view=document.querySelector(".content");
view.addEventListener("click",async (e)=>{

    console.log(e.target)
    if(e.target.classList.contains('forpost'))
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
        const response=await fetch("/blogpagedata",options);
        if(response.redirected)
        {
            window.location.href=response.url;
        }
    
    }
});

