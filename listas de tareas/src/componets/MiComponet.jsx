import React, { useState } from 'react';

// Hook personalizado para gestionar la lista de tareas
function useListaTareas() {
  const [tareas, setTareas] = useState([]);

  // Función para crear una nueva tarea
  const crearTarea = (descripcion) => {
    const nuevaTarea = {
      id: Date.now(),
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
  const [nuevaTarea, setNuevaTarea] = useState('');

  const handleCrearTarea = () => {
    if (nuevaTarea.trim() !== '') {
      crearTarea(nuevaTarea);
      setNuevaTarea('');
    }
  };

  const handleBorrarTarea = (id) => {
    borrarTarea(id);
  };

  const handleActualizarTarea = (id, completada) => {
    actualizarTarea(id, completada);
  };

  return (
    <div>
      <input
        type="text"
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
      />
      <button onClick={handleCrearTarea}>Agregar Tarea</button>
      
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <input
              type="checkbox"
              checked={tarea.completada}
              onChange={(e) => handleActualizarTarea(tarea.id, e.target.checked)}
            />
            {tarea.descripcion}
            <button onClick={() => handleBorrarTarea(tarea.id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaTareas;
