import React from 'react'
import Productos from './Productos'


export const Tienda = ({ agregarProductoAlCarrito}) => {
    return (
        <div>
        <h1>Tienda</h1>
        <Productos
             
             agregarProductoAlCarrito = {agregarProductoAlCarrito}
        />
    </div>
    )
}
