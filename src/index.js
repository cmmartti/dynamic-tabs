import React from 'react';
import ReactDOM from 'react-dom';
import {css} from 'emotion';

import './styles.css';
import DynamicTabs from './DynamicTabs';

function Link({to, children}) {
    return (
        <a
            target="blank"
            className={css`
                padding: 0.5em 0.75em;
                display: block;
                text-decoration: none;
                color: black;

                &:hover {
                    text-decoration: underline;
                    background-color: aliceblue;
                }
            `}
            href={to}
        >
            {children}
        </a>
    );
}

function App() {
    return (
        <div>
            <h1
                className={css`
                    padding: 0.25em 0.35em;
                    margin: 0;
                    font-size: 1.5em;
                    background-color: saddlebrown;
                    color: white;
                `}
            >
                <svg
                    className={css`
                        height: 0.9em;
                        padding-top: 0.1em;
                    `}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 428.81 167.75"
                >
                    <path
                        fill="currentColor"
                        d="M392.84,165.36s-228.56-6-276.35,2.28c-13.2,2.27,0-29.14,2.28-31.42s49-40,22.31-73.75c-3.87-4.89-13.43-5.58-22,.91s-16.86,3-26.29-2.39c-4.1-2.33-17.07-3.64-23.22-1S60,56.55,58.68,53.48s-5.47-4.67-5.47-4.67S19,49.39,7,47.67c-8-1.13-9.79-5.46-2-7.74s40.52-8.65,56.68-14.79S80.76,1,90.77.1s51.9,4.1,77.62,31.18S194.8,90.92,194.8,90.92s47.75-10.3,63.05-7c14.38,3.05,24.59,7.5,45.3,9.78s37.79,2.27,56.23,15.25c10.4,7.32,17.47,16.48,44.16,40.74,5,4.56,25.27,7.52,25.27,7.52v10.58s-20.72-3.07-29.82-9.45S392.84,165.36,392.84,165.36Z"
                    />
                </svg>{' '}
                Birds of Canada
            </h1>

            <DynamicTabs
                className={css`
                    align-items: stretch;
                    background: thistle;
                `}
            >
                <Link to="https://en.wikipedia.org/wiki/Common_loon">
                    Common Loon
                </Link>
                <Link to="https://en.wikipedia.org/wiki/Grey_jay">
                    Grey Jay
                </Link>
                <Link to="https://en.wikipedia.org/wiki/Canada_goose">
                    Canada Goose
                </Link>
                <Link to="https://en.wikipedia.org/wiki/Trumpeter_swan">
                    Trumpeter Swan
                </Link>
                <Link to="https://en.wikipedia.org/wiki/Northern_goshawk">
                    Northern goshawk
                </Link>
            </DynamicTabs>

            <div
                className={css`
                    flex: 1;
                    padding: 1em;
                `}
            >
                <p>
                    Resize the window to see how overflowing tabs automatically
                    shift into the overflow menu.
                </p>

                <p>
                    Inspired by Osvaldas Valutis's 2018 CSS-Tricks article{' '}
                    <a href="https://css-tricks.com/container-adapting-tabs-with-more-button/">
                        Container-Adapting Tabs With “More” Button
                    </a>
                    .
                </p>
                <p>
                    Source code available on{' '}
                    <a href="https://github.com/cmmartti/dynamic-tabs">
                        GitHub
                    </a>
                    .
                </p>
                <p>
                    © 2019{' '}
                    <a href="https://charlesmarttinen.ca">Charles Marttinen</a>.
                </p>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
