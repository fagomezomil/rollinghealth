import { useEffect } from 'react';
import EspecialistasHome from '../components/home/EspecialistasHome'
import { irAlTop } from '../utils/functions';

export default function Staff() {
  useEffect( () => {
    irAlTop();
  });
  return (
    <div className='mt-20'>
      <EspecialistasHome />
    </div>
  )
}
