import sinon from 'sinon';
import axios from 'axios';
import assert from 'assert';
import { JSDOM } from 'jsdom';
import jsonProgrammes from '../../mocks/programmes.json';
import Programmes from '../../../public/js/app/sections/programmes.js';
import * as ProgrammeService from '../../../public/js/app/services/programme.js';

describe('sections > programmes', () => {

    let section;
    let parentElement;
    let dom;
    let document;
    let programmeServiceStub;
    
    beforeEach(() => {
        programmeServiceStub = sinon.stub(ProgrammeService, 'default').callsFake(function() {
            return {
                get: () => {
                    return Promise.resolve({ data: jsonProgrammes });
                }
            }
        });
        dom = new JSDOM(`<!DOCTYPE html><div class="app"/>`);
        document = global.document = dom.window.document;
        global.axios = function(){};
        parentElement = dom.window.document.querySelector('.app');
        section = new Programmes(parentElement);
    });

    afterEach(() => {
        programmeServiceStub.restore();
        section = undefined;
        parentElement = undefined;
        dom = undefined;
        document = undefined;
        programmeServiceStub = undefined;
    });

    it('should create a title', () => {
        section.show('citv');
        assert.equal(document.querySelector('.programmes__citv h1').innerHTML, 'CITV Channel');
    });

    it('should render a list of programmes', (done) => {
        section.show('citv');
        setTimeout(() => {
            try {
                assert.equal(document.querySelectorAll('.programmes__citv li').length, 5, 'Number of items rendered');
                done();
            } catch(err) {
                done(err);
            }
        }, 300);
    });

    it('should render an img for each program', (done) => {
        section.show('citv');
        setTimeout(() => {
            const programmeList = document.querySelectorAll('.programmes__citv li');

            for (let i = 0; i < programmeList.length; i++) {
                assert.equal(programmeList[i].getElementsByTagName('img').length, 1, 'Number of imgs per program');
            }

            done();

        }, 300);
    });

});
