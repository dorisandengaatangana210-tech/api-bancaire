const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const bankRoutes = require('./routes/bankRoutes');   // ← Ajouté

// ===== SWAGGER : Importation des bibliothèques =====
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 3000; 

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques (formulaire.html, etc.)
app.use(express.static(path.join(__dirname)));

// ===== SWAGGER : Configuration =====
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Bancaire',
            version: '1.0.0',
            description: 'API de gestion des utilisateurs bancaires'
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Serveur local'
            }
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID unique' },
                        name: { type: 'string', description: 'Nom' },
                        email: { type: 'string', format: 'email', description: 'Email' },
                        balance: { type: 'number', format: 'float', description: 'Solde' },
                        createdAt: { type: 'string', format: 'date-time', description: 'Date création' }
                    },
                    required: ['id', 'name', 'email', 'balance', 'createdAt']
                },
                Transaction: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        fromUserId: { type: 'integer', nullable: true },
                        toUserId: { type: 'integer', nullable: true },
                        amount: { type: 'number' },
                        type: { type: 'string' },
                        description: { type: 'string' },
                        date: { type: 'string', format: 'date-time' }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: false },
                        message: { type: 'string' }
                    }
                },
                Success: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string' }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// ===== FIN SWAGGER =====

// ===== ROUTES =====
app.use('/api', userRoutes);        // Routes des utilisateurs & transactions
app.use('/api/banks', bankRoutes);  // Routes des banques

// Route d'accueil (JSON)
app.get('/', (req, res) => {
    res.json({
        message: "API Bancaire - Bienvenue !",
        documentation: "http://localhost:3000/api-docs",
        formulaire: "http://localhost:3000/formulaire.html"
    });
});

// Servir le formulaire HTML
app.get('/formulaire.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'formulaire.html'));
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📚 Documentation Swagger : http://localhost:${PORT}/api-docs`);
    console.log(`📝 API disponible : http://localhost:${PORT}/api/users`);
});