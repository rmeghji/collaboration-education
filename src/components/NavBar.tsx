import { Button, Link } from "@mui/material";
import React, { ReactComponentElement, ReactElement } from "react";
// import { Button } from "gatsby-material-ui-components"

interface NavBarProps{
    menuLinks: {
        url: string
        title: string
    }[]
}

const NavBar = (props: NavBarProps) => {
    
    return(
        <>
            {props.menuLinks.map((link) => 
                <Link
                href={link.url}
                component={Button}
                variant="body1"
                underline="none"
                textAlign="center"
                justifyContent="center"
                color="white"
                >{link.title}</Link>
            )}
        </>
    )
}

export default NavBar;