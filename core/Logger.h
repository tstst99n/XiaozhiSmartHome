#pragma once

#include <Arduino.h>

/* =========================================================
   LOG LEVELS
   ========================================================= */

enum class LogLevel : uint8_t
{
    DEBUG = 0,
    INFO,
    WARNING,
    ERROR,
    CRITICAL
};

/* =========================================================
   LOGGER
   ========================================================= */

class Logger
{
public:

    /* -----------------------------------------------------
       Initialization
       ----------------------------------------------------- */

    static void begin(
        uint32_t baudRate = 115200
    );

    /* -----------------------------------------------------
       Log Level Control
       ----------------------------------------------------- */

    static void setLevel(
        LogLevel level
    );

    static LogLevel getLevel();

    /* -----------------------------------------------------
       Generic Logging
       ----------------------------------------------------- */

    static void log(
        LogLevel level,
        const String& tag,
        const String& message
    );

    /* -----------------------------------------------------
       Convenience Methods
       ----------------------------------------------------- */

    static void debug(
        const String& tag,
        const String& message
    );

    static void info(
        const String& tag,
        const String& message
    );

    static void warning(
        const String& tag,
        const String& message
    );

    static void error(
        const String& tag,
        const String& message
    );

    static void critical(
        const String& tag,
        const String& message
    );

private:

    static LogLevel s_currentLevel;

    static const char* levelToString(
        LogLevel level
    );
};