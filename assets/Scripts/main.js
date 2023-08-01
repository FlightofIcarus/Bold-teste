const endpoint = "https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1"

async function apiRequest(api) {
    let apiResponse = await fetch(api);
    let renderApi = await apiResponse.json();
    showIten(renderApi.products)
    console.log(renderApi.products);
    return console.log(renderApi);
}

function showIten(itensList) {
    const itensArea = document.querySelector(".iten__area");

    itensList.map(element => itensArea.innerHTML += `<div class="iten__card first"><img src="http:${element.image}" alt="${element.name}" class="iten__image"><div class="iten__detail"><h3 class="iten__title">${element.name}</h3><p class="iten__descrition">${element.description}</p>        <p class="iten__previous">De: R$${element.oldPrice.toFixed(2)}</p><h4 class="iten__price">Por: R$${element.price.toFixed(2)}</h4><p class="iten__quota">ou ${element.installments.count}x vezes de R$${element.installments.value.toFixed(2)}</p><button class="iten__btn btn">Comprar</button></div></div>`)

    // itensArea.innerHTML += `<div class="iten__card first"><img src="http:${itensList[0].image}" alt="exemplo-item" class="iten__image"><div class="iten__detail"><h3 class="iten__title">${itensList[0].name}</h3><p class="iten__descrition">descrição</p>        <p class="iten__previous">R$${itensList[0].oldPrice}</p><h4 class="iten__price">R$${itensList[0].price}</h4><p class="iten__quota">ou ${itensList[0].installments.count}x vezes de R$${itensList[0].installments.value}</p><button class="iten__btn btn">Comprar</button></div></div>`
}

apiRequest(endpoint);