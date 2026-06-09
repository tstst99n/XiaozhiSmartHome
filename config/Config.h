#pragma once

#include <Arduino.h>

/* =========================================================
   PROJECT INFORMATION
   ========================================================= */

#define PROJECT_NAME        "Xiaozhi Smart Home"
#define PROJECT_VERSION     "1.0.0"

/* =========================================================
   DEVICE COUNTS
   ========================================================= */

constexpr uint8_t RELAY_COUNT      = 6;
constexpr uint8_t BUTTON_COUNT     = 5;
constexpr uint8_t MAX_SCHEDULES    = 20;

/* =========================================================
   WEB SERVER
   ========================================================= */

constexpr uint16_t HTTP_PORT = 80;

static constexpr const char* WS_ENDPOINT = "/ws";

/* =========================================================
   PREFERENCES
   ========================================================= */

static constexpr const char* PREF_NAMESPACE = "xiaozhi";

/* =========================================================
   SENSOR TIMING
   ========================================================= */

constexpr uint32_t DHT_UPDATE_INTERVAL_MS = 2000;
constexpr uint32_t OLED_UPDATE_INTERVAL_MS = 1000;

/* =========================================================
   OLED
   ========================================================= */

constexpr uint16_t OLED_WIDTH  = 128;
constexpr uint16_t OLED_HEIGHT = 64;
constexpr uint8_t  OLED_ADDRESS = 0x3C;

constexpr uint32_t OLED_PAGE_SWITCH_MS = 3000;

/* =========================================================
   WEBSOCKET
   ========================================================= */

constexpr uint32_t WS_HEARTBEAT_MS = 10000;
constexpr uint8_t  WS_MAX_CLIENTS  = 10;

/* =========================================================
   FAN CONTROL
   ========================================================= */

constexpr uint8_t FAN_MIN_SPEED     = 0;
constexpr uint8_t FAN_MAX_SPEED     = 100;
constexpr uint8_t FAN_DEFAULT_SPEED = 50;

/* =========================================================
   OTA
   ========================================================= */

static constexpr const char* OTA_HOSTNAME = "XiaozhiSmartHome";

/* =========================================================
   JSON DOCUMENT SIZES
   ========================================================= */

constexpr size_t JSON_SMALL  = 512;
constexpr size_t JSON_MEDIUM = 1024;
constexpr size_t JSON_LARGE  = 4096;

/* =========================================================
   SYSTEM MODES
   ========================================================= */

enum class SystemMode : uint8_t
{
    MANUAL = 0,
    ONLINE,
    AUTO,
    ECO
};

/* =========================================================
   OLED PAGES
   ========================================================= */

enum class OLEDPage : uint8_t
{
    WIFI_TIME = 0,
    SENSOR_DATA,
    RELAY_STATUS,
    FAN_STATUS,
    MODE_STATUS,
    VOICE_STATUS,
    OTA_STATUS,
    ERROR_STATUS
};