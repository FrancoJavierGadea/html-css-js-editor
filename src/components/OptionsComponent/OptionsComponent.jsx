import { Children } from "react";

function OptionsComponent({children}) {

    const left = Children.toArray(children).filter(value => {

        return value.props?.position === 'left';
    });

    const center = Children.toArray(children).filter(value => {

        return value.props?.position === 'center';
    });

    const right = Children.toArray(children).filter(value => {

        return value.props?.position === 'right';
    });

    return (<div className="OptionsComponent px-2 d-flex justify-content-between" style={{backgroundColor: '#007ACC'}}>

        <div className="d-flex justify-content-start">
            {left}
        </div>

        <div className="d-flex justify-content-center">
            {center}
        </div>

        <div className="d-flex justify-content-end">
            {right}
        </div>

    </div>);
}

export default OptionsComponent;