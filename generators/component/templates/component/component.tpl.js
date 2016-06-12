import React from 'react';
import Styles from './main.scss';
import PixelPerfect from 'components/PixelPerfect/component';
import BreakPoints from 'components/PixelPerfect/breakpoints';

export default function <%= componentTitle %>() {
    const templates = [
        BreakPoints.phonePortrait.name,
        BreakPoints.phoneLandscape.name,
        BreakPoints.tabletPortrait.name,
        BreakPoints.tabletLandscape.name,
        BreakPoints.desktop.name
    ];

    return (
        <PixelPerfect templates={ templates } component="<%= component %>">
            <section className={ Styles.<%= component %>Component }>
                <%= componentTitle %> Component
            </section>
        </PixelPerfect>
    );
}
