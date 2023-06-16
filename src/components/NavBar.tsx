import React, { ReactComponentElement, ReactElement } from "react";

interface NavBarProps{
    menuLinks: [
        {
            url: string
            title: string
        }
      ]
}

const NavBar = (props: NavBarProps) => {
    
    return(
        <>
            <button>Hi This Is button Thx</button>
            {props.menuLinks.map((link) => (
                <button>{link.title}</button>
            ))}
        </>
    )
}

export default NavBar;