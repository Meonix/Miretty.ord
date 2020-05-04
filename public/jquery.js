
$( document ).ready(
  function() {
    var database = firebase.database();
    database.ref('merchandise').on("value",function(snap){
        snap.forEach(function(childSnapshot) {
                
                var childData = childSnapshot.val();
                //console.log(childSnapshot.val().linkPhoto);
                
      
            let card = document.createElement('div');
            card.className = "col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6";
            card.innerHTML = `
            <div class="cell"  onclick="showDetail('${String(childData.linkPhoto)}',
            '${String(childData.nameProduct)}','${String(childData.id)}','${String(childData.price)}','${String(childData.description)}')">
              <div class="infor" style= " width : 100%; height :100%;">
                <img src="${String(childData.linkPhoto)}" />
                <h5 style="white-space: nowrap; overflow: hidden;">${String(childData.nameProduct)}</h5>
                <p style="white-space: nowrap; overflow: hidden;" >Loại Sản Phẩm :${String(childData.productType)}</p>
                <p>id :${String(childData.id)} <br>Giá :${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(parseInt(childData.price))} </p>
                <a href="#" id="buy" class="btn btn-danger" >XEM CHI TIẾT</a>
              </div>
            `;
                
      $(".sell").append(card);
  
    
     
          });
        
        
    });
    
    
   
}

);

var a = 1;
// Get the modal
var modal = document.getElementById("storageModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var arrayProduct = [];
class Product {
  constructor(nameProduct,price,amount,linkPhoto,id) {
    this.nameProduct = nameProduct;
    this.price = price;
    this.amount = amount;
    this.linkPhoto = linkPhoto;
    this.id = id;
  }
  setAmount(amount){
    this.amount = amount;
  }

}
var pd;
var currentQuatity=0;
var amount = 0;
var totalProduct = 0;
function showDetail(linkPhoto,nameProduct,id,price,description){
  let card = document.createElement('div');
  card.innerHTML = `
          <div class = "detailItem">
            <div class="row">
              <div class="col-xl-2 ">
                <div class="cell"">
                  <div class="infor">
                  <img src="${linkPhoto}" style="width : 100%; height :100%;"/>
                  </div>
                </div>
              </div>
              <div class="col-xl-7">
                <h5>${nameProduct}</h5>
                <p>id :${id} <br>Giá :${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(parseInt(price))} </p>
                <div class="quantity buttons_added">
                      <input type="button" value="-" class="minus">
                      <input type="number"id="inputQuantity" step="1" min="1" max="" name="quantity" value="1" title="Qty" class="input-text qty text" size="4" pattern="" inputmode="">
                      <input type="button" value="+" class="plus">
                </div>
                <p>Mô tả :<br>${description}</p>
                <div class="alert alert-danger alert-dismissible fade show" id="duplicate">
                  Vật phẩm <strong>Đã có trong giỏ hàng</strong> vui lòng điều chỉnh số lượng ở giỏ hàng.
                </div>
                <a href="#" class="btn btn-danger" onclick="Purchase('${nameProduct}','${price}',changeCurrentQuantity(),'${linkPhoto}','${id}')">THÊM VÀO GIỎ</a>
              </div>
            </div>
          </div>
            `;
            $(".detail").append(card);
  modal.style.display = "block";
  $("#duplicate").css("display",'none');
}
function changeCurrentQuantity(){
  currentQuatity=$("#inputQuantity").val();
  return currentQuatity;
}
function Purchase(nameProduct,price,amount,linkPhoto,id){
    pd = new Product(nameProduct,price,amount,linkPhoto,id);
    var quantity = 0;
    var tmp = false;
    if(arrayProduct.length==0){
        arrayProduct.push(pd);
    }
    else{
      for(x of arrayProduct){
        if(x.id == pd.id){
          tmp = true;
          $("#duplicate").css("display",'');
        }
        quantity= quantity + (parseInt(x.amount)*parseInt(x.price));
      }
      if(tmp == false){
        arrayProduct.push(pd);
      }
    }
    totalProduct = arrayProduct.length;
    $("#badgeStorage").text(totalProduct);
}
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
function saveCart(){
  window.localStorage.setItem("cart", JSON.stringify(arrayProduct));
}

span.onclick = function() {
  
  $(".detailItem").remove();
  currentQuatity = 0;
  amount = 0;
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    
    $(".detailItem").remove();
    amount = 0;
    currentQuatity = 0;
    modal.style.display = "none";
  }
}
