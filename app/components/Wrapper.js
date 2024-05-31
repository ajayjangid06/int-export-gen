import React from "react";

const Wrapper = (props) => {
    const { className, children } = props;
    return (
        <div
            className={
                "p-6 border-2 border-inherit mx-auto rounded-lg shadow-xl " +
                className
            }
        >
            {children}
        </div>
    );
};

export default Wrapper;
