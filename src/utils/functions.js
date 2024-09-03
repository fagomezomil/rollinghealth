import * as XLSX from 'xlsx';

export function irAlTop() {
    window.scrollTo(0, 0);
  }
  
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}-${month}-${year}`;
};

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

export const obtenerMesYAnio = (fecha) => {
  const date = new Date(fecha);
  const mes = date.toLocaleString('es-ES', { month: 'long' });
  const mesString = mes.toUpperCase();
  const anioString = date.getFullYear();
  return { mesString, anioString };
};

export const transformDoctorDataForExcel = (turnosPorMes, nombresPacientes) => {
  const transformedData = [];

  Object.keys(turnosPorMes).sort((a, b) => {
    const fechaA = new Date(turnosPorMes[a][0].fecha);
    const fechaB = new Date(turnosPorMes[b][0].fecha);
    return fechaA - fechaB;
  })
  .forEach((mes) => {
    const { mesString, anioString } = obtenerMesYAnio(turnosPorMes[mes][0].fecha);
    turnosPorMes[mes].forEach((turno, index) => {
      transformedData.push({
        Mes: `${mesString} ${anioString}`,
        Numero: index + 1,
        Fecha: formatDate(turno.fecha),
        Hora: turno.hora,
        Paciente: nombresPacientes[turno.paciente._id] || 'Nombre no disponible',
      });
    });
  });

  return transformedData;
};

export const transformAdminDataForExcel = (usuarios) => {
  const transformedData = usuarios.map((usuario) => ({
    Nombre: usuario?.name || 'N/A',
    Email: usuario?.email || 'N/A',
    Rol: usuario?.role || 'N/A',
    Estado: usuario?.verified ? 'Activo' : 'Inactivo',
  }));

  return transformedData;
};

export const exportToExcel = (data, fileName) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};