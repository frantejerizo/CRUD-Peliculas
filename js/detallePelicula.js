//extraer el parametro (id) de la url
const parametroURL = new URLSearchParams(window.location.search);
const id = parametroURL.get("id");
console.log(id);

//traer el catalogo del local storage con la palabra clave
const listaPeliculas = JSON.parse(localStorage.getItem("catalogoKey")) || []

//buscar la pelicula que tiene esa misma id
const peliculaAMostrar = listaPeliculas.find((pelicula) => pelicula.id === id)
console.log(peliculaAMostrar)

const tituloCard = document.querySelector(".card-title")

tituloCard.innerHTML = `<b>${peliculaAMostrar.titulo}</b>`


const cuerpoCard = document.getElementById("datosPelicula")

cuerpoCard.innerHTML =
                    `
                    <li><b>Descripcion:</b> ${peliculaAMostrar.descripcion}</li>
                    <li><b>Director:</b> ${peliculaAMostrar.director}</li>
                    <li><b>Año de Lanzamiento:</b> ${peliculaAMostrar.anio}</li>
                    <li><b>Genero:</b> ${peliculaAMostrar.genero}</li>
                    `

const imagenPelicula = document.getElementById("divImagenPelicula")

imagenPelicula.innerHTML = `<img src="${peliculaAMostrar.imagen}" class="rounded-start object-fit-cover w-100 h-100" alt="imagen de contacto">`

const breadCrumb = document.getElementById("breadCrumb")

breadCrumb.innerText = `${peliculaAMostrar.titulo}`