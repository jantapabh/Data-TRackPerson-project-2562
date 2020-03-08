let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());


app.use('/api', bodyParser.json(), router);
app.use('/api', bodyParser.urlencoded({

    extended: false

}), router)


let persons = [{
     
    data: "25-07-2563",
    time: 3.30,
    event_code: 255,
    mac_addr: 6.5,
    rssi: 25,
    latitude : 7.89059,
    longitude: 98.3981

},
{
    data: "26-07-2563",
    time: 3.30,
    event_code: 255,
    mac_addr: 6.5,
    rssi: 25,
    latitude : "7.89059",
    longitude: "98.3981"
},

{
    data: "27-07-2563",
    time: 3.30,
    event_code: 255,
    mac_addr: 6.5,
    rssi: 25,
    latitude : 7.89059,
    longitude: 98.3981
}
];

let pm25_data = [ 

    {
        location : {

            name: "มหาวิทยาลัยสงขลานครินทร์",
            latitude: "7.893779",
            longitude: "98.3507683",
        },

        pm : 300,
        time : 5,
        date : "25-03-2563"

    }
]

router.route('/persons')


    .get((req, res) => res.json(persons))
    //ขอค่าจาก  Person ใช้ get

    .post((req, res) => {

        let person = {}


        person.date = req.body.date;
        person.time = req.body.time;
        person.event_code = req.body.event_code;
        person.mac_addr = req.body.mac_addr;
        person.rssi = req.body.rssi;
        person.latitude = req.body.latitude;
        person.longitude = req.body.longitude;
        persons.push(person);
        res.json({ message: 'person Create Finish' })

        // ส่วนการเพิ่มข้อมูลใช้ post
    })


    router.route('/pm25_data')


    .get((req, res) => res.json(pm25_data))
    //ขอค่าจาก  bear ใช้ get

    .post((req, res) => {

        let pm25_datas = {}


        pm25_datas.location.name = req.body.location.name;
        pm25_datas.location.latitude = req.body.location.latitude;
        pm25_datas.location.longitude = req.body.location.longitude;
        pm25_datas.pm = req.body.pm;
        pm25_datas.time = req.body.time;
        pm25_datas.date = req.body.date;
        pm25_data.push(pm25_datas);
        res.json({ message: 'pm25_data Create Finish' })

        // ส่วนการเพิ่มข้อมูลใช้ post PM25
    })


router.route('/persons/:person_date')

    .get((req, res) => {

        let date = req.params.person_date
        let index = persons.findIndex(person => (person.date === +date))
        res.json(persons[index])


    })

    .put((req, res) => {
        // Update a bear
        
        let date = req.params.person_date
        let index = persons.findIndex(person => (person.date === +date))
        person[index].date = req.body.date;
        person[index].time = req.body.time;
        person[index].event_code = req.body.event_code;
        person[index].mac_addr = req.body.mac_addr;
        person[index].rssi = req.body.rssi;
        person[index].latitude = req.body.latitude;
        person[index].longitude = req.body.longitude;
        res.json({ message: 'Person updated!' + req.params.person_date });
    })

    .delete((req, res) => {
        // Delete a bear
        // delete  bears[req.params.bear_id]
        let id = req.params.person_date
        let index = persons.findIndex(person => person.date === +date )
        persons.splice(index, 1)
        res.json({ message: 'Personss deleted: ' + req.params.person_date });
    })


app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(8000, () => console.log("Server is running"));