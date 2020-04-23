// init cart.html
// Get the modal
var modal = document.getElementById("checkoutModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var totalPrice = 0;
var currentQuatity = 0;
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var array = [];
var lengthOfArray = 0;
array = JSON.parse(window.localStorage.getItem("cart"));
var span = document.getElementsByClassName("close")[0];
$( document ).ready(function initCart(){
    var lastElement = array[array.length-1];
    for(x of array){
      //quantity= quantity + (parseInt(x.amount)*parseInt(x.price));
      let card = document.createElement('div');
        card.innerHTML = `
          <div class = "checkoutItem${x.id}" padding: 30px;>
            <div class="row">
              <div class="col-xl-4 col-lg-4 col-md-7 col-sm-12>
                <div class="cell"">
                  <div class="infor">
                  <img src="${x.linkPhoto}" style="
                  height: 160px;
                  width: 150px; padding: 20px;"/>
                  
                </div>
              </div>
              <div class="col-xl-8 col-lg-8 col-md-5 col-sm-12">
                <h5>${x.nameProduct}</h5>
                <h5>Giá :${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(parseInt(x.price))}</h5></p>
                <div class="quantity buttons_added">
                      <input type="button"value="-" class="minus">
                      <input type="number"id="inputQuantity${x.id}" step="1" min="1" max="" name="quantity" value="${x.amount}" title="Qty" class="input-text qty text" size="4" pattern="" inputmode="">
                      <input type="button"value="+" class="plus">
                </div>
                <a href="#" class="btn btn-danger" id="btDelete${x.id}">XÓA</a>
              </div>
            </div>
          </div>
            `;
            $(".cart").append(card);
            $("#btDelete"+x.id).click(deleteProduct.bind(null, x));
            totalPrice = totalPrice + (parseInt(x.amount)*parseInt(x.price));
           if(lastElement.id.localeCompare(x.id)==0){
               let bt = document.createElement('div');
               bt.innerHTML = `
               <h4 id="totalPrice">Tổng số tiền :${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(parseInt(totalPrice))}</h4>
               <a href="#" class="btn btn-danger" onclick="checkIsChanged()">CẬP NHẬT GIỎ HÀNG </a>
               <a href="storage.html" class="btn btn-danger">HỦY BỎ</a>
               <a href="#" class="btn btn-danger" onclick="Pay()">THANH TOÁN</a><br>
               <div class="alert alert-danger" style="margin: 20px;">
               <strong>Chú ý!</strong> Vuy lòng kiểm tra <strong>số lượng mặc hàng và tổng số tiền</strong> trước khi đặt hàng
                </div>
               `;
               $(".cart").append(bt);
           }
    }
  
});
// Init quantity box
function wcqib_refresh_quantity_increments() {
  jQuery("div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)").each(function(a, b) {
      var c = jQuery(b);
      c.addClass("buttons_added"), c.children().first().before('<input type="button" value="-" class="minus" />'), c.children().last().after('<input type="button" value="+" class="plus" />')
  })
}
String.prototype.getDecimals || (String.prototype.getDecimals = function() {
  var a = this,
      b = ("" + a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  return b ? Math.max(0, (b[1] ? b[1].length : 0) - (b[2] ? +b[2] : 0)) : 0
}), jQuery(document).ready(function() {
  wcqib_refresh_quantity_increments()
}), jQuery(document).on("updated_wc_div", function() {
  wcqib_refresh_quantity_increments()
}), jQuery(document).on("click", ".plus, .minus", function() {
  var a = jQuery(this).closest(".quantity").find(".qty"),
      b = parseFloat(a.val()),
      c = parseFloat(a.attr("max")),
      d = parseFloat(a.attr("min")),
      e = a.attr("step");
  b && "" !== b && "NaN" !== b || (b = 0), "" !== c && "NaN" !== c || (c = ""), "" !== d && "NaN" !== d || (d = 0), "any" !== e && "" !== e && void 0 !== e && "NaN" !== parseFloat(e) || (e = 1), jQuery(this).is(".plus") ? c && b >= c ? a.val(c) : a.val((b + parseFloat(e)).toFixed(e.getDecimals())) : d && b <= d ? a.val(d) : b > 0 && a.val((b - parseFloat(e)).toFixed(e.getDecimals())), a.trigger("change")
});
var productIsDeleted = false;
function deleteProduct(x){
    array.splice(array.indexOf(x),1);
    $(".checkoutItem"+x.id).remove();
    productIsDeleted = true;
}
var ischange = false ;
function checkIsChanged(){
  for(x of array){
      var newAmount = $("#inputQuantity"+x.id).val();
      if(parseInt(newAmount)!=parseInt(x.amount)){
          ischange=true;
          break;
      }
      else{
        ischange = false;
      }
    
  }
  if(ischange == true || productIsDeleted== true){
    //console.log("change");
    update();
  }
  else{
    //console.log("not change");
  }
}
function update(){
  if(ischange == true || productIsDeleted== true)
  {
    totalPrice = 0;
    
    //console.log(array);
    for(x of array){
          currentQuatity=$("#inputQuantity"+x.id).val();
          x.amount = currentQuatity;
          totalPrice = totalPrice + (parseInt(x.amount)*parseInt(x.price));
          
    }
    $("#totalPrice").text("Tổng số tiền :"+new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(parseInt(totalPrice)));
  }
  ischange = false;
  productIsDeleted = false;
}
function Pay(){
  checkIsChanged();
  if(ischange == true){
    update();
    //console.log("update");
  }
  else{
    let card = document.createElement('div');
    card.innerHTML = `
            <div class = "detailItem">
              <div class="row">
                <div class="col-xl-8 col-lg-8 col-md-5 col-sm-12">
                  <label for="fname">Họ và tên:</label>
                  <input type="text" class="form-control" placeholder="Họ và tên" id="fname">
                  <label for="sdt">Số điện thoại:</label>
                  <input type="text" class="form-control" placeholder="Số điện thoại" id="sdt">
                  <label for="address">Địa chỉ:</label>
					        <input type="text" class="form-control" placeholder="Địa chỉ (bao gồm tỉnh/thành quận/huyện Phường/ Xã)" id="address">
                  <a id="buy" href="#" class="btn btn-danger" onclick="Buy()" 
                  style="margin-top: 20px; margin-bottom: 20px;">ĐẶT HÀNG</a>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-7 col-sm-12">
                    <div class="alert alert-danger">
                        <strong>Chú ý!</strong> Vuy lòng kiểm tra <strong>số lượng mặc hàng và tổng số tiền</strong>trước khi đặt hàng<br>
                        chú ý điện thoại để chúng tôi sẽ liên lạc để xác nhận đơn hàng
                    </div>
                    <div class="alert alert-warning">
                        Hiện tại chỉ có thanh toán bằng tiền mặc khi nhận hàng và phương thức giao hàng COD
                    </div>
                </div>
              </div>
            </div>
              `;
      $(".detail").append(card);
    modal.style.display = "block";
  }
}
span.onclick = function() {
  $(".detailItem").remove();
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    $(".detailItem").remove();
    modal.style.display = "none";
  }
}