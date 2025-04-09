const logout=document.querySelector("#logout");
const view=document.querySelector(".content");
view.addEventListener("click",async (e)=>{

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

logout.addEventListener("click",async (e)=>{

    let cookie=document.cookie;
    cookie=cookie+";max-age=0";
    document.cookie=cookie;

    const response=await fetch("/");
    window.location.href=response.url;

});
