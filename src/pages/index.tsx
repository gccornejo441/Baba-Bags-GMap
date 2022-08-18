import Head from 'next/head';
import Image from 'next/image';

import styles from '@/styles/Home.module.css';
import { useState } from 'react';

import { useForm, SubmitHandler } from "react-hook-form";
import { app, database } from '../../firebaseConfig.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';

import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import GMap from '../../components/GMap'
import Geocode from "react-geocode";
import * as React from 'react';

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyC3VCDaWLypkC2vOX_P4J4v-IvhuxadC2k");


type Inputs = {
  _id: string,
  location: string,
  message: string,
  address: string,
};


const dbInstance = collection(database, 'baba_gift_bags');

const insert = async ({...data}: Inputs) => {
  addDoc(dbInstance, data)
}



export default function Home() {
  const [street, setStreet] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  
  // const getDoc = async () => {
  //   getDocs(dbInstance).then((data) => {
  //       data.docs.map((item) => {
  //         console.log(item)
  //     })
  //     const geoAddress = `${street} + ", " + ${city} + " " ${state}`
  //   })
  // }




  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    insert(data);
  };

  // Get latitude & longitude from address.
  // Geocode.fromAddress(geoAddress).then(
  //   (response: any) => {
  //     const { lat, lng } = response.results[0].geometry.location;
  //     console.log(lat, lng);
  //   },
  //   (error: Error) => {
  //     console.error(error);
  //   }
  // );
  
  return (
    <div>
      <div className="py-12 bg-white text-black">
        <div className="mt-5 md:mt-0 md:col-span-2 mx-auto border-2 border-red-500 w-1/2 flex justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Username</label>
                    <input defaultValue="test" {...register("_id")} type="text" name="_id" id="_id" autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">City</label>
                    <input defaultValue="test" {...register("location")} type="text" name="location" id="location" autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Note</label>
                    <input defaultValue="test" {...register("message")} type="text" name="message" id="message" autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Address</label>
                    <input defaultValue="" {...register("address")} type="text" name="address" id="address" autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                <button onClick={getDocData} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Report</button>
              </div>
            </div>
          </form>
        </div>

        <div>
          <GMap
            
          />
        </div>
      </div>
    </div>

  );
}



// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res =  await database.collection('baba_gift_bags').get()


  // Pass data to the page via props
  return { props: {  } }
}