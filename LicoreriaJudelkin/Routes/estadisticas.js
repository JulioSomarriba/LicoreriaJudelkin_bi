const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/ventasporayo', (req, res) => {

    const sql = `SELECT 
    Ayo, 
    SUM(precio * cantidad) AS Ventas_totales
    FROM 
        H_venta
    JOIN 
        D_Tiempo ON H_venta.idtiempo = D_Tiempo.idtiempo
    GROUP BY 
    Ayo;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/ventastotalespormes2024', (req, res) => {

    const sql = `SELECT 
    Mes, 
    SUM(precio * cantidad) AS Ventas_totales
    FROM 
        H_venta
    JOIN 
        D_Tiempo ON H_venta.idtiempo = D_Tiempo.idtiempo
    WHERE 
        Ayo = 2024
    GROUP BY 
    Mes; `;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas por mes' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/ventaspordiayayo', (req, res) => {

    const sql = `SELECT 
    fecha, 
    SUM(precio * cantidad) AS Ventas_totales
    FROM 
        H_venta
    JOIN 
        D_Tiempo ON H_venta.idtiempo = D_Tiempo.idtiempo
    WHERE 
        Ayo = 2024 AND Mes = 5
    GROUP BY 
    fecha;   `;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/ventasportrimestre', (req, res) => {

    const sql = `SELECT 
    trimestre, 
    SUM(precio * cantidad) AS Ventas_totales
    FROM 
        H_venta
    JOIN 
        D_Tiempo ON H_venta.idtiempo = D_Tiempo.idtiempo
    GROUP BY 
    trimestre; `;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/ventasporcategoriadeproducto', (req, res) => {

    const sql = `SELECT 
    p.nombre_categoria,
    SUM(hv.precio * hv.cantidad) AS Ventas_Totales
    FROM 
        H_venta hv
    JOIN 
        D_Producto p ON hv.idproducto = p.idproducto
    GROUP BY 
        p.nombre_categoria
    ORDER BY 
    Ventas_Totales DESC;   `;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/ventasdeproductoporstock', (req, res) => {

    const sql = `SELECT 
    p.nombre,
    SUM(hv.precio * hv.cantidad) AS Ventas_Totales
    FROM 
        H_venta hv
    JOIN 
        D_Producto p ON hv.idproducto = p.idproducto
    WHERE 
        p.existencia > 0
    GROUP BY 
        p.nombre
    ORDER BY 
    Ventas_Totales DESC;   `;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/promedioventasproducto', (req, res) => {

    const sql = `SELECT 
    p.nombre,
    AVG(hv.precio * hv.cantidad) AS Promedio_Ventas
    FROM 
        H_venta hv
    JOIN 
        D_Producto p ON hv.idproducto = p.idproducto
    GROUP BY 
        p.nombre
    ORDER BY 
    Promedio_Ventas DESC;     `;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/ventasporproductoymes', (req, res) => {

    const sql = `SELECT 
    p.nombre,
    t.mes,
    t.ayo,
    SUM(hv.precio * hv.cantidad) AS Ventas_Totales
    FROM 
        H_venta hv
    JOIN 
        D_Producto p ON hv.idproducto = p.idproducto
    JOIN 
        D_Tiempo t ON hv.idtiempo = t.idtiempo
    GROUP BY 
        p.nombre, t.mes, t.ayo
    ORDER BY 
    t.ayo, t.mes, Ventas_Totales DESC;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/top5ventasporproducto', (req, res) => {

    const sql = `SELECT 
    p.nombre,
    SUM(hv.precio * hv.cantidad) AS Cantidad_Total_Vendida
    FROM 
        H_venta hv
    JOIN 
        D_Producto p ON hv.idproducto = p.idproducto
    GROUP BY 
        p.nombre
    ORDER BY 
        Cantidad_Total_Vendida DESC
    LIMIT 5;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/top5ventasporproductoporcantidad', (req, res) => {

    const sql = `SELECT 
    p.nombre,
    SUM(hv.precio * hv.cantidad) AS Ventas_Totales
    FROM 
        H_venta hv
    JOIN 
        D_Producto p ON hv.idproducto = p.idproducto
    GROUP BY 
        p.nombre
    ORDER BY 
        Ventas_Totales DESC
    LIMIT 5;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/Totalgastadoporcadaclienteensuscompras', (req, res) => {

    const sql = `SELECT 
    D_cliente.nombre,
    D_cliente.apellido,
    SUM(D_producto.precio * H_venta.cantidad) AS total_gastado
    FROM H_venta
    JOIN D_cliente ON H_venta.DNI = D_cliente.DNI
    JOIN D_producto ON H_venta.idproducto = D_producto.idproducto
    GROUP BY D_cliente.DNI;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/Clientesquecompranproductosdeunacategoriaespecifica', (req, res) => {

    const sql = `SELECT DISTINCT 
    D_cliente.nombre,
    D_cliente.apellido,
    D_producto.nombre_categoria
    FROM H_venta
    JOIN D_cliente ON H_venta.DNI = D_cliente.DNI
    JOIN D_producto ON H_venta.idproducto = D_producto.idproducto
    WHERE D_producto.nombre_categoria = 'Vodka';`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/Productosmasvendidos', (req, res) => {

    const sql = `SELECT 
    D_producto.nombre,
    SUM(H_venta.cantidad) AS total_vendido
    FROM H_venta
    JOIN D_producto ON H_venta.idproducto = D_producto.idproducto
    GROUP BY D_producto.idproducto
    ORDER BY total_vendido DESC;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/Ventasconinformaciondeclienteproductoempleado', (req, res) => {

    const sql = `SELECT 
    H_venta.idventa,
    D_cliente.nombre AS nombre_cliente,
    D_cliente.apellido AS apellido_cliente,
    D_producto.nombre AS nombre_producto,
    D_empleado.nombre AS nombre_empleado,
    D_empleado.apellido AS apellido_empleado,
    H_venta.cantidad,
    D_tiempo.fecha
    FROM H_venta
    JOIN D_cliente ON H_venta.DNI = D_cliente.DNI
    JOIN D_tiempo ON H_venta.idtiempo = D_tiempo.idtiempo
    JOIN D_producto ON H_venta.idproducto = D_producto.idproducto
    JOIN D_empleado ON H_venta.idempleado = D_empleado.idempleado;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/Totaldeingresosgeneradosporcadaempleado', (req, res) => {

    const sql = `SELECT 
    D_empleado.nombre,
    D_empleado.apellido,
    SUM(D_producto.precio * H_venta.cantidad) AS total_ingresos
    FROM H_venta
    JOIN D_empleado ON H_venta.idempleado = D_empleado.idempleado
    JOIN D_producto ON H_venta.idproducto = D_producto.idproducto
    GROUP BY D_empleado.idempleado;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/Todoslosproductosvendidosaunclienteespecifico', (req, res) => {

    const sql = `  SELECT 
    D_cliente.nombre AS nombre_cliente,
    D_cliente.apellido AS apellido_cliente,
    D_producto.nombre AS nombre_producto,
    H_venta.cantidad,
    D_tiempo.fecha
    FROM H_venta
    JOIN D_cliente ON H_venta.DNI = D_cliente.DNI
    JOIN D_tiempo ON H_venta.idtiempo = D_tiempo.idtiempo
    JOIN D_producto ON H_venta.idproducto = D_producto.idproducto
    WHERE D_cliente.DNI = 2;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/Ingresostotalesgeneradosporcadacliente', (req, res) => {

    const sql = `SELECT 
    D_cliente.nombre,
    D_cliente.apellido,
    SUM(D_producto.precio * H_venta.cantidad) AS total_gastado
    FROM H_venta
    JOIN D_cliente ON H_venta.DNI = D_cliente.DNI
    JOIN D_producto ON H_venta.idproducto = D_producto.idproducto
    GROUP BY D_cliente.DNI;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.get('/Productosmasvendidosysucantidadtotalvendida', (req, res) => {

    const sql = `SELECT 
    D_producto.nombre,
    SUM(H_venta.cantidad) AS total_vendido
    FROM H_venta
    JOIN D_producto ON H_venta.idproducto = D_producto.idproducto
    GROUP BY D_producto.idproducto
    ORDER BY total_vendido DESC;`;

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla ventas' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

 

  return router;
};