const { createServer } = require("node:http")
const next = require("next")

const dev = process.env.NODE_ENV !== "production"
const hostname = process.env.HOST || "0.0.0.0"
const port = Number.parseInt(process.env.PORT || "3000", 10)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    createServer((request, response) => handle(request, response)).listen(
      port,
      hostname,
      () => {
        console.log(`Mauritius Holidays is running on http://${hostname}:${port}`)
      },
    )
  })
  .catch((error) => {
    console.error("Unable to start the application:", error)
    process.exit(1)
  })
