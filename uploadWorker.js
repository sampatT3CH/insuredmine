import xlsx from 'xlsx';
import { parentPort, workerData } from 'worker_threads';

    const workbook = xlsx.readFile('new_data_copy.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    
    parentPort.postMessage(data)


