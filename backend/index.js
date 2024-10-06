const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to make predictions
app.post('/predict', (req, res) => {
    const { IT_Load_kW, Outdoor_Temp_C, Indoor_Temp_C, Fan_Speed_RPM } = req.body;

    // Call the Python predict script with parameters
    exec(`python python-scripts/predict.py ${IT_Load_kW} ${Outdoor_Temp_C} ${Indoor_Temp_C} ${Fan_Speed_RPM}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: 'Error in prediction' });
        }

        // Parse the output from Python
        const result = JSON.parse(stdout);
        res.json(result);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
