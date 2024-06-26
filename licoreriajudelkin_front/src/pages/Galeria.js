import React, { useState, useEffect } from 'react';  // Importa las funciones useState y useEffect de React
import { Row, Col, Container, Card, Badge, Form, FloatingLabel } from 'react-bootstrap';  // Importa componentes de react-bootstrap
import Header from '../components/Header';  // Importa el componente Header desde su ubicación relativa
import '../styles/App.css';  // Importa estilos CSS del archivo App.css


function Galeria({ rol }) {  // Define un componente funcional Galeria que recibe props

  const [producto, setProductos] = useState([]);  // Crea un estado para almacenar la lista de productos
  const [searchQuery, setSearchQuery] = useState('');  // Crea un estado para almacenar la cadena de búsqueda

  const handleSearchChange = (e) => {  // Función para manejar cambios en la búsqueda
    setSearchQuery(e.target.value);  // Actualiza el estado con la cadena de búsqueda ingresada
  };

  const filteredProductos = producto.filter((producto) => {  // Filtra los productos según la cadena de búsqueda
    // Convierte a minúsculas los valores de los campos para realizar una búsqueda insensible a mayúsculas y minúsculas
    const idproducto = producto.idproducto;
    const nombre = producto.nombre.toLowerCase(); 
    const cantidad = producto.cantidad;
    const precio = producto.precio;
    const descripcion = producto.descripcion.toLowerCase();
    const porcentaje_alcohol = producto.porcentaje_alcohol;
    const idcategoria = producto.idcategoria;
    const search = searchQuery.toLowerCase();
    
    // Verifica si la cadena de búsqueda se encuentra en algún campo de los productos
    // Devuelve un nuevo array con los productos filtrados
    return (
      idproducto === (search) ||
      nombre.includes(search) ||
      cantidad === (search) ||
      precio === (search) ||
      descripcion.includes(search) ||
      porcentaje_alcohol === (search) ||
      idcategoria === (search)
    );

  });

  useEffect(() => {  // Realiza una solicitud GET al servidor para obtener los productos
    fetch('http://localhost:5000/crud/readproducto')  // Realiza una petición GET al servidor
      .then((response) => response.json())  // Convierte la respuesta a formato JSON
      .then((data) => setProductos(data))  // Actualiza el estado con la lista de productos obtenida
      .catch((error) => console.error('Error al obtener los productos:', error));  // Maneja errores en la obtención de productos
  }, []);  // Se ejecuta solo en la primera renderización del componente

  return (
    <div>
    <Header rol={ rol } />

    <Container className="margen-contenedor">

      <Row className="mb-3">
        <Col sm="6" md="6" lg="6">
          <FloatingLabel controlId="search" label="Buscar">
            <Form.Control
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </FloatingLabel>
        </Col>
      </Row>

      <Row className="g-3">
        {filteredProductos.map((producto) => (
          <Col sm="4" md="4" lg="4">
            <Card>
              <Card.Img className="image-card" variant="top" src={producto.imagen} alt={producto.nombre} />
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>
                  {producto.descripcion}
                </Card.Text>
                <div>
                  <Badge bg="success">Precio: C$ {producto.precio}</Badge>
                  <Badge bg="warning" text="dark">
                    Alcohol: {producto.porcentaje_alcohol}%
                  </Badge>
                </div>
              </Card.Body>
              <Card.Body>
                <Card.Link href="/producto">Comprar</Card.Link>
              </Card.Body>
            </Card>
          </Col>            
        ))}
      </Row>
    </Container>

  </div>
  );
}

export default Galeria;  // Exporta el componente Galeria
