import React, { useEffect, useState } from 'react';  // Importación de React, useEffect y useState desde 'react'
import Header from '../components/Header';  // Importación del componente Header desde la ruta '../components/Header'
import { Button, Row, Col, Card, Container } from 'react-bootstrap';  // Importación de componentes específicos desde 'react-bootstrap'
import jsPDF from 'jspdf';  // Importación de jsPDF para la generación de documentos PDF
import Chart from 'chart.js/auto';  // Importación de Chart.js para gráficos
import '../styles/App.css';  // Importación de estilos CSS desde '../styles/App.css'
import html2canvas from 'html2canvas';
import Footer from '../components/Footer';

//Asegúrate de instalar jsPDF en tu proyecto si aún no lo has hecho
//  npm install jspdf
//Documentación:  https://github.com/parallax/jsPDF

//Asegúrate de instalar Chart.js en tu proyecto si aún no lo has hecho
//  npm install chart.js
//Documentación:  https://www.chartjs.org/docs/latest/


//Documentacion de react-bootstrap en caso de querer emplear otro componente en su intefaz
//  https://react-bootstrap.netlify.app/


function Estadisticas({ rol }) {  // Declaración del componente Estadisticas con el argumento 'rol'

  const [productos, setProductos] = useState([]);  // Declaración del estado 'productos' y su función 'setProductos' a través de useState, con un valor inicial de un array vacío
  const [myChart, setMyChart] = useState(null);  // Declaración del estado 'myChart' y su función 'setMyChart' a través de useState, con un valor inicial de 'null'
<<<<<<< HEAD
  const [categoryChart, setCategoryChart] = useState(null);
  const [productosPorCategoria, setProductosPorCategoria] = useState([]);
 

    //Apartado de estadistica de pastel
    useEffect(()=> {
      fetch('http://localhost:5000/crud/productosPorCategoria')
      .then((response) => response.json())
      .then((data) => setProductosPorCategoria(data))
      .catch((error) => console.error('Error al obtener los productos por categorìa:', error));
    }, []);
  
    useEffect(() => {
      if (productosPorCategoria.length > 0) {
        const ctx = document.getElementById('myCategories');
  
        if (categoryChart !== null) {
          categoryChart.destroy();  // Destruye el gráfico existente antes de crear uno nuevo para evitar conflictos
        }
  
        
      const labels = productosPorCategoria.map((categoria) => categoria.nombre_categoria);  
      const data = productosPorCategoria.map((categoria) => categoria.cantidad); 
  
        const categoria = new Chart(ctx,{
          type:'pie',
          data: {
            labels:labels,
            datasets: [{
              label:'Cantidad de productos por categoria',
              data: data,
              backgroundColor: [
                'rgba(255,99,132,0.5)',
                'rgba(54,162,235,0.5)',
                'rgba(255,206,86,0.5)',
                'rgba(75,192,192,0.5)',
                'rgba(153,102,255,0.5)',
                'rgba(255,159,64,0.5)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54,162,235,1)',
                'rgba(255,206,86,1)',
                'rgba(75,192,192,1)',
                'rgba(153,102,255,1)',
                'rgba(255,159,64,1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive:true,
            plugins:{
              legend:{
                position:'top',
              },
              title: {
                display:true,
                text:'Cantidad de productos por categoría'
              }
            }
          }
        });
        setCategoryChart(categoria); // Guarda la referencia al nuevo gráfico en el estado
      }
      
    }, [productosPorCategoria]);

   
=======
>>>>>>> c1b022e92afa955ec11c4dfa27c5e8a201f2a745

  useEffect(() => {
    fetch('http://localhost:5000/crud/readproducto')  // Realiza una solicitud GET al servidor para obtener productos
      .then((response) => response.json())  // Convierte la respuesta a formato JSON
      .then((data) => setProductos(data))  // Almacena los productos en el estado 'productos'
      .catch((error) => console.error('Error al obtener los productos:', error));  // Manejo de errores en caso de fallar la solicitud
  }, []);  // Se ejecuta esta función solo una vez al cargar el componente

  useEffect(() => {
    if (productos.length > 0) {  // Si hay productos disponibles
      const ctx = document.getElementById('myChart');  // Obtiene el elemento canvas con el ID 'myChart'

      if (myChart !== null) {
        myChart.destroy(); // Destruye el gráfico existente antes de crear uno nuevo para evitar conflictos
      }

      const nombresProductos = productos.map((producto) => producto.nombre);  // Extrae los nombres de los productos
      const Existencia = productos.map((producto) => producto.existencia);  // Extrae las cantidades de los productos

      const almacen = new Chart(ctx, {  // Crea un nuevo gráfico de tipo 'bar' con Chart.js y lo asigna al elemento canvas
        type: 'bar',
        data: {
          labels: nombresProductos,  // Asigna los nombres de productos como etiquetas para el eje X
          datasets: [{
            label: 'existencia disponible',  // Etiqueta para la leyenda del gráfico
            data: Existencia,  // Asigna las cantidades de productos para la visualización
            backgroundColor: 'rgba(54, 162, 235, 0.5)',  // Define el color de fondo de las barras
            borderColor: 'rgba(54, 162, 235, 1)',  // Define el color del borde de las barras
            borderWidth: 1  // Define el ancho del borde de las barras
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true  // Comienza el eje Y desde cero
            }
          }
        }
      });
      setMyChart(almacen); // Guarda la referencia al nuevo gráfico en el estado 'myChart'
    }
  }, [productos]);  // Se ejecuta cada vez que hay cambios en 'productos'

  const generarReporteAlmacen = () => {
    fetch('http://localhost:5000/crud/readproducto')  // Realiza una solicitud GET al servidor para obtener productos
      .then((response) => response.json())  // Convierte la respuesta a formato JSON
      .then((productos) => {
        const doc = new jsPDF();  // Crea un nuevo documento PDF con jsPDF
        let y = 15; // Posición inicial en el eje Y dentro del documento PDF

        doc.text("Reporte de Estado de Almacén", 20, 10);  // Agrega un título al documento PDF

        productos.forEach((producto) => {  // Itera sobre los productos para generar el reporte
          doc.text(`Nombre: ${producto.nombre}`, 20, y);  // Agrega el nombre del producto al documento PDF
          doc.text(`existencia: ${producto.existencia}`, 20, y + 10);  // Agrega la cantidad del producto al documento PDF

          y += 30; // Incrementa la posición Y para el siguiente producto
          if (y >= 280) {  // Si alcanza el final de la página, crea una nueva página
            doc.addPage();
            y = 15; // Reinicia la posición Y en la nueva página
          }
        });

        doc.save("reporte_almacen.pdf");  // Descarga el documento PDF con el nombre 'reporte_almacen.pdf'
      })
      .catch((error) => console.error('Error al obtener los productos:', error));  // Manejo de errores en caso de fallar la solicitud
  };

        // Definición de la función generarReporteAlmacenImg como una función asíncrona
      const generarReporteAlmacenImg = async () => {
        try {
          // Utiliza html2canvas para capturar el contenido del elemento con el ID 'myChart' y obtener un objeto canvas
          const canvas = await html2canvas(document.getElementById('myChart'));
          // Crea un nuevo objeto jsPDF para trabajar con documentos PDF
          const pdf = new jsPDF();
          // Convierte el objeto canvas a una URL de datos en formato PNG
          const imgData = canvas.toDataURL('image/png');
          // Añade un texto al documento PDF
          pdf.text("Reporte de Estado de Almacén", 20, 10);
          // Añade la imagen capturada del gráfico al documento PDF, con ajustes de coordenadas y tamaño
          pdf.addImage(imgData, 'PNG', 10, 20, 100, 100);
          // Guarda el documento PDF con un nombre específico
          pdf.save("reporte_almacen_con_grafico.pdf");
        } catch (error) {
          // Captura y maneja cualquier error que pueda ocurrir durante la ejecución del bloque try
          console.error('Error al generar el reporte con imagen:', error);
        }
      };

<<<<<<< HEAD
        
      
      const imprimirEstadisticas = () => {
        console.log("Imprimiendo estadísticas...");
      }
      

=======
>>>>>>> c1b022e92afa955ec11c4dfa27c5e8a201f2a745
      return(
        <div>
          <Header rol={ rol } />  
    
          
          <Container className="margen-conten" responsive>

        <Row className="g-3">
          
          <Col sm="12" md="12" lg="12">
            <Card>
              <Card.Body>
                <Card.Title>Estado del almacen</Card.Title>

                <iframe title="REPORTE KARDEX" width="1024" height="804" src="https://app.powerbi.com/view?r=eyJrIjoiMGI3ZWIxNGItYjZlMy00OGI0LWJjOWEtOTNlMjg5ODA3YTAwIiwidCI6ImU0NzY0NmZlLWRhMjctNDUxOC04NDM2LTVmOGIxNThiYTEyNyIsImMiOjR9&pageName=ReportSectiona1c3a4900345072cad39" frameborder="0" allowFullScreen="true"></iframe>

                <Button onClick={imprimirEstadisticas}>
                  Generar reporte con imagen
                </Button>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
          
          
          
          <Container className="margen-contenedor">
    
            <Row className="g-3">
    
              <Col sm="6" md="6" lg="4">
                <Card>
                  <Card.Body>
                    <Card.Title>Estado del almacen</Card.Title>
                    <canvas id="myChart"  height="300"></canvas>
                  </Card.Body>

                  <Col sm="4" md="4" lg="6">
                <Card>  
                  <Card.Body>
                    <Button onClick={generarReporteAlmacenImg}>
                      Generar reporte con imagen
                    </Button>
                  </Card.Body>
    
                </Card>
              </Col>
    
                  <Card.Body>
                    <Button onClick={generarReporteAlmacen}>
                      Generar reporte
                    </Button>
                  </Card.Body>
    
                </Card>
              </Col>
    
             
    
            </Row>
          </Container>
    
          <Footer/>
    
        </div>
      );
    }
    

export default Estadisticas;  // Exporta el componente Estadisticas para su uso en otras partes de la aplicación
