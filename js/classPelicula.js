export default class Pelicula
{
    #id
    #titulo
    #descripcion
    #director
    #anio
    #genero
    #imagen

    constructor(titulo,descripcion,director,anio,genero,imagen)
    {
        this.#id=crypto.randomUUID()
        this.#titulo=titulo
        this.#descripcion=descripcion
        this.#director=director
        this.#anio=anio
        this.#genero=genero
        this.#imagen=imagen
    }

    get id() { return this.#id; } 
    get titulo() { return this.#titulo; } 
    get descripcion() {return this.#descripcion; }
    get director() { return this.#director; } 
    get anio() { return this.#anio; } 
    get genero() { return this.#genero; } 
    get imagen() { return this.#imagen; }

    set titulo(value) { this.#titulo = value; } 
    set descripcion(value) { this.#descripcion = value; }
    set director(value) { this.#director = value; } 
    set anio(value) { this.#anio = value; } 
    set genero(value) { this.#genero = value; } 
    set imagen(value) { this.#imagen = value; } 

    toJSON(){
        return {
            id: this.id,
            titulo: this.titulo,
            descripcion: this.descripcion,
            director: this.director,
            anio: this.anio,
            genero: this.genero,
            imagen: this.imagen
        }
    }
}