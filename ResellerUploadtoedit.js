const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var ResellerName = urlParams.get('Name');
var ResellerNumber;
switch(ResellerName) {

  case "Lovestore":
    ResellerNumber = "8089091319";
  break;

  case "Giftspot":
    ResellerNumber = "8668139196";
  break;

  case "OnlineShoppingCart":
    ResellerNumber = "9080567902";
  break;

  case "TrendingGiftZone":
    ResellerNumber = "9150486488";
  break;


  case "SRcreation":
    ResellerNumber = "9514309668";
  break;
}


document.getElementById("ProductName").onchange=function ProductName(){
    var item= document.getElementById("ProductName").value;
    if (item == "Other" )
    {   
        document.getElementById("others").style.visibility="visible"
        document.getElementById("others").style.display="block"
    }
    else
    { 
        document.getElementById("others").style.visibility="hidden"
        document.getElementById("others").style.display="none"
    }
   
}

document.getElementById("framesize").onchange=function Framesize(){
    var item= document.getElementById("framesize").value;
    if (item == "Other" )
    {
        document.getElementById("otherssize").style.visibility="visible"
        document.getElementById("otherssize").style.display="block"
        
    }
    else
    {   
        document.getElementById("otherssize").style.visibility="hidden"
        document.getElementById("otherssize").style.display="none"
    }
   
}


function ElementDisable(){
  document.getElementById("formid").style.backgroundColor="#ffffff";
  document.getElementById("ProductName").disabled = true;
  document.getElementById("framesize").disabled = true;
  var form = document.getElementById("formid");
  var elements = form.elements;

for (var i = 0, len = elements.length; i < len; ++i) {
  //console.log(elements[i].name);
    elements[i].disabled = true;
}
}



var imagedataarray = [];
var Refimage = [];
var Mainfilename;
var Mainfile=[];
var Mainimage= [];
var TotalFileCount;
const otherPicfileInput = document.getElementById("otherPic");
otherPicfileInput.addEventListener("change", (e) => {
      var files = [];
      files = e.target.files;
      document.getElementById("notify").innerText="Zipping Process Strated,Please don't click upload"
      TotalFileCount=files.length;
      for (var i = 0; i < files.length; i++) {
        encodeImageFileAsURL(files[i]);
      }
         
    });

const RefPicfileInput = document.getElementById("RefPic");
RefPicfileInput.addEventListener("change", (e) => {
      var file = e.target.files[0];  
      encodeImageref(file);    
    });
   
const MainPicfileInput = document.getElementById("MainPic");
MainPicfileInput.addEventListener("change", (e) => {
    var file = e.target.files[0];  
    var filename2=document.getElementById("Name").value;
    var pagename=ResellerName;
    var MainImage="OrdertoEdit/"+pagename+"/"+filename2+".jpg";
    Mainfilename=MainImage;
    UploadBase(file,MainImage,"Y");
    encodeImagemain(file) ;
    });


     function encodeImageFileAsURL(file) {
      new Compressor(file, {
          quality: 0.8,
          maxWidth: 1000,
          maxHeight: 1000,
          success(result) {
              var reader = new FileReader();
              reader.readAsDataURL(result);
              reader.onloadend = function() {
                  var base64data = reader.result;
                  imagedataarray.push(base64data);
                  document.getElementById("notify").innerText="Zipping on process,Please don't click upload"
                  if(imagedataarray.length == TotalFileCount ){
                    document.getElementById("up").disabled = false;
                    document.getElementById("up").style.backgroundColor = "green";
                    document.getElementById("notify").innerText="Now Click Upload"
                  }
                 
              }
          },
      });           
      }

      function encodeImagemain(file) {
        //console.log(file)
        new Compressor(file, {
          quality: 0.8,
          maxWidth: 1000,
          maxHeight: 1000,
          success(result) {
              var reader = new FileReader();
              reader.readAsDataURL(result);
              reader.onloadend = function() {
                  var base64data = reader.result;
                  Mainimage.push(base64data);
                  document.getElementById("up").disabled = false;
                  document.getElementById("up").style.backgroundColor = "green";
                  document.getElementById("notify").innerText="Now Click Upload"
              }
          },
      });           
      }
  

      function encodeImageref(file) {
        //console.log(file)     
        new Compressor(file, {
          quality: 0.8,
          maxWidth: 1000,
          maxHeight: 1000,
          success(result) {
              var reader = new FileReader();
              reader.readAsDataURL(result);
              reader.onloadend = function() {
                  var base64data = reader.result;
                  Refimage.push(base64data);
              }
          },
      });  
      }
  
  
function uploadZip() {
  //console.log(imagedataarray.length,Refimage.length,Mainimage.length); 
  ElementDisable();
  document.getElementById("gif").style.visibility="visible";
  if (imagedataarray.length > 0){
        var zip = new JSZip();
        document.getElementById("uploading").innerText="Zipping Started"

        if (imagedataarray.length>0){
          for (let i = 0; i < imagedataarray.length; i++) {
            zip.file("Image" + i + ".jpeg", imagedataarray[i].replace(/^data:image\/(png|jpeg);base64,/, ""), {
              base64: true
            });
            document.getElementById("progress").value=i;
          }
        }

        if (Mainimage.length>0){
          zip.file("Mainimage.jpeg", Mainimage[0].replace(/^data:image\/(png|jpeg);base64,/, ""), {
            base64: true
          }); 
        }
        
        if (Refimage.length>0){
          zip.file("Refimage.jpeg", Refimage[0].replace(/^data:image\/(png|jpeg);base64,/, ""), {
            base64: true
          });
        }

        var filename=document.getElementById("ProductName").value;
        var filename1=document.getElementById("framesize").value;
        var filename2=document.getElementById("Name").value;
        var pagename=ResellerName;
        var Filename="OrdertoEdit/"+pagename+"/"+filename2+"_"+filename+"_"+filename1+".zip";
        var Filename = Filename.replace(/ /g,'_');
        document.getElementById("uploading").innerText="File Zipped.Successfully";
       
        zip.generateAsync({
          type: "blob"
        }).then(function(content) {
          UploadBase(content,Filename,"N");
          document.getElementById("uploading").innerText="Uploading Started.Wait for a Second"
          //saveAs(content,filename+"__"+filename1+".zip");
        });
      }
      else{
        mainImage(Mainfilename);
        UploadInformation (localStorage.getItem("MainURL"));
      }
}



function UploadBase(file,name,mainFlag){

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
        console.log("error uploading file");
      },

      function complete() {
        
        document.getElementById("uploading").innerText = name+" ...Uploaded Successfully";
        if (mainFlag == "N")
        {
          getFileUrl(name);
        }
        else{
          console.log(name)
          mainImage(name);
        }
      }
    );
}

function getFileUrl(filename) {
		var storage = firebase.storage().ref(filename);
    console.log(filename)
		storage.getDownloadURL().then(function(url) {
      UploadInformation (url)
		}).catch(function(error) {
      console.log(error);
			console.log("error encountered");
		});
	}

function createAddress(){
var address= document.getElementById("Name").value
+"\n"+document.getElementById("DoorNo").value
+"\n"+document.getElementById("Postal").value
+"\n"+document.getElementById("District").value
+"\n"+document.getElementById("State").value
+"\n"+ document.getElementById("Pincode").value
+"\n"+document.getElementById("Landmark").value
+"\n"+document.getElementById("phone").value
+"\n"+document.getElementById("Alterphone").value
+"\n"+"From Address"
+"\n"+ResellerName
+"\n"+ResellerNumber;
return address;
}



function OrderSize(){
  if (document.getElementById("framesize").value == "Other"){
    return document.getElementById("otherssize").value;
    
  }
  else{
    return document.getElementById("framesize").value;
  }
}

function OrderType(){
  if (document.getElementById("ProductName").value == "Other"){
    return document.getElementById("others").value;
  }
  else{
    return document.getElementById("ProductName").value;
  }
}

function mainImage(filename){
  var storage = firebase.storage().ref(filename);
		storage.getDownloadURL().then(function(url) {
      localStorage.clear("MainURL");
      localStorage.setItem("MainURL",url);   
		}).catch(function(error) {
			console.log("error encountered");
		});
}

function UploadInformation (fileURL) {
  var random=Math.floor((Math.random() * 20) + 1);
  const d=new Date()
  var dateValue=d.getFullYear().toString()+(d.getMonth()+1).toString()+d.getDate().toString();
  
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var OrderDateToday=d.getDate()+", "+months[d.getMonth()] +" "+d.getFullYear();
  firebase.database().ref('OrdertoEdit/Order-'+dateValue+random).set({
  OrderNo:"Order-"+dateValue+random,
  ProductName:OrderType() ,
  framesize:OrderSize(),
  address:createAddress() ,
  Pagename:ResellerName,
  text:document.getElementById("text").value,
  info:document.getElementById("info").value,
  Fileurl:fileURL,
  makeDispatch:"N",
  Status:"Order Uploaded",
  TrackingId:"N",
  editedImage:"N",
  OrderDate:OrderDateToday,
  Amount:"",
  CourierType:"StCourier",
  PrimaryPhoneNo:document.getElementById("phone").value,
  mainimage:localStorage.getItem("MainURL"),
  FramedImage:"N"
}, (error) => {
if (error) {
  document.getElementById("uploading").innerHTML="Upload Failed,Plese DM us in Whatsapp"
} else {
  document.getElementById("gif").style.visibility="hidden";
  document.getElementById("uploading").innerHTML="Uploaded Sucessfull,Thank You"
}
});
}

