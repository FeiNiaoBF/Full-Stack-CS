
/// Header
const Header = (props) => {
    console.log(props)
    return (
        <h1>{props.course}</h1>
    )
}

/// Content
const Content = (props) => {
    return (
        <div>
            <Part name={props.part[0].name} exercises={props.part[0].exercises} />
            <Part name={props.part[1].name} exercises={props.part[1].exercises} />
            <Part name={props.part[2].name} exercises={props.part[2].exercises} />
        </div>
    );
};

/// Part
const Part = (props) => {
    return (
        <p>{props.name} {props.exercises}</p>
    )
}

/// Total
const Total = (props) => {
    let total = 0;
    for (let i = 0; i < props.exercises.length; i++) {
        total += props.exercises[i].exercises;
    }
    return (
        <div>
            <p>Number of exercises {total}</p>
        </div>
    )
}

const App = () => {
    // Object of parts
    const course = {
        name: 'Half Stack application development',
        // array of part
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }


    return (
        <div>
            <Header course={course.name} />
            <Content part={course.parts} />
            <Total exercises={course.parts} />
        </div>
    )
}

export default App
