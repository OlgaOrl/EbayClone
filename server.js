require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
app.use(express.json());

// Подключение роутов вашего API
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/users', userRoutes);
app.use('/listings', listingRoutes);
app.use('/orders', orderRoutes);

// Подключение Swagger документации (единственная версия)
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API docs available at: ${BASE_URL}/docs`);
});
