const express = require('express');
const userRoutes = require('./routes/userRoutes');

// ===== SWAGGER : Importation des bibliothèques =====
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 3000; 

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
                        id: {
                            type: 'integer',
                            description: 'ID unique de l\'utilisateur'
                        },
                        name: {
                            type: 'string',
                            description: 'Nom de l\'utilisateur'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Adresse email de l\'utilisateur'
                        },
                        balance: {
                            type: 'number',
                            format: 'float',
                            description: 'Solde du compte bancaire'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date de création du compte'
                        }
                    },
                    required: ['id', 'name', 'email', 'balance', 'createdAt']
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            description: 'Message d\'erreur'
                        },
                        error: {
                            type: 'string',
                            description: 'Détails de l\'erreur'
                        }
                    }
                },
                Success: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            description: 'Message de succès'
                        }
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

// Routes
app.use('/api', userRoutes);

// Route d'accueil
app.get('/', (req, res) => {
    // Utilise l'URL fournie par Render ou localhost en développement
    const baseUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
    res.json({
        message: "API Bancaire - Bienvenue !",
        documentation: `${baseUrl}/api-docs`
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📚 Documentation Swagger : http://localhost:${PORT}/api-docs`);
    console.log(`📝 API disponible : http://localhost:${PORT}/api/users`);
});