#include "LogStorage.h"

#include <cstring>

/* =========================================================
   STATIC MEMBERS
   ========================================================= */

LogEntry LogStorage::s_logs[
    MAX_LOG_ENTRIES
];

size_t LogStorage::s_head = 0;

size_t LogStorage::s_count = 0;

/* =========================================================
   INITIALIZATION
   ========================================================= */

void LogStorage::begin()
{
    s_head  = 0;
    s_count = 0;

    memset(
        s_logs,
        0,
        sizeof(s_logs)
    );
}

/* =========================================================
   ADD LOG
   ========================================================= */

void LogStorage::add(
    LogCategory category,
    const String& message
)
{
    const size_t index =
        (s_head + s_count) %
        MAX_LOG_ENTRIES;

    LogEntry& entry =
        s_logs[index];

    entry.timestamp =
        millis();

    entry.category =
        category;

    strncpy(
        entry.message,
        message.c_str(),
        LOG_MESSAGE_LENGTH - 1
    );

    entry.message[
        LOG_MESSAGE_LENGTH - 1
    ] = '\0';

    if (s_count < MAX_LOG_ENTRIES)
    {
        ++s_count;
    }
    else
    {
        s_head =
            (s_head + 1) %
            MAX_LOG_ENTRIES;
    }
}

/* =========================================================
   TOTAL LOG COUNT
   ========================================================= */

size_t LogStorage::count()
{
    return s_count;
}

/* =========================================================
   GET LOG ENTRY
   ========================================================= */

const LogEntry* LogStorage::get(
    size_t index
)
{
    if (index >= s_count)
    {
        return nullptr;
    }

    const size_t actualIndex =
        (s_head + index) %
        MAX_LOG_ENTRIES;

    return &s_logs[
        actualIndex
    ];
}

/* =========================================================
   CLEAR LOGS
   ========================================================= */

void LogStorage::clear()
{
    s_head  = 0;
    s_count = 0;

    memset(
        s_logs,
        0,
        sizeof(s_logs)
    );
}