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
package org.auraframework.impl.adapter.format.css;

import org.auraframework.annotations.Annotations.ServiceComponent;
import org.auraframework.clientlibrary.Combinable;
import org.auraframework.throwable.quickfix.QuickFixException;

import javax.annotation.concurrent.ThreadSafe;
import java.io.IOException;
import java.util.Collection;

/**
 * Formats client library css. Minifies (removes spaces) if not DEV or TEST modes
 */
@ThreadSafe
@ServiceComponent
public class ClientLibraryCSSFormatAdapter extends CSSFormatAdapter<Combinable> {

    /**
     * Handles Combinable
     * @return Combinable
     */
    @Override
    public Class<?> getType() {
        return Combinable.class;
    }

    /**
     * Loops through combinables and gets their contents.
     *
     * @param values combinables
     * @param out appendable
     * @throws IOException
     * @throws QuickFixException
     */
    @Override
    public void writeCollection(Collection<? extends Combinable> values, Appendable out)
            throws IOException, QuickFixException {
        for (Combinable c : values) {
            if (c != null) {
                out.append(c.getContents());
            }
        }
    }
}
