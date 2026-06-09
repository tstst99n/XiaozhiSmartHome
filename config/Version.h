#pragma once

#include <Arduino.h>

/* =========================================================
   XIAOZHI SMART HOME
   VERSION INFORMATION
   ========================================================= */

namespace Version
{
    /* -----------------------------------------------------
       Product Information
       ----------------------------------------------------- */

    constexpr const char* PROJECT_NAME =
        "Xiaozhi Smart Home";

    constexpr const char* PROJECT_DESCRIPTION =
        "ESP32-S3 Smart Home Automation System";

    constexpr const char* AUTHOR =
        "TAHIDUL";

    /* -----------------------------------------------------
       Semantic Version
       ----------------------------------------------------- */

    constexpr uint8_t MAJOR = 1;
    constexpr uint8_t MINOR = 0;
    constexpr uint8_t PATCH = 0;

    constexpr const char* VERSION_STRING =
        "1.0.0";

    /* -----------------------------------------------------
       Firmware Information
       ----------------------------------------------------- */

    constexpr const char* FIRMWARE_NAME =
        "XiaozhiSmartHome";

    constexpr const char* HARDWARE_PLATFORM =
        "ESP32-S3-N16R8";

    /* -----------------------------------------------------
       Build Information
       ----------------------------------------------------- */

    constexpr const char* BUILD_DATE =
        __DATE__;

    constexpr const char* BUILD_TIME =
        __TIME__;

    /* -----------------------------------------------------
       Helper Functions
       ----------------------------------------------------- */

    inline String getVersion()
    {
        return String(VERSION_STRING);
    }

    inline String getFullVersion()
    {
        return String(PROJECT_NAME) +
               " v" +
               VERSION_STRING;
    }

    inline String getBuildInfo()
    {
        return String(BUILD_DATE) +
               " " +
               BUILD_TIME;
    }
}