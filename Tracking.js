
var OrderDetails = {};
function getDownloaD (){ 
   const queryString = window.location.search;
   const urlParams = new URLSearchParams(queryString);
   var OrderNo = urlParams.get('OrderNo');
   document.getElementById("OrderId").innerText=OrderNo;
   //console.log(OrderNo); 
      ref = firebase.database().ref('OrdertoEdit');
      ref.child("Order-"+OrderNo).on('value',function(snapshot)
      {
      OrderDetails=snapshot.val();
      //console.log(OrderDetails)
//console.log(OrderDetails.Fileurl)
      //download(); 
      }); 
    
    
}

var delayInMilliseconds = 2000; //1 second

setTimeout(function() {
   document.getElementById("Orderdate").innerText =OrderDetails.OrderDate;
   document.getElementById("ProductName").innerText =OrderDetails.ProductName;
   document.getElementById("FrameSize").innerText =OrderDetails.framesize+ " Inches";
   document.getElementById("Satus").innerText =OrderDetails.Status;
   //console.log(OrderDetails.address);
   var Address=String(OrderDetails.address);
   Address=Address.replace('\n\n', '\n');
   Address=Address.replace('\n\n', '\n');
   Address=Address.replace('\n\n', '\n');  
   let start =Address.indexOf("From Address") 
   var mystr = (Address).slice(start,Address.length);
   Address=Address.replace(mystr, ''); 
   document.getElementById("Address").innerText =Address;
   document.getElementById("amount").innerText =String(OrderDetails.Pagename) == "SRCreation" ? "₹"+OrderDetails.Amount : OrderDetails.Pagename;
   document.getElementById("paymentMode").innerText =String(OrderDetails.Pagename) == "SRCreation" ? "Via Online Payment" : "";
   document.getElementById("trackingid").innerText =OrderDetails.TrackingId == "" ? "Available Soon" : OrderDetails.TrackingId;
  
   document.getElementById("ProductImage").src=OrderDetails.editedImage == "N" ? "/FrameMockup.jpg":OrderDetails.editedImage;

   var TrackingURL;
   switch(OrderDetails.CourierType) {

   case "StCourier":
      TrackingURL = "http://www.erpstcourier.com/awb_tracking2.php";
   break;

  case "Professional":
   TrackingURL = "https://www.tpcindia.com/";
  break;
 
  case "DTDC":
   TrackingURL = "https://www.dtdc.in/tracking/tracking_results.asp";
  break;
}
document.getElementById("turl").href =TrackingURL;

switch(OrderDetails.Status) {

   // <li class="step0 active " id="step1">PLACED</li>
   //            <li class="step0 active text-center" id="step2">SHIPPED</li>
   //            <li class="step0 text-muted text-right" id="step3">DELIVERED</li>

   case "Framing Started":
      document.getElementById("step1").className ="step0 active" ;
      document.getElementById("step2").className ="step0  text-center" ;
      document.getElementById("step3").className ="step0  text-muted text-right" ;
   break;

  case "Order Dispatched":
   document.getElementById("step1").className ="step0 active" ;
   document.getElementById("step2").className ="step0  active text-center" ;
   document.getElementById("step3").className ="step0 text-muted text-right" ;

  break;
 
  case "Order Delivered":
   document.getElementById("step1").className ="step0 active" ;
   document.getElementById("step2").className ="step0  active text-center" ;
   document.getElementById("step3").className ="step0 active text-muted text-right" ;

  break;
}

document.getElementById("body").style.visibility="visible"
document.getElementById("body").style.display="block"

}, delayInMilliseconds);

