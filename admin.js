var date = new Date();
var today = date.getDate();
var trueValue= "True"+today
  // https://www.sitepoint.com/get-url-parameters-with-javascript/
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var product = urlParams.get('paramName');
if(urlParams.has('paramName'))
{
  try{
    var produc1 = product.replace(/ /g,'+');
    var decrypted = CryptoJS.AES.decrypt(produc1, "myPassword");
    var value=decrypted.toString(CryptoJS.enc.Utf8)
  }
  catch(err){
    document.getElementById("flase").style.visibility="visible";
    document.getElementById("flase").style.display="block";
  }
  }
 

else{
  value=null;
}

if(value ==trueValue){
  document.getElementById("true").style.visibility="visible";
  document.getElementById("true").style.display="block";
}
else{
  document.getElementById("flase").style.visibility="visible";
  document.getElementById("flase").style.display="block";
}

setInterval(function(){
  logout();
},300000);

function logout(){
  if(confirm('Logout?'))
      redirect();
  else
      alert('OK! keeping you logged in')
}

function redirect(){
  document.location = "adminLogin.html"
}