import { useState, useEffect } from 'react';

export function useIcon({ name }) {
  // Importar todos los archivos SVG de la carpeta `icons`
  const svgIcons = import.meta.glob('/src/assets/icons/*.svg');

  // Estado para almacenar el ícono cargado
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const loadIcon = async () => {
      let foundIcon = null;
      // Iterar sobre las claves del objeto svgIcons usando un ciclo `for`
      for (const path in svgIcons) {
        if (path.includes(name)) {
          const module = await svgIcons[path]();
          foundIcon = module.default;
          break; // Salir del bucle una vez que encontramos el ícono
        }
      }
      setIcon(foundIcon);
    };
    loadIcon();
  }, [name]);

  return { icon };
}