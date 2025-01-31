let articles = [];
let article = {};

const createCopyOF = data => {
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
            localStorage.setItem('list', JSON.stringify(res));
            articles = JSON.parse(localStorage.getItem('list'));

        }).catch(console.log);
    } else {
        articles = createCopyOF(storage);
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
                                <span class="ms-auto badge bg-dark">${item.stock}</span>
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

(async() =>{
    await findArticles();
    builGrid();
})();

document.getElementById('registerModal').addEventListener('submit',event =>{

}).then(async result => {
    let form = document.getElementById('registerModal');
    form.classList.add('was-validated');
    if (form.checkValidity()) {
        Swal.fire({
            title: 'Confirmar registro',
            text: '¿Los datos estan correctos?',
            icon: 'question',
            showConfirmButton:true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
          }).then(result =>{
            if(result.isConfirmed){

                try{

                    articles.push({
                        id: article.length + 1,
                        name: document.getElementById('c-name').value,
                        price: document.getElementById('c-price').value,
                        stock: 0,
                        comments: 0,
                        categories:[],
                        imgURL: document.getElementById('c-imgURL').value
                    });

                    localStorage.removeItem('list');
                    localStorage.setItem('list', JSON.stringify(articles))

                    formCreate.reset();

                    bootstrap.Modal.getInstance(document.getElementById('registerModal').hide())

                    
                    //hacer el registro
                //cerrar modal y rastrearlo
                //Mostrar el mensaje de exito
                swal.fire({
                    title: 'Registro exitoso',
                     icon: 'success' 
                    }); 
                } catch (ex){
                    swal.fire({
                        title: 'Error',
                        text: ''
                    })
                }
                  
            }
          });

          await findArticles();
    }

    event.preventDefault();
})




document.getElementById('registerModal').addEventListener('reset', event =>{
    document.getElementById('registerModal').classList.remove('was-validated')
});