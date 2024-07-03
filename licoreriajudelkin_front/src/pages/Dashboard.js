import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import { Button, Row, Col, Card, Container } from 'react-bootstrap';
import jsPDF from 'jspdf';
import Chart from 'chart.js/auto';
import '../styles/App.css';
import html2canvas from 'html2canvas';
import Footer from '../components/Footer';

function Dashboard({ rol }) {

const imprimirEstadisticas = () => {
    console.log("Imprimiendo estadísticas...");
  }

  return (
    <div>
      <Header rol={rol} />
      <Container className="margen-contenedor">
        <Row className='g-3'> 
        
        
          <Col sm="12" md="12" lg="12">
            <Card>
              <Card.Body>
                <Card.Title>Estado del almacen</Card.Title>

                <iframe title="REPORTE VENTA " width="1080" height="804" src="https://app.powerbi.com/view?r=eyJrIjoiMjdlNjhlYzUtMjRjZi00ZGYyLWIwZTUtOWE4MGJlYzllMjczIiwidCI6ImU0NzY0NmZlLWRhMjctNDUxOC04NDM2LTVmOGIxNThiYTEyNyIsImMiOjR9"
                 frameborder="0" 
                 allowFullScreen="true"
                 style={{ display: 'block', margin: '0 auto' }}
                 ></iframe>

            
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Dashboard;
