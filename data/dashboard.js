/* =========================================================
   XIAOZHI SMART HOME
   ADVANCED DASHBOARD CONTROLLER
   ========================================================= */

/* =========================================================
   DASHBOARD CONFIG
========================================================= */

const DashboardConfig = {

    chartMaxPoints: 20,

    sensorUpdateInterval: 3000,

    uptimeUpdateInterval: 1000,

    reconnectDelay: 5000,

    maxLogs: 100,

    fanAnimationThresholds: {
        low: 30,
        medium: 70
    }

};

/* =========================================================
   DASHBOARD STATE
========================================================= */

const DashboardState = {

    initialized: false,

    realtimeConnected: false,

    sensorHistory: {

        temperature: [],

        humidity: [],

        timestamps: []

    },

    deviceStatus: {

        wifi: false,

        websocket: false,

        blynk: false,

        rtc: false

    },

    statistics: {

        relayToggleCount: 0,

        fanSpeedChanges: 0,

        totalNotifications: 0

    }

};

/* =========================================================
   DASHBOARD INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeDashboard
);

function initializeDashboard()
{
    console.log(
        "Initializing Dashboard System..."
    );

    initializeRealtimeClock();

    initializeSystemCards();

    initializeRelayStatistics();

    initializeFanModes();

    initializeHealthMonitoring();

    initializeAutoRefresh();

    initializeRealtimeIndicators();

    initializeNotificationCenter();

    initializeAnalyticsTracking();

    initializeSystemAnimations();

    initializeConnectionRecovery();

    DashboardState.initialized = true;

    console.log(
        "Dashboard Ready"
    );
}

/* =========================================================
   REALTIME CLOCK
========================================================= */

function initializeRealtimeClock()
{
    updateRealtimeClock();

    setInterval(() => {

        updateRealtimeClock();

    }, 1000);
}

function updateRealtimeClock()
{
    const now = new Date();

    const time =
        now.toLocaleTimeString(
            [],
            {

                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"

            }
        );

    const date =
        now.toLocaleDateString(
            [],
            {

                weekday: "short",

                day: "numeric",

                month: "short",

                year: "numeric"

            }
        );

    const timeElement =
        document.getElementById(
            "currentTime"
        );

    const dateElement =
        document.getElementById(
            "currentDate"
        );

    if(timeElement)
    {
        timeElement.textContent = time;
    }

    if(dateElement)
    {
        dateElement.textContent = date;
    }
}

/* =========================================================
   SYSTEM CARDS
========================================================= */

function initializeSystemCards()
{
    animateStatusCards();

    updateSystemUptime();

    setInterval(() => {

        updateSystemUptime();

    }, DashboardConfig.uptimeUpdateInterval);
}

function animateStatusCards()
{
    const cards =
        document.querySelectorAll(
            ".status-card"
        );

    cards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(20px)";

        setTimeout(() => {

            card.style.opacity = "1";

            card.style.transform =
                "translateY(0px)";

        }, index * 120);

    });
}

function updateSystemUptime()
{
    const uptimeElement =
        document.getElementById(
            "uptimeValue"
        );

    if(!uptimeElement) return;

    const seconds =
        Math.floor(
            performance.now() / 1000
        );

    const hours =
        Math.floor(seconds / 3600);

    const minutes =
        Math.floor(
            (seconds % 3600) / 60
        );

    const formatted =
        `${hours}H ${minutes}M`;

    uptimeElement.textContent =
        formatted;
}

/* =========================================================
   RELAY STATISTICS
========================================================= */

function initializeRelayStatistics()
{
    for(let i = 1; i <= 4; i++)
    {
        const relay =
            document.getElementById(
                `relay${i}`
            );

        if(!relay) continue;

        relay.addEventListener(
            "change",
            () => {

                DashboardState.statistics
                    .relayToggleCount++;

                updateRelayStatistics();

            }
        );
    }
}

function updateRelayStatistics()
{
    addDashboardLog(
        `Relay Toggle Count: ${DashboardState.statistics.relayToggleCount}`,
        "info"
    );
}

/* =========================================================
   FAN MODES
========================================================= */

function initializeFanModes()
{
    const buttons =
        document.querySelectorAll(
            ".mode-btn"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                buttons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });

                button.classList.add(
                    "active"
                );

                const mode =
                    button.textContent
                        .trim();

                applyFanMode(mode);

                playDashboardSound();

            }
        );
    });
}

function applyFanMode(mode)
{
    switch(mode)
    {
        case "AUTO":

            setFanModeAuto();

            break;

        case "MANUAL":

            setFanModeManual();

            break;

        case "ECO":

            setFanModeEco();

            break;

        case "VOICE":

            setFanModeVoice();

            break;
    }

    showDashboardToast(
        `Fan Mode: ${mode}`,
        "info"
    );
}

function setFanModeAuto()
{
    document.body.classList.remove(
        "eco-mode"
    );
}

function setFanModeManual()
{
    document.body.classList.remove(
        "eco-mode"
    );
}

function setFanModeEco()
{
    document.body.classList.add(
        "eco-mode"
    );
}

function setFanModeVoice()
{
    const fan =
        document.getElementById(
            "fanBlade"
        );

    if(fan)
    {
        fan.classList.add(
            "voice-listening"
        );

        setTimeout(() => {

            fan.classList.remove(
                "voice-listening"
            );

        }, 4000);
    }
}

/* =========================================================
   HEALTH MONITORING
========================================================= */

function initializeHealthMonitoring()
{
    updateHealthCards({
        cpu: 22,
        ram: 148,
        flash: 48,
        version: "v1.0.0"
    });

    setInterval(() => {

        simulateHealthMonitoring();

    }, 5000);
}

function simulateHealthMonitoring()
{
    const data = {

        cpu:
            randomBetween(10, 40),

        ram:
            randomBetween(120, 220),

        flash:
            randomBetween(40, 60),

        version:
            "v1.0.0"

    };

    updateHealthCards(data);
}

function updateHealthCards(data)
{
    updateHealthValue(
        "cpuUsage",
        `${data.cpu}%`
    );

    updateHealthValue(
        "freeRam",
        `${data.ram} KB`
    );

    updateHealthValue(
        "flashUsage",
        `${data.flash}%`
    );

    updateHealthValue(
        "firmwareVersion",
        data.version
    );
}

function updateHealthValue(id, value)
{
    const element =
        document.getElementById(id);

    if(!element) return;

    element.textContent = value;

    element.classList.add(
        "sensor-update"
    );

    setTimeout(() => {

        element.classList.remove(
            "sensor-update"
        );

    }, 600);
}

/* =========================================================
   AUTO REFRESH
========================================================= */

function initializeAutoRefresh()
{
    setInterval(() => {

        refreshDashboardData();

    }, DashboardConfig.sensorUpdateInterval);
}

function refreshDashboardData()
{
    fetch("/api/dashboard")
        .then(response => {

            if(!response.ok)
            {
                throw new Error(
                    "Dashboard API Error"
                );
            }

            return response.json();

        })
        .then(data => {

            processDashboardData(data);

        })
        .catch(error => {

            console.error(error);

            showDashboardToast(
                "Realtime Sync Error",
                "warning"
            );

        });
}

/* =========================================================
   PROCESS DASHBOARD DATA
========================================================= */

function processDashboardData(data)
{
    if(!data) return;

    updateRealtimeSensors(data);

    updateRelayStates(data.relays);

    updateFanDashboard(data.fan);

    updateNetworkInfo(data.network);

    updateDeviceStatistics(data);

    updateChartsData(data);

    updateRealtimeIndicatorsState(data);
}

/* =========================================================
   REALTIME SENSORS
========================================================= */

function updateRealtimeSensors(data)
{
    if(data.temperature !== undefined)
    {
        updateSensorDisplay(
            "temperatureValue",
            `${data.temperature}°C`
        );

        addSensorHistory(
            "temperature",
            data.temperature
        );
    }

    if(data.humidity !== undefined)
    {
        updateSensorDisplay(
            "humidityValue",
            `${data.humidity}%`
        );

        addSensorHistory(
            "humidity",
            data.humidity
        );
    }
}

function updateSensorDisplay(id, value)
{
    const element =
        document.getElementById(id);

    if(!element) return;

    element.textContent = value;

    element.classList.add(
        "sensor-update"
    );

    setTimeout(() => {

        element.classList.remove(
            "sensor-update"
        );

    }, 700);
}

/* =========================================================
   RELAY STATES
========================================================= */

function updateRelayStates(relays)
{
    if(!relays) return;

    Object.keys(relays).forEach(key => {

        const number =
            key.replace("relay", "");

        const state =
            relays[key];

        const relaySwitch =
            document.getElementById(key);

        const relayStatus =
            document.getElementById(
                `${key}Status`
            );

        if(relaySwitch)
        {
            relaySwitch.checked = state;
        }

        if(relayStatus)
        {
            relayStatus.textContent =
                state ? "ON" : "OFF";

            relayStatus.classList.remove(
                "on",
                "off"
            );

            relayStatus.classList.add(
                state ? "on" : "off"
            );
        }

    });
}

/* =========================================================
   FAN DASHBOARD
========================================================= */

function updateFanDashboard(fan)
{
    if(!fan) return;

    const speed =
        fan.speed || 0;

    const speedElement =
        document.getElementById(
            "fanSpeedValue"
        );

    if(speedElement)
    {
        speedElement.textContent =
            `${speed}%`;
    }

    updateFanAnimation(speed);

    DashboardState.statistics
        .fanSpeedChanges++;
}

function updateFanAnimation(speed)
{
    const fanBlade =
        document.getElementById(
            "fanBlade"
        );

    if(!fanBlade) return;

    fanBlade.classList.remove(
        "fan-speed-low",
        "fan-speed-medium",
        "fan-speed-high"
    );

    if(
        speed <=
        DashboardConfig
            .fanAnimationThresholds.low
    )
    {
        fanBlade.classList.add(
            "fan-speed-low"
        );
    }
    else if(
        speed <=
        DashboardConfig
            .fanAnimationThresholds.medium
    )
    {
        fanBlade.classList.add(
            "fan-speed-medium"
        );
    }
    else
    {
        fanBlade.classList.add(
            "fan-speed-high"
        );
    }
}

/* =========================================================
   NETWORK INFO
========================================================= */

function updateNetworkInfo(network)
{
    if(!network) return;

    const rssi =
        document.getElementById(
            "wifiRssi"
        );

    const ip =
        document.getElementById(
            "deviceIp"
        );

    const wifiChip =
        document.getElementById(
            "wifiStatusChip"
        );

    const wifiText =
        document.getElementById(
            "wifiStatusText"
        );

    if(rssi)
    {
        rssi.textContent =
            `${network.rssi} dBm`;
    }

    if(ip)
    {
        ip.textContent =
            network.ip;
    }

    if(network.connected)
    {
        wifiChip.classList.add(
            "online"
        );

        wifiText.textContent =
            "Connected";
    }
    else
    {
        wifiChip.classList.remove(
            "online"
        );

        wifiText.textContent =
            "Offline";
    }
}

/* =========================================================
   DEVICE STATS
========================================================= */

function updateDeviceStatistics(data)
{
    DashboardState.deviceStatus
        .wifi =
            data.network?.connected || false;

    DashboardState.deviceStatus
        .websocket =
            data.websocket || false;

    DashboardState.deviceStatus
        .rtc =
            data.rtc || false;
}

/* =========================================================
   SENSOR HISTORY
========================================================= */

function addSensorHistory(type, value)
{
    const history =
        DashboardState.sensorHistory;

    const timestamp =
        new Date()
            .toLocaleTimeString();

    if(type === "temperature")
    {
        history.temperature.push(value);
    }

    if(type === "humidity")
    {
        history.humidity.push(value);
    }

    history.timestamps.push(timestamp);

    trimSensorHistory();
}

function trimSensorHistory()
{
    const history =
        DashboardState.sensorHistory;

    while(
        history.timestamps.length >
        DashboardConfig.chartMaxPoints
    )
    {
        history.timestamps.shift();

        history.temperature.shift();

        history.humidity.shift();
    }
}

/* =========================================================
   REALTIME INDICATORS
========================================================= */

function initializeRealtimeIndicators()
{
    const indicators =
        document.querySelectorAll(
            ".live-indicator"
        );

    indicators.forEach(indicator => {

        indicator.classList.add(
            "glow-pulse"
        );

    });
}

function updateRealtimeIndicatorsState(data)
{
    if(data.websocket)
    {
        DashboardState.realtimeConnected =
            true;
    }
    else
    {
        DashboardState.realtimeConnected =
            false;
    }
}

/* =========================================================
   NOTIFICATION CENTER
========================================================= */

function initializeNotificationCenter()
{
    showDashboardToast(
        "Realtime Dashboard Active",
        "success"
    );
}

/* =========================================================
   ANALYTICS
========================================================= */

function initializeAnalyticsTracking()
{
    console.log(
        "Analytics Tracking Enabled"
    );
}

function updateChartsData(data)
{
    if(
        window.ChartManager &&
        typeof window.ChartManager
            .updateRealtimeData ===
            "function"
    )
    {
        window.ChartManager
            .updateRealtimeData(data);
    }
}

/* =========================================================
   SYSTEM ANIMATIONS
========================================================= */

function initializeSystemAnimations()
{
    animateFanContainer();

    animateStatusIndicators();
}

function animateFanContainer()
{
    const fan =
        document.querySelector(
            ".fan-circle"
        );

    if(fan)
    {
        fan.classList.add(
            "float-animation"
        );
    }
}

function animateStatusIndicators()
{
    const indicators =
        document.querySelectorAll(
            ".status-chip"
        );

    indicators.forEach(indicator => {

        indicator.classList.add(
            "signal-animate"
        );

    });
}

/* =========================================================
   CONNECTION RECOVERY
========================================================= */

function initializeConnectionRecovery()
{
    window.addEventListener(
        "offline",
        () => {

            showDashboardToast(
                "Connection Lost",
                "warning"
            );

            addDashboardLog(
                "Internet Offline",
                "warning"
            );

        }
    );

    window.addEventListener(
        "online",
        () => {

            showDashboardToast(
                "Connection Restored",
                "success"
            );

            addDashboardLog(
                "Internet Restored",
                "success"
            );

            refreshDashboardData();

        }
    );
}

/* =========================================================
   DASHBOARD LOG SYSTEM
========================================================= */

function addDashboardLog(
    message,
    type = "info"
)
{
    const container =
        document.getElementById(
            "logsContainer"
        );

    if(!container) return;

    const item =
        document.createElement("div");

    item.className =
        `log-item ${type}`;

    item.textContent =
        `${getFormattedTime()} - ${message}`;

    container.prepend(item);

    while(
        container.children.length >
        DashboardConfig.maxLogs
    )
    {
        container.removeChild(
            container.lastChild
        );
    }
}

/* =========================================================
   NOTIFICATION TOAST
========================================================= */

function showDashboardToast(
    message,
    type = "info"
)
{
    if(typeof Toastify === "undefined")
    {
        console.warn(
            "Toastify Missing"
        );

        return;
    }

    let background =
        "linear-gradient(to right,#38bdf8,#0ea5e9)";

    if(type === "success")
    {
        background =
            "linear-gradient(to right,#22c55e,#16a34a)";
    }

    if(type === "warning")
    {
        background =
            "linear-gradient(to right,#f59e0b,#d97706)";
    }

    if(type === "error")
    {
        background =
            "linear-gradient(to right,#ef4444,#dc2626)";
    }

    Toastify({

        text: message,

        duration: 3500,

        gravity: "top",

        position: "right",

        close: true,

        stopOnFocus: true,

        className: "toast-show",

        style: {
            background
        }

    }).showToast();

    DashboardState.statistics
        .totalNotifications++;
}

/* =========================================================
   AUDIO SYSTEM
========================================================= */

function playDashboardSound()
{
    const audio =
        document.getElementById(
            "clickSound"
        );

    if(!audio) return;

    audio.currentTime = 0;

    audio.play()
        .catch(() => {});
}

/* =========================================================
   HELPERS
========================================================= */

function randomBetween(min, max)
{
    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;
}

function getFormattedTime()
{
    return new Date()
        .toLocaleTimeString();
}

/* =========================================================
   EXPORTS
========================================================= */

window.DashboardManager = {

    processDashboardData,

    updateRealtimeSensors,

    updateRelayStates,

    updateFanDashboard,

    updateHealthCards,

    addDashboardLog,

    showDashboardToast

};