// to retrieve all the cart items 
document.addEventListener('DOMContentLoaded',()=>{

    let addtocartBtn=document.querySelectorAll('.add-to-cart-btn')
    console.log(addtocartBtn)
    addtocartBtn.forEach((e)=>{
        console.log(e)
             console.log(e.target)
            e.addEventListener('click',()=>{
        let ProductInfo=e.parentNode.parentNode
        console.log(ProductInfo)
        let ProductName=ProductInfo.querySelector('.product-title').innerText
        let ProductPrice=ProductInfo.querySelector('.product-price').innerText
        let ProductImg=ProductInfo.querySelector('.product-img').src 
        console.log(ProductImg)
        console.log(ProductName)
        console.log(ProductPrice)
        let SelectedItems={
            name:ProductName,
            price:ProductPrice,
            imgUrl:ProductImg
        }

        // passing the selected item  as a parameter to addtocart function to push it into an empty array 
        AddToCart(SelectedItems)
    })



    })
})

// empty array to store the selected cart items 
const CartItems=[]  
console.log(CartItems)


// function to add items to cart 
function AddToCart(products){
    // console.log(products)
    let existingItems=CartItems.find((item)=>item.name === products.name)
    if(existingItems){
        existingItems.quantity++
    }else{
        CartItems.push({...products,quantity:1})   


    }

    // to update the cart page 
    UpdateCartUI()
    localStorage.setItem('CartItem',JSON.stringify(CartItems))

}





// // function to add items to cart 
// function AddToCart(){

// }

// function to update the cart UI 
function UpdateCartUI(){

    let CartItem=document.querySelector('.cart_items')   //ul elements
    CartItem.innerHTML=''
    // console.log(CartItem) 
    // printing the added array elements in the cart 
    CartItems.forEach((item)=>{
        console.log(item) //object data --to acess we are giving dot notation
        // step-1 
        let Cartprod=document.createElement('li')
        // this section is used to print the all product details in the cart 
        // along with increase/decrease and remove functionality 
        Cartprod.innerHTML=`
        <div class="product">
        <img src=${item.imgUrl} class="product-img" />
        <div class="product-info">
          <h4 class="product-title">${item.name}</h4>
          <p class="product-price">${item.price}</p>
        <span>Quantity:${item.quantity}</span>
        <div class="quantityicon">
          <button class="IncreaseQuan">+</button>
          <span class='quantity-val'>${item.quantity}</span>
          <button class="DecreaseQua">-</button>
        </div>
        </div>
        <button class="remove-Quantity">remove</button>


      </div>`
    //   step2 
  

    // accessing the increase and decrease and remove buttons along with quantity value 
    const QunatityConEle=Cartprod.querySelector('.quantityicon')
    const increaseQuaEle=QunatityConEle.querySelector('.IncreaseQuan')
    const DecreaseQuaEle=QunatityConEle.querySelector('.DecreaseQua')
    const RemoveQuantityEle=Cartprod.querySelector('.remove-Quantity')
    const QuantityValEle=Cartprod.querySelector('.quantity-val')

    // step3 
    // adding functionality for increase/decrease/remove nuttons through  addEventListener 

    // adding  addEventListener to increase quantity 
    increaseQuaEle.addEventListener('click',()=>{
        HandleIncQuantity(item,QuantityValEle)
    })

    // adding  addEventListener to decrease quantity 

    DecreaseQuaEle.addEventListener('click',()=>{
        HandleDecreQuantity(item,QuantityValEle)
    })

    // adding  addEventListener to remove quantity 

    RemoveQuantityEle.addEventListener('click',()=>{

        RemoveItem(item)
    })



    // append the li child to ul list 
    CartItem.appendChild(Cartprod)

    })

}


// function to increase the quantity --handleincreasequantity  inside cart function 
function HandleIncQuantity(item,QuantityValEle){
    item.quantity++
    QuantityValEle.textContent=item.quantity  //or QuantityValEle.innertext=item.quantity
    // calling the UpdateCartUI() to update the quantities in the UI 
    UpdateCartUI()
    UpdateCartTotal()
    UpdateCartIcon()

}


// function to decrease the quantity inside cart function 
function HandleDecreQuantity(item,QuantityValEle){
    if(item.quantity>1){
        item.quantity--
        QuantityValEle.textContent=item.quantity

    }
    // calling the UpdateCartUI() to update the quantities in the UI 
    UpdateCartUI()
    UpdateCartTotal()
    UpdateCartIcon()


}

function RemoveItem(item){
    const index=CartItems.findIndex((product)=>product.name === item.name)
    if(index !==-1){
        if(CartItems[index].quantity>1){
            CartItems[index].quantity-- 
        }else{
            CartItems.splice(index,1)
        }

    }
     // calling the UpdateCartUI() to update the quantities in the UI 
     UpdateCartUI()
     UpdateCartTotal()
     UpdateCartIcon()

}


// function to update cart total 
function UpdateCartTotal(){
    const cartTotalcontEle=document.querySelector('#cart-total')
    const cartTotal=CartItems.reduce((total,item)=>total+item.price * item.quantity,0)
    cartTotalcontEle.textContent=cartTotal

}

// function to increase cart icon value 
function UpdateCartIcon(){
    const CartIconTotal=document.querySelector('#cart-icon')
    const CartIconVal=CartItems.reduce((total,item)=>total+item.quantity,0)
    CartIconTotal.textContent=CartIconVal


}


// function to remove allitems in the cart
function Removeall(){
    CartItems.splice(0)
    localStorage.clear()
    UpdateCartUI()

}
// function to load all the cartitems into the UI 
function LoadCartUi(){
    const StoredItems=localStorage.getItem('cartitem')
    if(StoredItems){
        CartItems.push(...JSON.parse(StoredItems))
        UpdateCartIcon()
        UpdateCartTotal()
        UpdateCartUI()
        // Removeall()

    }
}
// to load when browser is opened 
LoadCartUi()


