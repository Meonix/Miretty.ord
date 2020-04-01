$( document ).ready(function() {
    var database = firebase.database();
    database.ref('merchandise').on("value",function(snap){
        snap.forEach(function(childSnapshot) {
            childSnapshot.forEach(function(child){
                
                var childData = child.val();
                console.log(child.val().linkPhoto);
                
            let content = document.getElementById('content');
      
            let card = document.createElement('div');
            card.className = "col-xl-3 col-lg-2 col-md-4 col-sm-6 col-12";
            card.innerHTML = `
            <div>
            <div class="cell">
              <div class="infor">
                <img src="${String(childData.linkPhoto)}" />
                <h5>${String(childData.nameProduct)}</h5>
                <p>id</p>
                <p>${String(childData.id)} <br>${String(childData.price)} </p>
                <a href="#" class="btn btn-primary">Đặt hàng</a>
              </div>
          </div>
            `;
                
      $(".sell").append(card);
            })
  
    
     
          });
        
        
    });
    
   
});