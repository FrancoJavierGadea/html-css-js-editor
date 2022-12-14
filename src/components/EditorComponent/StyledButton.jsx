import styled from "styled-components";

const Button = styled.div`

    position: absolute;

    color: white;

    height: calc(${props => props.size ? props.size : '18px'} + 5px);
    width: calc(${props => props.size ? props.size : '18px'} + 5px);

    display: flex;
    justify-content: center;
    align-items: center;

    top: ${props => props.top ? props.top : 'initial'};
    left: ${props => props.left ? props.left : 'initial'};
    right: ${props => props.right ? props.right : 'initial'};
    bottom: ${props => props.bottom ? props.bottom : 'initial'};

    font-size: ${props => props.size ? props.size : '18px'};

    &:hover {
        color: #c5c5c5;
        filter: drop-shadow(0px 0px 1px #c77ff4);
    }
    &:active {
        color: #8e8e8e;
        font-size: calc(${props => props.size ? props.size : '18px'} + 1px);
    }
`;

function StyledButton({onClick, children, title, size, top, left, right, bottom}) {

    return (<Button onClick={onClick} size={size} top={top} left={left} right={right} bottom={bottom} title={title}>

        {children}

    </Button>);
}

export default StyledButton;