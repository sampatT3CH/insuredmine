import { Worker } from 'node:worker_threads';
import multer from 'multer';
import User from '../models/userModel.js';
import PolicyInfo from '../models/policyInfoModel.js';
import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import UserAccount from '../models/userAccountModel.js';
import PolicyCategory from '../models/policyCategoryModel.js';
import PolicyCarrier from '../models/policyCarrierModel.js';
import Agent from '../models/agentModel.js'
// import {uploadWorker} from './uploadWorker.js'




export const uploadData = async (req, res) => {
  try {

// const workbook = xlsx.readFile('new_data_copy.xlsx');
// const sheetName = workbook.SheetNames[0];
// const sheet = workbook.Sheets[sheetName];
// const data = xlsx.utils.sheet_to_json(sheet);
const worker = new Worker('./uploadWorker.js');
worker.on('message', (result) => {
  result.map(async(val) => {
    const agent =  await Agent.create({ agentName: val.agent })
    const policycarr = await PolicyCarrier.create({ companyName:val.company_name  })
    const policycateg = await PolicyCategory.create({ categoryName: val.category_name  })
    const useracc = await UserAccount.create({ accountName: val.account_name  })
    const user =  await User.create({ 
       firstName: val.firstname,
       dob: val.dob,
       address: val.address,
       phoneNumber: val.phone,
       state: val.state,
       zipCode: val.zip,
       email: val.email,
       gender: "male",
       userType: val.userType
     })
     const policyInf = await PolicyInfo.create({
       policyNumber: val.policy_number,
       policyStartDate: new Date(val.policy_start_date),
       policyEndDate: new Date(val.policy_end_date),
       policyCategory: policycateg._id, 
       collectionId: "",
       companyCollectionId: "",
       userId: user._id 
     });
   })
})



res.status(200).json({
  message:"data saved successfully"
})



  } catch (error) {
    res.status(500).send(error);
  }
};



export const policyInfo = async (req,res) => {
    const username = req.params.username;
try {
    const user = await User.findOne({ firstName: username });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const policyInfo = await PolicyInfo.find({ userId: user._id });
    res.json({ user, policyInfo,message:"success" });
} catch (err) {
    res.json({message:err})
}
   
}

export const aggregatedPolicy = async (req,res) => {
    try{
        const aggregated = await PolicyInfo.aggregate([
            {
              $group: {
                _id: '$userId',
                totalPolicies: { $sum: 1 },
              }
            },
            {
              $lookup: {
                from: 'users', 
                localField: '_id',
                foreignField: '_id',
                as: 'userInfo'
              }
            },
            {
              $unwind: '$userInfo'
            },
            {
              $project: {
                _id: 0,
                userId: '$_id',
                userName: '$userInfo.firstName',
                totalPolicies: 1,
              }
            }
          ]);
      
          res.json(aggregated);

    } catch (err) {
        res.json({message:err})
    }
}
