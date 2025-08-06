import styled from 'styled-components';

export default styled.button`
    background: none;
    border: none;
    color: var(--base13);
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;

    &:hover {
        color: var(--base12);
    }

    &:active {
        color: var(--base01);
    }
`;
