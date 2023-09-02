import Head from 'next/head'
import { 
  Avatar, 
  AvatarBadge, 
  AvatarGroup, 
  Wrap, 
  WrapItem,
  Flex,
  Spacer,
  SimpleGrid,
  Box,
  Center,
  Container,
  Text,
  Fade, 
  ScaleFade, 
  Slide, 
  SlideFade,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  Button,
 } from '@chakra-ui/react'

import {motion} from 'framer-motion'

import { 
  AddIcon,
  HamburgerIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
} from '@chakra-ui/icons'

export default function Home() {
  const { isOpen, onToggle } = useDisclosure()
  const outerBoxStyles = {
    boxSize: '200px',
    p: '10px',

  }

  const innerBoxStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxSize: 'full',
    color: 'white',
    textShadow: '0 0 20px black',
    fontWeight: 'bold',
    fontSize: '20px',
  }
  

  return (
    <div>
      
      <Head>
        <title>Matcho&apos;s portfolio</title>
        <meta name="description" content="Matcho&apos; Portfolio" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <Container>
          <Center h='100%'>
            <motion.div initial="hidden" animate="visible" variants={
              {
                hidden: {
                  opacity: 0,
                  scale: 0.8,
                },
                visible: {
                  scale: [1, 1.1, 1],
                  opacity: 1,
                  transition: {
                    delay: 0.8, //ページロード時に表示されるまでの遅延
                  }
                }
              }
              } whileHover={
                {rotate:[0, 3, -3, 0]}
              }>
              <Flex>
                <Box maxWidth="200px" mx="auto" onClick={onToggle}>
                <Avatar 
                  name="Matcho" 
                  src='/images/Matcho.jpg'
                  size="xl"
                  shadow="2xl" />
                  <Text fontSize='3xl'>Matcho</Text>
                </Box>
              </Flex>
              <ScaleFade initialScale={0.9} in={isOpen}>
                <motion.div whileHover={
                  {
                    scale: 1.1,
                    transition: {
                      duration: 0.2,
                    }
                  }}>  
                <Box 
                  p='150px'
                  color='white'
                  mt='4'
                  bg='purple.300'
                  rounded='md'
                  shadow='xl'
                >
                description
                </Box>
                </motion.div>
              </ScaleFade>
            </motion.div>
          </Center>
        </Container>
      </main>

      

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          made with next.js + chakra ui 
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
      {/* scrollReveal().reveal({styles.container}); */}
    </div>
    // https://www.youtube.com/watch?v=UIX0DSaNOjI
    // https://www.youtube.com/watch?v=VYiMU_xB9LY
  )
}
