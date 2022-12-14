import styled from "styled-components";


const StyledBrand = styled.div`

    img {
        height: 30px;
        object-fit: scale-down;
    }
`;

const brands = {
    js: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png',
    html: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg',
    css: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/800px-CSS3_logo_and_wordmark.svg.png'
}

function Brand({name, title}) {


    return (<StyledBrand title={title}>
        <img src={brands[name]} alt={name} />
    </StyledBrand>);
}

export default Brand;