import React from 'react';
import {css} from 'emotion';
import classNames from 'classnames';

export function Container({children, innerProps}) {
    return <div {...innerProps}>{children}</div>;
}

export function TabContainer({innerRef, children, innerProps}) {
    return (
        <div
            className={css`
                display: flex;
                align-items: stretch;
                /* overflow-x: auto;
                -webkit-overflow-scrolling: touch; */
                flex: 1;
                min-width: 1px;

                & > * {
                    flex-shrink: 0;
                }
            `}
            ref={innerRef}
            {...innerProps}
        >
            {children}
        </div>
    );
}

export function MenuContainer({innerRef, children, innerProps}) {
    return (
        <div
            className={css`
                display: flex;
                align-items: stretch;
                position: relative;
            `}
            ref={innerRef}
            {...innerProps}
        >
            {children}
        </div>
    );
}

export function MenuButton({menuIsOpen, innerProps, innerRef}) {
    return (
        <button
            className={classNames({
                [css`
                    border: none;
                    color: inherit;
                    background: none;
                    font-weight: bold;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    padding: 0.5em;
                    &:hover {
                        background: aliceblue;
                    }
                `]: true,
                [css`
                    background: blanchedalmond;
                    &:hover {
                        background: blanchedalmond;
                    }
                `]: menuIsOpen,
            })}
            ref={innerRef}
            title="More"
            aria-label="More"
            {...innerProps}
        >
            • • •
        </button>
    );
}

export function Menu({children, innerProps}) {
    return (
        <div
            className={css`
                position: absolute;
                top: 100%;
                right: 0;
                background: blanchedalmond;
                box-shadow: 0px 0px 10px 1px hsla(0, 0%, 0%, 0.2);
            `}
            {...innerProps}
        >
            {children}
        </div>
    );
}

export default {
    Container,
    TabContainer,
    MenuContainer,
    MenuButton,
    Menu,
};
