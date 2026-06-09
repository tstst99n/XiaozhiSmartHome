#pragma once

#include <Arduino.h>

#include "../Config/Config.h"



/* =========================================================
   WIFI STATE
   ========================================================= */

struct WiFiState
{
    bool connected = false;

    String ssid;

    String ipAddress;

    int32_t rssi = 0;
};

/* =========================================================
   SENSOR STATE
   ========================================================= */

struct SensorState
{
    float temperature = 0.0f;

    float humidity = 0.0f;

    bool valid = false;
};

/* =========================================================
   FAN STATE
   ========================================================= */

struct FanState
{
    uint8_t speed = 0;

    bool enabled = false;
};

/* =========================================================
   RTC STATE
   ========================================================= */

struct RTCState
{
    String date;

    String time;

    bool valid = false;
};

/* =========================================================
   SCHEDULER STATE
   ========================================================= */

struct SchedulerState
{
    bool enabled = true;

    uint16_t totalSchedules = 0;
};

/* =========================================================
   MAIN SYSTEM STATE
   ========================================================= */

struct SystemState
{
    /* Relay States */

    bool relays[RELAY_COUNT] =
    {
        false,
        false,
        false,
        false,
        false,
        false
    };

    /* Sensor */

    SensorState sensor;

    /* Fan */

    FanState fan;

    /* WiFi */

    WiFiState wifi;

    /* RTC */

    RTCState rtc;

    /* Scheduler */

    SchedulerState scheduler;

    /* System */

    SystemMode mode = SystemMode::MANUAL;

    bool otaRunning = false;

    bool webSocketConnected = false;

    uint32_t uptimeSeconds = 0;

    uint32_t freeHeap = 0;
};

/* =========================================================
   GLOBAL SYSTEM STATE
   ========================================================= */

extern SystemState gSystemState;