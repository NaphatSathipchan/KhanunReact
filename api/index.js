const express = require('express');
const port = 8080;
var cors = require('cors')
const app = express();
const equations = require('./data/equation.json');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(cors())

app.get('/getsample/:path*', (req, res) => {
  var path = req.params.path + req.params[0];
  const bisectionEquations = equations.filter(equation => equation.method === path);
  res.send(bisectionEquations);
});


/**
 * @swagger
 * /Bisection:
 *   get:
 *     description: Returns equations for Bisection method
 *     responses:
 *       200:
 *         description: Success
 */
app.get('/Bisection', (req, res) => {
    const bisectionEquations = equations.filter(equation => equation.method === 'Bisection');
    res.json(bisectionEquations);
});


// /**
//  * @swagger
//  * /FalsePosition:
//  *   get:
//  *     description: Returns equations for FalsePosition method
//  *     responses:
//  *       200:
//  *         description: Success
//  */
// app.get('/FalsePosition', (req, res) => {
//     const falsePositionEquations = equations.filter(equation => equation.method === 'FalsePosition');
//     res.json(falsePositionEquations);
// });

// /**
//  * @swagger
//  * /Onepoint:
//  *   get:
//  *     description: Returns equations for Onepoint method
//  *     responses:
//  *       200:
//  *         description: Success
//  */
// app.get('/Onepoint', (req, res) => {
//     const OnepointEquations = equations.filter(equation => equation.method === 'Onepoint');
//     res.json(OnepointEquations);
// });

// /**
//  * @swagger
//  * /Newtonraphson:
//  *   get:
//  *     description: Returns equations for Newtonraphson method
//  *     responses:
//  *       200:
//  *         description: Success
//  */
// app.get('/Newtonraphson', (req, res) => {
//     const NewtonraphsonEquations = equations.filter(equation => equation.method === 'Newtonraphson');
//     res.json(NewtonraphsonEquations);
// });

// /**
//  * @swagger
//  * /Secant:
//  *   get:
//  *     description: Returns equations for Secant method
//  *     responses:
//  *       200:
//  *         description: Success
//  */
// app.get('/Secant', (req, res) => {
//     const SecantEquations = equations.filter(equation => equation.method === 'Secant');
//     res.json(SecantEquations);
// });


app.get('/testswagger', (req, res) => {
    const { a, b, c } = req.query;
    if (a == 112 && b == 44 && c == 'prayut') {
      res.send('tumak');
    } else {
      res.send('lnwza');
    }
  });

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
