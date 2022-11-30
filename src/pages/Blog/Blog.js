import React from 'react';

const Blog = () => {
    return (
        <div className='w-2/3 mx-auto my-16'>
            <div tabIndex={0} className="collapse collapse-open border border-base-300 bg-base-100 rounded-box my-5">
                <div className="collapse-title text-xl font-medium">
                    What are the different ways to manage a state in a React application?
                </div>
                <div className="collapse-content">
                    <p>(1)Local state
                        (2)Global state
                        (3)Server state
                        (4)URL state</p>
                </div>
            </div>
            <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box my-5">
                <div className="collapse-title text-xl font-medium">
                    How does prototypical inheritance work?
                </div>
                <div className="collapse-content">
                    <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.</p>
                </div>
            </div>
            <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box my-5">
                <div className="collapse-title text-xl font-medium">
                    What is a unit test? Why should we write unit tests?
                </div>
                <div className="collapse-content">
                    <p>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
                </div>
            </div>
            <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box my-5">
                <div className="collapse-title text-xl font-medium">
                    React vs. Angular vs. Vue?
                </div>
                <div className="collapse-content">
                    <p>React is a UI library, Angular is a fully-fledged front-end framework, while Vue.js is a progressive framework.

                        They can be used almost interchangeably to build front-end applications, but they’re not 100 percent the same, so it makes sense to compare them and understand their differences.

                        Each framework is component-based and allows the rapid creation of UI features.

                        However, they all have a different structure and architecture — so first, we’ll look into their architectural differences to understand the philosophy behind them.</p>
                </div>
            </div>
        </div>
    );
};

export default Blog;