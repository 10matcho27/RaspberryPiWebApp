import { Box, Heading, Flex, Text, Button } from "@chakra-ui/react";
import React from 'react'
import Link from 'next/link';
import {
    AddIcon,
    HamburgerIcon,
    ExternalLinkIcon,
    RepeatIcon,
    EditIcon ,
    MoonIcon,
    SunIcon,
    Tooltip,
    Cus,
    Tag
} from '@chakra-ui/icons'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react'

import OpenDrawer from "../../lib/drawer";

export default function Header() {
    const { colorMode, toggleColorMode } = useColorMode()
    const bg = useColorModeValue('red.500', 'red.200')
    const color = useColorModeValue('white', 'gray.800')

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="1.5rem"
            color="black"
        >
            <Link href="/">
                {/* <Tooltip label='Go back to home'> */}
                    <Button
                        bgClip='text'
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        _hover={{
                            bgGradient: 'linear(to-r, red.500, yellow.500)',
                        }}
                        fontSize='20px'
                        fontWeight='extrabold'
                        variant='ghost'
                        >
                        Matcho&apos;s Portfolio
                    </Button>
                {/* </Tooltip> */}
            </Link>
            <OpenDrawer/>
        </Flex>
    );
}
