let articles = [];

let article = {};

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

    articles.forEach(item => {
            
            content += `
            <article class="col">
                    <div class="card">
                        
                        <div class="card-body">
                            
                            <div class="d-flex align-items-start">
                                <h5>${item.name}</h5>
                                <span class="badge ms-auto bg-dark">En stock: ${item.stock}</span>
                            </div>

                            <div class="col-12 text-end">
                                <button type="button" class="btn btn-danger"><i class="bi bi-trash"></i></button>
                                <button type="button" class="btn btn-primary"><i class="bi bi-pencil"></i></button>
                                <button type="button" class="btn btn-primary"><i class="bi bi-bookmark"></i></button>
                                <button type="button" class="btn btn-primary"><i class="bi bi-plus-lg"></i></button>
                            </div>
                        
                        </div>
                    </div>
                </article>
        
        `;
        }
    );
    container.innerHTML = content;
}

(async () => {
    await findArticles();
    builGrid();
})();

document.getElementById('formCreate').addEventListener('submit', event => {

    let formCreate = document.getElementById('formCreate');
    formCreate.classList.add('was-')



    form.classList().add
    if(form.isValid()){
        console.log('registrado')
    } else {
        event.preventDefault();
    }
})

