import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const api_key = "d288f22de1c03206acbafde0e980a31d";
// Api key: d288f22de1c03206acbafde0e980a31d

app.get('/', (req, res) => {
    res.render("index.ejs", { 
        condition : "Click on the button below",
        description : "",
        temp: ""
    });
});

app.post('/submitLocation', async (req, res) => {
    const lat = req.body.latitude;
    const lon = req.body.longitude;

    try {
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`);
        const { main, description } = result.data.weather[0];
        const { temp } = result.data.main;
        // console.log(main);
        // console.log(description);
        // console.log(temp);
        res.render("index.ejs" , { 
            condition : `Weather condition: ${main} `,
            description : `Weather Description: ${description}`,
            temp: `Temp: ${temp-273.15}°C`
        });

    }
    catch (error){
        console.log(error.response.data);
        res.status(500);
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


