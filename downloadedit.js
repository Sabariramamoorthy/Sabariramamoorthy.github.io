
var node = [];  
var pageName=[];
var Status1=[];
function getDownloaD (status){    
      console.log(status);     
    firebase.database().ref('OrdertoEdit').once('value', function(AllRecords) {
        AllRecords.forEach(function(CurrenRecord) {
            var orderno = CurrenRecord.val().OrderNo;
            var page = CurrenRecord.val().Pagename;
            var status=CurrenRecord.val().Status;
            node.push(orderno);
            pageName.push(page);
            Status1.push(status);
        });	
        localStorage.clear("Order_Edit");
        localStorage.setItem("Order_Edit",node.length);
     });  
     //console.log(node);  
download(status);       
}
function download(status){
  
   var addressTag=null;
   var ref = firebase.database().ref("OrdertoEdit");
   
   ref.once("value").then(function(snapshot)
    {
      
       let length=localStorage.getItem("Order_Edit");       
        for(let i =0;  i<length;i++)
         {
               
        addressTag =node[i];
        var StatusTag =Status1[i];
        //console.log(status);  
        if (addressTag != null){
          if (StatusTag == status)
          {
            console.log(addressTag,status);
            var z = document.createElement("option");
            z.setAttribute("value", addressTag);
            var t = document.createTextNode(addressTag);
            z.appendChild(t);
            document.getElementById("OrderNumber").appendChild(z);
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
            var FileUrl=snapshot.child(addressTag + "/Fileurl").val();;
           // console.log(Pagename,ProductName,framesize,info,text,mainImage,address);
            document.getElementById("Status"+addressTag).innerText="Order Status: "+Status;
            document.getElementById("pagename"+addressTag).innerText=Pagename;
            document.getElementById("OrderNo"+addressTag).innerText=addressTag;
            document.getElementById("ProductName"+addressTag).innerText=ProductName+" - "+framesize;
            document.getElementById("Fileurl"+addressTag).href=FileUrl;
            address=address.replace('\n\n', '\n');
            address=address.replace('\n\n', '\n');
            address=address.replace('\n\n', '\n');
            address=address.replace('\n\n', '\n');
            document.getElementById("framesize"+addressTag).innerText="Address: "+address;
                
            if(TrackingId == "N" || TrackingId ==""){
               document.getElementById("Tracking"+addressTag).innerText="TrackingId : Avialable after Dispatch ";
            }
            else{
               document.getElementById("Tracking"+addressTag).innerText="TrackingId : "+TrackingId;
 
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
        

           
  
           }

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
	code += "          <img src=\"/comigsoon.jpg\" id = \"MainImage"+orderno+"\" alt=\"Main Image\">";
	code += "        </div>";
	code += "        <div class=\"column\">";
	code += "          <a>Edited Image</a>";
	code += "          <img src=\"/comigsoon.jpg\"  id = \"EditedImage"+orderno+"\" alt=\"Edited Image\">";
	code += "        </div>";
	code += "        <div class=\"column\">";
	code += "          <a>Framed Image</a>";
	code += "          <img src=\"/comigsoon.jpg\"  id = \"FramedImage"+orderno+"\" alt=\"Framed Image\">";
	code += "        </div>";
	code += "      </div>";
	code += "    ";
   code += "<br> ";
	code += "  <a id = \"Status"+orderno+"\" class=\"w3-button w3-block w3-hover-khaki w3padding-16 \">Green</a>";
	code += "  <a id = \"ProductName"+orderno+"\" class=\"w3-button w3-block w3-hover-blue-grey w3padding-16 \">Blue</a>";
	code += "  <a id = \"framesize"+orderno+"\" class=\"w3-button w3-block w3-hover-khaki w3padding-16 pop\">Red</a>";
	code += "  <a id = \"text"+orderno+"\" class=\"w3-button w3-block w3-hover-khaki w3padding-16 pop\">Black</a>";
   code += "  <a id = \"info"+orderno+"\" class=\"w3-button w3-block w3-hover-blue-grey w3padding-16 pop\">Gray</a>";
   code += "  <a id = \"Tracking"+orderno+"\" class=\"w3-button w3-block w3-hover-blue-grey w3padding-16\">Download</a>";
	code += "  <a id = \"Fileurl"+orderno+"\" href =\"\" class=\"w3-button w3-block w3-hover-blue-grey w3padding-16\">Download</a>";
	code += "  </div>  ";
	code += "</div>";
	code += "<br> ";

	document.getElementById("js_html").innerHTML += code;
}


var imageFile=[];
 const RefPicfileInput = document.getElementById("imageFile");
RefPicfileInput.addEventListener("change", (e) => {
   imageFile = e.target.files[0];  
   Compress(imageFile,"image.jpg");  

    })


function Update(){
   var OrderNo=document.getElementById("OrderNumber").value;
   var imageType=document.getElementById("imageType").value;
   if (imageType !="Select Image Type"){
      var filename='/OrdertoEdit/'+OrderNo+imageType;
      UploadBase(imageFile,filename)
   }
   else{
     writeNewPost("N")
   }
}    

function writeNewPost(url) {
   var EditedImage="N" ;
   var framedImage="N"; 
   var imageType=document.getElementById("imageType").value;

   if (imageType == "editedImage") {
      EditedImage=url; 
   }
   else{
      framedImage=url;
   }
   var OrderNo=document.getElementById("OrderNumber").value;
   var Tracking=document.getElementById("Tracking").value;
   var Status=document.getElementById("OrderStatus").value;

  var updates = {};

  if (imageType =="Select Image Type")
  {
   updates['/OrdertoEdit/'+OrderNo+'/Status'] = Status;
  }

if(EditedImage =="N" && framedImage !="N"){
  updates['/OrdertoEdit/'+OrderNo+'/FramedImage'] = framedImage;
  updates['/OrdertoEdit/'+OrderNo+'/Status'] = Status;
} 

if(EditedImage =="N" && framedImage =="N"){
   updates['/OrdertoEdit/'+OrderNo+'/Status'] = Status;
 } 

if(framedImage =="N" && EditedImage !="N") {
  updates['/OrdertoEdit/'+OrderNo+'/editedImage'] = EditedImage;
  updates['/OrdertoEdit/'+OrderNo+'/Status'] = Status;
}

if (Tracking !=null || Tracking !=""){
   updates['/OrdertoEdit/'+OrderNo+'/TrackingId'] = Tracking;
}



  firebase.database().ref().update(updates, (error) => {
   if (error) { 
   } 
   else {
      sendWhatsApp();
   }
 } );
 


}


function UploadBase(file,name){
   //console.log(name);
   var storage = firebase.storage().ref(name);   
   var upload = storage.put(file);
     upload.on(
       "state_changed",
       function progress(snapshot) {
         var percentage =
           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         document.getElementById("progress").value = percentage;
       }, 
       function error() {
         alert("error uploading file");
       },
       function complete() {      
         getFileUrl(name);
       }
     );
 }
 
 

 function getFileUrl(filename) {
       var storage = firebase.storage().ref(filename);
       storage.getDownloadURL().then(function(url) {
         writeNewPost(url)
       }).catch(function(error) {
       console.log(error);
          console.log("error encountered");
       });
    }



function sendWhatsApp(){
let pageIndex;
var OrderNo=document.getElementById("OrderNumber").value;
let length=localStorage.getItem("Order_Edit");   
for(let i =0;  i<length;i++)
{
 if(node[i] ==OrderNo )
{
pageIndex=i;
}
}
var PageName=pageName[pageIndex];
let num;
switch(PageName) {
   case "Lovestore":
      num = 918098091319;
   break;
   case "Giftspot":
      num = 918668139196;
   break;
   case "OnlineShoppingCart":
      num = 919080567902;
   break;

   case "TrendingGiftZone":
    num = 919150486488;
  break;
 }
var Status=document.getElementById("OrderStatus").value;
var OrderNo=document.getElementById("OrderNumber").value;
var Tracking=document.getElementById("Tracking").value;

let text="HI *"+PageName+"* %0A*"+OrderNo+ "* Status Updated to *"+Status+"*%0AFor More Updates : https://srgiftanddesign.000webhostapp.com/ResellerOrder.html?Name="+PageName
if (Status =="Waiting for Review")
{
text="HI *"+PageName+"* %0A*"+OrderNo+"* Status Updated to *"+Status+"*%0AEdited Softcopy is available Now%0AClick Here to Check : https://srgiftanddesign.000webhostapp.com/ResellerOrder.html?Name="+PageName
}
if (Status =="Order Dispatched")
{
   //console.log(Status);
text="HI *"+PageName+"* %0A"+OrderNo+ " Status Updated to *"+Status+"*%0ATracking Id :*"+Tracking+"*%0AFramed Image is available Now %0AClick Here to Check : https://srgiftanddesign.000webhostapp.com/ResellerOrder.html?Name="+PageName
}
//console.log(text+"\n"+Status+"\n"+Tracking);
window.open(`https://wa.me/${num}?text=${text}`, '_blank');
window.location.reload();
}

function Compress(file,filename) {  
   console.log(file); 
     new Compressor(file, {
         quality: 0.8,
         maxWidth: 1000,
         maxHeight: 1000,
         success(result) {
             var reader = new FileReader();
             reader.readAsDataURL(result);
             reader.onloadend = function() {
                 var base64data = reader.result;
                 dataURLtoFile(base64data, filename)
             }
         },
     });
 }

 function dataURLtoFile(dataurl, filename) {
	
	var arr = dataurl.split(','),
	mime = arr[0].match(/:(.*?);/)[1],
	bstr = atob(arr[1]), 
	n = bstr.length, 
	u8arr = new Uint8Array(n);
	
  while(n--){
	u8arr[n] = bstr.charCodeAt(n);
   }

   imageFile=new File([u8arr], filename, {type:mime});
   //console.log(imageFile);

}