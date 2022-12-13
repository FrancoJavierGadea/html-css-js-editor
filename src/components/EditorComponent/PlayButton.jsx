import styled from "styled-components";

const StyledButton = styled.div`

    position: absolute;

    color: white;

    top: ${props => props.top ? props.top : 'initial'};
    left: ${props => props.left ? props.left : 'initial'};
    right: ${props => props.right ? props.right : 'initial'};
    bottom: ${props => props.bottom ? props.bottom : 'initial'};

    font-size: ${props => props.size ? props.size : '18px'};

    &:hover {
        filter: drop-shadow(0px 0px 3px #c466ff);
    }
    &:active {
        font-size: calc(${props => props.size ? props.size : '18px'} + 1px) ;
    }
`;

function PlayButton({onClick, title, size, top, left, right, bottom}) {

    return (<StyledButton onClick={onClick} size={size} top={top} left={left} right={right} bottom={bottom} title={title}>

        <i className="bi bi-play-fill"></i>

    </StyledButton>);
}

export default PlayButton;