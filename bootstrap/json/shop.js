let articles = [];

const findArticles = async () => {
    try {
        const response = await fetch('http://localhost:63342/isaac5B/ApuntesQuinto/bootstrap/json/article.json', {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        articles = JSON.parse(JSON.stringify(data));
        articles.forEach((article, index) => {
            article.id = index + 1;
        });
        buildGrid();
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
}

const buildGrid = () => {
    let container = document.getElementById('articles');
    let content = '';

    articles.forEach(item => {
        let categories = '';
        item.categories.forEach(c => {
            categories += `<span class="badge bg-dark">${c}</span> `;
        });

        content += `<article class="col">
                    <div class="card">
                        <div class="card-body">
                            <div style="height: 250px;" class="text-center">
                              <img src="${item.imgURL}" style="width: 100%; height: 100%; object-fit: cover;" alt="...">
                            </div>
                            <p>
                                <span class="fs-2">$${item.price}</span> MXN
                            </p>
                            <div class="mb-2">${categories}
                            
                            </div>
                            <h5>${item.name}</h5>
                            <div class="mb-4">
                                ${loadRating(item.rating)}
                                <a href="" class="ms-2">${item.comments} <i class="bi bi-chevron-down"></i></a>
                            </div>
                            <div>
                                <button type="button" class="btn btn-outline-primary col-12 mb-2">Agregar al carrito</button>
                                <button type="button" class="btn btn-primary col-12">Comprar ahora</button>
                            </div>
                        </div>
                    </div>
                </article>`;
    });

    container.innerHTML = content; 
}


const loadRating = rating => {

    let aux = 5 - rating;
    let content = ``; 

    for(let i = 0; i < rating; i++){
        content += `<i class="bi bi-star-fill text-warning fs-3"></i> `;
    }

    for(let i = 0; i < aux; i++){
        content += `<i class="bi bi-star text-warning fs-3"></i> `;
    }

    return content;
}

(async () => {
    await findArticles();
})();