import { OpenModal, CloseModal } from "../Modal";
export function ExpandView()
{
    
    document.querySelector("body").addEventListener("click", (event) => {
        const target = event.target;
        if (target.classList.contains("databox")) 
        {
            var inner = event.target.innerHTML
            var parent = event.target
            doThis(inner,parent);
        }
        else if(target.parentNode.classList.contains("databox"))
        {
            var inner = event.target.parentNode.innerHTML
            var parent = event.target.parentNode
            doThis(inner,parent);
        }
        else if(target.parentNode.parentNode.classList.contains("databox"))
        {
            var inner = event.target.parentNode.parentNode.innerHTML
            var parent = event.target.parentNode.parentNode
            doThis(inner,parent);
        }
        else if(target.parentNode.parentNode.parentNode.classList.contains("databox"))
        {
            var inner = target.parentNode.parentNode.parentNode.innerHTML
            var parent = target.parentNode.parentNode.parentNode
            doThis(inner,parent)
        }
        if(target.classList.contains("closebtn"))
        {
            remThis()
        }
        
    }
    
    );

    function doThis(inner,parent)
    {
        var popup = document.createElement("div")
        var innerpopup = document.createElement("div")
        innerpopup.innerHTML=inner;
        innerpopup.setAttribute('class','innerpop')
        popup.appendChild(innerpopup);
        OpenModal(popup.innerHTML)
    }
    function remThis()
    {
        document.getElementById("deleteme").remove();
    }
}