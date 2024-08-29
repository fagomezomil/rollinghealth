export function irAlTop() {
    window.scrollTo(0, 0);
  }
  

export const convertirFechaHora = (fecha, horario) => {
  const [dia, mes, anio] = fecha.split('-').map(Number);
  const [hora, minutoStr] = horario.split(':');
  const [minuto] = minutoStr.split(' ');
  
  const fechaHoraTurno = new Date(anio, mes - 1, dia, hora, minuto);
  return fechaHoraTurno;
};

export const resizeImage = (file, maxWidth, maxHeight) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/jpeg');
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
};
