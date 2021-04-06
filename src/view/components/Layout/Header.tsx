import React from "react"
import Icon from "rsuite/lib/Icon/Icon";
import { Navbar, Nav, Dropdown } from 'rsuite';
import { IStdProps } from "sz-react-support";
import { Link } from "react-router-dom";
export default function (props: IStdProps) {
    return <Navbar>
        <Navbar.Header>
            <Link to="/" style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }} className="navbar-brand logo">
                <div>
                    <img src={require("../../../../assets/icons/icon.png").default} style={
                        { padding: "10px", maxWidth: "40px", maxHeight: "40px" }
                    }></img>
                    <b>
                        Seymour Zhang's Computer Science Playground
                    </b>
                </div>

            </Link>
        </Navbar.Header>
        <Navbar.Body>
            <Nav>
                <Nav.Item icon={<Icon icon="home" />} >
                    <Link to="/">Home</Link>
                </Nav.Item>

                <Dropdown title="Mathematics">
                    <Dropdown.Item>
                        <Link to="/relativity">Relativity</Link>
                    </Dropdown.Item>
                </Dropdown>

                <Dropdown title="Algorithm">
                    <Dropdown.Item>Find</Dropdown.Item>
                    <Dropdown.Item>Sort</Dropdown.Item>
                </Dropdown>

                <Dropdown title="Data-Structure">
                    <Dropdown.Item>Linear</Dropdown.Item>
                    <Dropdown.Item>Map</Dropdown.Item>
                    <Dropdown.Item>Hash</Dropdown.Item>
                </Dropdown>

                <Nav.Item>About</Nav.Item>
            </Nav>
            {/* <Nav pullRight>
                <Nav.Item icon={<Icon icon="cog" />} >Settings</Nav.Item>
            </Nav> */}
        </Navbar.Body>
    </Navbar>
}