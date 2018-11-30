import React, { Component } from 'react'
import {Menu, MenuHeader} from 'semantic-ui-react'
import Logo from '../assets/logo1.png'
export default class MenuStackable extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu stackable color='blue'>
                <Menu.Item>
                    <img src={Logo} />
                </Menu.Item>

                <Menu.Item
                    name='features'
                    active={activeItem === 'features'}
                    onClick={this.handleItemClick}
                >
                    Features
                </Menu.Item>

                <Menu.Item
                    name='testimonials'
                    active={activeItem === 'testimonials'}
                    onClick={this.handleItemClick}
                >
                    Testimonials
                </Menu.Item>
                <Menu.Menu position='right'>
                <Menu.Item color='blue' name='sign-up' active={activeItem === 'sign-up'} onClick={this.handleItemClick}>
                    Sign-up
                </Menu.Item>
                    <Menu.Item color='blue' name='sign-in' active={activeItem === 'sign-in'} onClick={this.handleItemClick}>
                        Sign-in
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}
