var firebaseConfig = {
    apiKey: "AIzaSyAJBdhYlg5xFu1MQOzPQjaiWyheBOHMAN0",
    authDomain: "srgifts-4cccb.firebaseapp.com",
    databaseURL: "https://srgifts-4cccb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "srgifts-4cccb",
    storageBucket: "srgifts-4cccb.appspot.com",
    messagingSenderId: "662372730784",
    appId: "1:662372730784:web:f9c8ffc3a7e48f7ea0c6c5",
    measurementId: "G-JLV996E31W"
};

function getDetails()
{
var ref = firebase.database().ref();
  ref.on("value", function(snapshot) {
  const jsonObj = JSON.stringify(snapshot.val().OrdertoEdit);
  localStorage.setItem("OrderDetails", jsonObj);

}, 
function (error) 
{
   console.log("Error: " + error.code);
});
}


function getOrders()
{
const str = localStorage.getItem("OrderDetails");
const parsedObj = JSON.parse(str);
return parsedObj;
}


function getOrdersonId(OrderNo)
{
    ref = firebase.database().ref('OrdertoEdit');
    ref.child("Order-"+OrderNo).on('value',function(snapshot)
    {
        return snapshot.val();
    }); 

}

function setCounts()
{
    happyCustomer
    TodaysOrder

}