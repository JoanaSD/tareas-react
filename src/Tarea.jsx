import { useState } from 'react'

function Tarea({ id, tarea, terminada, borrarTarea, actualizarEstado, actualizarTexto }) {
  
  let [editando, setEditando] = useState(false)
  let [inputValor, setInputValor] = useState(tarea)

  console.log("Objeto tarea:", tarea);

  // Función para cambiar el estado de la tarea
  function toggleEstado() {

    let nuevoEstado = !terminada

    // Envía una solicitud PUT a la API para actualizar el estado de la tarea
    fetch(`https://api-tareas-4i0i.onrender.com/tareas/actualizar/${id}/2`, { 
      method: "PUT", 
      body: JSON.stringify({ terminada: nuevoEstado }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(respuesta => respuesta.json())
      .then(({ resultado }) => {

      
        // Si se actualiza correctamente, llama a la función actualizarEstado del componente padre
        if (resultado == "ok") {
          return actualizarEstado(id)
        
        } 
        console.log("Error al actualizar el estado de la tarea")
        
      })
  }

  function editarTarea() {
    if (editando) {

      // Guardar la tarea editada
      let textoTemporal = inputValor.trim()
      let textoTarea = tarea

      // Verifica si el texto de la tarea ha cambiado y no está vacío
      if (textoTemporal != "" && textoTemporal != textoTarea) {

        // Envía una solicitud PUT a la API para actualizar el texto de la tarea
        fetch(`https://api-tareas-4i0i.onrender.com/tareas/actualizar/${id}/1`, {
          method: "PUT",
          body: JSON.stringify({ tarea: textoTemporal }),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(respuesta => respuesta.json())
          .then(({ resultado }) => {
            if (resultado == "ok") {

              // Actualiza el valor del input y cambia al modo de visualización
              textoTarea = textoTemporal
              setInputValor(textoTarea)
              setEditando(false)

              // Llama a la función actualizarTexto del componente padre
              return actualizarTexto(id,textoTarea)
            } 
              console.log("Error al editar la tarea")
            
          }) 
          
      }
      return setEditando(false)
      
    } 
      // Habilitar modo de edición
      setEditando(true)    
  }

  function activarBorrarTarea(){
    // Llama a la función borrarTarea del componente padre
    borrarTarea(id)
  }

  return (
    
      <div className="tarea">
     
        { !editando ? 

          // Renderiza el texto de la tarea en un h2 si no está en modo de edición
          (<h2 >{tarea}</h2>) : 

          // Renderiza un input de texto para editar la tarea
          (<input type="text" 
          value={inputValor} 
          onChange={ evento => setInputValor(evento.target.value) }/> )
                  
        }

        <div>

          <button className="boton" 
            onClick={editarTarea}>
            {editando ? "guardar" : "editar"}
          </button>

          <button className="boton" onClick={activarBorrarTarea}>
            borrar
          </button>

        </div>

        <button className={`estado ${terminada ? "terminada" : ""}`} onClick={toggleEstado}>
          <span></span>
        </button>
        
      </div>
    
  );
}

export default Tarea;
