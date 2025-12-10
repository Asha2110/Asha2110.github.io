//data structure for products - replace ids an prices with yours or generate dynamically
let products = [
    //id: {name, weight, price}
    {name:"RagiMurukku", weight:"250g",price:90},
    {name:"RagiMurukku",weight:"500g",price:170},
    {name:"RagiMurukku",weight:"1kg",price:330},

    {name:"AvalakkiMixture", weight:"250g",price:80},
    {name:"AvalakkiMixture", weight:"500g",price:160},
    {name:"AvalakkiMixture", weight:"1kg",price:310},

    {name:"Nippattu", weight:"250g",price:100},
    {name:"Nippattu", weight:"500g",price:180},
    {name:"Nippattu", weight:"1kg",price:350},
    
    {name:"Chakli", weight:"250g",price:110},
    {name:"Chakli", weight:"500g",price:190},
    {name:"Chakli", weight:"1kg",price:350},
    // add all items...
];
let cart =[];

function increaseQty(name,weight,price){
    price = Number(price);

    let item = cart.find(item => item.name === name && item.weight === weight);
    if (item){
        item.quantity++;
    } else {
        cart.push({
            name:name,
            weight:weight,
            price:price,
            quantity:1
        });
    }
    updateQtyOnPage(name,weight);
    updateCart();
}

function decreaseQty(name,weight,price){
    let item = cart.find(item=> item.name === name && item.weight === weight);
    if (item) {
        item.quantity--;

        if(item.quantity<=0){
            cart = cart.filter(item => !(item.name === name && item.weight === weight));
        }
    }
    updateQtyOnPage(name,weight);
    updateCart();
}

function updateQtyOnPage(name,weight){
    let item = cart.find(item => item.name === name && item.weight ===weight);
    let span = document.getElementById(`qty-${name}-${weight}`);
    if (span) {
        span.innerText = item ? item.quantity : 0;
    }
}

const cartPanel = document.getElementById("cartPanel");
const cartItemsDiv = document.getElementById("cartItems");
const emptyMsg = document.getElementById("emptyMsg");
function updateCartMessage(){
    if (cartItemsDiv.children.length===0){
        emptyMsg.style.display="block";
    } else{
        emptyMsg.style.display="none"
    }
}

function updateCart(){
    let cartItemsDiv = document.getElementById("cartItems");
    let countSpan = document.getElementById("header-cart-count");
    let cartCount = document.getElementById("cart-count");
    let totalSpan = document.getElementById("header-cart-total");
    let emptyMsg = document.getElementById("emptyMsg");

    cartItemsDiv.innerHTML = "";
    let total = 0;
    let totalItems = 0;

    //If cart is empty
    if(cart.length === 0){
        emptyMsg.style.display="block";
        countSpan.innerText=0;
        totalSpan.innerText=0;
        totalCount.innerText=0;
        cartCount.innerText=0;
        return;   
    }
    emptyMsg.style.display="none";

    cart.forEach((item)=> {
        let div = document.createElement("div");

        div.style.marginBottom = "10px";
        div.style.padding = "8px";
        div.style.borderBottom="1px solid #ddd"

        div.innerHTML = `${item.name} - ${item.weight} - ${item.price} x ${item.quantity}
        <div class="cart-qty-box">
        <button onclick="decreaseQty('${item.name}','${item.weight}',${item.price})">-</button>
        <button onclick="increaseQty('${item.name}','${item.weight}',${item.price})">+</button></div>`;

        cartItemsDiv.appendChild(div);
        total += Number(item.price)*item.quantity;
        totalItems +=item.quantity;
    });
    totalSpan.innerText = total;
    countSpan.innerText = totalItems;

    document.getElementById("header-cart-count").innerText = totalItems;
    document.getElementById("cart-count").innerText = totalItems;
    document.getElementById("header-cart-total").innerText = total;
   

}


function openCart(){
    document.getElementById("cartPanel").style.bottom="0";
    document.body.style.overflow="hidden";
    updateCart();

}
function closeCart(){
    document.getElementById("cartPanel").classList.remove("active");
    document.getElementById("cartPanel").style.bottom = "-100vh";
    document.body.style.overflow = "auto";

}

function placeOrder(){

    let name = document.getElementById("customerName").value.trim();
    let phone = document.getElementById("customerPhone").value.trim();
    let address = document.getElementById("customerAddress").value.trim();

    if(name ==="" || phone ==="" || address ===""){
        alert("Fill all the details");
        return;
    }

    if(phone.length !==10 || isNaN(phone)){
        alert("Enter valid 10-digit number");
        return;
    }

    let total=0;
    let totalItems=0;

    let message = "New Order - TindiKindi\n\n";
    message += `Name: ${name}\n Phone: ${phone}\n Address: ${address}\n\nItems:\n`;

    cart.forEach(item =>{
        let itemTotal = Number(item.price)*Number(item.quantity);
        total += itemTotal; 
        totalItems += item.quantity;

        message += `${item.name} (${item.weight}) x ${item.quantity} = ₹${itemTotal}\n`
    });
    message +=`\nNo. of Items = ${totalItems}`;
    message += `\nTotal Amount = ₹${total}`;

    let whatsappURL = "https://wa.me/918970699527?text="+encodeURIComponent(message);
    window.open(whatsappURL,"_blank");

}
 