/* =========================================================
   XIAOZHI SMART HOME
   MAIN APPLICATION SCRIPT
   ========================================================= */

/* =========================================================
   GLOBAL APP STATE
========================================================= */

const AppState = {

    websocketConnected: false,

    currentPage: "homePage",

    fanSpeed: 75,

    relays: {
        relay1: false,
        relay2: false,
        relay3: false,
        relay4: false
    },

    sensors: {
        temperature: 0,
        humidity: 0,
        wifiRSSI: 0
    },

    system: {
        uptime: "0H",
        freeHeap: 0,
        flashUsage: 0,
        firmware: "v1.0.0"
    }

};

/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("XIAOZHI SMART HOME UI STARTING...");

    initializeNavigation();

    initializeFanSlider();

    initializeRelayControls();

    initializeClock();

    initializePageAnimations();

    initializeThemeSystem();

    initializeScheduleSystem();

    initializeOTAUpload();

    initializeRealtimeEffects();

    initializeKeyboardShortcuts();

    initializeMobileSidebar();

    initializeConnectionWatcher();

    initializeAudioSystem();

    loadSavedUIState();

    requestInitialData();

    showToast(
        "Xiaozhi Smart Home Ready",
        "success"
    );

});

/* =========================================================
   NAVIGATION SYSTEM
========================================================= */

function initializeNavigation()
{
    const navButtons =
        document.querySelectorAll(".nav-btn");

    const pages =
        document.querySelectorAll(".page");

    navButtons.forEach(button => {

        button.addEventListener("click", () => {

            const targetPage =
                button.dataset.page;

            pages.forEach(page => {

                page.classList.remove(
                    "active-page",
                    "page-slide-enter"
                );

            });

            navButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            const page =
                document.getElementById(targetPage);

            if(page)
            {
                page.classList.add(
                    "active-page",
                    "page-slide-enter"
                );
            }

            button.classList.add("active");

            AppState.currentPage = targetPage;

            playClickSound();

        });

    });

}

/* =========================================================
   FAN SLIDER
========================================================= */

function initializeFanSlider()
{
    const slider =
        document.getElementById("fanSlider");

    if(!slider) return;

    noUiSlider.create(slider, {

        start: [75],

        connect: [true, false],

        range: {
            min: 0,
            max: 100
        },

        step: 1

    });

    slider.noUiSlider.on("update", values => {

        const speed =
            parseInt(values[0]);

        updateFanUI(speed);

    });

    slider.noUiSlider.on("change", values => {

        const speed =
            parseInt(values[0]);

        AppState.fanSpeed = speed;

        sendFanSpeed(speed);

        showToast(
            `Fan Speed ${speed}%`,
            "info"
        );

    });

}

/* =========================================================
   UPDATE FAN UI
========================================================= */

function updateFanUI(speed)
{
    const speedElement =
        document.getElementById("fanSpeedValue");

    const fanBlade =
        document.getElementById("fanBlade");

    if(speedElement)
    {
        speedElement.textContent = `${speed}%`;
    }

    if(fanBlade)
    {
        fanBlade.classList.remove(
            "fan-speed-low",
            "fan-speed-medium",
            "fan-speed-high"
        );

        if(speed <= 30)
        {
            fanBlade.classList.add(
                "fan-speed-low"
            );
        }
        else if(speed <= 70)
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
}

/* =========================================================
   RELAY CONTROLS
========================================================= */

function initializeRelayControls()
{
    for(let i = 1; i <= 4; i++)
    {
        const relay =
            document.getElementById(`relay${i}`);

        if(!relay) continue;

        relay.addEventListener("change", event => {

            const state =
                event.target.checked;

            updateRelayUI(i, state);

            sendRelayState(i, state);

            playClickSound();

        });
    }
}

/* =========================================================
   UPDATE RELAY UI
========================================================= */

function updateRelayUI(relayNumber, state)
{
    const status =
        document.getElementById(
            `relay${relayNumber}Status`
        );

    const relaySwitch =
        document.getElementById(
            `relay${relayNumber}`
        );

    if(relaySwitch)
    {
        relaySwitch.checked = state;
    }

    if(status)
    {
        status.textContent =
            state ? "ON" : "OFF";

        status.classList.remove("on", "off");

        status.classList.add(
            state ? "on" : "off"
        );
    }

    AppState.relays[
        `relay${relayNumber}`
    ] = state;
}

/* =========================================================
   CLOCK SYSTEM
========================================================= */

function initializeClock()
{
    updateClock();

    setInterval(updateClock, 1000);
}

function updateClock()
{
    const now = new Date();

    const time =
        now.toLocaleTimeString([], {

            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"

        });

    const date =
        now.toLocaleDateString([], {

            day: "numeric",
            month: "long",
            year: "numeric"

        });

    const timeElement =
        document.getElementById("currentTime");

    const dateElement =
        document.getElementById("currentDate");

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
   PAGE ANIMATION
========================================================= */

function initializePageAnimations()
{
    const cards =
        document.querySelectorAll(
            ".glass-card"
        );

    cards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(20px)";

        setTimeout(() => {

            card.style.opacity = "1";

            card.style.transform =
                "translateY(0)";

        }, index * 60);

    });
}

/* =========================================================
   THEME SYSTEM
========================================================= */

function initializeThemeSystem()
{
    const darkButton =
        document.querySelector(
            ".primary-btn"
        );

    const lightButton =
        document.querySelector(
            ".secondary-btn"
        );

    if(lightButton)
    {
        lightButton.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "light-theme"
                );

                saveUIState();

            }
        );
    }

    if(darkButton)
    {
        darkButton.addEventListener(
            "click",
            () => {

                document.body.classList.remove(
                    "light-theme"
                );

                saveUIState();

            }
        );
    }
}

/* =========================================================
   RTC SCHEDULER
========================================================= */

function initializeScheduleSystem()
{
    const addButton =
        document.querySelector(
            ".schedule-form .primary-btn"
        );

    if(!addButton) return;

    addButton.addEventListener(
        "click",
        addSchedule
    );
}

function addSchedule()
{
    const time =
        document.getElementById(
            "scheduleTime"
        ).value;

    const device =
        document.getElementById(
            "scheduleDevice"
        ).value;

    const action =
        document.getElementById(
            "scheduleAction"
        ).value;

    if(!time)
    {
        showToast(
            "Select Schedule Time",
            "warning"
        );

        return;
    }

    const container =
        document.getElementById(
            "scheduleList"
        );

    const item =
        document.createElement("div");

    item.className = "schedule-item";

    item.innerHTML = `
        <span>${time} → ${device} ${action}</span>

        <button>
            <i class="fa-solid fa-trash"></i>
        </button>
    `;

    const deleteButton =
        item.querySelector("button");

    deleteButton.addEventListener(
        "click",
        () => {

            item.remove();

            showToast(
                "Schedule Removed",
                "info"
            );

        }
    );

    container.appendChild(item);

    sendScheduleData({
        time,
        device,
        action
    });

    showToast(
        "Schedule Added",
        "success"
    );
}

/* =========================================================
   OTA UPLOAD
========================================================= */

function initializeOTAUpload()
{
    const uploadButton =
        document.querySelector(
            "#otaPage .primary-btn"
        );

    const firmwareFile =
        document.getElementById(
            "firmwareFile"
        );

    if(!uploadButton || !firmwareFile)
    {
        return;
    }

    uploadButton.addEventListener(
        "click",
        async () => {

            if(!firmwareFile.files.length)
            {
                showToast(
                    "Select Firmware File",
                    "warning"
                );

                return;
            }

            await uploadFirmware(
                firmwareFile.files[0]
            );

        }
    );
}

async function uploadFirmware(file)
{
    const progress =
        document.getElementById(
            "otaProgress"
        );

    const percent =
        document.getElementById(
            "otaPercent"
        );

    const formData =
        new FormData();

    formData.append("firmware", file);

    try
    {
        const xhr = new XMLHttpRequest();

        xhr.open("POST", "/update");

        xhr.upload.addEventListener(
            "progress",
            event => {

                if(event.lengthComputable)
                {
                    const value =
                        Math.round(
                            (event.loaded /
                                event.total) * 100
                        );

                    progress.style.width =
                        `${value}%`;

                    percent.textContent =
                        `${value}%`;
                }

            }
        );

        xhr.onload = () => {

            if(xhr.status === 200)
            {
                showToast(
                    "Firmware Uploaded",
                    "success"
                );
            }
            else
            {
                showToast(
                    "OTA Failed",
                    "error"
                );
            }

        };

        xhr.send(formData);

    }
    catch(error)
    {
        console.error(error);

        showToast(
            "Upload Error",
            "error"
        );
    }
}

/* =========================================================
   REALTIME EFFECTS
========================================================= */

function initializeRealtimeEffects()
{
    setInterval(() => {

        animateSensorValues();

    }, 5000);
}

function animateSensorValues()
{
    const values = [

        document.getElementById(
            "temperatureValue"
        ),

        document.getElementById(
            "humidityValue"
        ),

        document.getElementById(
            "wifiRssi"
        )

    ];

    values.forEach(element => {

        if(!element) return;

        element.classList.add(
            "sensor-update"
        );

        setTimeout(() => {

            element.classList.remove(
                "sensor-update"
            );

        }, 800);

    });
}

/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

function initializeKeyboardShortcuts()
{
    document.addEventListener(
        "keydown",
        event => {

            if(event.key === "1")
            {
                toggleRelay(1);
            }

            if(event.key === "2")
            {
                toggleRelay(2);
            }

            if(event.key === "3")
            {
                toggleRelay(3);
            }

            if(event.key === "4")
            {
                toggleRelay(4);
            }

        }
    );
}

function toggleRelay(relayNumber)
{
    const relay =
        document.getElementById(
            `relay${relayNumber}`
        );

    if(!relay) return;

    relay.checked = !relay.checked;

    relay.dispatchEvent(
        new Event("change")
    );
}

/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function initializeMobileSidebar()
{
    if(window.innerWidth < 992)
    {
        document.querySelectorAll(
            ".nav-btn"
        ).forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );

        });
    }
}

/* =========================================================
   CONNECTION WATCHER
========================================================= */

function initializeConnectionWatcher()
{
    window.addEventListener(
        "offline",
        showOfflineState
    );

    window.addEventListener(
        "online",
        showOnlineState
    );
}

function showOfflineState()
{
    const chip =
        document.getElementById(
            "wifiStatusChip"
        );

    const text =
        document.getElementById(
            "wifiStatusText"
        );

    chip.classList.remove("online");

    text.textContent = "Offline";

    showToast(
        "Internet Disconnected",
        "warning"
    );
}

function showOnlineState()
{
    const chip =
        document.getElementById(
            "wifiStatusChip"
        );

    const text =
        document.getElementById(
            "wifiStatusText"
        );

    chip.classList.add("online");

    text.textContent = "Connected";

    showToast(
        "Internet Connected",
        "success"
    );
}

/* =========================================================
   AUDIO SYSTEM
========================================================= */

function initializeAudioSystem()
{
    const audio =
        document.getElementById(
            "clickSound"
        );

    if(audio)
    {
        audio.volume = 0.3;
    }
}

function playClickSound()
{
    const audio =
        document.getElementById(
            "clickSound"
        );

    if(!audio) return;

    audio.currentTime = 0;

    audio.play().catch(() => {});
}

/* =========================================================
   UI STATE STORAGE
========================================================= */

function saveUIState()
{
    const state = {

        theme:
            document.body.classList.contains(
                "light-theme"
            )
                ? "light"
                : "dark"

    };

    localStorage.setItem(
        "xiaozhi_ui_state",
        JSON.stringify(state)
    );
}

function loadSavedUIState()
{
    const saved =
        localStorage.getItem(
            "xiaozhi_ui_state"
        );

    if(!saved) return;

    try
    {
        const state =
            JSON.parse(saved);

        if(state.theme === "light")
        {
            document.body.classList.add(
                "light-theme"
            );
        }

    }
    catch(error)
    {
        console.error(error);
    }
}

/* =========================================================
   INITIAL DATA REQUEST
========================================================= */

function requestInitialData()
{
    fetch("/api/system")
        .then(response => response.json())
        .then(data => {

            updateDashboardData(data);

        })
        .catch(error => {

            console.error(error);

        });
}

/* =========================================================
   UPDATE DASHBOARD
========================================================= */

function updateDashboardData(data)
{
    if(!data) return;

    if(data.temperature !== undefined)
    {
        updateSensorValue(
            "temperatureValue",
            `${data.temperature}°C`
        );
    }

    if(data.humidity !== undefined)
    {
        updateSensorValue(
            "humidityValue",
            `${data.humidity}%`
        );
    }

    if(data.wifiRSSI !== undefined)
    {
        updateSensorValue(
            "wifiRssi",
            `${data.wifiRSSI} dBm`
        );
    }

    if(data.relays)
    {
        Object.keys(data.relays)
            .forEach(key => {

                const number =
                    key.replace("relay", "");

                updateRelayUI(
                    number,
                    data.relays[key]
                );

            });
    }
}

/* =========================================================
   SENSOR VALUE UPDATE
========================================================= */

function updateSensorValue(id, value)
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
   API COMMUNICATION
========================================================= */

function sendRelayState(relay, state)
{
    fetch("/api/relay", {

        method: "POST",

        headers: {
            "Content-Type":
                "application/json"
        },

        body: JSON.stringify({

            relay,
            state

        })

    }).catch(console.error);
}

function sendFanSpeed(speed)
{
    fetch("/api/fan", {

        method: "POST",

        headers: {
            "Content-Type":
                "application/json"
        },

        body: JSON.stringify({

            speed

        })

    }).catch(console.error);
}

function sendScheduleData(data)
{
    fetch("/api/schedule", {

        method: "POST",

        headers: {
            "Content-Type":
                "application/json"
        },

        body: JSON.stringify(data)

    }).catch(console.error);
}

/* =========================================================
   TOAST NOTIFICATION
========================================================= */

function showToast(message, type = "info")
{
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

        duration: 3000,

        gravity: "top",

        position: "right",

        close: true,

        stopOnFocus: true,

        className: "toast-show",

        style: {
            background
        }

    }).showToast();
}

/* =========================================================
   LOG SYSTEM
========================================================= */

function addLog(message, type = "info")
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

    item.textContent = message;

    container.prepend(item);

    while(container.children.length > 50)
    {
        container.removeChild(
            container.lastChild
        );
    }
}

/* =========================================================
   SYSTEM HEALTH UPDATE
========================================================= */

function updateSystemHealth(data)
{
    if(data.cpu !== undefined)
    {
        document.getElementById(
            "cpuUsage"
        ).textContent =
            `${data.cpu}%`;
    }

    if(data.ram !== undefined)
    {
        document.getElementById(
            "freeRam"
        ).textContent =
            `${data.ram} KB`;
    }

    if(data.flash !== undefined)
    {
        document.getElementById(
            "flashUsage"
        ).textContent =
            `${data.flash}%`;
    }

    if(data.version !== undefined)
    {
        document.getElementById(
            "firmwareVersion"
        ).textContent =
            data.version;
    }
}

/* =========================================================
   EXPORT GLOBALS
========================================================= */

window.XiaozhiApp = {

    updateDashboardData,

    updateRelayUI,

    updateFanUI,

    updateSystemHealth,

    addLog,

    showToast

};