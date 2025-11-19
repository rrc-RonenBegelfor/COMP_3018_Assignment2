import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Management API Documentation",
            version: "1.0.0",
            description:
                "This is the API documentation for the Task Management application.",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
                description: "Local server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                Employee: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "Unique identifier for the employee",
                        },
                        name: {
                            type: "string",
                            description: "Full name of the employee",
                        },
                        position: {
                            type: "string",
                            description: "Job position of the employee",
                        },
                        department: {
                            type: "string",
                            description: "Department of the employee",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            description: "Email address of the employee",
                        },
                        phone: {
                            type: "string",
                            description: "Phone number of the employee",
                        },
                        branchId: {
                            type: "number",
                            description: "ID of the branch the employee belongs to",
                        },
                    },
                    required: ["name", "position", "department", "email", "phone", "branchId"],
                },
                EmployeeRequest: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            description: "Full name of the employee",
                        },
                        position: {
                            type: "string",
                            description: "Job position of the employee",
                        },
                        department: {
                            type: "string",
                            description: "Department of the employee",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            description: "Email address of the employee",
                        },
                        phone: {
                            type: "string",
                            description: "Phone number of the employee",
                        },
                        branchId: {
                            type: "number",
                            description: "ID of the branch the employee belongs to",
                        },
                    },
                    required: ["name", "position", "department", "email", "phone", "branchId"],
                },
                Branch: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "Unique identifier for the branch",
                        },
                        name: {
                            type: "string",
                            description: "Name of the branch",
                        },
                        address: {
                            type: "string",
                            description: "Physical address of the branch",
                        },
                        phone: {
                            type: "string",
                            description: "Phone number of the branch",
                        },
                    },
                    required: ["name", "address", "phone"],
                },
                BranchRequest: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            description: "Name of the branch",
                        },
                        address: {
                            type: "string",
                            description: "Physical address of the branch",
                        },
                        phone: {
                            type: "string",
                            description: "Phone number of the branch",
                        },
                    },
                    required: ["name", "address", "phone"],
                },
                ApiResponse: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            enum: ["success", "error"],
                            description: "Status of the API response",
                        },
                        data: {
                            type: "object",
                            description: "Response data",
                        },
                        message: {
                            type: "string",
                            description: "Success message",
                        },
                        error: {
                            type: "string",
                            description: "Error message",
                        },
                        code: {
                            type: "string",
                            description: "Error code",
                        },
                    },
                    required: ["status"],
                },
            },
        }
    },
    apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/validation/*.ts"], // Path to the API docs and schemas
};

// Generate the Swagger spec
export const generateSwaggerSpec = (): object => {
    return swaggerJsdoc(swaggerOptions);
};