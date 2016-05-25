'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
    prompting: function () {
        this.log(yosay(
            'Welcome to the ' + chalk.red('Hope Web App') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'component',
            message: 'Component name',
            default: 'Some/Component'
        }];

        return this.prompt(prompts).then(function (props) {
            // To access props later use this.props.someAnswer;
            this.props = props;
        }.bind(this));
    },

    writing: function () {
        var component;
        var namespace = '';
        var parts = this.props.component.split('/');
        if (parts.length === 1) {
            component = parts[0];
        } else {
            component = parts[1];
            namespace = parts[0];
        }
        var basePath = 'src/components/';
        if (namespace) {
            basePath += namespace + '/';
        }
        basePath += component + '/';

        // Copy template files
        this.fs.copy(
            this.templatePath('component/MediaQueries'),
            this.destinationPath(basePath + 'MediaQueries')
        );
        this.fs.copy(
            this.templatePath('component/*.scss'),
            this.destinationPath(basePath)
        );
        this.fs.copyTpl(
            this.templatePath('component/main.scss'),
            this.destinationPath(basePath + 'main.scss'),
            {
                component: component.charAt(0).toLowerCase() + component.substr(1, component.length-1)
            }
        );
        this.fs.copyTpl(
            this.templatePath('component/component.tpl.js'),
            this.destinationPath(basePath + 'component.tpl.js'),
            {
                component: component.charAt(0).toLowerCase() + component.substr(1, component.length-1),
                componentTitle: component
            }
        );

        // Update namespace index
        if (namespace !== '') {
            var indexFile = this.destinationPath(basePath + '../../index.js');
            try {
                var content = this.fs.read(indexFile);
            } catch (error) {
                var content = '';
            }
            content += `export * as ${namespace} from './${namespace}';\n`;
            this.fs.write(indexFile, content);
        }

        // Update subcomponent index
        var indexFile = this.destinationPath(basePath + '../index.js');
        try {
            var content = this.fs.read(indexFile);
        } catch (error) {
            var content = '';
        }
        content += `export ${component} from './${component}/component.tpl';\n`;
        this.fs.write(indexFile, content);
    }
});
