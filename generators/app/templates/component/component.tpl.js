import React, { Component } from 'react';
import Styles from './main.scss';

function <%= componentTitle %>(props) {
    render() {
        return (
            <section className={ Styles.<%= component %>Component }>
                <%= componentTitle %> Component
            </section>
        );
    }
}
