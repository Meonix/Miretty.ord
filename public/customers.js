$( document ).ready(function() {
    var database = firebase.database();
    database.ref('users').on("value",function(snap){
        snap.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                // console.log(childSnapshot.val().address);
                
            let content = document.getElementById('content');
      
            let card = document.createElement('div');
            card.className = "col-xl-3 col-lg-2 col-md-4 col-sm-6 col-12";
            card.innerHTML = `
            <br>
            <div class="cell">
              <div class="infor">
                <h5>Tên Người Mua: ${String(childData.userName)}</h5>
                <p>${String(childData.product)}</p>
                <p>Số điện thoại :${String(childData.phone)} <br>Địa chỉ :${String(childData.address)} </p>
                <a href="#" class="btn btn-danger" onclick="Purchase()">Xóa</a>
              </div>
            </br>
            `;
                
      $(".sell").append(card);
  
    
     
          });
        
        
    });
    
   
});