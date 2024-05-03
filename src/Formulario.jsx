import { useState } from 'react'


function Formulario({crearTarea}) {

  let [textoTarea, setTextoTarea] = useState("")
 


  return (
    <>
      <form onSubmit={ evento => {
        evento.preventDefault()

        // Verifica si el texto de la tarea no está vacío
        if (textoTarea.trim() !== "") {

          // Envía la nueva tarea al servidor mediante la función crearTarea proporcionada como prop
          crearTarea({ 
          tarea: textoTarea, 
          terminada: false 
        })
          // Limpia el campo de texto después de enviar la tarea
          setTextoTarea("")
        }  

      }}>
        
        <input type="text" placeholder="Escribe tu tarea pendiente" 
          value={textoTarea} 
          onChange={evento => {

          console.log("Texto de la tarea actualizado:", evento.target.value)
          
          // Actualiza el estado local con el texto ingresado por el usuario
          setTextoTarea(evento.target.value)}} />

        <input type="submit" value="crear tarea" />

      </form>

    </>
  )
}

export default Formulario
