#pragma once

#include <Arduino.h>
#include <Preferences.h>

#include "../Config/Config.h"

/* =========================================================
   PREFERENCES MANAGER
   ESP32 NVS STORAGE
   ========================================================= */

class PreferencesManager
{
public:

    /* =====================================================
       INITIALIZATION
       ===================================================== */

    static bool begin();
    static void end();

    /* =====================================================
       RELAY STATES
       ===================================================== */

    static bool saveRelayState(
        uint8_t relayIndex,
        bool state
    );

    static bool loadRelayState(
        uint8_t relayIndex,
        bool defaultState = false
    );

    /* =====================================================
       FAN SETTINGS
       ===================================================== */

    static bool saveFanSpeed(
        uint8_t speed
    );

    static uint8_t loadFanSpeed(
        uint8_t defaultSpeed = 50
    );

    /* =====================================================
       SYSTEM SETTINGS
       ===================================================== */

    static bool saveSystemMode(
        uint8_t mode
    );

    static uint8_t loadSystemMode(
        uint8_t defaultMode = 0
    );

    static bool saveDeviceName(
        const String& deviceName
    );

    static String loadDeviceName(
        const String& defaultName = "XiaozhiSmartHome"
    );

    /* =====================================================
       GENERIC STORAGE
       ===================================================== */

    static bool putBool(
        const char* key,
        bool value
    );

    static bool getBool(
        const char* key,
        bool defaultValue = false
    );

    static bool putUInt(
        const char* key,
        uint32_t value
    );

    static uint32_t getUInt(
        const char* key,
        uint32_t defaultValue = 0
    );

    static bool putString(
        const char* key,
        const String& value
    );

    static String getString(
        const char* key,
        const String& defaultValue = ""
    );

    /* =====================================================
       MAINTENANCE
       ===================================================== */

    static bool removeKey(
        const char* key
    );

    static bool clearAll();

private:

    static Preferences s_preferences;
    static bool s_initialized;
};