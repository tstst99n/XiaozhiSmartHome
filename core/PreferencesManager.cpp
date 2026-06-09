#include "PreferencesManager.h"

#include "../Config/Constants.h"

/* =========================================================
   STATIC MEMBERS
   ========================================================= */

Preferences PreferencesManager::s_preferences;

bool PreferencesManager::s_initialized = false;

/* =========================================================
   INITIALIZATION
   ========================================================= */

bool PreferencesManager::begin()
{
    if (s_initialized)
    {
        return true;
    }

    s_initialized =
        s_preferences.begin(
            PREF_NAMESPACE,
            false
        );

    return s_initialized;
}

void PreferencesManager::end()
{
    if (!s_initialized)
    {
        return;
    }

    s_preferences.end();

    s_initialized = false;
}

/* =========================================================
   RELAY STATES
   ========================================================= */

bool PreferencesManager::saveRelayState(
    uint8_t relayIndex,
    bool state
)
{
    if (!s_initialized)
    {
        return false;
    }

    String key =
        "relay" +
        String(relayIndex);

    return s_preferences.putBool(
               key.c_str(),
               state
           ) > 0;
}

bool PreferencesManager::loadRelayState(
    uint8_t relayIndex,
    bool defaultState
)
{
    if (!s_initialized)
    {
        return defaultState;
    }

    String key =
        "relay" +
        String(relayIndex);

    return s_preferences.getBool(
        key.c_str(),
        defaultState
    );
}

/* =========================================================
   FAN SETTINGS
   ========================================================= */

bool PreferencesManager::saveFanSpeed(
    uint8_t speed
)
{
    if (!s_initialized)
    {
        return false;
    }

    return s_preferences.putUChar(
               "fanSpeed",
               speed
           ) > 0;
}

uint8_t PreferencesManager::loadFanSpeed(
    uint8_t defaultSpeed
)
{
    if (!s_initialized)
    {
        return defaultSpeed;
    }

    return s_preferences.getUChar(
        "fanSpeed",
        defaultSpeed
    );
}

/* =========================================================
   SYSTEM MODE
   ========================================================= */

bool PreferencesManager::saveSystemMode(
    uint8_t mode
)
{
    if (!s_initialized)
    {
        return false;
    }

    return s_preferences.putUChar(
               "sysMode",
               mode
           ) > 0;
}

uint8_t PreferencesManager::loadSystemMode(
    uint8_t defaultMode
)
{
    if (!s_initialized)
    {
        return defaultMode;
    }

    return s_preferences.getUChar(
        "sysMode",
        defaultMode
    );
}

/* =========================================================
   DEVICE SETTINGS
   ========================================================= */

bool PreferencesManager::saveDeviceName(
    const String& deviceName
)
{
    if (!s_initialized)
    {
        return false;
    }

    return s_preferences.putString(
               "deviceName",
               deviceName
           ) > 0;
}

String PreferencesManager::loadDeviceName(
    const String& defaultName
)
{
    if (!s_initialized)
    {
        return defaultName;
    }

    return s_preferences.getString(
        "deviceName",
        defaultName
    );
}

/* =========================================================
   GENERIC STORAGE
   ========================================================= */

bool PreferencesManager::putBool(
    const char* key,
    bool value
)
{
    if (!s_initialized)
    {
        return false;
    }

    return s_preferences.putBool(
               key,
               value
           ) > 0;
}

bool PreferencesManager::getBool(
    const char* key,
    bool defaultValue
)
{
    if (!s_initialized)
    {
        return defaultValue;
    }

    return s_preferences.getBool(
        key,
        defaultValue
    );
}

bool PreferencesManager::putUInt(
    const char* key,
    uint32_t value
)
{
    if (!s_initialized)
    {
        return false;
    }

    return s_preferences.putUInt(
               key,
               value
           ) > 0;
}

uint32_t PreferencesManager::getUInt(
    const char* key,
    uint32_t defaultValue
)
{
    if (!s_initialized)
    {
        return defaultValue;
    }

    return s_preferences.getUInt(
        key,
        defaultValue
    );
}

bool PreferencesManager::putString(
    const char* key,
    const String& value
)
{
    if (!s_initialized)
    {
        return false;
    }

    return s_preferences.putString(
               key,
               value
           ) > 0;
}

String PreferencesManager::getString(
    const char* key,
    const String& defaultValue
)
{
    if (!s_initialized)
    {
        return defaultValue;
    }

    return s_preferences.getString(
        key,
        defaultValue
    );
}

/* =========================================================
   MAINTENANCE
   ========================================================= */

bool PreferencesManager::removeKey(
    const char* key
)
{
    if (!s_initialized)
    {
        return false;
    }

    return s_preferences.remove(
        key
    );
}

bool PreferencesManager::clearAll()
{
    if (!s_initialized)
    {
        return false;
    }

    return s_preferences.clear();
}