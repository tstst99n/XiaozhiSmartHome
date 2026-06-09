/*
   =========================================================
   XIAOZHI SMART HOME AUTOMATION SYSTEM
   ESP32-S3-N16R8 PROFESSIONAL EDITION
   =========================================================

   Features:
   ---------------------------------------------------------
   ✅ TRIAC Fan Dimmer Control
   ✅ Relay Automation
   ✅ Push Button Manual Control
   ✅ OLED Dashboard
   ✅ RTC Scheduler
   ✅ DHT22 Monitoring
   ✅ Web Dashboard
   ✅ WebSocket Live Update
   ✅ Blynk IoT
   ✅ Xiaozhi Voice Integration
   ✅ OTA Update
   ✅ Preferences Storage
   ✅ FreeRTOS Tasks
   ✅ Offline/Online Sync
   =========================================================
*/

#include <Arduino.h>

/* =========================
   CONFIG
========================= */
#include "config/Config.h"
#include "config/Pins.h"
#include "config/Constants.h"
#include "config/Secrets.h"
#include "config/Version.h"

/* =========================
   CORE
========================= */
#include "core/SystemState.h"
#include "core/PreferencesManager.h"
#include "core/EventManager.h"
#include "core/Logger.h"

/* =========================
   HARDWARE
========================= */
#include "relay/RelayManager.h"
#include "button/ButtonManager.h"
#include "dimmer/DimmerManager.h"
#include "sensor/DHTManager.h"
#include "sensor/SoundSensorManager.h"
#include "display/OLEDManager.h"
#include "rtc/RTCManager.h"
#include "scheduler/SchedulerManager.h"

/* =========================
   NETWORK
========================= */
#include "wifi/WiFiManagerEx.h"
#include "wifi/NetworkMonitor.h"

/* =========================
   WEB
========================= */
#include "web/WebDashboard.h"
#include "web/WebRoutes.h"
#include "web/WebSocketManager.h"
#include "web/APIManager.h"
#include "web/AuthManager.h"
#include "web/SPIFFSManager.h"

/* =========================
   CLOUD
========================= */
#include "cloud/BlynkManager.h"
#include "cloud/XiaozhiManager.h"

/* =========================
   OTA
========================= */
#include "ota/OTAManager.h"

/* =========================
   TASKS
========================= */
#include "tasks/TaskManager.h"

/* =========================================================
   GLOBAL OBJECTS
========================================================= */

RelayManager relayManager;
ButtonManager buttonManager;
DimmerManager dimmerManager;

DHTManager dhtManager;
SoundSensorManager soundManager;

OLEDManager oledManager;
RTCManager rtcManager;
SchedulerManager schedulerManager;

WiFiManagerEx wifiManagerEx;
NetworkMonitor networkMonitor;

WebDashboard webDashboard;
WebRoutes webRoutes;
WebSocketManager wsManager;
APIManager apiManager;
AuthManager authManager;
SPIFFSManager spiffsManager;

BlynkManager blynkManager;
XiaozhiManager xiaozhiManager;

OTAManager otaManager;

TaskManager taskManager;

/* =========================================================
   FUNCTION DECLARATIONS
========================================================= */

void initializeHardware();
void initializeManagers();
void initializeServices();
void initializeTasks();
void syncSystemState();

/* =========================================================
   SETUP
========================================================= */

void setup()
{
    Serial.begin(115200);
    delay(1000);

    Serial.println();
    Serial.println("====================================");
    Serial.println("XIAOZHI SMART HOME STARTING...");
    Serial.println("====================================");

    initializeHardware();

    initializeManagers();

    initializeServices();

    initializeTasks();

    syncSystemState();

    Serial.println("====================================");
    Serial.println("SYSTEM READY");
    Serial.println("====================================");
}

/* =========================================================
   LOOP
========================================================= */

void loop()
{
    wifiManagerEx.loop();

    networkMonitor.loop();

    wsManager.loop();

    apiManager.loop();

    otaManager.loop();

    blynkManager.loop();

    xiaozhiManager.loop();

    schedulerManager.loop();

    delay(2);
}

/* =========================================================
   INITIALIZE HARDWARE
========================================================= */

void initializeHardware()
{
    Logger::info("Initializing Hardware...");

    relayManager.begin();

    buttonManager.begin();

    dimmerManager.begin();

    dhtManager.begin();

    soundManager.begin();

    oledManager.begin();

    rtcManager.begin();

    Logger::success("Hardware Initialized");
}

/* =========================================================
   INITIALIZE MANAGERS
========================================================= */

void initializeManagers()
{
    Logger::info("Initializing Core Managers...");

    PreferencesManager::begin();

    EventManager::begin();

    SystemState::begin();

    schedulerManager.begin();

    Logger::success("Core Managers Ready");
}

/* =========================================================
   INITIALIZE SERVICES
========================================================= */

void initializeServices()
{
    Logger::info("Initializing Services...");

    wifiManagerEx.begin();

    networkMonitor.begin();

    spiffsManager.begin();

    webDashboard.begin();

    webRoutes.begin();

    wsManager.begin();

    apiManager.begin();

    authManager.begin();

    otaManager.begin();

    blynkManager.begin();

    xiaozhiManager.begin();

    Logger::success("Services Initialized");
}

/* =========================================================
   INITIALIZE TASKS
========================================================= */

void initializeTasks()
{
    Logger::info("Starting FreeRTOS Tasks...");

    taskManager.begin();

    Logger::success("Tasks Started");
}

/* =========================================================
   SYSTEM STATE SYNC
========================================================= */

void syncSystemState()
{
    Logger::info("Restoring Saved States...");

    relayManager.restoreStates();

    dimmerManager.restoreState();

    schedulerManager.restoreSchedules();

    wsManager.broadcastSystemState();

    oledManager.showBootComplete();

    Logger::success("State Sync Complete");
}