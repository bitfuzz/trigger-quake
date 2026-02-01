// 🛡️ CRASH PREVENTER 🛡️
process.on('uncaughtException', (err) => {
    console.error('====================================');
    console.error('🔥 UNCAUGHT EXCEPTION CAUGHT 🔥');
    console.error('This error would have crashed the server, but we caught it.');
    console.error('Error Message:', err.message);
    console.error('Stack Trace:', err.stack);
    console.error('====================================');
    // We do NOT exit. The server stays alive.
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('====================================');
    console.error('🚨 UNHANDLED PROMISE REJECTION 🚨');
    console.error('Reason:', reason);
    console.error('====================================');
});


import {startPollingServices} from "./services/usgsService.js";
import express from 'express';
import quakeRoutes from './routes/quakeRoutes.js'
import subscriptionRoutes from './routes/subscriptionRoutes.js'
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';


dotenv.config({path:'./env'});

const app = express();
app.use(cors({origin:true}))
app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Point to the BUILD folder (Check if yours is 'dist' or 'build')
// Assuming you are using Vite (which creates 'dist')
const frontendDist = path.join(__dirname, '../frontend/dist'); 

app.use(express.static(frontendDist));


app.use('/api',quakeRoutes);
app.use('/api/subscription',  subscriptionRoutes);

app.get(/^(.*)$/, (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
});

const PORT = process.env.PORT || 5001;

startPollingServices();
app.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`);});
