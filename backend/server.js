import {startPollingServices} from "./services/usgsService.js";
import express from 'express';
import quakeRoutes from './routes/quakeRoutes.js'
import subscriptionRoutes from './routes/subscriptionRoutes.js'
import cors from 'cors';

const app = express();
app.use(cors({origin:true}))
app.use(express.json())



app.use('/api',quakeRoutes);
app.use('/api/subscription',  subscriptionRoutes);

const PORT = process.env.PORT || 5001;

startPollingServices();
app.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`);});
