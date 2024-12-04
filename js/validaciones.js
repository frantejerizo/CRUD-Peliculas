export function validarCaracteres(input,min,max)
{
    if(input.value.length >= min && input.value.length <= max)
    {
        input.classname = "form-control is-valid"
        return true
    }
    else
    {
        input.classname = "form-control is-invalid"
        return false
    }
}

export function validarNumero(input,min,max)
{
    if(input.value >= min && input.value <= max)
    {
        input.classname = 'form-control is-valid'
        return true
    }
    else
    {
        input.classname = 'form-control is-invalid'
        return false
    }
}

export function validarURL(input)
{
    const expresionRegular = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/

    if(expresionRegular.test(input.value))
    {
        input.classname = 'form-control is-valid'
        return true
    }
    else
    {
        input.classname = 'form-control is-invalid'
        return false
    }
}