import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'



function App() {

  //el useState es el valor inicial que se le da, el primer valor de const [es la contstante y el set es lo que puede modificar esa constante(set es la funcion modificadora) ] siempre se declara dentro del componente antes de el return .
  //no se pueden registrar de forma condicional if() o else, y no se pueden registrar despues de un return 
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0);//el 0 es el valor con el que arranca
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)//su valor inicial va a ser false porque no quiero que se muestre al inicio

  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('') 
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {

      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);

    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])//se ejecuta este efect cuando cargue presupuesto


  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])//convierte un arreglo a string, caso contrario es un arreglo vacio

  }, [gastos])//este effect se ejecuta cuando cargue gastos

useEffect(() => {
if(filtro) {
  const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)

  setGastosFiltrados(gastosFiltrados)
}
}, [filtro]);


  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, []);//y este effect se ejecuta cuando cargue la aplicacion






  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto => {
    if (gasto.id) {
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
      setGastoEditar({})
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }



    setAnimarModal(false)
    setTimeout(() => {

      setModal(false)
    }, 500);
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)

    setGastos(gastosActualizados);
  }
  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />


      {isValidPresupuesto && (
        <>

          <main>
            <Filtros

            filtro={filtro}
            setFiltro={setFiltro}


            />


            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />

          </main>
          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto} />

          </div>
        </>
      )}

      {modal && <Modal setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}

    </div>
  )

}

export default App
