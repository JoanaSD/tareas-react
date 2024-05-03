import { useState, useEffect } from 'react'
import Formulario from './Formulario'
import Tarea from './Tarea'

function Tareas() {
  const [tareas, setTareas] = useState([])

  // Efecto para cargar las tareas al montar el componente
  useEffect(() => {

    fetch("https://api-tareas-4i0i.onrender.com/tareas/")
      .then(respuesta => respuesta.json())
      .then(resultado => {
        // Actualiza el estado con las tareas obtenidas del servidor
        setTareas(resultado)

        console.log("Estado tareas actualizado:", tareas);

      })
      
  }, [])

  function crearTarea(tarea) {

    console.log("Creando nueva tarea:", tarea);

    fetch('https://api-tareas-4i0i.onrender.com/tareas/nueva', {
      method: 'POST',
      body: JSON.stringify(tarea),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(respuesta => respuesta.json())
      .then(tareaNueva => {

        console.log("Nueva tarea recibida del servidor:", tareaNueva);

        setTareas([...tareas, tareaNueva]);

        console.log("Estado de tareas actualizado:", tareas);

      })
      .catch(error => {
        console.error("Error al crear la tarea:", error);
      });
  }

  function borrarTarea(id) {
    console.log("ID a borrar:", id)

    fetch(`https://api-tareas-4i0i.onrender.com/tareas/borrar/${id}`, { method: "DELETE" })
      .then(respuesta => respuesta.json())
      .then(({ resultado }) => {
        console.log(resultado)
        // Si se borra correctamente, actualiza el estado eliminando la tarea borrada
        if (resultado == "ok") {
          setTareas(tareas.filter(tarea => tarea.id != id));
        }
          console.log("Error al borrar la tarea")
        
      })
  
  }

  function actualizarEstado(id){
    setTareas(tareas.map(tarea => {

      // Cambia el estado de la tarea con el ID correspondiente
      if(tarea.id == id) {
        tarea.terminada = !tarea.terminada
      }
      return tarea

    }))
  }

  function actualizarTexto(id, tareaNueva){
    setTareas(tareas.map(tarea => {

      if(tarea.id == id) {


        tarea.tarea = tareaNueva
      }
      return tarea

    }))

    
   
  }

  return (
    <>
      <Formulario crearTarea={crearTarea} />
      <section className="tareas">
        {tareas.map(({ id, tarea, terminada }) => (
          <Tarea key={id} id={id} tarea={tarea} terminada={terminada} borrarTarea={borrarTarea} actualizarEstado={actualizarEstado} actualizarTexto={actualizarTexto} />
        ))}
      </section>
    </>
  );
}

export default Tareas
