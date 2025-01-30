let articles = [];


const createCopy = data => {
    return JSON.parse(JSON.stringify(data));
}

const findArticles = async () =>{
    let storage = JSON.parse(localStorage.getItem('list'));

    if (!storage) {
        await fetch('http://localhost:63342/isaac5B/ApuntesQuinto/bootstrap/json/article.json',{
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            res.forEach((article, index) => {
                article.id = index + 1;
            });
            localStorage.setItem('list', JSON.stringify(res))
            articles = JSON.parse(localStorage.getItem('list'))
        }).catch(console.log);
    } else {
        articles = createCopy(storage)
    }
}

const builGrid = () => {
    let container = document.getElementById('articles');
    let content = '';
    let categories = '';

    articles.forEach(item => {
            item.categories.forEach(c => {
                categories += `<span class="badge bg-dark"><small>${c}</small></span> `
            });
            content += `
        <article class="col">
                    <div class="card shadow border-0 h-100">
                        <img src="${item.imgURL}"
                            style="width: 100%; height: 100%; object-fit: cover" class="card-img-top mx-auto" alt="...">
                        <div class="card-body">
                            <p class="mb-0"><span class="fs-1">${item.price}</span>MXN</p>
                            <div class="mb-2">${categories}
                            </div>
                            <h5>${item.name}</h5>
                            <div class="mb-4">
                                ${loadRating(item.rating)}
                                <a class="ms-2" href="">${item.comments}<i class="bi bi-chevron-down"></i></a>
                            </div>
                            <div>
                                <button type="button" class="btn btn-outline-primary col-12 mb-2">Agregar al
                                    carrito</button>
                                <button type="button" class="btn btn-primary col-12">Comprar ahora</button>
                            </div>
                        </div>
                    </div>
                </article>
        `;
            categories = '';
        }
    );
    container.innerHTML = content;
}

const loadRating = rating => {
    let aux = 5 - rating;
    let content = '';

    for (let i = 0; i < rating; i++) {
        content += `<i class="bi bi-star-fill text-warning fs-3"></i> `;
    }

    for (let i = 0; i < aux; i++) {
        content += `<i class="bi bi-star text-warning fs-3"></i> `;
    }

    return content;
}

(async() =>{
    await findArticles();
    builGrid();
}) ();
