import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

export default class Contact extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Наши контакты</title>
                    <meta name="description"  content="Здесь вы можете связаться с нами."/>
                    <meta property="og:title" content="Страница контактов" />
                    <meta property="og:description" content="Здесь вы можете связаться с нами." />
                    <meta property="og:type" content="website" />
                    <link rel="github" href="https://github.com/VERTEXSoftware" />
                </Helmet>

                <div>Наши контакты</div>
            </div>
        );
    }
}