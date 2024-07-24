const processData = {
  Processid: 1024,
  Processname: "C:\\users\\system32\\notepad.exe",
  Commandline: "C:\\users\\system32\\notepad.exe password.txt",
  Owner: "Desktop-sam1023",
};

import axios from "axios";

// Function to send data to the server and store in the database
const sendDataToDatabase = async (data, authToken) => {
  try {
    // Replace 'http://your-server-url' with your actual server URL
    const response = await axios.post('http://your-server-url/api/sendData', data, {
      headers: {
        Authorization: `Bearer ${authToken}`, // Example of Bearer token authorization
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Data sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending data:', error.message);
    throw error;
  }
};

// Example authorization token (replace with your actual authorization logic)
const authToken = 'your_auth_token_here';

// Send processData to the database
sendDataToDatabase(processData, authToken)
  .then(() => {
    console.log('Data sent to database successfully.');
  })
  .catch((error) => {
    console.error('Failed to send data to database:', error.message);
  });


async function detail(req,res){
    
    const {userId} = req.id
    const checkUser = processData.find({Processid : userId})
    if(!checkUser){
        throw new Error("You are not Authenticate to get data.")
    }
    const result = processData
    if(!result){
        throw new Error("Data not found")
    }
    return result;
}

async function ProcessInfo(req,res){
     
    const {userId} = req.id
    const checkUser = processData.find({Processid : userId})
    if(!checkUser){
        throw new Error("You are not Authenticate to send data.")
    }
    const res = processData.json()

    if(!res){
        throw new Error("Something went wrong while sending data.")
    }
    return res
}

async function Discard(){
     
    const {userId} = req.id
    const checkUser = processData.find({Processid : userId})
    if(!checkUser){
        throw new Error("You are not Authenticate to delete data.")
    }
    processData = {}    
    const res = processData    
        return res
}

const getdata = axios.get('/get:id',detail)
const sendData = axios.get('/send:id',ProcessInfo)
const DeleteData = axios.get('/delete:id',Discard)