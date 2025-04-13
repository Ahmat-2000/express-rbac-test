import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/dbConnect.js';
import authRouter from './routes/authRoutes.js';
import permissionRouter from './routes/permissionRoutes.js';

dotenv.config();

await dbConnect();

const app = express();


// Middleware that help us to convert data to json
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('Hello World')
});

app.use('/api/auth', authRouter);

app.use('/api/permissions', permissionRouter);

// Start the server
const port = process.env.PORT || "3000"
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})
