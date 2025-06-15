import "bootstrap/dist/css/bootstrap.min.css";
import { Tooltip } from "react-tooltip";
import { Nav, Navbar, NavItem, Container, NavDropdown } from "react-bootstrap";
import UserContext from "../contexts/userContext";

function NavigationBar() {
    return(
        <>
            <Navbar expand="lg" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>ProjectFrontEnd</Navbar.Brand>
                    <Navbar.Toggle
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#/" data-tooltip-id="my-tooltip" data-tooltip-content="Home Page">Home</Nav.Link>
                            <NavDropdown title="Users">
                                <Nav.Link href="#/createUser" data-tooltip-id="my-tooltip"data-tooltip-content="Page to Create User" data-tooltip-place="right">Create User</Nav.Link>
                                <Nav.Link href="#/getUsers" data-tooltip-id="my-tooltip"data-tooltip-content="Page to Get Users" data-tooltip-place="right">Get Users</Nav.Link>
                            </NavDropdown>
                            <NavDropdown title="Tasks">
                                <Nav.Link href="#/createTask" data-tooltip-id="my-tooltip"data-tooltip-content="Page to Create Task" data-tooltip-place="right">Create Task</Nav.Link>
                                <Nav.Link href="#/getTask" data-tooltip-id="my-tooltip"data-tooltip-content="Page to Get Task" data-tooltip-place="right">Get Task</Nav.Link>
                                <Nav.Link href="#/updateTask" data-tooltip-id="my-tooltip"data-tooltip-content="Page to Update Task" data-tooltip-place="right">Update Task</Nav.Link>
                                <Nav.Link href="#/deleteTask" data-tooltip-id="my-tooltip"data-tooltip-content="Page to Delete Task" data-tooltip-place="right">Delete Task</Nav.Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
             <Tooltip id="my-tooltip" variant="dark" />
        </>
    )
}
export default NavigationBar;