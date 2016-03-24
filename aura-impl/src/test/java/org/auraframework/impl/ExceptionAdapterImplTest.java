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
package org.auraframework.impl;

import static org.junit.Assert.assertArrayEquals;

import java.util.List;

import org.apache.log4j.Logger;
import org.apache.log4j.spi.LoggingEvent;
import org.auraframework.adapter.ExceptionAdapter;
import org.auraframework.impl.controller.ComponentController.AuraClientException;
import org.auraframework.impl.test.util.LoggingTestAppender;
import org.junit.Test;

public class ExceptionAdapterImplTest extends AuraImplTestCase {

    private Logger logger;
    private LoggingTestAppender appender;

    public ExceptionAdapterImplTest(String name) {
        super(name);
        logger = Logger.getLogger(ExceptionAdapterImpl.class);
    }

    @Override
    public void setUp() throws Exception {
        super.setUp();
        appender = new LoggingTestAppender();
        logger.addAppender(appender);
    }

    @Override
    public void tearDown() throws Exception {
        logger.removeAppender(appender);
        super.tearDown();
    }

    @Test
    public void testAllClientErrorPropertiesGetLogged() {
        ExceptionAdapter exceptionAdapter = new ExceptionAdapterImpl();
        String causeDescriptor = "causeDescriptor";
        String errorId = "12345678-1234-1234-1234-123412341234";
        String errorMsg = "error message";
        String JsStacktrace = "JS stack trace";
        AuraClientException clientException = new AuraClientException(causeDescriptor, errorId, errorMsg, JsStacktrace);

        exceptionAdapter.handleException(clientException, null);
        List<LoggingEvent> logs = appender.getLog();
        String logString = logs.get(0).getMessage().toString();

        String[] actual = logString.split("\\n");
        String[] expected = new String[] {
                "Unhandled Exception '" + errorMsg +"':",
                "Client error id: " + errorId,
                "Failing descriptor: " + causeDescriptor,
                "Javascript stack: " + JsStacktrace
            };
        assertArrayEquals(expected, actual);
    }

}