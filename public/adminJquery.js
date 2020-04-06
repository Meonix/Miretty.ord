$( document ).ready(function() {
    var database = firebase.database();
    database.ref('merchandise').on("value",function(snap){
        snap.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                console.log(childSnapshot.val().linkPhoto);
                
            let content = document.getElementById('content');
      
            let card = document.createElement('div');
            card.className = "col-xl-3 col-lg-2 col-md-4 col-sm-6 col-12";
            card.innerHTML = `
            <br>
            <div class="cell">
              <div class="infor">
                <img src="${String(childData.linkPhoto)}" />
                <h5>${String(childData.nameProduct)}</h5>
                <p>Loại Sản Phẩm :${String(childData.productType)}</p>
                <p>id :${String(childData.id)} <br>Giá :${String(childData.price)} </p>
                <a href="#" class="btn btn-danger" onclick="Purchase()">Đặt hàng</a>
              </div>
            </br>
            `;
                
      $(".sell").append(card);
  
    
     
          });
        
        
    });
    
   
});