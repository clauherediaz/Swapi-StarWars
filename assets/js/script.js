async function getData2(idPersonaje) {

    try {
        let response = await fetch("https://swapi.dev/api/people/" + idPersonaje);

        if (!response.ok) {
            if (response.status === 404) {
                alert("Personaje no encontrado");
                throw new Error('Recurso no encontrado')
            } else {
                throw new Error('Error en petición HTTP ' + response.status)
            }
        }

        const data = await response.json(); //promise
        injectInfo(data);

    } catch (error) {
        console.log(error);
    }
}

getData2(2);

function injectInfo(character) {
    console.log(character);
    const { name, image, height, mass, hair_color, skin_color, eye_color, birth_year, gender } = character;
    let infoHtml = `<div class="card">
                        <h2 class="text-center">${name}</h2>
                        <div class="card-body">
                          <p class="card-text">Altura: ${height}</p>
                          <p class="card-text">Masa: ${mass}</p>
                          <p class="card-text">Color de Pelo: ${hair_color}</p>
                          <p class="card-text">Color de Piel: ${skin_color}</p>
                          <p class="card-text">Color ojos: ${eye_color}</p>
                          <p class="card-text">Cumpleaños: ${birth_year}</p>
                          <p class="card-text">Genero: ${gender}</p>
                        </div>
                    </div>`

    document.getElementById('character-info').innerHTML = infoHtml;
}


document.querySelector('form').addEventListener("submit", function(event) {
    event.preventDefault();

    let input = document.getElementById('search_input'); //elemento html
    let input_value = input.value; //value del input

    if (Number(input_value)) {
        getData2(input_value);
    } else {
        //algo malo paso
        alert('El id buscado debe ser numero');
    }

    input.value = "";

})