export function resizeHeader(){
    const header = document.getElementsByClassName('header_wrapper')[0];
    let table = document.getElementsByClassName('calendar_table_wrapper')[0];	
    if(header !== undefined && header !== null)
        header.style.width = table.offsetWidth + 'px';
}

export function resizeToolHomepage(){
    const toolHomepage = document.getElementsByClassName('tool_wrapper')[0];
    const table = document.getElementsByClassName('calendar_table_wrapper')[0];	
    if(toolHomepage !== undefined && toolHomepage !== null)
        toolHomepage.style.width = table.offsetWidth + 'px';
}

export function resizeUIWrapper(){
    if(document.getElementsByClassName("homepage")[0] !== undefined){
        if(document.body.offsetWidth <= 1000){
            document.getElementsByClassName("title_input")[0].style.marginLeft = "0px";
            document.getElementsByClassName("time_to_input")[0].style.marginLeft = "0px";
            document.getElementsByClassName("date_input")[0].style.marginLeft = "0px";
        }
        else{
            document.getElementsByClassName("title_input")[0].style.marginLeft = "8.5px";
            document.getElementsByClassName("time_to_input")[0].style.marginLeft = "9.5px";
            document.getElementsByClassName("date_input")[0].style.marginLeft = "8.5px";
        }
    }
}

export function unclickAdd(e){
    if(!isClickingAddCircle(e) && document.getElementsByClassName("ui_wrapper_clicked")[0] !== undefined && document.getElementsByClassName("ui_wrapper_clicked")[0] !== null){
        document.getElementsByClassName('ui_wrapper')[0].classList.toggle("clicked");
        document.body.classList.toggle('ui_wrapper_clicked');
        document.querySelectorAll(".homepage > *:not(:last-child)").forEach((el) => {
            el.classList.toggle("ui_wrapper_clicked");
        })
    }
}

export function isClickingAddCircle(e){
    if(e.target.id === "add_circle") return true;
    else if (e.target.parentElement === "add_circle") return true;
    return false;
}

export function checkHeader(){
    const header = document.getElementsByClassName('header_wrapper')[0];
    const table = document.getElementsByClassName('calendar_table_wrapper')[0];	
    
    return (header !== undefined && header !== null && table !== undefined && table !== null) ? header.offsetWidth === table.offsetWidth : false;
}

export function checkToolHomepage(){
    const toolHeader = document.getElementsByClassName('tool_wrapper')[0];
    const table = document.getElementsByClassName('calendar_table_wrapper')[0];	
    
    return (toolHeader !== undefined && toolHeader !== null && table !== undefined && table !== null) ? toolHeader.offsetWidth === table.offsetWidth : false;
}