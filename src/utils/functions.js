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

