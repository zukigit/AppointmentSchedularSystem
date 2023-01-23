package com.ai.backEnd.model;

import com.fasterxml.jackson.annotation.JsonValue;

public enum NotificationType {

    @JsonValue
    CREATE_APP,
    @JsonValue
    EDIT_APP,
    @JsonValue
    DELETE_APP,
    @JsonValue
    USER_REMOVED
}
