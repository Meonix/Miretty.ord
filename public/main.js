     // Your web app's Firebase configuration
     var firebaseConfig = {
        apiKey: "AIzaSyC_8KF8CW3N3jqNNZ4PG0ZOSBe_RkRE4uM",
        authDomain: "miretty-order.firebaseapp.com",
        databaseURL: "https://miretty-order.firebaseio.com",
        projectId: "miretty-order",
        storageBucket: "miretty-order.appspot.com",
        messagingSenderId: "36606444522",
        appId: "1:36606444522:web:96fb6e84c01bea88776893",
        measurementId: "G-S5MB8FLRTQ"
      };
      // Initialize Firebase
    
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();


const nameProduct = document.getElementById('nameProduct');
const price = document.getElementById('price');
const description = document.getElementById('description');
const linkPhoto = document.getElementById('linkPhoto');
const btAdd = document.getElementById('btAdd');
const productType = document.getElementById('productType');
const database = firebase.database();
const rootRef = database.ref('merchandise');
const btRemove = document.getElementById('btRemove');
const btStorage = document.getElementById('btStorage');
const deleteProductID = document.getElementById('deleteProductID');
if(btAdd){
	btAdd.addEventListener('click',(e)=>{
    	const autoID = rootRef.push().key //tự tạo key
    var d = new Date();
    var id = Math.floor(d/10).toString();
		e.preventDefault();
		rootRef.child(id).set({
      nameProduct:nameProduct.value,
      id:id,
      productType:productType.value,
			price:price.value,
      description:description.value,
      linkPhoto:linkPhoto.value
		});
		
	});
}
if(btRemove){
	btRemove.addEventListener('click',(e) =>{
		e.preventDefault();
		rootRef.child(deleteProductID.value).remove();
	});
}
if(btStorage){
	btStorage.addEventListener('click',(e)=>{
		window.open('storage.html');
	});
}

    


