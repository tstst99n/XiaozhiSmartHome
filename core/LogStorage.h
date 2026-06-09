#pragma once

#include <Arduino.h>

/* =========================================================
   LOG CONFIGURATION
   ========================================================= */

constexpr size_t LOG_MESSAGE_LENGTH = 128;
constexpr size_t MAX_LOG_ENTRIES    = 200;

/* =========================================================
   LOG CATEGORY
   ========================================================= */

enum class LogCategory : uint8_t
{
    SYSTEM = 0,
    WIFI,
    RELAY,
    FAN,
    BUTTON,
    SENSOR,
    RTC,
    SCHEDULER,
    API,
    WEBSOCKET,
    OTA,
    PREFERENCES,
    EVENT,
    SECURITY
};

/* =========================================================
   LOG ENTRY
   ========================================================= */

struct LogEntry
{
    uint32_t timestamp;

    LogCategory category;

    char message[LOG_MESSAGE_LENGTH];
};

/* =========================================================
   LOG STORAGE
   ========================================================= */

class LogStorage
{
public:

    static void begin();

    static void add(
        LogCategory category,
        const String& message
    );

    static size_t count();

    static const LogEntry* get(
        size_t index
    );

    static void clear();

private:

    static LogEntry s_logs[
        MAX_LOG_ENTRIES
    ];

    /* Circular Buffer */

    static size_t s_head;

    static size_t s_count;
};