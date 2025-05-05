import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

export default class Blog extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Страница блога</title>
                    <meta name="description" content="Описание блога." />
                    <meta property="og:title" content="Пустой блог." />
                    <meta property="og:description" content="Описание блога." />
                </Helmet>
                
                <div>Пустой блог</div>
            </div>
        );
    }
}