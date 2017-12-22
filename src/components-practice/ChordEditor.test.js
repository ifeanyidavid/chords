import React from 'react';
import {shallow} from 'enzyme';
import ChordEditor from './ChordEditor';


describe('<ChordEditor />', () => {
    it('renders without crashing', () => {
        const editor = shallow(<ChordEditor />);
        expect(editor.find('textarea').length).toEqual(1);
    });

    it('renders an output area', () => {
        const editor = shallow(<ChordEditor />);
        expect(editor.find('div.chord-output').length).toEqual(1);
    });

    it('renders an output area', () => {
        const editor = shallow(<ChordEditor />);
        const expectedOutput =
            '<table>' +
            '<tr>' +
            '<td class="chord">B</td>' +
            '<td class="chord">Am</td>' +
            '</tr>' +
            '<tr>' +
            '<td class="lyrics">New&nbsp;</td>' +
            '<td class="lyrics">Lyrics&nbsp;</td>' +
            '</tr>' +
            '</table>';
        const realOutput = editor.find('div.chord-output').html();
        expect(realOutput.indexOf(expectedOutput) > -1).toEqual(true);
    });
})