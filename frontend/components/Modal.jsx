import React, { Component } from 'react';

class Modal extends Component {
    render() {
        // Render nothing if the "show" prop is false
        if(!this.props.show) {
            return null;
        }

        return (
            <div className="modal">
                <div className="footer">
                    <button onClick={this.props.onClose}>
                        Close
                    </button>
                </div>
            </div>
        );
    }
}

export default Modal;