let articles = [];
let article = {};

const createCopyOf = data => JSON.parse(JSON.stringify(data));

const findArticles = async () => {
    let storage = JSON.parse(localStorage.getItem("list"));

    if (!storage) {
        await fetch("http://localhost:63342/p5/src/json/articles.json", {
            method: "GET",
            headers: {
                Accept: "applicaion/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                res.forEach((article, index) => {
                    article.id = index + 1;
                });
                console.log(articles);
                localStorage.setItem("list", JSON.stringify(res));
                articles = JSON.parse(localStorage.getItem("list"));
            })
            .catch(console.log());
    } else {
        articles = createCopyOf(storage);
    }
};
const buildGrid = () => {
    let container = document.getElementById("articles");
    let content = "";

    articles.forEach(item => {
        content += `<article class="col">
            <!-- cards -->
            <div class="card h-100 border-0 shadow-lg">
              <div class="card-body">
                    <div class="d-flex align-items-start">
                        <h5>${item.name}</h5>
                        <span class="ms-auto badge bg-dark">En stock: ${item.stock}</span>
                    </div>
                    <div class="col-12 text-end">
                        <button type="button" class="btn btn-danger"><i class="bi bi-trash"></i></button>
                        <button type="button" class="btn btn-primary"><i class="bi bi-pencil"></i></button>
                        <button type="button" class="btn btn-primary"><i class="bi bi-bookmark"></i></button>
                        <button type="button" class="btn btn-primary"><i class="bi bi-plus-lg"></i></button>
                    </div>
              </div>
            </div>
          </article>`;
    });

    container.innerHTML = content;
};


const loadRating = (rating) => {
    let aux = 5 - rating;
    let content = "";

    for (let i = 0; i < rating; i++) {
        content += '<i class="bi bi-star-fill text-warning fs-5"></i> '
    }
    for (let i = 0; i < aux; i++) {
        content += '<i class="bi bi-star text-warning fs-5"></i> '
    }
    return content;
};

(async () => {
    await findArticles();
    await buildGrid();
})();

document.getElementById("formCreate").addEventListener("submit", (event) => {
    let form = document.getElementById("formCreate");
    form.classList.add("was-validated");
    if (form.checkValidity()) {
        console.log("Registrado");
        Swal.fire({
            title: 'Confirmar registro!',
            text: '¿Los datos son correctos?',
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then(async result => {

            if (result.isConfirmed) {

                try {
                    articles.push({
                        id: articles.length + 1,
                        name: document.getElementById("c-name").value,
                        price: document.getElementById("c-price").value,
                        stock: 0,
                        rating: 0,
                        comments: 0,
                        categories: [],
                        imgURL: document.getElementById("c-imgURL").value
                    });
                    localStorage.removeItem("list");
                    localStorage.setItem("list", JSON.stringify(articles));

                    formCreate.reset();

                    bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();

                    Swal.fire({
                        title: 'Registro exitoso!',
                        icon: 'success',
                    })
                    await findArticles();
                    buildGrid();
                } catch (ex) {
                    console.log(ex)
                    Swal.fire({
                        title: 'Error!',
                        text: 'No se pudo realizar el registro!',
                        icon: 'error',
                    })
                }
            }
        });
    }
    event.preventDefault();
});

document.getElementById("formCreate").addEventListener("reset", event => {
    document.getElementById("formCreate").classList.remove("was-validated");
});