
import { useState } from 'react';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({ 
    presupuesto, 
    setPresupuesto, 
    setIsValidPresupuesto }) => {
    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault();
    

        //si no hay presupuesto o el presupuesto es menor a 0 convierte este mensaje de error
        if (!presupuesto|| presupuesto < 0) {
            setMensaje('no es un presupuesto valido')
            return

        } 
setMensaje('')
setIsValidPresupuesto(true)

    }
    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form onSubmit={handlePresupuesto} className='formulario'>
                <div className='campo'>
                    <label>Definir presupuesto</label>
                    <input
                        className='nuevo-presupuesto'
                        type='number'
                        placeholder='Añade tu presupuesto'
                        value={presupuesto}
                        onChange={ e => setPresupuesto(Number(e.target.value))}//lo que el ususario pone en el input se agregue en la variable setPresupuesto

                    //cuando presione el boton de submit del input se ejecuta la funcion de handlePresupuesto de arriba


                    />
                </div>

                <input type="submit" value="Añadir" />
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            </form>
        </div>
    )
}

export default NuevoPresupuesto
