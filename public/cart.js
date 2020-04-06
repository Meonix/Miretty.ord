// init cart.html
// Get the modal
var modal = document.getElementById("cartModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
$( document ).ready(function initCart(){
    var array = [];
    array = JSON.parse(window.localStorage.getItem("cart"));
    var lastElement = array[array.length-1];
    for(x of array){
      //quantity= quantity + (parseInt(x.amount)*parseInt(x.price));
      let card = document.createElement('div');
        card.innerHTML = `
          <div class = "detailItem" padding: 30px;>
            <div class="row">
              <div class="col-xl-4 col-lg-4 col-md-7 col-sm-12>
                <div class="cell"">
                  <div class="infor">
                  <img src="${x.linkPhoto}" style="width: 150px; padding: 20px;
                  height: 160px"/>
                  
                </div>
              </div>
              <div class="col-xl-8 col-lg-8 col-md-5 col-sm-12">
                <h5>${x.nameProduct}</h5>
                <p>Giá :${x.price} </p>
                <div class="quantity buttons_added">
                      <input type="button" value="-" class="minus">
                      <input type="number"id="inputQuantity" step="1" min="1" max="" name="quantity" value="1" title="Qty" class="input-text qty text" size="4" pattern="" inputmode="">
                      <input type="button" value="+" class="plus">
                </div>
                <a href="#" class="btn btn-danger" onclick="">XÓA</a>
              </div>
            </div>
          </div>
            `;
            $(".cart").append(card);
            
           if(lastElement.id.localeCompare(x.id)==0){
               let bt = document.createElement('div');
               bt.innerHTML = `
               
               <a href="storage.html" class="btn btn-danger">HỦY BỎ</a>
               <a href="#" class="btn btn-danger" onclick="">THANH TOÁN</a>
               `;
               $(".cart").append(bt);
           }
    }
  modal.style.display = "block";
});