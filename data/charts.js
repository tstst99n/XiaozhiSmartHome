/* =========================================================
   XIAOZHI SMART HOME
   REALTIME CHART MANAGER
   ========================================================= */

class XiaozhiChartManager {

    constructor() {

        this.maxPoints = 30;

        this.charts = {};

        this.history = {

            labels: [],

            temperature: [],

            humidity: [],

            wifi: [],

            fan: []

        };

        this.initialize();
    }

    /* =====================================================
       INIT
    ===================================================== */

    initialize() {

        this.createTemperatureHumidityChart();

        this.createFanChart();

        this.createWiFiChart();

        this.createRelayChart();

        console.log(
            "Chart Manager Initialized"
        );
    }

    /* =====================================================
       COMMON OPTIONS
    ===================================================== */

    getCommonOptions(title) {

        return {

            responsive: true,

            maintainAspectRatio: false,

            animation: {

                duration: 500

            },

            interaction: {

                intersect: false,

                mode: "index"

            },

            plugins: {

                legend: {

                    labels: {

                        color: "#e5e7eb"

                    }

                },

                title: {

                    display: true,

                    text: title,

                    color: "#ffffff"

                }

            },

            scales: {

                x: {

                    ticks: {

                        color: "#9ca3af"

                    },

                    grid: {

                        color:
                            "rgba(255,255,255,0.08)"

                    }

                },

                y: {

                    ticks: {

                        color: "#9ca3af"

                    },

                    grid: {

                        color:
                            "rgba(255,255,255,0.08)"

                    }

                }

            }

        };
    }

    /* =====================================================
       TEMP + HUMIDITY
    ===================================================== */

    createTemperatureHumidityChart() {

        const canvas =
            document.getElementById(
                "temperatureHumidityChart"
            );

        if(!canvas) return;

        this.charts.temperatureHumidity =
            new Chart(canvas, {

                type: "line",

                data: {

                    labels: [],

                    datasets: [

                        {

                            label:
                                "Temperature °C",

                            data: [],

                            borderWidth: 3,

                            tension: 0.35
                        },

                        {

                            label:
                                "Humidity %",

                            data: [],

                            borderWidth: 3,

                            tension: 0.35
                        }

                    ]
                },

                options:
                    this.getCommonOptions(
                        "Temperature & Humidity"
                    )
            });
    }

    /* =====================================================
       FAN CHART
    ===================================================== */

    createFanChart() {

        const canvas =
            document.getElementById(
                "fanChart"
            );

        if(!canvas) return;

        this.charts.fan =
            new Chart(canvas, {

                type: "line",

                data: {

                    labels: [],

                    datasets: [

                        {

                            label:
                                "Fan Speed %",

                            data: [],

                            borderWidth: 3,

                            tension: 0.3
                        }

                    ]
                },

                options:
                    this.getCommonOptions(
                        "Fan Speed History"
                    )
            });
    }

    /* =====================================================
       WIFI RSSI
    ===================================================== */

    createWiFiChart() {

        const canvas =
            document.getElementById(
                "wifiChart"
            );

        if(!canvas) return;

        this.charts.wifi =
            new Chart(canvas, {

                type: "line",

                data: {

                    labels: [],

                    datasets: [

                        {

                            label:
                                "WiFi RSSI dBm",

                            data: [],

                            borderWidth: 3,

                            tension: 0.3
                        }

                    ]
                },

                options:
                    this.getCommonOptions(
                        "WiFi Signal Strength"
                    )
            });
    }

    /* =====================================================
       RELAY ACTIVITY
    ===================================================== */

    createRelayChart() {

        const canvas =
            document.getElementById(
                "relayChart"
            );

        if(!canvas) return;

        this.charts.relay =
            new Chart(canvas, {

                type: "bar",

                data: {

                    labels: [

                        "Relay1",
                        "Relay2",
                        "Relay3",
                        "Relay4",
                        "Relay5",
                        "Relay6"

                    ],

                    datasets: [

                        {

                            label:
                                "Relay Activity",

                            data:
                                [0,0,0,0,0,0],

                            borderWidth: 1
                        }

                    ]
                },

                options:
                    this.getCommonOptions(
                        "Relay Usage Statistics"
                    )
            });
    }

    /* =====================================================
       REALTIME UPDATE
    ===================================================== */

    updateRealtimeData(data) {

        const time =
            new Date()
            .toLocaleTimeString();

        this.history.labels.push(
            time
        );

        this.history.temperature.push(
            data.temperature ?? 0
        );

        this.history.humidity.push(
            data.humidity ?? 0
        );

        this.history.wifi.push(
            data.network?.rssi ?? 0
        );

        this.history.fan.push(
            data.fan?.speed ?? 0
        );

        this.trimHistory();

        this.updateTemperatureChart();

        this.updateFanChart();

        this.updateWiFiChart();

        this.updateRelayStatistics(
            data.relays
        );
    }

    /* =====================================================
       HISTORY LIMIT
    ===================================================== */

    trimHistory() {

        while(
            this.history.labels.length >
            this.maxPoints
        ) {

            this.history.labels.shift();

            this.history.temperature.shift();

            this.history.humidity.shift();

            this.history.wifi.shift();

            this.history.fan.shift();
        }
    }

    /* =====================================================
       UPDATE TEMP
    ===================================================== */

    updateTemperatureChart() {

        const chart =
            this.charts.temperatureHumidity;

        if(!chart) return;

        chart.data.labels =
            this.history.labels;

        chart.data.datasets[0].data =
            this.history.temperature;

        chart.data.datasets[1].data =
            this.history.humidity;

        chart.update();
    }

    /* =====================================================
       UPDATE FAN
    ===================================================== */

    updateFanChart() {

        const chart =
            this.charts.fan;

        if(!chart) return;

        chart.data.labels =
            this.history.labels;

        chart.data.datasets[0].data =
            this.history.fan;

        chart.update();
    }

    /* =====================================================
       UPDATE WIFI
    ===================================================== */

    updateWiFiChart() {

        const chart =
            this.charts.wifi;

        if(!chart) return;

        chart.data.labels =
            this.history.labels;

        chart.data.datasets[0].data =
            this.history.wifi;

        chart.update();
    }

    /* =====================================================
       RELAY STATS
    ===================================================== */

    updateRelayStatistics(relays) {

        if(
            !relays ||
            !this.charts.relay
        )
        {
            return;
        }

        const chart =
            this.charts.relay;

        const current =
            chart.data.datasets[0].data;

        Object.keys(relays)
            .forEach((key,index) => {

                if(relays[key])
                {
                    current[index]++;
                }

            });

        chart.update();
    }

    /* =====================================================
       RESET
    ===================================================== */

    clearHistory() {

        this.history = {

            labels: [],

            temperature: [],

            humidity: [],

            wifi: [],

            fan: []

        };

        Object.values(
            this.charts
        ).forEach(chart => {

            chart.data.labels = [];

            chart.data.datasets
                .forEach(ds => {

                    ds.data = [];
                });

            chart.update();
        });
    }

    /* =====================================================
       EXPORT CSV
    ===================================================== */

    exportCSV() {

        let csv =
            "Time,Temperature,Humidity,WiFi,Fan\n";

        for(
            let i=0;
            i<this.history.labels.length;
            i++
        )
        {
            csv +=
                `${this.history.labels[i]},` +
                `${this.history.temperature[i]},` +
                `${this.history.humidity[i]},` +
                `${this.history.wifi[i]},` +
                `${this.history.fan[i]}\n`;
        }

        const blob =
            new Blob(
                [csv],
                {type:"text/csv"}
            );

        const link =
            document.createElement("a");

        link.href =
            URL.createObjectURL(blob);

        link.download =
            "xiaozhi-history.csv";

        link.click();
    }
}

/* =========================================================
   GLOBAL INSTANCE
========================================================= */

window.ChartManager =
    new XiaozhiChartManager();

/* =========================================================
   GLOBAL EXPORTS
========================================================= */

window.exportChartHistory =
    () => {

        ChartManager.exportCSV();

    };

window.clearChartHistory =
    () => {

        ChartManager.clearHistory();

    };