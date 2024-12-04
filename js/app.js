import Pelicula from "./classPelicula.js";
import {validarCaracteres, validarNumero} from "./validaciones.js"

const modalPeliculas = new bootstrap.Modal(document.getElementById("modalAgregarPelicula"))
const btnAgregar = document.querySelector(".btn-primary")
const form = document.getElementById("peliculasForm")
const tituloModal = document.getElementById("modalAgregarPeliculaLabel")
const titulo = document.getElementById("titulo")
const descripcion = document.getElementById("descripcion")
const director = document.getElementById("director")
const anio = document.getElementById("anio")
const genero = document.getElementById("genero")
const imagen = document.getElementById("imagen")
const listaPeliculas = JSON.parse(localStorage.getItem("catalogoKey")) || []

let booleanoCrearEditar
let pos

function abrirModalPeliculas()
{
    limpiarForm()
    tituloModal.innerText = "Agregar Pelicula"
    booleanoCrearEditar = true
    modalPeliculas.show()
}

function limpiarForm()
{
    form.reset()

    titulo.className = 'form-control'
    descripcion.className = 'form-control'
    director.className = 'form-control'
    anio.className = 'form-control'
    genero.className = 'form-control'
    imagen.className = 'form-control'
}

function agregarPelicula(e)
{
    e.preventDefault()
    if(booleanoCrearEditar === true)
    {
        if(validarCaracteres(titulo,2,50) && validarCaracteres(descripcion,20,400) && validarCaracteres(director,2,50) && validarNumero(anio,1895,2024) && validarCaracteres(genero,2,50) && validarURL(imagen))
        {
            const nuevaPelicula = new Pelicula(titulo.value,descripcion.value,director.value,anio.value,genero.value,imagen.value)

            listaPeliculas.push(nuevaPelicula)
            console.log(listaPeliculas)

            guardarEnLocalStorage()

            limpiarForm()

            dibujarPelicula(nuevaPelicula)

            Swal.fire({
                title: "Muy bien!",
                text: "Se agregó la pelicula",
                icon: "success"
            });
        }
        else
        {
            Swal.fire({
                title: "erroneo",
                text: "Ingresaste mal algun dato, revisa nuevamente",
                icon: "error"
            });
        }
    }
    else
    {
        const nuevaPelicula = new Pelicula(titulo.value,descripcion.value,director.value,anio.value,genero.value,imagen.value)

        listaPeliculas[pos] = nuevaPelicula

        guardarEnLocalStorage()

        modalPeliculas.hide()

        Swal.fire({
            title: "Eso tilin",
            text: "Se actualizó la pelicula",
            icon: "info"
        });

        const section = document.querySelector("section")

        section.children[pos].innerHTML =
        `<div class="col">
              <div class="card h-100">
                <img
                  src="${nuevaPelicula.imagen}"
                  class="card-img-top"
                  alt="imagen ${nuevaPelicula.titulo}"
                />
                <div class="card-body">
                  <h4 class="card-title d-flex justify-content-between">${nuevaPelicula.titulo}</h4>
                  <p class="card-text">
                  ${nuevaPelicula.descripcion}
                  </p>
                </div>
                <div class="card-footer d-flex justify-content-around">
                  <button class="btn btn-info" onclick="detallePelicula('${nuevaPelicula.id}')"><i class="bi bi-eye"></i></button> <button class="btn btn-warning" onclick="editarPelicula('${nuevaPelicula.id}')">
                    <i class="bi bi-pencil"></i></button> <button class="btn btn-danger" onclick="borrarPelicula('${nuevaPelicula.id}')"><i class="bi bi-x-lg"></i></button>
                </div>
              </div>
        </div>`
    }
}

window.editarPelicula = (id) =>
{
    const posicionPelicula = listaPeliculas.findIndex((pelicula)=>pelicula.id === id)

    const peliAEditar = listaPeliculas[posicionPelicula]

    titulo.value = peliAEditar.titulo
    descripcion.value = peliAEditar.descripcion
    director.value = peliAEditar.director
    anio.value = peliAEditar.anio
    genero.value = peliAEditar.genero
    imagen.value = peliAEditar.imagen

    booleanoCrearEditar = false
    pos = posicionPelicula

    tituloModal.innerText = "Editar Pelicula"

    modalPeliculas.show()
}

window.borrarPelicula = (id) =>
{
    const posicionPelicula = listaPeliculas.findIndex((pelicula)=>pelicula.id === id)

    listaPeliculas.splice(posicionPelicula,1)

    guardarEnLocalStorage()

    const section = document.querySelector("section")
    section.removeChild(section.children[posicionPelicula])

    Swal.fire({
        title: "listorti",
        text: "Se borró la pelicula",
        icon: "warning"
    });
}

window.detallePelicula = (id) =>
{
    window.location.href = `${window.location.origin}/pages/detallePelicula.html?id=${id}`
}

function dibujarPelicula(pelicula)
{
    const section = document.querySelector("section")

    section.innerHTML +=
    `<div class="col">
          <div class="card h-100">
            <img
              src="${pelicula.imagen}"
              class="card-img-top"
              alt="imagen ${pelicula.titulo}"
            />
            <div class="card-body">
              <h4 class="card-title d-flex justify-content-between">${pelicula.titulo}</h4>
              <p class="card-text">
              ${pelicula.descripcion}
              </p>
            </div>
            <div class="card-footer d-flex justify-content-around">
              <button class="btn btn-info" onclick="detallePelicula('${pelicula.id}')"><i class="bi bi-eye"></i></button> <button class="btn btn-warning" onclick="editarPelicula('${pelicula.id}')">
                <i class="bi bi-pencil"></i></button> <button class="btn btn-danger" onclick="borrarPelicula('${pelicula.id}')"><i class="bi bi-x-lg"></i></button>
            </div>
          </div>
    </div>`
}

function cargarDatosPeliculas()
{
    if (listaPeliculas.length !== 0)
        {
            listaPeliculas.map((pelicula) => dibujarPelicula(pelicula))
        }
}

function guardarEnLocalStorage()
{
    localStorage.setItem("catalogoKey", JSON.stringify(listaPeliculas))
}

btnAgregar.addEventListener("click",abrirModalPeliculas)
form.addEventListener("submit", agregarPelicula)
cargarDatosPeliculas()