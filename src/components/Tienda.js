import React from 'react'
import { Productos} from './Productos'


export const Tienda = ({productos, agregarProductoAlCarrito}) => {
    return (
        <div>
        <h1>Tienda</h1>
        <Productos
             productos = {productos}
             agregarProductoAlCarrito = {agregarProductoAlCarrito}
        />
    </div>
    )
}
