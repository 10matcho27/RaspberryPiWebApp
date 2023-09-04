'use client'
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { initializeFirestore, getFirestore, collection, getDocs, setDoc, doc, where, query, onSnapshot  } from "firebase/firestore";
import { Spacer, Text } from '@chakra-ui/react'
import { Center, Flex, Square, Circle, Box, Button, Stack } from '@chakra-ui/react'
import CreateAreaChart from "@/src/components/createAreaChart";
import GetWindowSize from "@/src/components/getWindowSize";
import CreateColumnChart from "@/src/components/createColumnChart";

export default function TestPage() {
  // const [data, setData] = useState([]); // データを格納するためのstate
  const [temp, setTemp]           = useState([])
  const [humid, setHumid]         = useState([])
  const [timestamp, setTimestamp] = useState([])
  const [pres, setPres]           = useState([])
  const [lux, setLux]             = useState([])
  const {height, width} = GetWindowSize();
  const [tempColor, setTempColor] = useState('#43D9AF')
  const [luxColor, setLuxColor] = useState('#251E1B')
  const [month, setMonth] = useState("9")

  //! 毎回すべての変更をとってくるので帯域消費がやばい
  // const q = query(collection(db, "BME680"));
  // const unsub = onSnapshot(q, (snapshot) => {
  //   snapshot.forEach((doc) => {
  //     temp.push(doc.data().Temperature);
  //     humid.push(doc.data().Humidity);
  //     timestamp.push(doc.data().Timestamp);
  //     pres.push(doc.data().Pressure);
  //   });
  //   console.log(temp, humid, pres, timestamp)
  // })

  useEffect(() => {
    // Firebaseの設定情報
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const app = initializeApp(firebaseConfig);
    // const db = getFirestore(app);
    const db = initializeFirestore(app, {
      experimentalForceLongPolling: true, // this line
      useFetchStreams: false,
    })
    console.log("connected to Firestore DB", db)

    const unsub_bme680 = onSnapshot(
      collection(db, month),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const tmprtr = change.doc.data().Temperature[0]
          if(tmprtr < 24.5){
            setTempColor('#8595FF')
          }else if(tmprtr > 28){
            setTempColor('#FF959F')
          }else {
            setTempColor('#43D9AF')
          }
          const lx = parseInt(change.doc.data().Lux[0])
          if(lx > 250){
            setLuxColor('#FFDAD1')
          }else if(lx > 3){
            setLuxColor('#301E5A')
          }else{
            setLuxColor('#251E1B')
          }
          setLux((prevLux) => [lx])
          setTemp((prevTemp) => [...prevTemp, tmprtr])
          setHumid((prevHumid) => [...prevHumid, change.doc.data().Humidity[0]])
          setPres((prevPres) => [...prevPres, change.doc.data().Pressure[0]])
          setTimestamp((prevTimestamp) => [...prevTimestamp, change.doc.data().Timestamp])
          // `${change.doc.data().Timestamp.toDate().getFullYear()}/${change.doc.data().Timestamp.toDate().getMonth()+1}/${change.doc.data().Timestamp.toDate().getDate()} ${change.doc.data().Timestamp.toDate().getHours()}:${change.doc.data().Timestamp.toDate().getMinutes()}:${change.doc.data().Timestamp.toDate().getSeconds()}`
        },
      (error) => {
        console.log(error)
      })
    })}, [month])
    console.log(month)

  return(
    <>
      <Stack spacing={1} direction='row' align='center'>
        <Button colorScheme='teal' variant='outline' onClick={() => setMonth("1")}> 1月 </Button>
        <Button colorScheme='teal' variant='outline' onClick={() => setMonth("2")}> 2月 </Button>
        <Button colorScheme='teal' variant='outline' onClick={() => setMonth("3")}> 3月 </Button>
        <Button colorScheme='teal' variant='outline' onClick={() => setMonth("4")}> 4月 </Button>
        <Button colorScheme='teal' variant='outline' onClick={() => setMonth("5")}> 5月 </Button>
        <Button colorScheme='teal' variant='outline' onClick={() => setMonth("6")}> 6月 </Button>
        <Button colorScheme='teal' variant='outline' onClick={() => setMonth("7")}> 7月 </Button>
        <Button colorScheme='teal' variant='outline' onClick={() => setMonth("8")}> 8月 </Button>
        <Button colorScheme='teal' variant='outline' onClick={() => setMonth("9")}> 9月 </Button>
        <Button colorScheme='teal' variant='outline' onClick={() => setMonth("10")}> 10月 </Button>
        <Button colorScheme='teal' variant='outline' onClick={() => setMonth("11")}> 11月 </Button>
        <Button colorScheme='teal' variant='outline' onClick={() => setMonth("12")}> 12月 </Button>
      </Stack>

      <Box w="100%" h={height / 30}></Box>
      <Center>
        <CreateAreaChart
          data = {temp}
          timestamp = {timestamp}
          name = "Temperature"
          width = {width}
          height = {height}
          color = {tempColor}/>
      </Center>
      <Center>
        <CreateAreaChart
          data = {lux}
          timestamp = {timestamp}
          name = "Lux"
          width = {width}
          height = {height}
          color = {luxColor}/>
      </Center>
      <Center>
        <CreateAreaChart
          data = {pres}
          timestamp = {timestamp}
          name = "Pressure"
          width = {width}
          height = {height}
          color = '#BEC5FF'/>
      </Center>
      <Center>
        <CreateAreaChart
          data = {humid}
          timestamp = {timestamp}
          name = "Humidity"
          width = {width}
          height = {height}
          color = '#839EFF'/>
      </Center>
    </>
  )
}