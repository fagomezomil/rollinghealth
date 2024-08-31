import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const HistorialPortal = ({ turnosPaciente, medicos }) => {
    const [selectedSpecialty, setSelectedSpecialty] = useState('');

    const turnosPacienteMenu = Array.isArray(turnosPaciente) ? turnosPaciente : [];

    const hoy = new Date();
    const turnosFiltrados = turnosPacienteMenu.filter(turno => {
        const fechaTurno = new Date(turno.fecha);
        return fechaTurno <= hoy;
    });

    const turnosPorFechaYEspecialidad = turnosFiltrados.reduce((acc, turno) => {
        const fecha = new Date(turno.fecha).toISOString().split('T')[0]; 
        const medico = medicos.find(m => m._id === turno.doctor._id);
        const especialidad = medico?.speciality || 'Desconocida';

        if (!acc[fecha]) {
            acc[fecha] = {};
        }
        acc[fecha][especialidad] = (acc[fecha][especialidad] || 0) + 1;

        return acc;
    }, {});

    const fechas = Object.keys(turnosPorFechaYEspecialidad)
        .sort((a, b) => new Date(a) - new Date(b)); 

    const especialidades = [...new Set(fechas.flatMap(fecha => Object.keys(turnosPorFechaYEspecialidad[fecha] || {})))];

    // datos del grafico
    const data = {
        labels: fechas,
        datasets: especialidades.map(especialidad => ({
            label: especialidad,
            data: fechas.map(fecha => turnosPorFechaYEspecialidad[fecha]?.[especialidad] || 0),
            backgroundColor: selectedSpecialty === '' || especialidad === selectedSpecialty
                ? `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`
                : 'rgba(255, 255, 255, 0.2)',
            borderColor: selectedSpecialty === '' || especialidad === selectedSpecialty
                ? `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`
                : 'rgba(255, 255, 255, 1)',
            borderWidth: 2,
        })),
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Historial de Turnos por Fecha y Especialidad',
                font: {
                    size: 20, 
                    weight: 'bold',
                },
            },
        },
        scales: {
            x: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Fecha',
                    font: {
                        size: 16, 
                        weight: 'bold',
                    },
                },
            },
            y: {
                stacked: true,
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Cantidad de Turnos',
                    font: {
                        size: 16, 
                        weight: 'bold',
                    },
                },
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
            <p className="text-[50px] text-[#126459] font-base leading-[55px]">
                Portal Paciente
            </p>
            <p className="text-[50px] text-[#126459] font-bold mb-6">
                Historial de Turnos
            </p>       
             <div className="flex flex-col lg:flex-row items-start lg:items-center">
                    <div className="flex items-center justify-center">                    
                    <p className="opt-gestion-turno">
                        Seleccione una especialidad:
                    </p>
                    </div>
                    <select
                        className="select-centros"
                        id="specialty-picker"
                        value={selectedSpecialty}
                        onChange={e => setSelectedSpecialty(e.target.value)}
                    >
                        <option value="">Todas las especialidades</option>
                        {especialidades.map(especialidad => (
                            <option key={especialidad} value={especialidad}>{especialidad}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div style={{ height: '400px' }}>
                <Bar data={data} options={options} />
            </div>
            
         <div style={{ marginTop: '20px' }}>
         <h3 className='italic text-4xl text-[#126459]'>Detalles por Especialidad</h3>
         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
             <thead>
                 <tr>
                     <th style={{ borderBottom: '2px solid #ddd', padding: '8px', textAlign: 'center' }}>Fecha</th>
                     <th style={{ borderBottom: '2px solid #ddd', padding: '8px', textAlign: 'center' }}>Especialidad</th>
                     <th style={{ borderBottom: '2px solid #ddd', padding: '8px', textAlign: 'center' }}>Cantidad de Turnos</th>
                 </tr>
             </thead>
             <tbody>
                 {fechas.map((fecha, index) => (
                     especialidades.map(especialidad => {
                         const cantidadTurnos = turnosPorFechaYEspecialidad[fecha][especialidad] || 0;
                         if (cantidadTurnos > 0) {
                             return (
                                 <tr key={`${fecha}-${especialidad}`}>
                                     <td style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{fecha}</td>
                                     <td style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{especialidad}</td>
                                     <td style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{cantidadTurnos}</td>
                                 </tr>
                             );
                         }
                         return null;
                     })
                 ))}
             </tbody>
         </table>
        </div>
     


        </div>
    );
};

export default HistorialPortal;
