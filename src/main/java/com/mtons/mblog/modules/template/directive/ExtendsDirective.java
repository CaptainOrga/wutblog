package com.mtons.mblog.modules.template.directive;

import com.mtons.mblog.modules.template.DirectiveHandler;
import com.mtons.mblog.modules.template.TemplateDirective;
import freemarker.core.Environment;
import freemarker.template.SimpleScalar;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateException;

import java.io.IOException;
import java.io.StringWriter;

/**
 * fork https://github.com/kwon37xi/freemarker-template-inheritance
 * @since 4.0.0
 */
public class ExtendsDirective extends TemplateDirective {
    @Override
    public String getName() {
        return "layout.extends";
    }

    @Override
    public void execute(DirectiveHandler handler) throws Exception {
        String layoutName =  handler.getString("name");
        handler.bodyResult();
        handler.getEnv().include(layoutName, null, true);
    }

}