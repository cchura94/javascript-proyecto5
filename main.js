let producto_id = -1;
let productos = [];
const urlBase = "https://laravue2.blumbit.net/back/public";

async function obtenerDatos(){
    try {
        const respuesta = await axios.get(urlBase+"/api/producto?page=1&limit=10");
        const { total, data } = respuesta.data;
        productos = data;
    // document.write(JSON.stringify(productos));
        let htmlTable = "";

        
        productos.forEach(prod => {
            // let p = JSON.stringify(prod)
            let fila = `<tr>
                            <td>${prod.id}</td>
                            <td>${prod.nombre}</td>
                            <td>${prod.precio}</td>
                            <td>${prod.stock}</td>
                            <td>
                            <img src="https://laravue2.blumbit.net/back/public/${prod.imagen}" width="100px" />
                            
                            </td>
                            <td>
                                <button onclick="editarProducto(${prod.id})" class="btn btn-primary">editar</button>
                                <button onclick="eliminarProducto(${prod.id})" class="btn btn-danger">eliminar</button>
                            </td>
                        </tr>
                        `;
            htmlTable = htmlTable + fila 
        });
        document.getElementById("datos").innerHTML = htmlTable
        
    } catch (error) {
        alert("Error al conectar con el servidor "+error)
    }
}

const guardarProducto = async () => {
    let nombre = document.getElementById('nombre').value;
    let precio = document.getElementById('precio').value;
    let stock = document.getElementById('stock').value;
    let categoria_id = document.getElementById('categoria_id').value;

    let producto = {
        nombre: nombre,
        precio: precio,
        stock: stock,
        categoria_id: categoria_id
    }

    if(producto_id>0){
        await axios.put(urlBase+"/api/producto/"+producto_id, producto)
    }else{

        await axios.post(urlBase+"/api/producto", producto);
    }

    // document.write(JSON.stringify(producto));
    obtenerDatos();

    document.getElementById('nombre').value = "";
    document.getElementById('precio').value = "";
    document.getElementById('stock').value = "";
    document.getElementById('categoria_id').value = "";
    producto_id = -1;

}

const editarProducto = (id) => {

    const prod = productos.find(p => p.id == id);

    producto_id = id;

    document.getElementById('nombre').value = prod.nombre;
    document.getElementById('precio').value = prod.precio;
    document.getElementById('stock').value = prod.stock;
    document.getElementById('categoria_id').value = prod.categoria_id;
}

const eliminarProducto = async function (id){
    if(confirm("Está seguro de eliminar el producto?")){
        await axios.delete(urlBase+"/api/producto/"+id);
        obtenerDatos();

    }

    producto_id = -1;
}

const filtroMenor = (valor) => {

    document.getElementById("datos").innerHTML = "";
    htmlTable = "";
    productos.forEach(prod => {
        // let p = JSON.stringify(prod)
        if(prod.precio < valor){
            let fila = `<tr>
                            <td>${prod.id}</td>
                            <td>${prod.nombre}</td>
                            <td>${prod.precio}</td>
                            <td>${prod.stock}</td>
                            <td>
                            <img src="https://laravue2.blumbit.net/back/public/${prod.imagen}" width="100px" />
                            
                            </td>
                            <td>
                                <button onclick="editarProducto(${prod.id})">editar</button>
                                <button onclick="eliminarProducto(${prod.id})">eliminar</button>
                            </td>
                        </tr>
                        `;
            htmlTable = htmlTable + fila 

        }
    });
    document.getElementById("datos").innerHTML = htmlTable

}

obtenerDatos()