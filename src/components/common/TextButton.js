import styled from 'styled-components';

export default styled.button`
    background: none;
    border: none;
    color: hsl(228, 90%, 70%);
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;

    &:hover {
        color: hsl(228, 90%, 65%);
    }

    &:active {
        color: hsl(228, 90%, 50%);
    }
`;
