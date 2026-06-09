#pragma once

#include <Arduino.h>

/* =========================================================
   XIAOZHI SMART HOME
   GLOBAL CONSTANTS
   ========================================================= */

namespace Constants
{
    /* =====================================================
       API ROUTES
       ===================================================== */

    constexpr const char* API_SYSTEM_INFO      = "/api/system";
    constexpr const char* API_RELAYS           = "/api/relays";
    constexpr const char* API_RELAY_CONTROL    = "/api/relay";
    constexpr const char* API_FAN_CONTROL      = "/api/fan";
    constexpr const char* API_SENSOR_DATA      = "/api/sensors";
    constexpr const char* API_SCHEDULES        = "/api/schedules";
    constexpr const char* API_SETTINGS         = "/api/settings";
    constexpr const char* API_RESTART          = "/api/restart";
    constexpr const char* API_FACTORY_RESET    = "/api/factory-reset";
    constexpr const char* API_OTA_UPLOAD       = "/update";

    /* =====================================================
       WEBSOCKET EVENTS
       ===================================================== */

    constexpr const char* WS_HEARTBEAT         = "heartbeat";
    constexpr const char* WS_HEARTBEAT_ACK     = "heartbeat_ack";

    constexpr const char* WS_RELAY_UPDATE      = "relay_update";
    constexpr const char* WS_FAN_UPDATE        = "fan_update";
    constexpr const char* WS_SENSOR_UPDATE     = "sensor_update";
    constexpr const char* WS_SCHEDULE_UPDATE   = "schedule_update";
    constexpr const char* WS_SYSTEM_UPDATE     = "system_update";
    constexpr const char* WS_LOG_UPDATE        = "log_update";
    constexpr const char* WS_OTA_PROGRESS      = "ota_progress";

    /* =====================================================
       JSON KEYS
       ===================================================== */

    constexpr const char* JSON_SUCCESS         = "success";
    constexpr const char* JSON_MESSAGE         = "message";
    constexpr const char* JSON_DATA            = "data";

    constexpr const char* JSON_RELAY           = "relay";
    constexpr const char* JSON_STATE           = "state";

    constexpr const char* JSON_SPEED           = "speed";

    constexpr const char* JSON_TEMPERATURE     = "temperature";
    constexpr const char* JSON_HUMIDITY        = "humidity";

    constexpr const char* JSON_WIFI_RSSI       = "wifi_rssi";
    constexpr const char* JSON_IP_ADDRESS      = "ip";

    constexpr const char* JSON_UPTIME          = "uptime";
    constexpr const char* JSON_FREE_HEAP       = "free_heap";

    constexpr const char* JSON_TIME            = "time";
    constexpr const char* JSON_DATE            = "date";

    /* =====================================================
       PREFERENCES KEYS
       ===================================================== */

    constexpr const char* PREF_RELAYS          = "relays";
    constexpr const char* PREF_FAN_SPEED       = "fanSpeed";
    constexpr const char* PREF_WIFI_MODE       = "wifiMode";
    constexpr const char* PREF_DEVICE_NAME     = "deviceName";

    /* =====================================================
       SYSTEM EVENTS
       ===================================================== */

    constexpr const char* EVENT_BOOT           = "BOOT";
    constexpr const char* EVENT_WIFI_CONNECTED = "WIFI_CONNECTED";
    constexpr const char* EVENT_WIFI_LOST      = "WIFI_DISCONNECTED";
    constexpr const char* EVENT_RELAY_CHANGED  = "RELAY_CHANGED";
    constexpr const char* EVENT_FAN_CHANGED    = "FAN_CHANGED";
    constexpr const char* EVENT_SCHEDULE_RUN   = "SCHEDULE_EXECUTED";
    constexpr const char* EVENT_OTA_STARTED    = "OTA_STARTED";
    constexpr const char* EVENT_OTA_FINISHED   = "OTA_FINISHED";
    constexpr const char* EVENT_RESTART        = "SYSTEM_RESTART";

    /* =====================================================
       CONTENT TYPES
       ===================================================== */

    constexpr const char* CONTENT_JSON         = "application/json";
    constexpr const char* CONTENT_HTML         = "text/html";
    constexpr const char* CONTENT_CSS          = "text/css";
    constexpr const char* CONTENT_JS           = "application/javascript";
    constexpr const char* CONTENT_TEXT         = "text/plain";

    