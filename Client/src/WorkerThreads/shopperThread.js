// const shopperThread=()=>{
    
//TODO import not working outside module
// import { FindCustomer } from '../api/serverFindCustomer'
// self.importScripts('../api/serverFindCustomer')

importScripts('../api/serverFindCustomer');
onmessage = (e) => {
        // console.log("Message received from main script");
        const workerResult = `Names: ${e.data[0]} and ${ e.data[1]}`;
        console.log("Posting message back to main script");

        FindCustomer().then(r=>console.log(r));

        postMessage(workerResult);

};

// }

// export default shopperThread;