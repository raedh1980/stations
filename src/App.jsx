
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
    "IAMMAN74": "جبل المريخ",
    "IAMMAN46": "جبل الزهور ",
    "IJERAS1": "جرش",
    "IAMMAN21": "طبربور",
    "IALJAM3": "تلاع - زياد",        
    "IAMMAN80":"مادبا",
    "IALJAM4": "الكوم",
    "piqvi310": "شفابدران",
    "mkcef941": "الكرامة",
    "jixdw557": "ام الدرج",
    "IBEITY7": "بيت لحم",
    "igyzo441": "سوف",
    "IAJLOU2": "كفرنجة",
    "IALJAM6": "صويلح الارسال",
    "IALQUW9": "المقابلين",


    
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
    // breakpoints
    const freezingMax = 0;    // ≤ 0°C
    const coolMax = 7.4;  // >0–7.4°C
    const moderateMax = 19;   // >7.4–19°C
    const warmMax = 29;   // >19–29°C
    const hotMax = 39;   // 30–39°C

    let hue;
    const lightness = 46;     // constant for all, adjust if you want pink lighter

    if (value <= freezingMax) {
        // ≤0: deep blue→light blue
        const ratio = Math.max(0, value / freezingMax);
        hue = interpolate(240, 200, ratio);
    }
    else if (value <= coolMax) {
        // >0–7.4: blue→green
        const ratio = (value - freezingMax) / (coolMax - freezingMax);
        hue = interpolate(240, 120, ratio);
    }
    else if (value <= moderateMax) {
        // >7.4–19: green→yellow
        const ratio = (value - coolMax) / (moderateMax - coolMax);
        hue = interpolate(120, 60, ratio);
    }
    else if (value <= warmMax) {
        // >19–29: yellow→orange
        const ratio = (value - moderateMax) / (warmMax - moderateMax);
        hue = interpolate(60, 35, ratio);
    }
    else if (value <= hotMax) {
        // >29–39: orange→red
        const ratio = (value - warmMax) / (hotMax - warmMax);
        hue = interpolate(30, 0, ratio);
    }
    else {
        // ≥40: fixed pink hue (330°)
        hue = 330;
    }

    const saturation = 100;
    const backgroundColor = hslToHex(hue, saturation, lightness);
    const textColor = value <= coolMax
        ? '#FFFFFF'
        : getContrastColor(backgroundColor);

    return {
        backgroundColor,
        color: textColor,
        fontWeight: 'bold'
    };
}

// Helper function to interpolate between two values
function interpolate(start, end, ratio) {
    return start + (end - start) * ratio;
}

// Helper function to convert HSL to HEX
function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // Achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = x => {
        const hex = Math.round(x * 220).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Helper function to determine contrasting text color (black or white)
function getContrastColor(hex) {
    // Convert HEX to RGB
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return black for light backgrounds and white for dark backgrounds
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
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
                const aValue = parseFloat(a[sortConfig.key]);
                const bValue = parseFloat(b[sortConfig.key]);

                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    };

    useEffect(() => {
        const fetchData = async () => {
            setLastUpdateTime(new Date().toLocaleTimeString()); // Updates with the current time

            // Define Weather Underground API keys and station IDs
            const wuStations = [
                { apiKey: '817506b64499464ab506b64499b64a96', stationId: 'IAMMAN46' },
                { apiKey: 'fb407fb8c0454376807fb8c045237692', stationId: 'IJERAS1' },
                { apiKey: '36d76d5a338a4641976d5a338a3641bb', stationId: 'IAMMAN21' }, 
                { apiKey: '42189caf41184363989caf4118936362', stationId: 'IALJAM3' },
                { apiKey: '74cff8a01f6b4d908ff8a01f6bbd9077', stationId: 'IALJAM4' },
                { apiKey: '358804dc1cce4c128804dc1cce8c1255', stationId: 'I90583409' },
                { apiKey: '9758586d0425493998586d0425593903', stationId: 'IBEITY7' },
                { apiKey: 'fda10643a8fd4a14a10643a8fd9a14a0', stationId: 'IAJLOU2' },
                { apiKey: '0f7b019630b24c45bb019630b2fc45f4', stationId: 'IAMMAN74' },
                { apiKey: 'ae1700e39d4841849700e39d481184b2', stationId: 'IAMMAN80' }, 
                { apiKey: '0ddcdfd0a33d477a9cdfd0a33d877ab9', stationId: 'IALJAM6' },
                { apiKey: 'fda10643a8fd4a14a10643a8fd9a14a0', stationId: 'IALQUW9' },
     

                
               ];

            // Generate WU URLs for both current and daily data for all stations
            const generateWUUrls = (station) => ({
                current: `https://api.weather.com/v2/pws/observations/current?stationId=${station.stationId}&format=json&units=m&apiKey=${station.apiKey}&numericPrecision=decimal`,
                daily: `https://api.weather.com/v2/pws/observations/all/1day?stationId=${station.stationId}&format=json&units=m&apiKey=${station.apiKey}&numericPrecision=decimal`
            });

            // List of URLs to be fetched
            const wuUrls = wuStations.map(generateWUUrls);

            // Filter out stations starting with IA and IJ
            const filteredStationList = Object.keys(stationMapping).filter(id => !id.startsWith('IA') && !id.startsWith('IJ') );

            // Calculate today's start and end timestamps
            const today = new Date();
            const startOfDay = Math.floor(new Date(today.setHours(0, 0, 0, 0)).getTime() / 1000);
            const now = Math.floor(new Date().getTime() / 1000);

            const multiQueryUrl = `https://stations.arabiaweather.com/wsquery/query/multiQuerylatlonOffset?country=JO&range=0d:now&attrib=temp.max,temp.min,windspeed.max,windgust.max&latlon=31.890383,35.896030&nocache=${Date.now()}`;
            const multiQueryUrlWithProxy = `https://corsproxyjo.azurewebsites.net/api/CorsProxyFunction?url=${encodeURIComponent(multiQueryUrl)}`;

            // Create URLs for filtered AW stations
            const statsUrls = filteredStationList.map(stationId => {
                const statsUrl = `https://stations.arabiaweather.com/wsquery/query/singleQuery?ID=${stationId}&range=${startOfDay}:${now}&attrib=temp.avg,temp.max,temp.min,humidity.avg,humidity.max,humidity.min,windspeed.avg,windspeed.max,windspeed.min,rainin.avg,rainin.max,rainin.min,baromin.avg,baromin.max,baromin.min&groupby=1h`;
                return { stationId, url: `https://corsproxyjo.azurewebsites.net/api/CorsProxyFunction?url=${encodeURIComponent(statsUrl)}` };
            });

            try {
                // Create an axios instance with a timeout
                const axiosInstance = axios.create(
                    { timeout: 10000, }
                );

                // Perform all API calls in parallel using Promise.allSettled
                const responses = await Promise.allSettled([
                    axiosInstance.get('https://stations.arabiaweather.com/weatherstation/api/get?ws=*&attr=*'), // Fetch all AW stations data
                    ...wuUrls.flatMap(url => [
                        axiosInstance.get(url.current),
                        axiosInstance.get(url.daily)
                    ]), // Fetch WU current and daily data for all stations
                    axiosInstance.get(multiQueryUrlWithProxy), // Fetch multi-query data from AW
                    ...statsUrls.map(({ url }) => axiosInstance.get(url)) // Fetch stats for AW filtered stations (rest element placed last)
                ]);

                const [
                    arabiaWeatherResult,
                    wuResult, wuDaily1, wuResult2, wuDaily2, wuResult3, wuDaily3, wuResult4, wuDaily4,
                    wuResult6, wuDaily6, wuResult7, wuDaily7, wuResult8, wuDaily8, wuResult9, wuDaily9, wuResult10, wuDaily10, wuResult11, wuDaily11, wuResult12, wuDaily12, wuResult13, wuDaily13,
                    multiQueryResult,
                    ...statsResults
                ] = responses;

                // Helper function to extract data or handle errors
                const getData = (result) => {
                    if (result.status === 'fulfilled') {
                        return result.value.data; // Access the response data
                    } else {
                        if (axios.isCancel(result.reason)) {
                            console.error('API call canceled:', result.reason.message);
                        } else if (result.reason.code === 'ECONNABORTED') {
                            console.error('API call timed out:', result.reason.config.url);
                        } else {
                            console.error('API call failed:', result.reason);
                        }
                        return null; // Or handle the error as needed
                    }
                };

                // Transform WU results into usable data, handling possible nulls
                const wuData = [
                    transformWUData(getData(wuResult), getData(wuDaily1)),
                    transformWUData(getData(wuResult2), getData(wuDaily2)),
                    transformWUData(getData(wuResult3), getData(wuDaily3)),
                    transformWUData(getData(wuResult4), getData(wuDaily4)),
                    transformWUData(getData(wuResult6), getData(wuDaily6)),
                    transformWUData(getData(wuResult7), getData(wuDaily7)),
                    transformWUData(getData(wuResult8), getData(wuDaily8)),
                    transformWUData(getData(wuResult9), getData(wuDaily9)),
                    transformWUData(getData(wuResult10), getData(wuDaily10)),
                    transformWUData(getData(wuResult11), getData(wuDaily11)),
                    transformWUData(getData(wuResult12), getData(wuDaily12)),
                    transformWUData(getData(wuResult13), getData(wuDaily13)),
                ].flat().filter(item => item != null); // Filter out nulls if necessary

                // Process ArabiaWeather data
                const statsData = statsResults.map((result, index) => {
                    const data = getData(result);
                    if (data) {
                        return {
                            stationId: statsUrls[index].stationId,
                            data
                        };
                    } else {
                        // Handle error or skip this entry
                        return null;
                    }
                }).filter(item => item != null); // Remove null entries

                // Get ArabiaWeather main data
                const arabiaWeatherData = getData(arabiaWeatherResult);
                const multiQueryData = getData(multiQueryResult);

                // Check if critical data is available
                if (arabiaWeatherData ) {
                    // Merge all data from AW and WU into a single dataset
                    const arDataMerged = mergeData(arabiaWeatherData, statsData, multiQueryData);
                    const combinedData = [...arDataMerged, ...wuData];

                    // Sort by temperature and update the state
                    combinedData.sort((a, b) => a.temp - b.temp);
                    setWeatherData(combinedData);
                } else {
                    // Handle the case where critical data is missing
                    console.error('Critical data from ArabiaWeather API is missing. Cannot proceed with merging data.');
                    // Optionally, proceed with available data or notify the user
                    const combinedData = [...wuData];
                    combinedData.sort((a, b) => a.temp - b.temp);
                    setWeatherData(combinedData);
                }

            }

             catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchData();
    }, []);


    function mergeData(arabiaWeatherData, statsDataArray, multiQueryData) {
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
                dailyrain: details.dailyrain ? details.dailyrain.toFixed(1) : undefined,
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
                    if (observation.tempMAX !== null && observation.tempMAX !== undefined && observation.tempMAX < 56 && observation.tempMAX > -30) {
                        dataMap[stationId].tempMAX = Math.max(dataMap[stationId].tempMAX || -Infinity, observation.tempMAX);
                    }

                    if (observation.tempMIN !== null && observation.tempMIN !== undefined && observation.tempMIN > -30 && observation.tempMIN < 60) {
                        dataMap[stationId].tempMIN = Math.min(dataMap[stationId].tempMIN || Infinity, observation.tempMIN);
                    }

                    if (observation.humidityMAX !== undefined) {
                        dataMap[stationId].humidityMAX = Math.max(dataMap[stationId].humidityMAX || -Infinity, observation.humidityMAX);
                    }

                    if (observation.humidityMIN !== null && observation.humidityMIN !== undefined) {
                        dataMap[stationId].humidityMIN = Math.min(dataMap[stationId].humidityMIN || Infinity, observation.humidityMIN);
                    }

                    if (observation.windspeedMAX !== null && observation.windspeedMAX !== undefined) {
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

                    if (observation.raininAVG !== null && observation.raininAVG !== undefined) {
                        dataMap[stationId].raininSUM = (dataMap[stationId].raininSUM || 0) + observation.raininAVG;
                    }

                    dataMap[stationId].last_updated = new Date(observation.time).getTime();
                });
            });
        });

        // Process multiQueryData
        if (multiQueryData) {
            Object.keys(multiQueryData).forEach(stationId => {
                const data = multiQueryData[stationId];

                if (data && data.length > 0 && data[0].length > 0) {
                    const observation = data[0][0];

                    if (!dataMap[stationId]) {
                        dataMap[stationId] = { stationName: stationMapping[stationId] };
                    }





                    if (observation.windgustMAX !== undefined && observation.windgustMAX * 3.6 < 160) {
                        const windgustMaxValue = observation.windgustMAX * 3.6;
                        dataMap[stationId].windspeedMAX = Math.max(dataMap[stationId].windgustMAX || -Infinity, windgustMaxValue);
                        dataMap[stationId].windgustMaxColor = getWindSpeedColor(windgustMaxValue);
                    }


                }
            });
        }

        // Convert toFixed after calculating min/max
        Object.keys(dataMap).forEach(stationId => {
            const stationData = dataMap[stationId];

            if (stationData.tempMAX !== undefined) {
                stationData.tempMAX = parseFloat(stationData.tempMAX).toFixed(1);
                stationData.tempMaxColor = getTemperatureColor(stationData.tempMAX);
            }

            if (stationData.tempMIN !== undefined) {
                stationData.tempMIN = parseFloat(stationData.tempMIN).toFixed(1);
                stationData.tempMinColor = getTemperatureColor(stationData.tempMIN);
            }

            if (stationData.windspeedMAX !== undefined) {
                stationData.windspeedMAX = parseFloat(stationData.windspeedMAX).toFixed(1);
                stationData.windgustMaxColor = getWindSpeedColor(stationData.windspeedMAX);
            }

            if (stationData.windgustMAX !== undefined) {
                stationData.windgustMAX = parseFloat(stationData.windgustMAX).toFixed(1);
                stationData.windgustMaxColor = getWindSpeedColor(stationData.windgustMAX);
            }
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
        const filteredObservations = filterSpikes(dayObservations);

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

        // Handle cases where tempMin or humidityMax might be invalid
        tempMin = tempMin === Infinity ? 0 : tempMin;
        humidityMax = humidityMax === -Infinity ? 0 : humidityMax;

        // Utility to safely handle toFixed for null/undefined values
        const safeToFixed = (value, decimals = 1) => {
            if (value === null || value === undefined || isNaN(value)) {
                return '0.0';
            }
            return Number(value).toFixed(decimals);
        };

        // Calculate the last 5-minute rain rate
        let last5minrain = 0.0;

        if (currentData.observations[0].metric.precipRate !== null && currentData.observations[0].metric.precipRate !== undefined) {
            last5minrain = safeToFixed(currentData.observations[0].metric.precipRate, 1);
        }

        if (filteredObservations.length >= 2) {
            const latestObservation = currentData;
            const observationOne5MinAgo = filteredObservations[filteredObservations.length - 1];

            if (latestObservation != null && observationOne5MinAgo != null) {
                const timeDiffMillis = new Date(latestObservation.observations[0].obsTimeUtc).getTime() -
                    new Date(observationOne5MinAgo.obsTimeUtc).getTime();
                let timeDiffMinutes = timeDiffMillis / 60000;

                if (timeDiffMinutes > 0 && timeDiffMinutes <= 10) timeDiffMinutes = 10;

                const precipTotalDiff = (latestObservation.observations[0].metric.precipTotal || 0) -
                    (observationOne5MinAgo.metric.precipTotal || 0);

                last5minrain = precipTotalDiff >= 0 ? ((precipTotalDiff / timeDiffMinutes) * 60).toFixed(1) : 0;

                if (latestObservation.observations[0].metric.precipRate === 0)
                    last5minrain = 0; // Set to 0 if no precipitation rate
            }
        }

        // Return the transformed data
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
            dailyrain: safeToFixed(currentObservation.metric.precipTotal, 1),
            rainin: last5minrain,
            rainRateColor: getRainRateColor(last5minrain),
            totalRainColor: getRainTotalColor(currentObservation.metric.precipTotal),
            tempMAX: tempMax,
            tempMIN: tempMin,
            tempMaxColor: getTemperatureColor(tempMax),
            tempMinColor: getTemperatureColor(tempMin),
            windgustMAX: windGustMax,
            windspeedMAX: windGustMax,
            windgustMaxColor: getWindSpeedColor(windGustMax),
            humidityMAX: humidityMax,
            humidityMAXColor: getRHColor(humidityMax),
            last_updated: currentObservation.obsTimeUtc
        }];
    }








    return (


        <div className="container">

            <table className="rtl-table" >
                <thead><tr><th>{lastUpdateTime}</th></tr>
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
                        <th className={sortConfig.key === 'stationName' ? `sorted-${sortConfig.direction}` : ''} onClick={() => setSortConfig({ key: 'windGustMax', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>اعلى هبة</th>
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
                                {item.rainin|| '0'}
                            </td>



                            <td>{item.stationName}</td>
                            <td style={{
                                backgroundColor: item.totalRainColor ? item.totalRainColor.backgroundColor : '#FFFFFF',
                                color: item.totalRainColor ? item.totalRainColor.color : '#000000'
                            }}>
                                {item.dailyrain || '0'}
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