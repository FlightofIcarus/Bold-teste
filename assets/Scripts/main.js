const endpoint = "https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1"





// Função que chama o endpoint e retorna a lista de itens do endpoint, além de chamar a função que renderiza os itens na tela.

async function apiRequest(api) {
    let apiResponse = await fetch(api);
    let renderApi = await apiResponse.json();
    let productsList = renderApi.products;
    showIten(productsList);
    let nextPage = renderApi.nextPage;
    // console.log(nextPage);
    const buttomShowMore = document.querySelector("[data-showmore-btn]");
    buttomShowMore.addEventListener("click", event => showMoreItens(productsList, nextPage));
}

// Função que renderiza os itens na tela através de um map da lista de produtos.

function showIten(itensList) {
    const itensArea = document.querySelector(".iten__area");

    itensList.map(element => itensArea.innerHTML += `<div class="iten__card first"><img src="http:${element.image}" alt="${element.name}" class="iten__image"><div class="iten__detail"><h3 class="iten__title">${element.name}</h3><p class="iten__descrition">${element.description}</p>        <p class="iten__previous">De: R$${element.oldPrice.toFixed(2)}</p><h4 class="iten__price">Por: R$${element.price.toFixed(2)}</h4><p class="iten__quota">ou ${element.installments.count}x vezes de R$${element.installments.value.toFixed(2)}</p><button class="iten__btn btn">Comprar</button></div></div>`)
}

// Função que faz o fetch da próxima página do endpoint, faz o push dos itens na lista de produtos e chama novamente a função de renderizar os itens na tela.

async function showMoreItens(itensList, newEndpoint) {
    let newApiResponse = await fetch(`http://${newEndpoint}`);
    let newRenderApi = await newApiResponse.json();
    let newItens = await newRenderApi.products;
    await itensList.push(...newItens);
    showIten(itensList)
}

apiRequest(endpoint);