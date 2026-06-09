/* =========================================================
   XIAOZHI SMART HOME
   WEBSOCKET MANAGER
   ========================================================= */

class XiaozhiWebSocket {

    constructor() {

        this.ws = null;

        this.connected = false;

        this.reconnectTimer = null;

        this.heartbeatTimer = null;

        this.reconnectDelay = 5000;

        this.maxReconnectDelay = 30000;

        this.messageQueue = [];

        this.clientId =
            crypto.randomUUID();

        this.connect();
    }

    /* =====================================================
       CONNECT
    ===================================================== */

    connect() {

        const protocol =
            window.location.protocol === "https:"
                ? "wss:"
                : "ws:";

        const url =
            `${protocol}//${window.location.host}/ws`;

        console.log(
            "Connecting WebSocket:",
            url
        );

        try {

            this.ws =
                new WebSocket(url);

            this.attachEvents();

        }
        catch(error) {

            console.error(
                "WebSocket Error",
                error
            );

            this.scheduleReconnect();
        }
    }

    /* =====================================================
       EVENTS
    ===================================================== */

    attachEvents() {

        this.ws.onopen = () => {

            console.log(
                "WebSocket Connected"
            );

            this.connected = true;

            this.updateConnectionUI(true);

            this.flushQueue();

            this.startHeartbeat();

            this.send({

                type: "client_connected",

                clientId: this.clientId,

                page:
                    AppState.currentPage

            });

            if(window.DashboardManager)
            {
                DashboardManager
                    .showDashboardToast(
                        "Realtime Connected",
                        "success"
                    );
            }
        };

        this.ws.onmessage = event => {

            try {

                const data =
                    JSON.parse(
                        event.data
                    );

                this.processMessage(
                    data
                );

            }
            catch(error) {

                console.error(
                    "WS Parse Error",
                    error
                );
            }
        };

        this.ws.onclose = () => {

            console.warn(
                "WebSocket Closed"
            );

            this.connected = false;

            this.stopHeartbeat();

            this.updateConnectionUI(
                false
            );

            this.scheduleReconnect();
        };

        this.ws.onerror = error => {

            console.error(
                "WebSocket Error",
                error
            );

            this.connected = false;
        };
    }

    /* =====================================================
       PROCESS MESSAGE
    ===================================================== */

    processMessage(data) {

        if(!data.type) return;

        switch(data.type) {

            case "heartbeat":

                this.send({
                    type: "heartbeat_ack"
                });

                break;

            case "dashboard_state":

                this.updateDashboard(
                    data.payload
                );

                break;

            case "relay_update":

                this.updateRelay(
                    data.payload
                );

                break;

            case "fan_update":

                this.updateFan(
                    data.payload
                );

                break;

            case "sensor_update":

                this.updateSensors(
                    data.payload
                );

                break;

            case "system_health":

                this.updateHealth(
                    data.payload
                );

                break;

            case "schedule_update":

                this.updateSchedule(
                    data.payload
                );

                break;

            case "ota_progress":

                this.updateOTA(
                    data.payload
                );

                break;

            case "voice_status":

                this.updateVoiceStatus(
                    data.payload
                );

                break;

            case "log":

                this.addLog(
                    data.payload
                );

                break;

            default:

                console.warn(
                    "Unknown WS Type:",
                    data.type
                );
        }
    }

    /* =====================================================
       DASHBOARD UPDATE
    ===================================================== */

    updateDashboard(payload) {

        if(
            window.DashboardManager
        ) {

            DashboardManager
                .processDashboardData(
                    payload
                );
        }

        if(
            window.XiaozhiApp
        ) {

            XiaozhiApp
                .updateDashboardData(
                    payload
                );
        }
    }

    /* =====================================================
       RELAY UPDATE
    ===================================================== */

    updateRelay(payload) {

        if(!payload) return;

        const relay =
            payload.relay;

        const state =
            payload.state;

        if(
            window.XiaozhiApp
        ) {

            XiaozhiApp
                .updateRelayUI(
                    relay,
                    state
                );
        }
    }

    /* =====================================================
       FAN UPDATE
    ===================================================== */

    updateFan(payload) {

        if(!payload) return;

        const speed =
            payload.speed || 0;

        if(
            window.XiaozhiApp
        ) {

            XiaozhiApp
                .updateFanUI(speed);
        }
    }

    /* =====================================================
       SENSOR UPDATE
    ===================================================== */

    updateSensors(payload) {

        if(!payload) return;

        if(
            window.XiaozhiApp
        ) {

            if(payload.temperature !== undefined)
            {
                XiaozhiApp
                    .updateDashboardData(
                        payload
                    );
            }
        }
    }

    /* =====================================================
       HEALTH UPDATE
    ===================================================== */

    updateHealth(payload) {

        if(
            window.XiaozhiApp
        ) {

            XiaozhiApp
                .updateSystemHealth(
                    payload
                );
        }
    }

    /* =====================================================
       SCHEDULE UPDATE
    ===================================================== */

    updateSchedule(payload) {

        console.log(
            "Schedule Sync",
            payload
        );
    }

    /* =====================================================
       OTA UPDATE
    ===================================================== */

    updateOTA(payload) {

        const progress =
            document.getElementById(
                "otaProgress"
            );

        const percent =
            document.getElementById(
                "otaPercent"
            );

        if(progress)
        {
            progress.style.width =
                `${payload.progress}%`;
        }

        if(percent)
        {
            percent.textContent =
                `${payload.progress}%`;
        }
    }

    /* =====================================================
       VOICE STATUS
    ===================================================== */

    updateVoiceStatus(payload) {

        const status =
            document.getElementById(
                "voiceStatus"
            );

        if(status)
        {
            status.textContent =
                payload.status;
        }
    }

    /* =====================================================
       LOG UPDATE
    ===================================================== */

    addLog(payload) {

        if(
            window.DashboardManager
        ) {

            DashboardManager
                .addDashboardLog(
                    payload.message,
                    payload.level
                );
        }
    }

    /* =====================================================
       SEND
    ===================================================== */

    send(data) {

        if(
            this.connected &&
            this.ws.readyState === 1
        ) {

            this.ws.send(
                JSON.stringify(data)
            );
        }
        else {

            this.messageQueue.push(
                data
            );
        }
    }

    /* =====================================================
       QUEUE
    ===================================================== */

    flushQueue() {

        while(
            this.messageQueue.length
        ) {

            const msg =
                this.messageQueue.shift();

            this.send(msg);
        }
    }

    /* =====================================================
       HEARTBEAT
    ===================================================== */

    startHeartbeat() {

        this.stopHeartbeat();

        this.heartbeatTimer =
            setInterval(() => {

                this.send({

                    type: "heartbeat",

                    timestamp:
                        Date.now()

                });

            }, 10000);
    }

    stopHeartbeat() {

        if(
            this.heartbeatTimer
        ) {

            clearInterval(
                this.heartbeatTimer
            );

            this.heartbeatTimer =
                null;
        }
    }

    /* =====================================================
       RECONNECT
    ===================================================== */

    scheduleReconnect() {

        if(
            this.reconnectTimer
        ) return;

        this.reconnectTimer =
            setTimeout(() => {

                this.reconnectTimer =
                    null;

                this.connect();

            }, this.reconnectDelay);
    }

    /* =====================================================
       UI
    ===================================================== */

    updateConnectionUI(
        connected
    ) {

        const chip =
            document.getElementById(
                "wifiStatusChip"
            );

        const text =
            document.getElementById(
                "wifiStatusText"
            );

        if(chip)
        {
            chip.classList.toggle(
                "online",
                connected
            );
        }

        if(text)
        {
            text.textContent =
                connected
                    ? "Realtime Connected"
                    : "Realtime Offline";
        }
    }
}

/* =========================================================
   GLOBAL INSTANCE
   ========================================================= */

window.WebSocketManager =
    new XiaozhiWebSocket();

/* =========================================================
   GLOBAL HELPERS
   ========================================================= */

window.sendWSRelay =
    (relay, state) => {

        WebSocketManager.send({

            type: "relay_control",

            relay,

            state
        });

    };

window.sendWSFan =
    speed => {

        WebSocketManager.send({

            type: "fan_control",

            speed
        });

    };

window.sendWSSchedule =
    schedule => {

        WebSocketManager.send({

            type: "schedule_add",

            schedule
        });

    };