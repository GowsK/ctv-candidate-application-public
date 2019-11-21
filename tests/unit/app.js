import sinon from 'sinon';
import { JSDOM } from 'jsdom';
import Application from '../../public/js/app/app.js'
import * as Programmes from '../../public/js/app/sections/programmes.js';
import * as Channels from '../../public/js/app/sections/channels.js';

const assert = require('assert');

describe('app', () => {

    let app;
    let dom;
    let document;
    let programmesStub;
    let programmesClassStub;
    let channelStub;
    let channelStubClassStub;

    beforeEach(() => {
        global.axios = function(){};
        programmesStub = sinon.stub({
            show: () => {}
        });
        programmesClassStub = sinon.stub(Programmes, 'default').callsFake(function() {
            return programmesStub;
        });

        channelStub = sinon.stub({
            getStrapLine: () => {},
            listenForSelectChange: () => {}
        });

        channelStubClassStub = sinon.stub(Channels, 'default').callsFake(function () {
            return channelStub;
        });
        
        dom = new JSDOM(`<!DOCTYPE html><div class="app"/>`);
        document = global.document = dom.window.document;
        app = new Application();
    });

    afterEach(() => {
        programmesClassStub.restore();
        channelStubClassStub.restore();
        app = undefined;
        programmesStub = undefined;
        programmesClassStub = undefined;
        channelStubClassStub = undefined;
        dom = undefined;
        document = undefined;
    });

    it('should create a programme section', () => {
        const element = 'parent element';
        app.create(element);
        assert.ok(programmesClassStub.withArgs(element).calledOnce);
    });

    it('should show programmes for a channel', () => {
        const element = 'parent element';
        app.create(element);
        assert.ok(programmesStub.show.withArgs('itv').calledOnce);
    });

});
