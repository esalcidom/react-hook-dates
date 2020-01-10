import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from  'sweetalert2';

function ProductoLista({producto, guardarRecargarProductos}){

    const eliminarProducto = id => {
        console.log('eliminando', id);

        Swal.fire({
            title: 'Estas seguro de Eliminar?',
            text: "Un platillo eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
          }).then( async (result) => {
            if (result.value) {

                const url = `http://localhost:4000/restaurant/${id}`;

                try{
                    const resultado = await axios.delete(url);
                    if(resultado.status === 200){
                        guardarRecargarProductos(true);

                        Swal.fire(
                            'Eliminado!',
                            'Tu platillo se ha eliminado.',
                            'success'
                        )
                    }
                }
                catch (e){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'Hubo un error al crear el producto!',
                    });
                    console.log(e);
                }
                  
            }
          })
        //TODO eliminar registros
    }

    return(
        <li data-categoria={producto.categoria} className="list-group-item d-flex justify-content-between align-items-center">
            <p>{producto.nombre} <span className="font-weight-bold">${producto.precio}</span></p>
            <div>
                <Link to={`/producto/editar/${producto.id}`} className="btn btn-success mr-2">Editar</Link>
                <button type="button" className="btn btn-danger" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
            </div>
        </li>
    );
}

export default ProductoLista;