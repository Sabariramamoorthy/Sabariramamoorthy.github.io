function pagination(page){
    // console.log(page);
    var currentpage="page"+page.toString();
    // console.log(currentpage);

    if (page="2"){
        console.log("page2-entered");
        document.getElementById(currentpage).style.visibility="visible";
        document.getElementById(currentpage).style.display="block";
        document.getElementById("page1").style.visibility="hidden";
        document.getElementById("page1").style.display="none";
        }
   
}

function onHover(id)
{
    // P1pic2.png,P2pic2.png
  document.getElementById(id).src="/Images/"+id+"pic2.png";
}
function offHover(id)
{
    // P1pic1.png,P2pic1.png
    document.getElementById(id).src="/Images/"+id+"pic1.png";
}

function sleep(milliseconds) {
    let timeStart = new Date().getTime();
    while(true) {
        let elapsedTime = new Date().getTime() - timeStart;
        if(elapsedTime > milliseconds) {
            break;
        }
    }
}