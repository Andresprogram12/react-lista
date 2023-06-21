import React, { useState } from 'react';

// Hook personalizado para gestionar la lista de tareas
function useListaTareas() {
  const [tareas, setTareas] = useState([]);

  // Función para crear una nueva tarea
  const crearTarea = (nombre, descripcion = '') => {
    const nuevaTarea = {
      id: Date.now(),
      nombre,
      descripcion,
      completada: false,
    };

    setTareas([...tareas, nuevaTarea]);
  };

  // Función para borrar una tarea por su ID
  const borrarTarea = (id) => {
    const nuevasTareas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(nuevasTareas);
  };

  // Función para actualizar el estado de una tarea
  const actualizarTarea = (id, completada) => {
    const nuevasTareas = tareas.map((tarea) => {
      if (tarea.id === id) {
        return { ...tarea, completada };
      }
      return tarea;
    });

    setTareas(nuevasTareas);
  };

  return { tareas, crearTarea, borrarTarea, actualizarTarea };
}

// Componente de ejemplo que utiliza el hook
function ListaTareas() {
  const { tareas, crearTarea, borrarTarea, actualizarTarea } = useListaTareas();
  const [nombreTarea, setNombreTarea] = useState('');
  const [descripcionTarea, setDescripcionTarea] = useState('');

  const handleCrearTarea = (e) => {
    e.preventDefault();
    if (nombreTarea.trim().length < 3) {
      alert('El nombre de la tarea debe tener al menos 3 caracteres.');
      return;
    }
    crearTarea(nombreTarea, descripcionTarea);
    setNombreTarea('');
    setDescripcionTarea('');
  };

  const handleBorrarTarea = (id) => {
    borrarTarea(id);
  };

  const handleActualizarTarea = (id, completada) => {
    actualizarTarea(id, completada);
  };

  return (
    <div>
      <form onSubmit={handleCrearTarea}>
        <input
          type="text"
          value={nombreTarea}
          onChange={(e) => setNombreTarea(e.target.value)}
          placeholder="Nombre de la tarea (mín. 3 caracteres)"
        />
        <br />
        <textarea
          value={descripcionTarea}
          onChange={(e) => setDescripcionTarea(e.target.value)}
          placeholder="Descripción de la tarea (opcional)"
        ></textarea>
        <br />
        <button type="submit">Agregar Tarea</button>
      </form>

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <input
              type="checkbox"
              checked={tarea.completada}
              onChange={(e) =>
                handleActualizarTarea(tarea.id, e.target.checked)
              }
            />
            {tarea.nombre} - {tarea.descripcion}
            <button onClick={() => handleBorrarTarea(tarea.id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaTareas;
