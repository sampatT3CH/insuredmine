import Collection1 from '../models/collection1Model.js'
import Collection2 from '../models/collection2Model.js'
import cron from 'node-cron';

export const insertMessage = async (req,res) => {
try {
    console.log(req.body)
    const { message, day, time } = req.body;
    const timestamp = new Date(`${day}T${time}`);

    await Collection1.create({ message, timestamp });

    // cron.schedule('* * * * *', () => {
    //     transferMessage();
    // });

    cron.schedule(timestamp, () => {
        transferMessage();
    });

    res.status(200).json({
        message:"inserted and transfer job scheduled"
    })
} catch(err) {
    res.status(500).json({
        message:err
    })

}
}


const transferMessage = async () => {
    try {
      const messageData = await Collection1.findOneAndDelete({});
      console.log(messageData,"check");
      if (messageData) {
        await Collection2.create({ message:messageData.message, timestamp:messageData.timestamp });
        console.log('Message transferred from Collection1 to Collection2');
      }
    } catch (error) {
      console.error('Error transferring message');
    }
  };