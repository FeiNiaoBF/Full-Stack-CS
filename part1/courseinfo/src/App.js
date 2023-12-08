
/// Header
const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

/// Content
const Content = (props) => {
    return (
        <div>
            <Part part={props.part[0].part1} exercises={props.part[0].exercises1} />
            <Part part={props.part[1].part2} exercises={props.part[1].exercises2} />
            <Part part={props.part[2].part3} exercises={props.part[2].exercises3} />
        </div>
    );
};

/// Part
const Part = (props) => {
    return (
        <div>
            <p>{props.part} {props.exercises}</p>
        </div>
    )
}

/// Total
const Total = (props) => {
    return (
        <div>
            <p>Number of exercises {props.exercises}</p>
        </div>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14
    // 重构Content组件，使其本身不渲染任何部件的名称或其练习次数。
    // 相反，它只渲染三个Part组件，每个组件渲染一个部分的名称和练习的次数。
    return (
        <div>
            <Header course={course} />
            <Content part={[{ part1, exercises1 }, { part2, exercises2 }, { part3, exercises3 }]} />
            <Total exercises={exercises1 + exercises2 + exercises3} />
        </div>
    )
}

export default App
