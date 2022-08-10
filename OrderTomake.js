
var node = [];  
var pageName=[];
var Status=[]
function getDownloaD (){          
    firebase.database().ref('OrdertoEdit').once('value', function(AllRecords) {
        AllRecords.forEach(function(CurrenRecord) {
            var orderno = CurrenRecord.val().OrderNo;
            var page = CurrenRecord.val().Pagename;
            var status=CurrenRecord.val().Status;
            node.push(orderno);
            pageName.push(page);
            Status.push(status);
        });	
        localStorage.clear();
        localStorage.setItem("Order_Edit",node.length);
        localStorage.setItem("Order_node",node);
     });  
     //console.log(node);  


download();       
}
function download(){
  
   var ref = firebase.database().ref("OrdertoEdit");
   ref.once("value").then(function(snapshot)
    {
       let length=localStorage.getItem("Order_Edit");        
        for(let i =length-1; i>=0;i--)
         {
            var currentPage=[];
            var addressTag1 =node[i];
            var pageTag =Status[i];
            if(pageTag =="Framing Started"){
               currentPage.push(addressTag1)
            }     
            addressTag=currentPage[0];
        if (addressTag != null){
           writeHTMLasJS(addressTag);
           var framesize = snapshot.child(addressTag + "/framesize").val(); 
           var address = snapshot.child(addressTag + "/address").val();
           var editedImage=snapshot.child(addressTag + "/editedImage").val();
          // console.log(Pagename,ProductName,framesize,info,text,mainImage,address);
           document.getElementById("OrderNo"+addressTag).innerText=addressTag;
           document.getElementById("ProductName"+addressTag).innerText="Frame Size- "+framesize;
           address=address.replace('\n\n', '\n');
           address=address.replace('\n\n', '\n');
           address=address.replace('\n\n', '\n');
           address=address.replace('\n\n', '\n');
           document.getElementById("framesize"+addressTag).innerText="Address: "+address;
           if (editedImage == "N" || editedImage == null){
              document.getElementById("EditedImage"+addressTag).src="comigsoon.jpg";
              document.getElementById("EditedImage"+addressTag).style.opacity="0.5";
            }
            else{
               console.log(editedImage);
              document.getElementById("EditedImage"+addressTag).src=editedImage;
            }  
           }
        //   else{
        //     document.getElementById("error").style.visibility="visible";
        //     document.getElementById("error").style.display="block";
        //   }

        }
        
      });
      
}

function writeHTMLasJS(orderno){

	var code = "";
	code += "<div class=\"w3-row\">";
	code += "  <div class=\"w3-teal w3-container w3-center\" style=\"height:auto\">";
	code += "    <a style=\"color: aliceblue;font-size: 30px;\"  id = \"OrderNo"+orderno+"\">LOVESTORE.In</a>";
	code += "      <div class=\"row\">";
	code += "          <img src=\"/loading.gif\"  id = \"EditedImage"+orderno+"\" alt=\"Edited Image\">";
	code += "      </div>";
	code += "    ";
	code += "  <a id = \"ProductName"+orderno+"\" class=\"w3-button w3-block w3-hover-blue-grey w3padding-16 \">Blue</a>";
	code += "  <a id = \"framesize"+orderno+"\" class=\"w3-button w3-block w3-hover-khaki w3padding-16\">Red</a>";
	code += "  </div>  ";
	code += "</div>";
	code += "<br> ";

	document.getElementById("js_html").innerHTML += code;
}




