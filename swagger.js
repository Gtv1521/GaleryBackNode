export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Rest Galery",
      version: "1.0.0",
      description: "API documentation express server"
    },
    servers: [
      {
        url: "https://bvdnxbgz-5000.use2.devtunnels.ms/"
      }
    ]
  },
  apis: ["src/app/routes/*.js"]
}