import React from 'react';
import styled from 'styled-components';
import { NavLink, Switch, Route } from 'react-router-dom';
import { Inicio } from './components/Inicio';
import { Blog } from './components/Blog';
import { Tienda } from './components/Tienda';
import { Carrito } from './components/Carrito';
import { useState } from 'react';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/tiendaReducer';


const App = () => {

   
    const [carrito, cambiarCarrito] = useState([]);

    const agregarProductoAlCarrito = (idProductoAAgregar, nombre) =>{
        //Si el carrito no tiene elementos entonces agregamos uno
        if(carrito.length === 0){
            cambiarCarrito([{id: idProductoAAgregar, nombre:nombre, cantidad:1}]);     
        } else {
            //De otra forma tenemos que revisar que el carrito no tenga ya el producto
            //si ya lo tiene entonces queremos actualizar su valor
            //si no tiene producto entonces lo agregamos
            //Para poder editar el arreglo tenemos que clonarlo
            const nuevoCarrito = [...carrito];
            //comprobamos si el carrito tiene el id del producto a agregar
            const yaEstaEnCarrito = nuevoCarrito.filter((productoDeCarrito)=>{
                return  productoDeCarrito.id === idProductoAAgregar
            }).length>0;
                // Si ya tiene el producto entonces lo tenemos que actualizar
                if(yaEstaEnCarrito){
                    //para ello tenemos que buscarlo, obtener su posicion en el arreglo
                    //Y en base a su posicion ya actualizamos el valor
                    nuevoCarrito.forEach((productoDeCarrito, index)=>{
                        if(productoDeCarrito.id === idProductoAAgregar){
                            const cantidad = nuevoCarrito[index].cantidad;
                            nuevoCarrito[index]={id: idProductoAAgregar, nombre: nombre, cantidad: cantidad+1}
                        }
                    });
                // si no esta en el carrito agregamos el producto al carrito
                } else {
                    nuevoCarrito.push(
                        {
                            id:idProductoAAgregar,
                            nombre:nombre,
                            cantidad: 1
                        }
                    )
                }
                //por ultimo actualizamos el carrito
                cambiarCarrito(nuevoCarrito)
        }
    }

    const store = createStore(reducer);
    console.log(store.getState());

    return (  
        <Provider store={store}>
            <Contenedor>      
            <Menu>
                <NavLink to="/">Inicio</NavLink>
                <NavLink to="/blog">Blog</NavLink>
                <NavLink to= "/tienda">Tienda</NavLink>
            </Menu>
            <main>
                <Switch>
                    <Route path="/"exact={true}component={Inicio} /> 
                    <Route path="/blog" component={Blog} /> 
                    <Route path="/tienda"> 
                        <Tienda 
                            
                            agregarProductoAlCarrito={agregarProductoAlCarrito}
                        />
                    </Route>
                    
                    <Route component = {Error}/>
                    
                </Switch>
            </main>
            <aside>
                <Carrito  carrito={carrito}/>
            </aside>
        </Contenedor>
        </Provider>
    );
}
 
const Contenedor = styled.div`
    max-width: 1000px;
    padding: 40px;
    width: 90%;
    display: grid;
    gap: 20px;
    grid-template-columns: 2fr 1fr;
    background: #fff;
    margin: 40px 0;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;
 
const Menu = styled.nav`
    width: 100%;
    text-align: center;
    background: #092c4c;
    grid-column: span 2;
    border-radius: 3px;
 
    a {
        color: #fff;
        display: inline-block;
        padding: 15px 20px;
    }
 
    a:hover {
        background: #1d85e8;
        text-decoration: none;
    }
`;
export default App;