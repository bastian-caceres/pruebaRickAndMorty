import DetallesPersonajes from './detallesPersonajes.js';

// console.log(DetallesPersonajes);

let llamadoPersonajes = (()=>{
    let url_base = "https://rickandmortyapi.com/api/character";
    let mostrar = document.getElementById('resultados');
    let datosTotales;
    let contadorPersonajes = 0;

    // funcion privada y global (reutilizable)
    let getPersonajes = async (url) => {
        try {
            let respuesta = await fetch(url);
            datosTotales = await respuesta.json();
            return datosTotales;
        } catch (error) {   
            console.error(error);
        }
    }  

    // segunda funcion privada y global (reutilizable)
    let personajeID = async (id) => {
        try {
            let infoPersonaje = await getPersonajes(`${url_base}/${id}`);
            let usuarios = new DetallesPersonajes(infoPersonaje.id, infoPersonaje.name, infoPersonaje.species, infoPersonaje.gender, infoPersonaje.origin);
            document.getElementById(`detallePersonaje-${infoPersonaje.id}`).innerHTML = usuarios.infoGeneral();
            
            // return usuarios;
        } catch (error) {   
            console.error(error);
        }
    }

    // inserta en el html las imagenes
    let mostrarTodoslosPersonajes = (e) =>{
        mostrar.innerHTML += `
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4" >
                <div class="bloque">
                    <img src="${e.image}" type="button" data-toggle="modal" data-target="#exampleModal${e.id}" alt="${e.name}"></img>
                    <div id="detallePersonaje-${e.id}" class="d-inline-block"> 
                        ${personajeID(e.id)};
                    </div>
                </div>
            </div>
        `;   
    }

    let mostrarModal = (e) =>{
        mostrar.innerHTML += `
        <div class="modal fade" id="exampleModal${e.id}" tabindex="-1" aria-labelledby="exampleModalLabel${e.id}" aria-hidden="true">
            <div id="modal" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${e.name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    <ul>
                        <li>Id: ${e.id}</li>
                        <li>Nombre: ${e.name}</li>
                        <li>Género: ${e.gender}</li>
                        <li>Especie: ${e.species}</li>
                        <li>Origen: ${e.origin.name}</li>
                    </ul>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>            
            </div>
        </div>
        `;   
    }
    
    return {
        mostrarPersonajes: async () => {
            let dataPersonajes = await getPersonajes(`${url_base}`);
            dataPersonajes.results.forEach((e,i) => {

            if (i < 20) {
                contadorPersonajes++;
                mostrarTodoslosPersonajes(e);
            }
                mostrarModal(e)
            });            
        },
        // funcion publica
        eliminarSpiner: () => {
            let spiner = document.querySelector('.spinner-border');
            spiner.style.display = "none";
            cantidadPersonajes.innerHTML = `${contadorPersonajes}`;
        }
    }
})();

llamadoPersonajes.mostrarPersonajes();
setTimeout(()=>{
    llamadoPersonajes.eliminarSpiner();
},3000);   