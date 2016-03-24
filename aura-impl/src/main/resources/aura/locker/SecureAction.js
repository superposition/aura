/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function SecureAction(action, key) {
    "use strict";

    var o = Object.create(null, {
        "toString": {
            value: function() {
                return "SecureAction: " + action + "{ key: " + JSON.stringify(key) + " }";
            }
        }
    });
    Object.defineProperties(o, {
        "setCallback": SecureThing.createFilteredMethod(o, action, "setCallback"),
        "setParams": SecureThing.createFilteredMethod(o, action, "addHandler"),
        "setParam": SecureThing.createFilteredMethod(o, action, "addHandler"),
        "getParams": SecureThing.createFilteredMethod(o, action, "getParams"),
        "getParam": SecureThing.createFilteredMethod(o, action, "getParam"),
        "getCallback": SecureThing.createFilteredMethod(o, action, "getCallback"),
        "getState": SecureThing.createFilteredMethod(o, action, "getState"),
        "getReturnValue": SecureThing.createFilteredMethod(o, action, "getReturnValue"),
        "getError": SecureThing.createFilteredMethod(o, action, "getError"),
        "isBackground": SecureThing.createFilteredMethod(o, action, "isBackground"),
        "setBackground": SecureThing.createFilteredMethod(o, action, "setBackground"),
        "setAbortable": SecureThing.createFilteredMethod(o, action, "setAbortable"),
        "setStorable": SecureThing.createFilteredMethod(o, action, "setStorable")
    });

    setLockerSecret(o, "key", key);
    setLockerSecret(o, "ref", action);
    return Object.seal(o);
}