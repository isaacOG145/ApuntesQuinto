const findAll = () => { 
    // 1. Configuración
    fetch('https://pokeapi.co/api/v2/pokemon', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json"
        }
    })
    // 2. Transformación
    .then(response => response.json())
    // 3. Procesamiento
    .then(response => {
        console.log(response);
    })
    .catch(console.log);  
};

(() => {
    findAll();
})();
