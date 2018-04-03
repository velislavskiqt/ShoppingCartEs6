let gitUserUrl = 'https://raw.githubusercontent.com/ProgressBG-WWW-Courses/JavaScript-Advanced/gh-pages/downloads/products.json';
let data = [];
let mainBox = $('#mainDiv');
let list = $('#cartProducts');
let totalSum = $('#totalSum');
let totalSumTax = $('#totalSumTax');
let totalPrice = 0;
$(() => { getAjax(); });


function render() {
    data.forEach(function (element, index) {
        mainBox.append($(`<div class="product">
        <div>
            <img src="${element.image.small}" alt="">
				</div>
            <h3 id="product-title">${element.name} </h3>
            <label>${element.price}</label>
            <i>$</i>
            <div>
                <button type="button" data-price="${element.price}" data-name="${element.name}" class="active">BUY</button>
            </div>
        </div>`));
    }, this);
    activate();
}

function getAjax() {
    $.get(gitUserUrl, (response) => {
        data = JSON.parse(response);
        render();
    });
}
function activate() {
    $('.active').click(function () {
        let price = $(this).data('price');
        let name = $(this).data('name');
        $(this).parents('.product').css("opacity", "0.4");
        onBuy(name, price);
    });
}

function onBuy(name, price) {
    list.append($(`<p><span>${name}  ${price} $</span></p>`));
    totalPrice += price;
    totalPriceWithout = totalPrice - (totalPrice / 5);
    totalSum.html(`NO TAX : ${totalPriceWithout} $`);
    totalSumTax.html(`TOTAL : ${totalPrice} $`);
}