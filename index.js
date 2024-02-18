import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import task1Route from './routes/task1Route.js';
import task2Route from './routes/task2Route.js';
import os from 'os';
import { exec } from 'child_process';

dotenv.config();



const app = express();

connectDB();
app.use(bodyParser.json());

app.use('/api/t1',task1Route);
app.use('/api/t2',task2Route);

const trackCpu = () => {
    const cpuUsage = os.loadavg()[0]; 
    console.log('CPU usage:', cpuUsage);
  
    if (cpuUsage >= 0.7) {
      console.log('Restarting server');
      restartServer();
    }
  };

  const restartServer = () => {
    exec('npm start', (error, stdout, stderr) => {
      if (error) {
        console.error('Error restarting server:', error);
        return;
      }
      console.log('Server restarted successfully:', stdout);
    });
  };
  
setInterval(trackCpu, 5000);

const PORT = process.env.PORT || 8080

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`)
})

