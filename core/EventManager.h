#pragma once

#include <Arduino.h>

/* =========================================================
   EVENT TYPES
   ========================================================= */

enum class EventType : uint8_t
{
    NONE = 0,

    /* Relay Events */

    RELAY_ON,
    RELAY_OFF,
    RELAY_CHANGED,

    /* Fan Events */

    FAN_SPEED_CHANGED,

    /* Sensor Events */

    TEMPERATURE_UPDATED,
    HUMIDITY_UPDATED,

    /* WiFi Events */

    WIFI_CONNECTED,
    WIFI_DISCONNECTED,

    /* Scheduler Events */

    SCHEDULE_EXECUTED,

    /* System Events */

    SYSTEM_STARTED,
    SYSTEM_RESTARTED,

    /* OTA Events */

    OTA_STARTED,
    OTA_PROGRESS,
    OTA_COMPLETED,

    /* WebSocket Events */

    CLIENT_CONNECTED,
    CLIENT_DISCONNECTED
};

/* =========================================================
   EVENT DATA
   ========================================================= */

struct EventData
{
    uint32_t timestamp = 0;

    int32_t value1 = 0;

    int32_t value2 = 0;

    float floatValue = 0.0f;

    String text;
};

/* =========================================================
   EVENT CALLBACK
   ========================================================= */

using EventCallback =
    void (*)(
        EventType eventType,
        const EventData& data
    );

/* =========================================================
   EVENT MANAGER
   ========================================================= */

class EventManager
{
public:

    static constexpr uint8_t MAX_SUBSCRIBERS = 20;

    /* -----------------------------------------
       Initialization
       ----------------------------------------- */

    static void begin();

    /* -----------------------------------------
       Subscribe
       ----------------------------------------- */

    static bool subscribe(
        EventCallback callback
    );

    /* -----------------------------------------
       Unsubscribe
       ----------------------------------------- */

    static bool unsubscribe(
        EventCallback callback
    );

    /* -----------------------------------------
       Publish Event
       ----------------------------------------- */

    static void publish(
        EventType eventType,
        const EventData& data
    );

private:

    static EventCallback
        s_subscribers[MAX_SUBSCRIBERS];

    static uint8_t
        s_subscriberCount;
};