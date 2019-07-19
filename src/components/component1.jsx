import React from 'react';

class Component1 extends React.Component {
    render() {
        const { children } = this.props;
        return(
            <div>
                <div>Component1</div>
                {children}
            </div>
        );
    }
}

export default Component1;
