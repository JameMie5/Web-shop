var product = [{
    id: 1,
    img: './imgs/j1.jpeg',
    name: 'หัวม้าแดง',
    price: 1500,
    description: '',
    type: 'fertilizerbig'
}, {
    id: 2,
    img: './imgs/j2.jpeg',
    name: 'ตรากระต่าย',
    price: 1500,
    description: '',
    type: 'fertilizerbig'
}, {
    id: 3,
    img: './imgs/j3.png',
    name: 'อาคาเฟริท',
    price: 2500,
    description: '',
    type: 'fertilizerbig'
}, {
    id: 4,
    img: './imgs/j4.jpeg',
    name: 'แพลนเตอร์',
    price: 1500,
    description: '',
    type: 'herbicide'
}, {
    id: 5,
    img: './imgs/j5.png',
    name: 'ปลานิลทอง',
    price: 2500,
    description: '',
    type: 'herbicide'
}, {
    id: 6,
    img: './imgs/j6.jpeg',
    name: 'Bayer',
    price: 2500,
    description: '',
    type: 'herbicide'
}, {
    id: 7,
    img: './imgs/j7.jpeg',
    name: 'ปุ๋ยอินทรี',
    price: 250,
    description: '',
    type: 'fertilizersmall'
}, {
    id: 8,
    img: './imgs/j8.jpeg',
    name: 'ปุ๋ยเคมี',
    price: 200,
    description: '',
    type: 'fertilizersmall'
}];

$(document).ready(() => {
    var html = '';
    for (let i = 0; i < product.length; i++) {
        html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type}">
                    <img class="product-img" src="${product[i].img}" alt="">
                    <p style="font-size: 1.2vw;">${product[i].name}</p>
                    <p stlye="font-size: 1vw;">${ numberWithCommas(product[i].price) } THB</p>
                </div>`;
    }
    $("#productlist").html(html);
})
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
function searchsomething(elem) {
    // console.log('#'+elem.id)
    var value = $('#'+elem.id).val()
    console.log(value)

    var html = '';
    for (let i = 0; i < product.length; i++) {
        if( product[i].name.includes(value) ) {
            html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type}">
                    <img class="product-img" src="${product[i].img}" alt="">
                    <p style="font-size: 1.2vw;">${product[i].name}</p>
                    <p stlye="font-size: 1vw;">${ numberWithCommas(product[i].price) } THB</p>
                </div>`;
        }
    }
    if(html == '') {
        $("#productlist").html(`<p>Not found product</p>`);
    } else {
        $("#productlist").html(html);
    }

}
function searchproduct(param) {
    console.log(param)
    $(".product-items").css('display', 'none')
    if(param == 'all') {
        $(".product-items").css('display', 'block')
    }
    else {
        $("."+param).css('display', 'block')
    }
}
var productindex = 0;
function openProductDetail(index) {
    productindex = index;
    console.log(productindex)
    $("#modalDesc").css('display', 'flex')
    $("#mdd-img").attr('src', product[index].img);
    $("#mdd-name").text(product[index].name)
    $("#mdd-price").text( numberWithCommas(product[index].price) + 'THB')
    $("#mdd-desc").text(product[index].description)
}

function closeModal() {
    $(".modal").css('display','none')
}
var cart = [];
function addtocart() {
    var pass = true;

    for (let i = 0; i < cart.length; i++) {
        if( productindex == cart[i].index ) {
            console.log('found same product')
            cart[i].count++;
            pass = false;
        }
    }
    if(pass) {
        var obj = {
            index: productindex,
            id: product[productindex].id,
            name: product[productindex].name,
            price: product[productindex].price,
            img: product[productindex].img,
            count: 1
        };
        // console.log(obj)
        cart.push(obj)
    }
    console.log(cart)
    Swal.fire({
        icon: 'success',
        title: 'Add ' + product[productindex].name + ' to cart !'
    })
    $("#cartcount").css('display','flex').text(cart.length)

}
function openCart() {
    $('#modalCart').css('display','flex')
    rendercart();
}
function rendercart() {
    if(cart.length > 0) {
        var html = '';
        for (let i = 0; i < cart.length; i++) {
            html += `<div class="cartlist-items">
                        <div class="cartlist-left">
                            <img src="${cart[i].img}" alt="">
                            <div class="cartlist-detail">
                                <p style="font-size: 1.5vw;">${cart[i].name}</p>
                                <p style="font-size: 1.2vw;">${ numberWithCommas(cart[i].price * cart[i].count) } THB</p>
                            </div>
                        </div>
                        <div class="cartlist-right">
                            <p onclick="deinitems('-', ${i})" class="btnc">-</p>
                            <p id="countitems${i}" style="margin: 0 20px;">${cart[i].count}</p>
                            <p onclick="deinitems('+', ${i})" class="btnc">+</p>
                        </div>
                    </div>`;
        }
        $("#mycart").html(html)
    }
    else {
        $("#mycart").html(`<p>Not found product list</p>`)
    }
}
function deinitems(action, index) {
    if(action == '-') {
        if(cart[index].count > 0) {
            cart[index].count--;
            $("#countitems"+index).text(cart[index].count)

            if(cart[index].count <= 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Are you sure to delete?',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel'
                }).then((res) => {
                  if(res.isConfirmed) {
                     cart.splice(index, 1) 
                     console.log(cart)
                     rendercart();
                     $("#cartcount").css('display','flex').text(cart.length)
                     
                     if(cart.length <= 0) {
                        $("#cartcount").css('display','none')
                     }
                  }  
                  else {
                    cart[index].count++;
                    $("#countitems"+index).text(cart[index].count)
                    
                  }
                })
            }
           
        }
        
    }
    else if(action == '+') {
        cart[index].count++;
       
    }
}