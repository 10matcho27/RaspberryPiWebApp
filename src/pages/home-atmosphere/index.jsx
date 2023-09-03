'use client'
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { initializeFirestore, getFirestore, collection, getDocs, setDoc, doc, where, query, onSnapshot  } from "firebase/firestore";
import { Spacer, Text } from '@chakra-ui/react'
import { Center, Flex, Square, Circle, Box } from '@chakra-ui/react'
import CreateAreaChart from "@/src/components/createAreaChart";
import GetWindowSize from "@/src/components/getWindowSize";
import CreateColumnChart from "@/src/components/createColumnChart";

export default function TestPage() {
  // const [data, setData] = useState([]); // データを格納するためのstate
  const [temp, setTemp]           = useState([])
  const [humid, setHumid]         = useState([])
  const [timestamp_bme, setTimestamp_bme] = useState([])
  const [timestamp_tsl, setTimestamp_tsl] = useState([])
  const [pres, setPres]           = useState([])
  const [lux, setLux]             = useState([])
  const {height, width} = GetWindowSize();
  const [tempColor, setTempColor] = useState('#43D9AF')
  const [luxColor, setLuxColor] = useState('#251E1B')

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
      collection(db, "BME680"),
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
          setTemp((prevTemp) => [...prevTemp, tmprtr])
          setHumid((prevHumid) => [...prevHumid, change.doc.data().Humidity[0]])
          setPres((prevPres) => [...prevPres, change.doc.data().Pressure[0]])
          setTimestamp_bme((prevTimestamp_bme) => [...prevTimestamp_bme, `${change.doc.data().Timestamp.toDate().getMonth()+1}/${change.doc.data().Timestamp.toDate().getDate()} ${change.doc.data().Timestamp.toDate().getHours()}:${change.doc.data().Timestamp.toDate().getMinutes()}:${change.doc.data().Timestamp.toDate().getSeconds()}`])
          // `${change.doc.data().Timestamp.toDate().getFullYear()}/${change.doc.data().Timestamp.toDate().getMonth()+1}/${change.doc.data().Timestamp.toDate().getDate()} ${change.doc.data().Timestamp.toDate().getHours()}:${change.doc.data().Timestamp.toDate().getMinutes()}:${change.doc.data().Timestamp.toDate().getSeconds()}`
        },
      (error) => {
        console.log(error)
      })
    })
    const unsub_tsl2572 = onSnapshot(
      collection(db, "TSL2572"),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const lx = parseInt(change.doc.data().Lux[0])
          if(lx > 250){
            setLuxColor('#FFDAD1')
          }else if(lx > 3){
            setLuxColor('#301E5A')
          }else{
            setLuxColor('#251E1B')
          }
          setLux((prevLux) => [...prevLux, lx])
          setTimestamp_tsl((prevTimestamp_tsl) => [...prevTimestamp_tsl, `${change.doc.data().Timestamp.toDate().getMonth()+1}/${change.doc.data().Timestamp.toDate().getDate()} ${change.doc.data().Timestamp.toDate().getHours()}:${change.doc.data().Timestamp.toDate().getMinutes()}:${change.doc.data().Timestamp.toDate().getSeconds()}`])
        },
      (error) => {
        console.log(error)
      })
    })
  }, [])

  return (
    <>
      <Text fontSize={20} color='tomato' as='b'>
          Update values every 30 seconds.
      </Text>
      <Box w="100%" h={height / 30}>
      </Box>
      <Center>
        <Box>
          <Flex>
            <CreateAreaChart
              data = {temp}
              timestamp = {timestamp_bme}
              name = "Temperature"
              width = {width}
              height = {height}
              color = {tempColor}/>
            <CreateAreaChart
              data = {lux}
              timestamp = {timestamp_tsl}
              name = "Lux"
              width = {width}
              height = {height}
              color = {luxColor}/>
          </Flex>
          <Flex>
            <CreateAreaChart
              data = {pres}
              timestamp = {timestamp_bme}
              name = "Pressure"
              width = {width}
              height = {height}
              color = '#BEC5FF'/>
            <CreateAreaChart
              data = {humid}
              timestamp = {timestamp_bme}
              name = "Humidity"
              width = {width}
              height = {height}
              color = '#839EFF'/>
          </Flex>
        </Box>
      </Center>
    </>
  );
}