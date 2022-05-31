import React from "react";
import { render } from "react-dom";
import { Rnd } from "react-rnd";

const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0"
};

class SelfieResize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 200,
            height: 200,
            x: 10,
            y: 10
        };
    }

    render() {
        return (
            <Rnd
                style={style}
                size={{ width: this.state.width, height: this.state.height }}
                position={{ x: this.state.x, y: this.state.y }}
                onDragStop={(e, d) => {
                    this.setState({ x: d.x, y: d.y });
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    this.setState({
                        width: ref.style.width,
                        height: ref.style.height,
                        ...position
                    });
                }}
            >
                <img src={this.props.selfiesrc} width="100%" height="100%" />
            </Rnd>
        );
    }
}

// render(<SelfieResize />, document.getElementById("root"));
export default SelfieResize;