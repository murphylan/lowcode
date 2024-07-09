import { useNode, useEditor } from '@craftjs/core';
import { ROOT_NODE } from '@craftjs/utils';
import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';

import ArrowUp from '../icons/arrow.svg';
import Delete from '../icons/delete.svg';
import Move from '../icons/move.svg';

// CSS classes for styling the indicators and buttons
const indicatorDivStyles = `
  height: 24px; 
  margin-top: -23px;
  font-size: 10px;  
  line-height: 10px;
  padding: 0px 8px;  
  background-color: rgba(0, 123, 255, 0.8); /* Semi-transparent blue background */
  color: white;
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 9999;

  img {
    width: 12px;  
    height: 12px;
  }
`;

const btnStyles = `
  padding: 0;
  opacity: 0.9;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

// Add styles for the border when the component is hovered
const componentHoveredStyles = `
  border: 1px dashed #007bff;
`;

// Add styles for the border when the component is selected
const componentSelectedStyles = `
  border: 2px solid #007bff;
`;

export const RenderNode = ({ render }) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent('selected').contains(id),
  }));

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }));

  const currentRef = useRef(null);

  useEffect(() => {
    if (dom) {
      if (isActive) {
        dom.classList.add('component-selected');
        dom.classList.remove('component-hovered');
      } else if (isHover) {
        dom.classList.add('component-hovered');
        dom.classList.remove('component-selected');
      } else {
        dom.classList.remove('component-selected', 'component-hovered');
      }
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    const currentDOM = currentRef.current;

    if (!currentDOM) return;
    const { top, left } = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom, getPos]);

  useEffect(() => {
    const renderer = document.querySelector('.craftjs-renderer');
    if (renderer) {
      renderer.addEventListener('scroll', scroll);
    }

    return () => {
      if (renderer) {
        renderer.removeEventListener('scroll', scroll);
      }
    };
  }, [scroll]);

  return (
    <>
      {isHover || isActive
        ? ReactDOM.createPortal(
          <div
            ref={currentRef}
            className="indicator-div"
            style={{
              left: getPos(dom).left,
              top: `${parseInt(getPos(dom).top) - 20}px`, // Adjusted to be slightly above the clicked element
            }}
          >
            <span className="flex-1 mr-4">{name}</span>
            {moveable ? (
              <a className="btn m-6 cursor-move" ref={drag}>
                <img src={Move} alt="Move" />
              </a>
            ) : null}
            {id !== ROOT_NODE && (
              <a
                className="btn m-6 cursor-pointer"
                onClick={() => {
                  actions.selectNode(parent);
                }}
              >
                <img src={ArrowUp} alt="Arrow Up" />
              </a>
            )}
            {deletable ? (
              <a
                className="btn cursor-pointer"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  actions.delete(id);
                }}
              >
                <img src={Delete} alt="Delete" />
              </a>
            ) : null}
          </div>,
          document.querySelector('.page-container')
        )
        : null}
      {render}
    </>
  );
};

// Add the styles to the global scope
const style = document.createElement('style');
style.textContent = `
  .indicator-div {
    ${indicatorDivStyles}
  }

  .btn {
    ${btnStyles}
  }

  .component-hovered {
    ${componentHoveredStyles}
  }

  .component-selected {
    ${componentSelectedStyles}
  }
`;
document.head.appendChild(style);
