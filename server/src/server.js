const app = require("./app");
const PORT = process.env.PORT || 3030;

// Listen express (REST) and (Socket)
app.listen(PORT).on('listening', () => console.log(`Realtime server running on port ${PORT}`));
