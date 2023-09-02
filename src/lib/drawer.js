import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    IconButton,
    MenuItem,
    useColorMode,
    Menu,
    Box,
    Link,
    Boarder,
    Link as ChakraLink, LinkProps
} from '@chakra-ui/react'

import {
    AddIcon,
    HamburgerIcon,
    ExternalLinkIcon,
    RepeatIcon,
    MoonIcon,
    SunIcon,
    EmailIcon,
    LinkIcon
} from '@chakra-ui/icons'

import {
    GitHub,
    Instagram,
    Linkedin,
    Mail,
    Map,
    Moon,
    PenTool,
    Sun,
    Table,
    Twitter,
    User,
    Home as HomeIcon
} from 'react-feather';

import NextLink from 'next/link'

import * as React from "react";
import Home from '../pages';

function OpenDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode()
    const btnRef = React.useRef()
    const firstField = React.useRef()

    return (
        <>
            <Button
                ref={btnRef}
                onClick={onOpen}
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'>
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Index</DrawerHeader>
                    <DrawerBody>
                        <Menu
                            isLazy={true}
                            matchWidth={true}>
                            <MenuItem
                                icon={<PenTool />}
                                fontSize='20px'>
                                Drawings
                            </MenuItem>
                            <MenuItem
                                icon={<User />}
                                fontSize='20px'>
                                Sports
                            </MenuItem>
                            <MenuItem
                                icon={<Table />}
                                fontSize='20px'>
                                Conference
                            </MenuItem>
                            <MenuItem
                                icon={<Mail />}
                                fontSize='20px'>
                                Contact
                            </MenuItem>
                            <MenuItem
                                icon={colorMode === 'light' ? <Moon /> : <Sun/>}
                                onClick={toggleColorMode}
                                fontSize='20px'>
                                Change Color Mode
                            </MenuItem>
                            <Link as={NextLink} href='/home-atmosphere'>
                                <MenuItem icon={<HomeIcon/>}
                                    fontSize='20px'>
                                        Home Atmosphere
                                </MenuItem>
                            </Link>
                            <Link as={NextLink} href='/test-chart'>
                                <MenuItem
                                    fontSize='20px'>
                                        Chart Test Page
                                </MenuItem>
                            </Link>
                            <Link as={NextLink} href='/test-chart2'>
                                <MenuItem
                                    fontSize='20px'>
                                        Chart Test Page2
                                </MenuItem>
                            </Link>
                            <Link as={NextLink} href='http://35.227.141.167:8443/' isExternal>
                                <MenuItem
                                    fontSize='20px'>
                                        Home Remote Controller
                                </MenuItem>
                            </Link>
                        </Menu>
                    </DrawerBody>
                    <DrawerFooter>
                        <Link href='https://www.linkedin.com/in/ryo-takamatsu-42370a242/' isExternal>
                            <Button variant='outline' margin='2px'>
                                {<Linkedin/>}
                            </Button>
                        </Link>
                        <Link href='https://twitter.com/admwtpgj2345?t=65yVVeWG05xWFSGjwJyAAw&s=09' isExternal>
                            <Button variant='outline' margin='2px'>
                                {<Twitter/>}
                            </Button>
                        </Link>
                        <Link href='https://instagram.com/10matcho27?igshid=ZDdkNTZiNTM=' isExternal>
                            <Button variant='outline' margin='2px'>
                                {<Instagram/>}
                            </Button>
                        </Link>
                        <Link href='https://github.com/10matcho27' isExternal>
                            <Button variant='outline' margin='2px'>
                                {<GitHub/>}
                            </Button>
                        </Link>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
export default OpenDrawer