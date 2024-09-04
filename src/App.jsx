
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
    "jmwgr490": "جبل عمان",
    "jlqpp220": "ام السماق",
    "tnhkw851": "تلاع العلي",
    "latxr924": "جبل اللويبدة",
    "zzidi409": "ام السماق",
    "emdtr434": "الهاشمي",
    "cgofb280": "غمدان",
    "smwoo943": "مأدبا",
    "I90583409": "مرج الحمام",
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
    "IALQUW1": "ابو علندا",
    "IALJAM4": "الكوم",
    "piqvi310": "شفابدران",
    "mkcef941": "الكرامة",
    "jixdw557": "البنيات",
     "IBEITY7": "بيت لحم"
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

    if (speed == 0) return '#FFFFFF'; // White for 0
    if (speed >= 0.1 && speed < 7) return '#E0F7FA'; // Very Light Sky Blue
    if (speed >= 7 && speed < 15) return '#D5F5E3'; // Sky Blue
    if (speed >= 15 && speed < 25) return '#ABEBC6'; // Blue Green
    if (speed >= 25 && speed < 38) return '#d5f07d'; // Light Green
    if (speed >= 38 && speed < 49) return '#e4f07d'; // Green LED
    if (speed >= 49 && speed < 59) return '#ffff91'; // Yellow LED
    if (speed >= 59 && speed < 69) return '#FBC02D'; // Orange
    if (speed >= 69 && speed < 79) return '#fc5a28'; // Brick Red
    if (speed >= 79 && speed < 89) return '#EF6C00'; // Bright Red
    if (speed >= 89 && speed < 100) return '#E53935'; // Red
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

        return range ? { backgroundColor: range.color, color: range.fontColor } : defaultStyle;
    }
}
function getRainTotalColor(totalRain) {

    if (totalRain) {
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
        const range = ranges.find(r => totalRain >= r.min && totalRain < r.max);

        return range ? { backgroundColor: range.color, color: range.fontColor } : defaultStyle;
    }

}

function getRHColor(RH) {

    if (RH) {
        const ranges = [

            { min: 0, max: 10, color: '#E0FFFF', fontColor: '#000000' },  // Pale blue

            { min: 10, max: 20, color: '#1E90FF', fontColor: '#FFFFFF' }, // Soft teal
            { min: 20, max: 30, color: '#00BFFF', fontColor: '#FFFFFF' },// Light green

            { min: 30, max: 40, color: '#4CC417', fontColor: '#FFFFFF' },// Light yellow
            { min: 40, max: 50, color: '#00FF00', fontColor: '#000000' },// Yellow32CD32

            { min: 50, max: 60, color: '#ADFF2F', fontColor: '#000000' },// Orange00FF00
            { min: 60, max: 70, color: '#BDF516', fontColor: '#000000' },// Deep coral

            { min: 70, max: 80, color: '#E2F516', fontColor: '#000000' },// Reddish orange
            { min: 80, max: 89, color: '#FFFF33', fontColor: '#000000' },// Reddish orange
            { min: 90, max: 100, color: '#FEF250', fontColor: '#FFFFFF' },// Red
        

        ];
        const defaultStyle = { backgroundColor: '#FFFFFF', fontColor: '#000000' };
        const range = ranges.find(r => RH >= r.min && RH < r.max);

        return range ? { backgroundColor: range.color, color: range.fontColor } : defaultStyle;
    }

}
function getTemperatureColor(value) {
   
    if (value >= -10 && value <= 0) {
        return { backgroundColor: '#000000', color: '#FFFFFF' }; // Pale blue
    } else if (value > 0 && value <= 5) {
        return { backgroundColor: '#0000FF', color: '#FFFFFF' }; // Lighter blue
    } else if (value > 5 && value <= 8) {
        return { backgroundColor: '#6495ED', color: '#FFFFFF' }; // Light cyan
    } else if (value > 8 && value <= 10) {
        return { backgroundColor: '#0F9F55', color: '#FFFFFF' }; // Soft teal
    } else if (value > 10 && value <= 13) {
        return { backgroundColor: '#12A95C', color: '#FFFFFF' }; // Light green
    } else if (value > 13 && value <= 15) {
        return { backgroundColor: '#15BB66', color: '#000000' }; // Lime
    } else if (value > 15 && value <= 16) {
        return { backgroundColor: '#1CD777', color: '#000000' }; // Light yellow
    } else if (value > 16 && value <= 18) {
        return { backgroundColor: '#BDF516', color: '#000000' }; // Orange

    } else if (value > 18 && value < 20) {
        return { backgroundColor: '#eaf516', color: '#000000' }; // Orange

    } else if (value >= 20 && value <= 22) {
        return { backgroundColor: '#FFFF33', color: '#000000' }; // Deep coral
    } else if (value > 22 && value <= 23) {
        return { backgroundColor: '#FEF250', color: '#000000' }; // Reddish orange
    } else if (value > 23 && value <= 24) {
        return { backgroundColor: '#FFDB58', color: '#000000' }; // Red
    } else if (value > 24 && value <= 25) {
        return { backgroundColor: '#FDD017', color: '#000000' }; // Deep red
    } else if (value > 25 && value <= 28) {
        return { backgroundColor: '#F9BF3F', color: '#000000' }; // Darker red
    } else if (value > 28 && value < 30) {
        return { backgroundColor: '#DF6D14', color: '#000000' }; // Dark red
    }
    else if (value >= 30 && value <= 32) {
        return { backgroundColor: '#ff3b3b', color: '#FFFFFF' }; // Burgundy
    }
    else if (value > 32 && value <= 34) {
        return { backgroundColor: '#fa1414', color: '#FFFFFF' }; // Plum
    }
    else if (value > 34 && value <= 36) {
        return { backgroundColor: '#fa1414', color: '#FFFFFF' }; // Plum
    }

    else if (value > 36 && value <= 38) {
        return { backgroundColor: '#b30000', color: '#FFFFFF' }; // Plum

    } else if (value > 38 && value <  40 ) {
        return { backgroundColor: '#800000', color: '#FFFFFF' }; // Dark plum

    } else if (value >= 40 && value < 42) {
        return { backgroundColor: '#5E0000', color: '#FFFFFF' }; // Near black
           
    } else if (value >= 42 && value <= 44) {
        return { backgroundColor: '#660000', color: '#FFFFFF' }; // Near black

    } else if (value > 44 && value <= 46) {
        return { backgroundColor: '#4d0000', color: '#FFFFFF' }; // Near black

    } else if (value > 46) {
        return { backgroundColor: '#330000', color: '#FFFFFF' }; // Near black

     } else {
        return { backgroundColor: '#FFFFFF', color: '#000000' }; // Default for out of range
    }
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

            setLastUpdateTime(new Date().toLocaleString());  // Updates with the current time

            const apiKey = 'c0146b8d4b904893946b8d4b90589325'; // Weather Underground API Merg
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



            const apiKey7 = '4ed3c26d759c4ed293c26d759c5ed2aa'; // Weather Underground API Key
            const stationId7 = 'I90583409'; // Weather Underground Station ID
            const wuUrl7 = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId7}&format=json&units=m&apiKey=${apiKey7}&numericPrecision=decimal`;
            const wuDaily7 = `https://api.weather.com/v2/pws/observations/all/1day?stationId=${stationId7}&format=json&units=m&apiKey=${apiKey7}&numericPrecision=decimal`;



            const apiKey8 = '9758586d0425493998586d0425593903'; // Weather Underground API Key
            const stationId8 = 'IBEITY7'; // Weather Underground Station ID
            const wuUrl8 = `https://api.weather.com/v2/pws/observations/current?stationId=${stationId8}&format=json&units=m&apiKey=${apiKey8}&numericPrecision=decimal`;
            const wuDaily8 = `https://api.weather.com/v2/pws/observations/all/1day?stationId=${stationId8}&format=json&units=m&apiKey=${apiKey8}&numericPrecision=decimal`;



            // Filter out stations starting with IA and IJ
            const filteredStationList = Object.keys(stationMapping).filter(id => !id.startsWith('IA') && !id.startsWith('IJ'));

            // Calculate today's start and end timestamps
            const today = new Date();
            const startOfDay = Math.floor(new Date(today.setHours(0, 0, 0, 0)).getTime() / 1000);
            const now = Math.floor(new Date().getTime() / 1000);


            // Create URLs for the filtered stations
            const statsUrls = filteredStationList.map(stationId => {
                const statsUrl = `https://stations.arabiaweather.com/wsquery/query/singleQuery?ID=${stationId}&range=${startOfDay}:${now}&attrib=temp.avg,temp.max,temp.min,humidity.avg,humidity.max,humidity.min,windspeed.avg,windspeed.max,windspeed.min,rainin.avg,rainin.max,rainin.min,baromin.avg,baromin.max,baromin.min&groupby=1h`;
                return { stationId, url: `https://corsproxy.io/?${encodeURIComponent(statsUrl)}` };
            });

            try {
                const [arabiaWeatherResult, wuResult, wuResult2, wuResult3, wuResult4, wuResult5, wuResult6, wuResult7, wuResult8, daily1, daily2, daily3, daily4, daily5, daily6, daily7, daily8,   ...statsResults] = await Promise.all([
                    axios('https://stations.arabiaweather.com/weatherstation/api/get?ws=*&attr=*'),
                    axios.get(wuUrl),
                    axios.get(wuUrl2),
                    axios.get(wuUrl3),
                    axios.get(wuUrl4),
                    axios.get(wuUrl5),
                    axios.get(wuUrl6),
                    axios.get(wuUrl7),
                    axios.get(wuUrl8),
                    axios.get(wuDaily),
                    axios.get(wuDaily2),
                    axios.get(wuDaily3),
                    axios.get(wuDaily4),
                    axios.get(wuDaily5),
                    axios.get(wuDaily6),
                    axios.get(wuDaily7),
                    axios.get(wuDaily8),
                    ...statsUrls.map(({ url }) => axios.get(url))
                ]);

                const wuData = transformWUData(wuResult.data, daily1.data);
                const wuData2 = transformWUData(wuResult2.data, daily2.data);
                const wuData3 = transformWUData(wuResult3.data, daily3.data);
                const wuData4 = transformWUData(wuResult4.data, daily4.data);
                const wuData5 = transformWUData(wuResult5.data, daily5.data);
                const wuData6 = transformWUData(wuResult6.data, daily6.data);
                const wuData7 = transformWUData(wuResult7.data, daily7.data);
                const wuData8 = transformWUData(wuResult8.data, daily8.data);

                const statsData = statsResults.map((result, index) => ({ stationId: statsUrls[index].stationId, data: result.data }));

                const arDataMerged = mergeData(arabiaWeatherResult.data, statsData);

                const combinedData = [...arDataMerged, ...wuData, ...wuData2, ...wuData3, ...wuData4, ...wuData5, ...wuData6, ...wuData7, ...wuData8];

                combinedData.sort((a, b) => a.temp - b.temp);

                setWeatherData(combinedData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();

    }, []);

    function mergeData(arabiaWeatherData, statsDataArray) {


        let dataMap = {};

        // Process arabiaWeatherData
        arabiaWeatherData.forEach(item => {
            const stationId = Object.keys(item)[0];
            const details = item[stationId];
         
            // Initialize or update the dataMap with station data
            dataMap[stationId] = {
                ...dataMap[stationId],
                ...details,

                stationName: stationMapping[stationId],
                temp: details.temp ? details.temp.toFixed(1) : undefined,
                dailyrain: details.dailyrain ? (details.dailyrain).toFixed(2) : undefined,

                windspeed: details.windspeed ? (details.windspeed * 3.6).toFixed(1) : undefined,
                windgust: details.windgust ? (details.windgust * 3.6).toFixed(1) : undefined,
                windDirection: degreesToCardinalDetailed(details.winddir),
                windspeedColor: details.windspeed ? getWindSpeedColor(details.windspeed * 3.6) : undefined,
                windgustColor: details.windgust ? getWindSpeedColor(details.windgust * 3.6) : '#ffffff',
                tempColor: details.temp ? getTemperatureColor(details.temp) : undefined,
                rainRateColor: details.rainin ? getRainRateColor(details.rainin) : undefined,
                totalRainColor: details.dailyrain ? getRainTotalColor(details.dailyrain) : undefined,
            };
        });

        // Process statsDataArray
        statsDataArray.forEach(({ stationId, data }) => {
            if (!data.length) {
                console.warn('No data for station:', stationId);
                return;
            }

            data.forEach(record => {
                if (!dataMap[stationId]) {
                    dataMap[stationId] = { stationName: stationMapping[stationId] };
                }

                record.forEach(observation => {
                    if (observation.tempMAX !== undefined && observation.tempMAX <= 60 && observation.tempMAX >= -50) {
                        dataMap[stationId].tempMAX = Math.max(dataMap[stationId].tempMAX || -Infinity, observation.tempMAX);
                    }

                    if (observation.tempMIN !== undefined && observation.tempMIN >= -50 && observation.tempMIN <= 60) {
                        dataMap[stationId].tempMIN = Math.min(dataMap[stationId].tempMIN || Infinity, observation.tempMIN);
                    }

                    if (observation.humidityMAX !== undefined) {
                        dataMap[stationId].humidityMAX = Math.max(dataMap[stationId].humidityMAX || -Infinity, observation.humidityMAX);
                    }

                    if (observation.humidityMIN !== undefined) {
                        dataMap[stationId].humidityMIN = Math.min(dataMap[stationId].humidityMIN || Infinity, observation.humidityMIN);
                    }

                    if (observation.windspeedMAX !== undefined) {
                        dataMap[stationId].windspeedMAX = Math.max(dataMap[stationId].windspeedMAX || -Infinity, observation.windspeedMAX * 3.6);
                    }

                    if (observation.windgustMAX !== undefined) {
                        dataMap[stationId].windgustMAX = Math.max(dataMap[stationId].windgustMAX || -Infinity, observation.windgustMAX * 3.6);
                    }

                    if (observation.barominMAX !== undefined) {
                        dataMap[stationId].barominMAX = Math.max(dataMap[stationId].barominMAX || -Infinity, observation.barominMAX);
                    }

                    if (observation.barominMIN !== undefined) {
                        dataMap[stationId].barominMIN = Math.min(dataMap[stationId].barominMIN || Infinity, observation.barominMIN);
                    }

                    if (observation.barominAVG !== undefined) {
                        dataMap[stationId].barominAVG = observation.barominAVG;
                    }

                    if (observation.raininAVG !== undefined) {
                        dataMap[stationId].raininSUM = (dataMap[stationId].raininSUM || 0) + observation.raininAVG;
                    }

                    if (observation.windspeedMAX !== undefined) {
                        dataMap[stationId].windgustMaxColor = getWindSpeedColor(observation.windspeedMAX * 3.6);
                    }

                    dataMap[stationId].last_updated = new Date(observation.time).getTime(); // Convert ISO string to timestamp if needed
                });

                // Convert toFixed after calculating min/max
                if (dataMap[stationId].tempMAX !== undefined) {
                    dataMap[stationId].tempMAX = dataMap[stationId].tempMAX.toFixed(1);
                    dataMap[stationId].tempMaxColor = getTemperatureColor(dataMap[stationId].tempMAX);
                }

                if (dataMap[stationId].tempMIN !== undefined) {
                    dataMap[stationId].tempMIN = dataMap[stationId].tempMIN.toFixed(1);
                    dataMap[stationId].tempMinColor = getTemperatureColor(dataMap[stationId].tempMIN);
                }

                if (dataMap[stationId].windspeedMAX !== undefined) {
                    dataMap[stationId].windspeedMAX = dataMap[stationId].windspeedMAX.toFixed(1);
                    dataMap[stationId].windgustMaxColor = getWindSpeedColor(dataMap[stationId].windspeedMAX);
                }

                if (dataMap[stationId].windgustMAX !== undefined) {
                    dataMap[stationId].windgustMAX = dataMap[stationId].windgustMAX.toFixed(1);
                    dataMap[stationId].windgustMaxColor = getWindSpeedColor(dataMap[stationId].windgustMAX);
                }
            });
        });

        return Object.values(dataMap).filter(item => item && item.temp !== undefined && item.stationName);
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

        // Function to filter out spikes and invalid values
        const filterSpikes = (obs) => {
            return obs.filter(data =>
                data.metric.tempHigh < 60 && data.metric.tempHigh > -50 &&
                data.metric.tempLow < 60 && data.metric.tempLow > -50 
            );
        };

        // Filter out spikes and invalid values from day observations
        const filteredObservations =  filterSpikes(dayObservations);

        // Ensure filteredObservations is not empty
        if (filteredObservations.length === 0) {
            console.log("All observations filtered out due to spikes or invalid values.");
            return [];
        }
 
        // Filter out invalid humidityHigh values explicitly
        const validHumidityHighValues = filteredObservations
            .map(obs => obs.humidityHigh)
            .filter(value => value !== null && value !== undefined && !isNaN(value));

         
        // Compute max temperature, humidity, and wind gust from the filtered day data
        const tempMax = Math.max(...filteredObservations.map(obs => obs.metric.tempHigh));
        const windGustMax = Math.max(...filteredObservations.map(obs => obs.metric.windgustHigh));
        let humidityMax = Math.max(...validHumidityHighValues);


        // Compute min temperature using Math.min and a spread operator with filtering
        let tempMin = Math.min(
            ...filteredObservations
                .map(obs => obs.metric.tempLow)
                .filter(tempLow => tempLow !== null && tempLow !== undefined)
        );

     // Return null if tempMin is Infinity
        tempMin = tempMin === Infinity ? 0 : tempMin;
        humidityMax = humidityMax === -Infinity ? 0 : humidityMax;

        var last5minrain = 0.0;
        // Ensure the observations are sorted by time
        if (filteredObservations.length >= 2) {
            var latestObservation = currentData;
            var observationOne5MinAgo = filteredObservations[filteredObservations.length - 2];

            if (latestObservation != null && observationOne5MinAgo != null) {
                last5minrain = latestObservation.observations[0].metric.precipTotal - observationOne5MinAgo.metric.precipTotal;
                last5minrain = last5minrain >= 0 ? last5minrain : 0; // Ensure no negative values
            }
        }
        return [{
            stationName: stationMapping[currentObservation.stationID], // Assuming mapping exists
            temp: currentObservation.metric.temp,
            humidity: currentObservation.humidity,
            windspeed: currentObservation.metric.windSpeed,
            windgust: currentObservation.metric.windGust,
            windDirection: degreesToCardinalDetailed(currentObservation.winddir),
            tempColor: getTemperatureColor(currentObservation.metric.temp),
            windspeedColor: getWindSpeedColor(currentObservation.metric.windSpeed),
            windgustColor: getWindSpeedColor(currentObservation.metric.windGust),
            dailyrain: currentObservation.metric.precipTotal !== null ? currentObservation.metric.precipTotal.toFixed(1) : '0.0',
             rainin: (last5minrain * 4.7).toFixed(1), // currentObservation.metric.precipRate.toFixed(1),
            rainRateColor: getRainRateColor(currentObservation.metric.precipRate),
            totalRainColor: getRainTotalColor(currentObservation.metric.precipTotal),
            tempMAX: tempMax, // Converting to Celsius
            tempMIN: tempMin,
            tempMaxColor: getTemperatureColor(tempMax),
            tempMinColor: getTemperatureColor(tempMin),
            windgustMAX: windGustMax, // Converting to km/h
            windspeedMAX: windGustMax,
            windgustMaxColor: getWindSpeedColor(windGustMax),
            humidityMAX: humidityMax, // Adding humidityMax
            humidityMAXColor: getRHColor(humidityMax),
            last_updated: currentObservation.obsTimeUtc
        }];
    }
   






    return (


        <div className="container">

            <table className="rtl-table" >
                <thead><tr><th>اخر تحديث: {lastUpdateTime}</th></tr>
                    <tr>
                        <th >المحطة</th>
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
                        <th className={sortConfig.key === 'stationName' ? `sorted-${sortConfig.direction}` : ''} onClick={() => setSortConfig({ key: 'windspeedMAX', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>اعلى هبة</th>
                        <th className={sortConfig.key === 'stationName' ? `sorted-${sortConfig.direction}` : ''} onClick={() => setSortConfig({ key: 'humidityMAX', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>رطوبة</th>

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
                                {item.temp || '-'}
                            </td>


                            <td>{item.humidity || '-'}%</td>
                            <td style={{ backgroundColor: item.windspeedColor }}>{item.windspeed || '-'}</td>

                            <td>{item.windDirection || '-'}</td>
                            <td style={{ backgroundColor: item.windgustColor }}>{item.windgust || '-'}</td>


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
                                {item.tempMAX || '-'}
                            </td>

                            <td style={{
                                backgroundColor: item.tempMinColor ? item.tempMinColor.backgroundColor : '#FFFFFF',
                                color: item.tempMinColor ? item.tempMinColor.color : '#000000'
                            }}>
                                {item.tempMIN || '-'}
                            </td>


                            <td style={{ backgroundColor: item.windgustMaxColor }}>{item.windspeedMAX || '-'}</td>

                            
                            <td style={{ backgroundColor: item.humidityMAXColor }}>{item.humidityMAX || '-'} </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;