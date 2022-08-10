
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var ResellerName = urlParams.get('Name');

var node = []; 
 
var pageName=[];

var StatusName=[];


function getDownloaD (st){          
    firebase.database().ref('OrdertoEdit').once('value', function(AllRecords) {
        AllRecords.forEach(function(CurrenRecord) {
            var orderno = CurrenRecord.val().OrderNo;
            var page = CurrenRecord.val().Pagename;
            var StName=CurrenRecord.val().Status;
            node.push(orderno);
            pageName.push(page);
            StatusName.push(StName);
        });	
        localStorage.clear();
        localStorage.setItem("Order_Edit",node.length);
        localStorage.setItem("Order_node",node);
     });  


download(st);       
}

function download(st){
    var ref = firebase.database().ref("OrdertoEdit");
    ref.once("value").then(function(snapshot)
     {
        let length=localStorage.getItem("Order_Edit");        
        for(let i =0;  i<length;i++)
          {
         var currentPage=[];
         var addressTag1 =node[i];
         var pageTag =pageName[i];
         var StatusNameTag =StatusName[i];

         if(pageTag ==ResellerName && StatusNameTag==st){
            currentPage.push(addressTag1)
         }     
         addressTag=currentPage[0];
         if (addressTag != null){
            writeHTMLasJS(addressTag);
            var Pagename = snapshot.child(addressTag + "/Pagename").val(); 
            var ProductName = snapshot.child(addressTag + "/ProductName").val(); 
            var framesize = snapshot.child(addressTag + "/framesize").val(); 
            var address = snapshot.child(addressTag + "/address").val();
            var info = snapshot.child(addressTag + "/info").val(); 
            var text = snapshot.child(addressTag + "/text").val(); 
            var Status = snapshot.child(addressTag + "/Status").val();
            var TrackingId = snapshot.child(addressTag + "/TrackingId").val();  
            var mainImage=snapshot.child(addressTag + "/mainimage").val();
            var editedImage=snapshot.child(addressTag + "/editedImage").val();
            var FramedImage=snapshot.child(addressTag + "/FramedImage").val();
            document.getElementById("Status"+addressTag).innerText="Order Status: "+Status;
            document.getElementById("pagename"+addressTag).innerText=Pagename;
            document.getElementById("OrderNo"+addressTag).innerText=addressTag;
            document.getElementById("ProductName"+addressTag).innerText=ProductName+" - "+framesize;

            address=address.replace('\n\n', '\n');
            address=address.replace('\n\n', '\n');
            address=address.replace('\n\n', '\n');
            address=address.replace('\n\n', '\n');
            document.getElementById("framesize"+addressTag).innerText="Address: "+address;
                
            if(TrackingId == "N" || TrackingId ==null){
               document.getElementById("Fileurl"+addressTag).innerText="TrackingId : Avialable after Dispatch ";
            }
            else{
               document.getElementById("Fileurl"+addressTag).innerText="TrackingId : "+TrackingId;

            }
            
            if(info == "N" || info ==""){
               document.getElementById("info"+addressTag).innerText="ADDITIONAL INSTRUCTIONS - Not Mentioned";
            }
            else{
               document.getElementById("info"+addressTag).innerText="ADDITIONAL INSTRUCTIONS : "+info;

            }

            if(text == "N" || text ==""){
               document.getElementById("text"+addressTag).innerText="TEXTS/QUOTES - Not Mentioned";
            }
            else{
               document.getElementById("text"+addressTag).innerText="TEXTS/QUOTES : "+text;

            }
       

            if (editedImage == "N" || editedImage == null){
               document.getElementById("EditedImage"+addressTag).src="comigsoon.jpg";
               document.getElementById("EditedImage"+addressTag).style.opacity="0.5";
             }
             else{
               document.getElementById("EditedImage"+addressTag).src=editedImage;
             }

             if (FramedImage == "N" || FramedImage == null){
               document.getElementById("FramedImage"+addressTag).src="comigsoon.jpg";
               document.getElementById("FramedImage"+addressTag).style.opacity="0.5";
             }
             else{
               document.getElementById("FramedImage"+addressTag).src=FramedImage;
             }
             if (mainImage == "N" || mainImage == null){
               document.getElementById("MainImage"+addressTag).src="comigsoon.jpg";
               document.getElementById("MainImage"+addressTag).style.opacity="0.5";
             }
             else{
               document.getElementById("MainImage"+addressTag).src=mainImage;
             }
   
            }

            // else{
            //    document.getElementById("error").style.visibility="visible";
            //    document.getElementById("error").style.display="block";
            // }

         }
         
       });
       
}



function writeHTMLasJS(orderno){

	var code = "";
	code += "<div class=\"w3-row\">";
	code += "  <div class=\"w3-teal w3-container w3-center\" style=\"height:auto\">";
	code += "    <a style=\"color: aliceblue;font-size: 30px;\"  id = \"OrderNo"+orderno+"\">LOVESTORE.In</a>";
   code += "  <a id = \"pagename"+orderno+"\" style=\"color: aliceblue;font-size: 20px;\" class=\"w3-button w3-block  w3-hover-khaki\">Green</a>";
	code += "      <div class=\"row\">";
	code += "        <div class=\"column\">";
	code += "          <a>Main Image</a>";
	code += "          <img src=\"/comigsoon.jpg\" id = \"MainImage"+orderno+"\" alt=\"Snow\" onclick=\"previewImage(this.src)\">";
	code += "        </div>";
	code += "        <div class=\"column\">";
	code += "          <a>Edited Image</a>";
	code += "          <img src=\"/comigsoon.jpg\"  id = \"EditedImage"+orderno+"\" alt=\"Forest\" onclick=\"previewImage(this.src)\">";
	code += "        </div>";
	code += "        <div class=\"column\">";
	code += "          <a>Framed Image</a>";
	code += "          <img src=\"/comigsoon.jpg\"  id = \"FramedImage"+orderno+"\" alt=\"Forest\" onclick=\"previewImage(this.src)\">";
	code += "        </div>";
	code += "      </div>";
	code += "    ";
   code += "<br> ";
	code += "  <a id = \"Status"+orderno+"\" class=\"w3-button w3-block w3-hover-khaki w3padding-16 \">Green</a>";
	code += "  <a id = \"ProductName"+orderno+"\" class=\"w3-button w3-block w3-hover-blue-grey w3padding-16 \">Blue</a>";
	code += "  <a id = \"framesize"+orderno+"\" class=\"w3-button w3-block w3-hover-khaki w3padding-16 pop\">Red</a>";
	code += "  <a id = \"text"+orderno+"\" class=\"w3-button w3-block w3-hover-khaki w3padding-16 pop\">Black</a>";
   code += "  <a id = \"info"+orderno+"\" class=\"w3-button w3-block w3-hover-blue-grey w3padding-16 pop\">Gray</a>";
	code += "  <a id = \"Fileurl"+orderno+"\" class=\"w3-button w3-block w3-hover-blue-grey w3padding-16\">Download</a>";
	code += "  </div>  ";
	code += "</div>";
	code += "<br> ";

	document.getElementById("js_html").innerHTML += code;
}


function previewImage(link){
   window.location.href = link;
}

