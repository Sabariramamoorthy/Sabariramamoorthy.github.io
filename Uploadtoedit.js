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
  console.log(elements[i].name);
    elements[i].disabled = true;
}
}
var imagedataarray = [];
var Refimage = [];
var Mainimage= [];

const otherPicfileInput = document.getElementById("otherPic");
otherPicfileInput.addEventListener("change", (e) => {
      var files = [];
      files = e.target.files;
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
    encodeImagemain(file)  
    });

     function encodeImageFileAsURL(file) {
        var reader = new FileReader();
        reader.onloadend = function() {
          imagedataarray.push(reader.result);
        }
        reader.readAsDataURL(file);
      }

      function encodeImagemain(file) {
        var reader = new FileReader();
        reader.onloadend = function() {
            Mainimage.push(reader.result);
        }
        reader.readAsDataURL(file);
      }
  
      function encodeImageref(file) {
        var reader = new FileReader();
        reader.onloadend = function() {
            Refimage.push(reader.result);
        }
        reader.readAsDataURL(file);
      }
  
  
function uploadZip() {
  
  ElementDisable();
  document.getElementById("gif").style.visibility="visible";
        var zip = new JSZip();
        document.getElementById("uploading").innerText="Zipping Started"
        for (let i = 0; i < imagedataarray.length; i++) {
          zip.file("Image" + i + ".jpeg", imagedataarray[i].replace(/^data:image\/(png|jpeg);base64,/, ""), {
            base64: true
          });
          document.getElementById("progress").value=i;
        }
        zip.file("Mainimage.jpeg", Mainimage[0].replace(/^data:image\/(png|jpeg);base64,/, ""), {
            base64: true
          }); 
        zip.file("Refimage.jpeg", Refimage[0].replace(/^data:image\/(png|jpeg);base64,/, ""), {
            base64: true
          });


        var filename=document.getElementById("ProductName").value;
        var filename1=document.getElementById("framesize").value;
        var filename2=document.getElementById("Name").value;
        var pagename=document.getElementById("Pagename").value;

        var Filename="OrdertoEdit/"+pagename+"/"+filename2+"_"+filename+"_"+filename1+".zip"
  
        document.getElementById("uploading").innerText="File Zipped.Starting Download"
  
        zip.generateAsync({
          type: "blob"
        }).then(function(content) {

          UploadBase(content,Filename);
          document.getElementById("uploading").innerText="Uploading Started.Wait for a Second"
          //saveAs(content,filename+"__"+filename1+".zip");
        });
}



function UploadBase(file,name){
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
        document.getElementById("gif").style.visibility="hidden";
        document.getElementById("uploading").innerText = name+" ...Uploaded Successfully";
        getFileUrl(name);
      }
    );
}

function getFileUrl(filename) {
		//create a storage reference
		var storage = firebase.storage().ref(filename);
		//get file url
		storage.getDownloadURL().then(function(url) {
			console.log(url);
      UploadInformation (url);
		}).catch(function(error) {
      console.log(error);
			console.log("error encountered");
		});
	}



function UploadInformation (fileURL) {
  var random=Math.floor((Math.random() * 1000) + 1);
  console.log(random);
 firebase.database().ref('OrdertoEdit/Order-'+random).set({
  OrderNo:"Order-"+random,
  ProductName: document.getElementById("ProductName").value,
  OtherName: document.getElementById("others").value,
  framesize:document.getElementById("framesize").value,
  Othersize:document.getElementById("otherssize").value,
  Name: document.getElementById("Name").value,
  DoorNo: document.getElementById("DoorNo").value,
  Postal:document.getElementById("Postal").value,
  District:document.getElementById("District").value,
  State: document.getElementById("State").value,
  Pincode: document.getElementById("Pincode").value,
  Landmark:document.getElementById("Landmark").value,
  phone:document.getElementById("phone").value,
  Alterphone: document.getElementById("Alterphone").value,
  Pagename: document.getElementById("Pagename").value,
  Pagephone:document.getElementById("Pagephone").value,
  text:document.getElementById("text").value,
  info:document.getElementById("info").value,
  Fileurl:fileURL
}, (error) => {
if (error) {
  document.getElementById("uploading").innerHTML="Upload Failed,Plese DM us in Whatsapp"
} else {
  document.getElementById("uploading").innerHTML="Uploaded Sucessfull,Thank You"
}
});
}