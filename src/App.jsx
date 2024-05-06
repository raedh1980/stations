
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Make sure your CSS file is imported


const stationMapping = {
    "ocnqt975": "عبين",
    "jywmk994": "الطيبة الجنوبية",
    "tldig944": "رجم الشوف",
    "zavsy600": "السلالم",
    "mgihz100": "الصبيحي",
    "vblpt221": "اربد",
    "ldhvk690": "الرشادية",
    "vxwtk243": "الطفيلة",
    "tbjgo427": "الشراه",
    "qxyne738": "المفرق",
    "jhcbn486": "سحاب",
    "nztkq622": "عجلون",
    "jixdw557": "المقابلين",
    "jmwgr490": "جبل عمان",
    "jlqpp220": "ام السماق",
    "tnhkw851": "تلاع العلي",
    "latxr924": "جبل اللويبدة",
    "zpzih551": "ام السماق",
    "emdtr434": "الهاشمي",
    "cgofb280": "غمدان",
    "smwoo943": "مأدبا",
    "mcfud963": "مرج الحمام",
    "ewaio945": "الكرك",
    "riuae357": "جرش الكفير",
    "bbzjs582": "معان",
    "cxaqx785": "الشوبك",
    "dnhiq564": "الرونق",
    "lufbk802": "الزرقاء",
    "vwjcb125": "جبل المريخ",
    "IAMMAN46": "جبل الزهور ",
    "IJERAS1": "جرش",
    "IAMMAN21": "طبربور",
    "IALJAM3": "تلاع - زياد",
    "IALQUW1":"ابو علندا",
    "IALJAM4" : "الكوم"
};

function degreesToCardinalDetailed(degrees) {
    const cardinals = [
        "N", "NNE", "NE", "ENE",
        "E", "ESE", "SE", "SSE",
        "S", "SSW", "SW", "WSW",
        "W", "WNW", "NW", "NNW", "N"
    ];
    return cardinals[Math.round(((degrees * 10) % 3600) / 225)];
}
function getWindSpeedColor(speed) {
    if (speed === 0) return '#FFFFFF'; // White for 0
    if (speed >= 1 && speed < 7) return '#B3E5FC'; // Very Light Sky Blue
    if (speed >= 7 && speed < 15) return '#CCFFFF'; // Sky Blue
    if (speed >= 15 && speed < 25) return '#99FF99'; // Blue Green
    if (speed >= 25 && speed < 38) return '#CCFF00'; // Light Green
    if (speed >= 38 && speed < 49) return '#FFFF66'; // Green LED
    if (speed >= 49 && speed < 59) return '#FF9800'; // Yellow LED
    if (speed >= 59 && speed < 69) return '#FF9800'; // Orange
    if (speed >= 69 && speed < 79) return '#FF5722'; // Brick Red
    if (speed >= 79 && speed < 89) return '#F44336'; // Bright Red
    if (speed >= 89 && speed < 100) return '#D32F2F'; // Red
    if (speed > 100) return '#E91E63'; // Pink LED
    return '#FFFFFF'; // Default color for any undefined cases
}
function getRainRateColor(rainRate) {
    if (rainRate) {
        const ranges = [

            { min: 0.1, max: 3, color: '#E0FFFF', fontColor: '#000000' },  // Pale blue

            { min: 3, max: 10, color: '#1E90FF', fontColor: '#FFFFFF' }, // Soft teal
            { min: 10, max: 20, color: '#00BFFF', fontColor: '#FFFFFF' },// Light green

            { min: 20, max: 39, color: '#4CC417', fontColor: '#FFFFFF' },// Light yellow
            { min: 39, max: 49, color: '#00FF00', fontColor: '#000000' },// Yellow32CD32

            { min: 49, max: 59, color: '#ADFF2F', fontColor: '#000000' },// Orange00FF00
            { min: 59, max: 69, color: '#BDF516', fontColor: '#000000' },// Deep coral

            { min: 69, max: 79, color: '#E2F516', fontColor: '#000000' },// Reddish orange
            { min: 79, max: 89, color: '#FFFF33', fontColor: '#000000' },// Reddish orange
            { min: 89, max: 99, color: '#FEF250', fontColor: '#FFFFFF' },// Red
            { min: 99, max: 115, color: '#FFDB58', fontColor: '#FFFFFF' },// Deep red
            { min: 115, max: 129, color: '#FDD017', fontColor: '#FFFFFF' },// Darker red
            { min: 129, max: 220, color: '#F6BE00', fontColor: '#FFFFFF' },// Dark red

        ];
        const defaultStyle = { backgroundColor: '#FFFFFF', fontColor: '#000000' };
        const range = ranges.find(r => rainRate >= r.min && rainRate < r.max);
        console.log("Rain Rate:", rainRate, "Style Applied:", range ? { backgroundColor: range.color, color: range.fontColor } : defaultStyle);
        return range ? { backgroundColor: range.color, color: range.fontColor } : defaultStyle;
    }
}
function getRainTotalColor(totalRain) {

    if (totalRain) { 
    const ranges = [

        { min: 0.1, max: 3, color: '#E0FFFF', fontColor:'#000000' },  // Pale blue
        
        { min: 3, max: 10, color: '#1E90FF', fontColor: '#FFFFFF' }, // Soft teal
        { min: 10, max: 20, color: '#00BFFF', fontColor: '#FFFFFF' },// Light green

        { min: 20, max: 39, color: '#4CC417', fontColor: '#FFFFFF' },// Light yellow
        { min: 39, max: 49, color: '#00FF00', fontColor: '#000000' },// Yellow32CD32

        { min: 49, max: 59, color: '#ADFF2F', fontColor: '#000000' },// Orange00FF00
        { min: 59, max: 69, color: '#BDF516', fontColor: '#000000' },// Deep coral

        { min: 69, max: 79, color: '#E2F516', fontColor: '#000000' },// Reddish orange
        { min: 79, max: 89, color: '#FFFF33', fontColor: '#000000' },// Reddish orange
        { min: 89, max: 99, color: '#FEF250', fontColor: '#FFFFFF' },// Red
        { min: 99, max: 115, color: '#FFDB58', fontColor: '#FFFFFF' },// Deep red
        { min: 115, max: 129, color: '#FDD017', fontColor: '#FFFFFF' },// Darker red
        { min: 129, max: 220, color: '#F6BE00', fontColor: '#FFFFFF' },// Dark red

    ];
    const defaultStyle = { backgroundColor: '#FFFFFF', fontColor: '#000000' };
    const range = ranges.find(r => totalRain >= r.min && totalRain < r.max);
    console.log("Rain Total:", totalRain, "Style Applied:", range ? { backgroundColor: range.color, color: range.fontColor } : defaultStyle);
    return range ? { backgroundColor: range.color, color: range.fontColor } : defaultStyle;
    }

}
function getTemperatureColor(temp) {

   
    // Define ranges for temperatures from 0 to 60, changing every 3 degrees
    const ranges = [


        { min: -10, max: 0, color: '#000000', fontColor: '#FFFFFF' },  // Pale blue
        { min: 0.1, max: 3, color: '#0000FF', fontColor: '#FFFFFF' },  // Lighter blue
        { min: 3, max: 5, color: '#6495ED', fontColor: '#FFFFFF' },  // Light cyan

        { min: 5, max: 7, color: '#1E90FF', fontColor: '#FFFFFF' }, // Soft teal
        { min: 7, max: 8, color: '#00BFFF', fontColor: '#FFFFFF' },// Light green
        { min: 8, max: 11, color: '#32CD32', fontColor: '#FFFFFF' },// Lime

        { min: 11, max: 12, color: '#4CC417', fontColor: '#000000' },// Light yellow
        { min: 12, max: 14, color: '#00FF00', fontColor: '#000000' },// Yellow32CD32

        { min: 14, max: 16, color: '#ADFF2F', fontColor: '#000000' },// Orange00FF00
        { min: 16, max: 18, color: '#BDF516', fontColor: '#000000' },// Deep coral

        { min: 18, max: 20, color: '#E2F516', fontColor: '#000000' },// Reddish orange
        { min: 20, max: 22, color: '#FFFF33', fontColor: '#000000' },// Reddish orange
        { min: 22, max: 24, color: '#FEF250', fontColor: '#000000' },// Red
        { min: 24, max: 25, color: '#FFDB58', fontColor: '#000000' },// Deep red
        { min: 25, max: 26, color: '#FDD017', fontColor: '#000000' },// Darker red
        { min: 26, max: 28, color: '#F6BE00', fontColor: '#000000' },// Dark red

        { min: 28, max: 30, color: '#FF6347', fontColor: '#FFFFFF' },// Burgundy
        { min: 30, max: 33, color: '#FF4500', fontColor: '#FFFFFF' },// Plum
        { min: 33, max: 37, color: '#FF0000', fontColor: '#FFFFFF' },// Dark plum
        { min: 37, max: 39, color: '#B22222', fontColor: '#FFFFFF' },  // Near black

        { min: 40, max: 50, color: '#8B0000', fontColor: '#FFFFFF' }  // Near black
    ];

    const defaultStyle = { backgroundColor: '#FFFFFF', fontColor: '#000000' };
    const range = ranges.find(r => temp >= r.min && temp < r.max);
    console.log("Temp:", temp, "Style Applied:", range ? { backgroundColor: range.color, color: range.fontColor } : defaultStyle);
    return range ? { backgroundColor: range.color, color: range.fontColor } : defaultStyle;
}



function App() {
    const [weatherData, setWeatherData] = useState([]);
    // At the top where you define your states
    const [sortConfig, setSortConfig] = useState({ key: 'temp', direction: 'ascending' });
    const [lastUpdateTime, setLastUpdateTime] = useState('');

        
    const sortData = (data) => {
        let sortableItems = [...data];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    };



    useEffect(() => {
        const fetchData = async () => {

            /*
            const statsUrl = 'https://corsproxy.io/?' +'api/wsquery/query/multiQuerylatlonOffset';
            const statsParams = {
                params: {
                    country: 'JO',
                    range: '0d:now',
                    attrib: 'temp.max,temp.min,windspeed.max,windgust.max,baromin.max,baromin.min,baromin.avg,rainin.sum',
                    latlon: '31.890383,35.896030'
                }
            };*/
           
            setLastUpdateTime(new Date().toLocaleString());  // Updates with the current time



            const apiKey = 'c0146b8d4b904893946b8d4b90589325'; // Weather Underground API Key
            const stationId = 'IAMMAN46'; // Weather Underground Station ID
            const wuUrl = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId}&format=json&units=m&apiKey=${apiKey}&numericPrecision=decimal`;
            const wuDaily = `https://api.weather.com/v2/pws/observations/all/1day?stationId=${stationId}&format=json&units=m&apiKey=${apiKey}&numericPrecision=decimal`;

            const apiKey2 = 'fb407fb8c0454376807fb8c045237692'; // Weather Underground API Key
            const stationId2 = 'IJERAS1'; // Weather Underground Station ID
            const wuUrl2 = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId2}&format=json&units=m&apiKey=${apiKey2}&numericPrecision=decimal`;
            const wuDaily2 = `https://api.weather.com/v2/pws/observations/all/1day?stationId=${stationId2}&format=json&units=m&apiKey=${apiKey2}&numericPrecision=decimal`;



            const apiKey3 = '36d76d5a338a4641976d5a338a3641bb'; // Weather Underground API Key
            const stationId3 = 'IAMMAN21'; // Weather Underground Station ID
            const wuUrl3 = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId3}&format=json&units=m&apiKey=${apiKey3}&numericPrecision=decimal`;
            const wuDaily3 = `https://api.weather.com/v2/pws/observations/all/1day?stationId=${stationId3}&format=json&units=m&apiKey=${apiKey3}&numericPrecision=decimal`;


            const apiKey4 = '9bf5ca1d102a4146b5ca1d102aa1466b'; // Weather Underground API Key
            const stationId4 = 'IALJAM3'; // Weather Underground Station ID
            const wuUrl4 = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId4}&format=json&units=m&apiKey=${apiKey4}&numericPrecision=decimal`;
            const wuDaily4 = `https://api.weather.com/v2/pws/observations/all/1day?stationId=${stationId4}&format=json&units=m&apiKey=${apiKey4}&numericPrecision=decimal`;


            const apiKey5 = 'fa5b601da31748119b601da317281190'; // Weather Underground API Key
            const stationId5 = 'IALQUW1'; // Weather Underground Station ID
            const wuUrl5 = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId5}&format=json&units=m&apiKey=${apiKey5}&numericPrecision=decimal`;
            const wuDaily5 = `https://api.weather.com/v2/pws/observations/all/1day?stationId=${stationId5}&format=json&units=m&apiKey=${apiKey5}&numericPrecision=decimal`;


            const apiKey6 = '3db0ab40eef446bbb0ab40eef416bbb5'; // Weather Underground API Key
            const stationId6 = 'IALJAM4'; // Weather Underground Station ID
            const wuUrl6 = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId6}&format=json&units=m&apiKey=${apiKey6}&numericPrecision=decimal`;
            const wuDaily6 = `https://api.weather.com/v2/pws/observations/all/1day?stationId=${stationId6}&format=json&units=m&apiKey=${apiKey6}&numericPrecision=decimal`;



            // Original URL
            const apiUrl = 'https://stations.arabiaweather.com/wsquery/query/multiQuerylatlonOffset?country=JO&range=0d:now&attrib=temp.max,temp.min,windspeed.max,windgust.max,baromin.max,baromin.min,baromin.avg,rainin.sum&latlon=31.890383,35.896030' + Date.now();

            // With corsproxy.io
            const proxiedUrl = 'https://corsproxy.io/?' + encodeURIComponent(apiUrl);

           

            try {
                const [arabiaWeatherResult, wuResult, wuResult2, wuResult3, wuResult4, wuResult5, wuResult6, daily1, daily2, daily3, daily4, daily5,daily6,arStatsResult] = await Promise.all([
                    axios('https://stations.arabiaweather.com/weatherstation/api/get?ws=*&attr=*'),
                    axios.get(wuUrl),
                    axios.get(wuUrl2),
                    axios.get(wuUrl3),
                    axios.get(wuUrl4),
                    axios.get(wuUrl5),
                    axios.get(wuUrl6),
                    axios.get(wuDaily),
                    axios.get(wuDaily2),
                    axios.get(wuDaily3),
                    axios.get(wuDaily4),
                    axios.get(wuDaily5),
                    axios.get(wuDaily6),
                    axios.get(proxiedUrl)
                ]);


                //const arData = processWeatherData(arabiaWeatherResult.data);
                //const arStats = processStatsData(arStatsResult.data);

                const wuData = transformWUData(wuResult.data,daily1.data);
                const wuData2 = transformWUData(wuResult2.data, daily2.data);
                const wuData3 = transformWUData(wuResult3.data, daily3.data);
                const wuData4 = transformWUData(wuResult4.data, daily4.data);
                const wuData5 = transformWUData(wuResult5.data, daily5.data);
                const wuData6 = transformWUData(wuResult6.data, daily6.data);


                // Combine and process all data
                const arDataMerged = mergeData(arabiaWeatherResult.data, arStatsResult.data);

                // Combine the data from both sources
                const combinedData = [...arDataMerged, ...wuData, ...wuData2, ...wuData3, ...wuData4, ...wuData5, ...wuData6];

                // Sort the combined data by temperature
                combinedData.sort((a, b) => a.temp - b.temp);


                setWeatherData(combinedData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();
    }, []);


    function mergeData(arabiaWeatherData, statsData) {
        let dataMap = {};

        // Process Arabia Weather Data
        arabiaWeatherData.forEach(item => {
            const stationId = Object.keys(item)[0];
            const details = item[stationId];

            dataMap[stationId] = {
                ...dataMap[stationId],
                ...details,
                stationName: stationMapping[stationId],  // Assuming stationMapping is a predefined mapping of station IDs to names
                windspeed: details.windspeed ? (details.windspeed * 3.6).toFixed(1) : undefined,  // Converting and fixing the precision
                windgust: details.windgust ? (details.windgust * 3.6).toFixed(1) : undefined,
                windDirection: degreesToCardinalDetailed(details.winddir),
                windspeedColor: getWindSpeedColor(details.windspeed * 3.6),
                windgustColor: details.windgust ? getWindSpeedColor(details.windgust * 3.6) : '#ffffff', // Default white if no gust
                tempColor: getTemperatureColor(details.temp),
                rainRateColor: getRainRateColor(details.rainin),
                totalRainColor: getRainTotalColor(details.dailyrain)
            };
        });

        // Process Stats Data
        Object.entries(statsData).forEach(([stationId, records]) => {
            if (records.length > 0 && records[0].length > 0) {
                const record = records[0][0];
                dataMap[stationId] = {
                    ...dataMap[stationId],
                    tempMAX: record.tempMAX,
                    tempMIN: record.tempMIN,
                    windspeedMAX: (record.windspeedMAX * 3.6).toFixed(1),
                    windgustMAX: (record.windgustMAX * 3.6).toFixed(1),
                    barominMAX: record.barominMAX,
                    barominMIN: record.barominMIN,
                    barominAVG: record.barominAVG,
                    raininSUM: record.raininSUM.toFixed(1),
                    tempMaxColor: getTemperatureColor(record.tempMAX),
                    tempMinColor: getTemperatureColor(record.tempMIN),
                    windgustMaxColor: getWindSpeedColor(record.windgustMAX * 3.6),
                    last_updated: new Date(record.time).getTime() // Convert ISO string to timestamp if needed
                };
            }
        });

        return Object.values(dataMap).filter(item => item && item.temp !== undefined && item.stationName);//.sort((a, b) => a.temp - b.temp);
    }

    function transformWUData(currentData, dayData) {

        if (!currentData || !currentData.observations || currentData.observations.length === 0) {
            console.log("No current data available or station is offline");
            return []; // Return an empty array if no current data is available
        }
        if (!dayData || !dayData.observations || dayData.observations.length === 0) {
            console.log("No day data available");
            return []; // Return an empty array if no day data is available
        }

        const currentObservation = currentData.observations[0];
        const dayObservations = dayData.observations;

        // Compute max and min temperatures and wind gusts from the day data
        const tempMax = Math.max(...dayObservations.map(obs => obs.metric.tempHigh));
        const tempMin = Math.min(...dayObservations.map(obs => obs.metric.tempLow));
        const windGustMax = Math.max(...dayObservations.map(obs => obs.metric.windgustHigh));

     

        return [{
            stationName: stationMapping[currentObservation.stationID], // Assuming mapping exists
            temp: currentObservation.metric.temp,
            humidity: currentObservation.humidity,
            windspeed: currentObservation.metric.windSpeed ,
            windgust: currentObservation.metric.windGust,
            windDirection: degreesToCardinalDetailed(currentObservation.winddir),
            tempColor: getTemperatureColor(currentObservation.metric.temp),
            windspeedColor: getWindSpeedColor(currentObservation.metric.windSpeed ),
            windgustColor: getWindSpeedColor(currentObservation.metric.windGust ),
            dailyrain: currentObservation.metric.precipTotal.toFixed(1),
            rainin: currentObservation.metric.precipRate.toFixed(1),
            rainRateColor: getRainRateColor(currentObservation.metric.precipRate),
            totalRainColor: getRainTotalColor(currentObservation.metric.precipTotal),
            tempMAX:tempMax , // Converting to Celsius
            tempMIN: tempMin,
            tempMaxColor: getTemperatureColor(tempMax),
            tempMinColor: getTemperatureColor(tempMin),
            windgustMAX: windGustMax, // Converting to km/h
            windgustMaxColor: getWindSpeedColor(windGustMax),

            last_updated: currentObservation.obsTimeUtc
        }];

    }


  

    return (
        
 
        <div className="container">
            
            <table className="rtl-table" >
                <thead><tr><th>اخر تحديث: {lastUpdateTime}</th></tr>
                    <tr>
                        <th>المحطة</th>
                        <th className={sortConfig.key === 'stationName' ? `sorted-${sortConfig.direction}` : ''} onClick={() => setSortConfig({ key: 'temp', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>الحرارة</th>
                        <th className={sortConfig.key === 'stationName' ? `sorted-${sortConfig.direction}` : ''} onClick={() => setSortConfig({ key: 'humidity', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>الرطوبة</th>
                        <th className={sortConfig.key === 'stationName' ? `sorted-${sortConfig.direction}` : ''} onClick={() => setSortConfig({ key: 'windspeed', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>الرياح</th>
                        <th className={sortConfig.key === 'stationName' ? `sorted-${sortConfig.direction}` : ''} onClick={() => setSortConfig({ key: 'windDirection', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>الاتجاه</th>
                        <th className={sortConfig.key === 'stationName' ? `sorted-${sortConfig.direction}` : ''} onClick={() => setSortConfig({ key: 'windGust', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>الهبات</th>
                        <th className={sortConfig.key === 'stationName' ? `sorted-${sortConfig.direction}` : ''} onClick={() => setSortConfig({ key: 'rainin', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>الغزارة</th>
                        <th>المحطة</th>
                        <th className={sortConfig.key === 'stationName' ? `sorted-${sortConfig.direction}` : ''} onClick={() => setSortConfig({ key: 'dailyrain', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>الامطار</th>
                        <th className={sortConfig.key === 'stationName' ? `sorted-${sortConfig.direction}` : ''} onClick={() => setSortConfig({ key: 'tempMAX', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>العظمى</th>
                        <th className={sortConfig.key === 'stationName' ? `sorted-${sortConfig.direction}` : ''} onClick={() => setSortConfig({ key: 'tempMIN', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>الصغرى</th>
                        <th className={sortConfig.key === 'stationName' ? `sorted-${sortConfig.direction}` : ''} onClick={() => setSortConfig({ key: 'windGustMAX', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>اعلى هبة</th>
                    </tr>
                </thead>
                <tbody>
                    {sortData(weatherData).map((item, index) => (
                        <tr key={index}>
                            <td>{item.stationName}</td>
                          
                            <td style={{
                                backgroundColor: item.tempColor ? item.tempColor.backgroundColor : '#FFFFFF',
                                color: item.tempColor ? item.tempColor.color : '#000000'
                            }}>
                                {item.temp || '0'} 
                            </td>


                            <td>{item.humidity || '-'}%</td>
                            <td style={{ backgroundColor: item.windspeedColor }}>{item.windspeed || '-'} كم</td>

                            <td>{item.windDirection || '-'}</td>
                            <td style={{ backgroundColor: item.windgustColor }}>{item.windgust || '-'} كم</td>
                          
                              
                            <td style={{
                                backgroundColor: item.rainRateColor ? item.rainRateColor.backgroundColor : '#FFFFFF',
                                color: item.rainRateColor ? item.rainRateColor.color : '#000000'
                            }}>
                                {item.rainin || '0'} مم
                            </td>



                            <td>{item.stationName}</td>
                            <td style={{
                                backgroundColor: item.totalRainColor ? item.totalRainColor.backgroundColor : '#FFFFFF',
                                color: item.totalRainColor ? item.totalRainColor.color : '#000000'
                            }}>
                                {item.dailyrain || '0'} مم
                            </td>

                            
                    

                            <td style={{
                                backgroundColor: item.tempMaxColor ? item.tempMaxColor.backgroundColor : '#FFFFFF',
                                color: item.tempMaxColor ? item.tempMaxColor.color : '#000000'
                            }}>
                                {item.tempMAX || '0'}
                            </td>

                            <td style={{
                                backgroundColor: item.tempMinColor ? item.tempMinColor.backgroundColor : '#FFFFFF',
                                color: item.tempMinColor ? item.tempMinColor.color : '#000000'
                            }}>
                                {item.tempMIN || '0'}
                            </td>


                            <td style={{ backgroundColor: item.windgustMaxColor }}>{item.windgustMAX || '-'} كم</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;