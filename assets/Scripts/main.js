const endpoint = "https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1"
let currentPage;




// Função que chama o endpoint e retorna objeto do endpoint.

    async function apiRequest(api) {
        let apiResponse = await fetch(api);
        let renderApi = await apiResponse.json();
        return renderApi
}
    
// Função que renderiza os primeiros itens na tela a partir da chamada da função de requisição ao endpoint e da função de mostrar itens, além de preparar o event handler para carregar mais itens em tela fazendo novas requisições.

    async function renderInitialItens(apiLink) {
        let apiResponse = await apiRequest(apiLink);
        let productsList = await apiResponse.products;
        showIten(productsList);
        currentPage = await apiResponse;
        const buttomShowMore = document.querySelector("[data-showmore-btn]");
        buttomShowMore.addEventListener("click", async function (event) {
           await showMoreItens(currentPage)
        });
}



// Função que renderiza os itens na tela através de um map da lista de produtos.

    function showIten(list) {
        const itensArea = document.querySelector(".iten__area");
        let itensList = list;
        itensList.map(element => itensArea.innerHTML += `<div class="iten__card"><img src="http:${element.image}" alt="${element.name}" class="iten__image"><div class="iten__detail"><h3 class="iten__title">${element.name}</h3><p class="iten__descrition">${element.description}</p><p class="iten__previous">De: R$${element.oldPrice.toFixed(2)}</p><h4 class="iten__price">Por: R$${element.price.toFixed(2)}</h4><p class="iten__quota">ou ${element.installments.count}x vezes de R$${element.installments.value.toFixed(2)}</p><button class="iten__btn btn">Comprar</button></div></div>`)
}

// Função que faz o fetch da próxima página do endpoint, faz o push dos itens na lista de produtos e chama novamente a função de renderizar os itens na tela.

    async function showMoreItens(api) {
        let nextPage = await api.nextPage;
        let newApiResponse = await fetch(`https://${nextPage}`);
        let newRenderApi = await newApiResponse.json();
        currentPage = await newRenderApi;
        let newItens = await newRenderApi.products;
        showIten(newItens);
}

renderInitialItens(endpoint);