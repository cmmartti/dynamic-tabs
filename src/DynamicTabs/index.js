import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';

import defaultComponents from './components';
import useOnClickOutside from './useOnClickOutside';

/*
    Phases:
    1. Initial render: Unconditionally render all tabs. When used with server-side
       rendering, this produces complete static HTML that is still usable in the event
       that JavaScript fails to load on the client.
    2. componentDidMount: Trigger a "measuring" render.
    3. Measuring render: Unconditionally render all tabs, as well as the menu button.
    4. Measure DOM elements: After the measuring render, determine which tabs can fit
       without overflowing and save these as `visibleTabIndices`.
    5. Final render: Render visible tabs and shift the rest into the overflow menu.

    ** When the window is resized or the tabs themselves change, trigger step 3.
*/

export default function DynamicTabs({children, components = {}, ...props}) {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [visibleTabIndices, setVisibleTabIndices] = useState([]);
    const [measuringRender, setMeasuringRender] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const containerRef = useRef(null);
    const buttonRef = useRef(null);
    const overflowRef = useRef(null);

    // 2. componentDidMount
    useEffect(() => {
        setIsMounted(true);
        setMeasuringRender(true);
    }, []);

    // 3. Measure DOM elements
    useLayoutEffect(() => {
        if (measuringRender) {
            // Get the child tab elements
            const tabElements = Array.from(containerRef.current.children);

            let stopWidth = 0;
            const visible = [];
            tabElements.forEach((tab, index) => {
                // Don't count the width of the More button unless it will be visible
                if (visible.length === tabElements.length - 1) {
                    stopWidth -= buttonRef.current.offsetWidth;
                }

                stopWidth += tab.offsetWidth;
                if (containerRef.current.offsetWidth >= stopWidth) {
                    visible.push(index);
                }
            });
            setVisibleTabIndices(visible);
            setMeasuringRender(false);
        }
    }, [measuringRender]);

    // Close the menu on outside clicks
    useOnClickOutside(overflowRef, () => {
        setMenuIsOpen(false);
    });

    // Close the menu when Escape is pressed
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                event.preventDefault();
                setMenuIsOpen(false);
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return function cleanUp() {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // ** Trigger a measuringRender when the window is resized
    useEffect(() => {
        function handleResize() {
            setMeasuringRender(true);
            setMenuIsOpen(false);
        }
        window.addEventListener('resize', handleResize);
        return function cleanUp() {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // ** Trigger a measuringRender when the tabs (children) prop changes
    useEffect(() => {
        setMeasuringRender(true);
    }, [children]);

    // Add props to each tab
    const allTabs = React.Children.map(children, (tab, index) => {
        return React.cloneElement(tab, {
            key: index,
        });
    });

    // Collect the visible and overflow tabs for rendering
    let visibleTabs = [];
    const overflowTabs = [];
    if (!isMounted || measuringRender) {
        visibleTabs = allTabs;
    } else {
        allTabs.forEach((tab, index) => {
            if (visibleTabIndices.includes(index)) {
                visibleTabs.push(tab);
            } else {
                overflowTabs.push(tab);
            }
        });
    }

    // Merge custom components with default components
    const {Container, TabContainer, MenuContainer, MenuButton, Menu} = {
        ...defaultComponents,
        ...components,
    };

    return (
        <Container
            innerProps={{
                ...props,
                style: {...props.style, display: 'flex'},
            }}
        >
            <TabContainer innerRef={containerRef}>{visibleTabs}</TabContainer>

            {(measuringRender || overflowTabs.length > 0) && (
                <MenuContainer innerRef={overflowRef}>
                    <MenuButton
                        innerRef={buttonRef}
                        menuIsOpen={menuIsOpen}
                        innerProps={{
                            onClick: () => setMenuIsOpen(!menuIsOpen),
                            'aria-haspopup': true,
                            'aria-expanded': menuIsOpen,
                        }}
                    />
                    {menuIsOpen && <Menu>{overflowTabs}</Menu>}
                </MenuContainer>
            )}
        </Container>
    );
}
